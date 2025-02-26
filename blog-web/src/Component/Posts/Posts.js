import React from 'react';
import './posts.css';
import Post from '../Post/Post';


function Posts({post}) {
    return (
        <>
            <div className='posts'>
                {post.map((p)=> {
                   return <Post post={p}/>
                })}
            </div>
        </>

    )
}

export default Posts
