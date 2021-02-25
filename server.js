const PORT = process.env.PORT || 5000;
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
var jwt = require('jsonwebtoken');
var http = require("http");
var path = require('path')
const multer = require('multer');
const fs = require('fs');
const admin = require("firebase-admin");
var { userModel, adminModel } = require("./dbrepo/models");

var { SERVER_SECRET } = require("./core/index");

var authRoutes = require("./routes/auth");

var app = express();

var server = http.createServer(app);


const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })



var serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

const bucket = admin.storage().bucket(process.env.bucket);


app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(morgan('dev'));


app.use("/", express.static(path.resolve(path.join(__dirname, "front-end/build"))))

app.use('/auth', authRoutes);

app.use(function (req, res, next) {

    console.log("req.cookies: ", req.cookies);

    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate; // 84600,000

            if (diff > 3000000000) { // expire after 5 min (in milis)
                res.send({
                    message: "TOKEN EXPIRED",
                    status: 401
                });
            } else { // issue new Token
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    phone: decodedData.phone,
                    role: decodedData.role
                }, SERVER_SECRET)

                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                next();
            }
        } else {
            res.send({
                message: "Invalid Token",
                status: 401
            });
        }


    });

});

app.get("/profile", (req, res, next) => {
    console.log(req.body);

    userModel.findById(req.body.jToken.id, 'name email phone createdOn role', function (err, doc) {
        if (!err) {
            res.send({
                profile: doc,
                status: 200
            })

        } else {
            res.send({
                message: "Server Error",
                status: 500
            });
        }
    });
})

app.post("/upload", upload.any(), (req, res, next) => {  // never use upload.single. see https://github.com/expressjs/multer/issues/799#issuecomment-586526877

    console.log("req.body: ", req.body);
    console.log("req.body: ", JSON.parse(req.body.myDetails));
    console.log("req.files: ", req.files);

    console.log("uploaded file name: ", req.files[0].originalname);
    console.log("file type: ", req.files[0].mimetype);
    console.log("file name in server folders: ", req.files[0].filename);
    console.log("file path in server folders: ", req.files[0].path);

    // upload file to storage bucket 
    // you must need to upload file in a storage bucket or somewhere safe
    // server folder is not safe, since most of the time when you deploy your server
    // on cloud it makes more t2han one instances, if you use server folder to save files
    // two things will happen, 
    // 1) your server will no more stateless
    // 2) providers like heroku delete all files when dyno restarts (their could be lots of reasons for your dyno to restart, or it could restart for no reason so be careful) 


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        // {
        //     destination: `${new Date().getTime()}-new-image.png`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        // },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api  sameer khan resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        res.send(urlData[0]);

                        // // delete file from folder before sending response back to client (optional but recommended)
                        // // optional because it is gonna delete automatically sooner or later
                        // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                            return;
                        } catch (err) {
                            console.error(err)
                        }
                        // res.send("Ok");/
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})


app.post('/admindashboard', (req, res, next) => {
    if (!req.body.productname || !req.body.price || !req.body.productimage || !req.body.activeStatus || !req.body.stock || !req.body.description) {
        res.send({
            message: "Please Fill All Product Info",
            status: 301
        });
    }
    userModel.findById(req.body.jToken.id, 'email role', function (err, user) {
        if (!err) {
            if (user.role === "admin") {
                adminModel.create({
                    "productname": req.body.productname,
                    "price": req.body.price,
                    "productimage": req.body.productimage,
                    "activeStatus": req.body.activeStatus,
                    "stock": req.body.stock,
                    "description": req.body.description
                }, function (err, data) {
                    if (err) {
                        res.send({
                            message: " DB ERROR",
                            status: 404
                        });
                    }
                    else if (data) {
                        res.send({
                            status: 200,
                            message: "Added",
                            data: data
                        });
                    } else {
                        res.send({
                            message: "err",
                            status: 500
                        });
                    }
                })
            } else {
                res.send({
                    message: "Only Edit  Admin",
                    status: 404
                })
            }
        }
        else {
            res.send({
                message: "Only Edit  Admin",
                status: 404
            });
        }
    })
})

server.listen(PORT, () => {
    console.log("Server is Running:", PORT);
});