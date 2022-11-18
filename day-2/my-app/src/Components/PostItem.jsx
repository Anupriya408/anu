import React from "react";


 function PostItem({id,title, body}) {
    return (
        <div style={{border: "2px solid blue", margin: "4px", color: "green"}}>
        <h2>{id}</h2>
        <h4>{title}</h4>
        <p>{body}</p>
        </div>
    );
 };

 export default PostItem;