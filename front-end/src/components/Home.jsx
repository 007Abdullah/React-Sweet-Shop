import { useState, useEffect } from 'react';
import axios from 'axios';
// const url = 'http://localhost:5000'
function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/profile`)
            .then(res => {
                console.log(res);
                setData(res)
            });

    }, [])

    return (
        <>
            <h1>Home</h1>
            {data.map(post => (

                <div className="checks" key={post.id}>
                    <h1>{post.name}</h1>
                </div>
            ))
            }

        </>
    )
}

export default Home;