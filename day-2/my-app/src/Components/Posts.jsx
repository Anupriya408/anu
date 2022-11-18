import { useState, useEffect } from "react";
import PostItem from "./PostItem";

const getData = (page) =>{
    return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`).then(
        (res)=>{
            return res.json();
        }
    );
};
function Posts(){
    const[posts,setPosts] = useState([]);
    const[loading, setLoading]= useState(false);

    const [page,setPage]= useState(1);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        fetchAndupdate(page);
    }, [page]);

    const fetchAndupdate= async (page) => {
     try{
        setLoading(true);
        let data = await getData(page);
        setLoading(false);
        setPosts(data);
     }catch (error) {
        console.log(error);
        setLoading(false);
     }
    };
    const handlePageChange = (changeBy) =>{
        setPage(page + changeBy);
    };

    if(loading){
        return <h1>Loading...</h1>
    }
    return (
        <div>
        <h1>Count : {count}</h1>
        <button onClick={()=> setCount(count+1)}>CLICK</button>
        <h1>TODO POSTS</h1>
        <div>
        {posts.map((post) => (
            <PostItem key={post.id} {...post} />
        ))}
        </div>
        <button disabled={page === 1} onClick={()=> handlePageChange(-1)}>
        PREV</button>
        <button>{page}</button>
        <button onClick={()=> handlePageChange(1)}>NEXT</button>
        </div>
    );
        }

export default Posts;