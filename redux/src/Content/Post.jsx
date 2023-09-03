import React from 'react'

function Post() {
    const test = ()=>{
        console.log("kannan");
    }
  return (
    <div>
        <h1>Post </h1>
       <button onClick={()=> test}>click</button>
    </div>
  )
}

export default Post