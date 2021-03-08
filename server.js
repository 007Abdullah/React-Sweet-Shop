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
var { userModel, adminModel, order } = require("./dbrepo/models");

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



var serviceAccount = {
    "type": "service_account",
    "project_id": "sweetshop-2aac1",
    "private_key_id": "7754248c6afd60a09cb5cf9d5ba6eabdfcf4a87c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtceOkDvFdcxv8\ne7vNJILagfk00UcLOZfPxqno8IPO5qRo0qN+aeY0E16Pm8ipztFJqWk421xrVHd7\ny4MhhfxGazdIiBD5fmlD9yW40ONaM553KwxK1F0NHsnGMef/4X0HpDAMiyZfrPIc\nG5oBV//zAA/DK+5OL5hAHlAd+mJiveeGlfR+5n9lGNSJ2FcWToa+7JNXyzqGbNBB\nHfP4aFtF7B1QakVSIneDIyunIkUF8JK8DCO2tCS1j5d3eZ6r0plII1F5HjXRbEEY\nrEnrUrZXqBBMPuw4hnHuiaAZ4B/BQMVZy7Pe3agV6MxKSJHWUXaClDE4sutJrQfJ\n+MgxJPulAgMBAAECggEABWh9NCLhJMxPjZZgGzvttpmB50M1R2TS1oA30RMa0QtB\nCiGzRmBP9MS72Jd/cMgJn5XgOY0hexlFpn8IhjWS0bFLJoBToyvtZVih/PrKdAgT\nA108w2KOyjdxDDSHKuPhjajxdJqsJiSS4gx8R1lymiWg2DGY+yghw7IORnkFs1Vy\nXaRIqLthzvojlklC9XJJv+hChCxYmnggMPYRfleGN4qoD9Xpne2j9sjLwTJel8ZO\n8ne90PG7hvPkqAjQFF2Gob55l/tgQVucSb1uYHdGL5lsniedp21C4X8uMrW5rhVR\ntZvdoptrK/o3mMqQHdTdyweLjVRRTnElQ0V9/t93IQKBgQDnMUq95ExIXmfZhNwV\nVutYpc1UnsEpZKOXaxwn36soziHDpAB8pBI7GImjq0zGCZyKOicSK3T/8fPrxEj/\ngkUPvblHc+M8gcVduiNhRDhZIwyYy3UcY70J7FWI/efbGyT+qOIWej3xJ2fYlrpo\noOKYFS+7phyCeeUk6nR7bgznNQKBgQDADk5+0rh2vwpbPYDkhEoJrmLnOfb9jK4E\nZbpVWNCriciFVTmPEsCjFsINhy/okxwB5Vb4hztTh/yuxzziaa48Biw8cvms/TzT\nCiJrQ922OrtignNFRXuCWMLRKCGPZkfmJOh07rutvKh3jXOdOhIGNxsZsuzFC1rv\nCQN7wdigsQKBgBD26/4dJ3/T9Zjfh+rE8wYRPIzuDUyFRv/Qa0N9xSh8X7vkZ+i9\nfVz6wvbQlhSeFe+Krt1FdRNm5LgzMgwVug2apWLZ3R3Og/YJt5jmkZ/w03bOzywj\nIXb98ZTY1M+eIUvShqyRkcQFWThqbwlIbPgt7c++M69bVHYuAhggji/VAoGAMEMo\nHJyteEG3w4foHQTVaitldT/OvpacoEREF/Byt7ivKDprdXW77P/qEeY39tUJA7zz\nJw8srGgO6ojs1uTBwRm4AhTOg1c78rioP5ZVX9bQggfQGcdFK1NM2ayhCl0kkkQS\nGlhn11gCadClDgyqvN8aM1IQR8/7sPft5SqoWnECgYEAtR/qVHVOQr/Qi+CJPkx0\nqWx1Gxn9iqqeWJVzjg0vOli6MM/bl8/lDT9nLMSv7V3UeXVaXmk0OuRY61YvVd0g\n9jBDgS17QWG/QwnbPcM/narmQ4KRBwG4p5OZvs+FRI5zs6phyo/RZZRh2xqCqj3e\nsiyq/TGZ213/ShQJplA6sOg=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ggvaa@sweetshop-2aac1.iam.gserviceaccount.com",
    "client_id": "118147918374557346661",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ggvaa%40sweetshop-2aac1.iam.gserviceaccount.com"
}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sweetshop-2aac1-default-rtdb.firebaseio.com"
});

const bucket = admin.storage().bucket("gs://sweetshop-2aac1.appspot.com");


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
                        // res.send(urlData[0]);
                        console.log("===================>", urlData[0]);

                        res.send({
                            message: "Upload Successfully",
                            status: 200,
                            url: urlData[0]
                        });
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
    if (!req.body.productname || !req.body.price || !req.body.productimages || !req.body.activeStatus || !req.body.stock || !req.body.description) {
        res.send({
            message: "Please Fill All Product Info",
            status: 301
        });
    }
    userModel.findById(req.body.jToken.id, 'email role', function (err, user) {
        if (!err) {
            if (user.role === "admin") {
                // var admindata = new adminModel({
                //     "productname": req.body.productname,
                //     "email": user.email,
                //     "price": req.body.price,
                //     "productimages": req.body.productimages,
                //     "activeStatus": req.body.activeStatus,
                //     "stock": req.body.stock,
                //     "description": req.body.description
                // })
                // admindata.save((err, data) => {
                //     if (!err) {
                //         res.send({
                //             message: "Product Add",
                //             status: 200,
                //             data: data
                //         });
                //     }
                //     else {
                //         console.log(err);
                //         res.send({
                //             message: "User Create Error " + JSON.stringify(err),
                //             status: 500
                //         });
                //     }
                // });
                adminModel.create({
                    "productname": req.body.productname,
                    "email": user.email,
                    "price": req.body.price,
                    "productimages": req.body.productimages,
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
                            message: "Product Add",
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

app.get('/getProducts', (req, res, next) => {
    adminModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                products: data,
                status: 200
            })
        }
        else {
            res.send({
                message: err,
                status: 404
            })
        }
    })
})
app.post('/order', (req, res, next) => {
    if (!req.body.name || !req.body.phonenumber || !req.body.address || !req.body.orders || !req.body.totalPrice) {
        res.send({
            message: "Please Provide All Info",
            status: 300
        });
    }
    userModel.findById(req.body.jToken.id, 'email ', function (err, user) {
        console.log('latest body', user);
        if (!err) {
            order.create({
                "name": req.body.name,
                "email": user.email,
                "phonenumber": req.body.phonenumber,
                "status": "IS Review",
                "address": req.body.address,
                "orders": req.body.orders,
                "totalPrice": req.body.totalPrice
            }).then((data) => {
                res.send({
                    status: 200,
                    message: "Order Done",
                    data: data
                })
            }).catch((err) => {
                res.send({
                    status: 500,
                    message: "Order Err" + err
                })
            })
        } else {
            res.send({
                message: "Error" + err,
                status: 404
            })
        }

    })
})

app.get('/myorder', (req, res, next) => {

    userModel.findOne({ email: req.body.jToken.email }, (err, user) => {
        if (user) {
            order.find({ email: req.body.jToken.email }, (err, data) => {
                if (data) {
                    res.send({
                        data: data,
                        status: 200
                    })
                }
                else {
                    res.status(404).send(err)
                }
            })
        } else {
            res.send(err)
        }
    })
});
app.get('/getorder', (req, res, next) => {
    order.find({}, (err, data) => {
        if (!err) {
            res.send({
                data: data,
                status: 200
            });
        }
        else {
            res.send({
                message: 'error' + err,
                status: 404
            })
        }
    })
})

app.post('/updateStatus', (req, res, next) => {
    order.findById({ _id: req.body.id }, (err, data) => {
        if (data) {
            data.updateOne({ status: req.body.status }, (err, updatestatus) => {
                if (updatestatus) {
                    res.send({
                        message: "Status Update"
                    })
                } else {
                    res.send(err)
                }
            })
        } else {
            res.send({
                message: JSON.parse(err),
                status: 404
            })
        }
    })
})
app.post('/Ordercancel', (req, res, next) => {
    order.findById({ _id: req.body.id }, (err, data) => {
        if (data) {
            data.updateOne({ status: req.body.status }, (err, updatestatus) => {
                if (updatestatus) {
                    res.send({
                        message: "Order Cancel"
                    })
                } else {
                    res.send(err)
                }
            })
        } else {
            res.send({
                message: JSON.parse(err),
                status: 404
            })
        }
    })
})



server.listen(PORT, () => {
    console.log("Server is Running:", PORT);
});

