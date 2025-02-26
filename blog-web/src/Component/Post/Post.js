import React from 'react'
import './post.css';
import { Link } from 'react-router-dom';

function Post({post}) {

  // const PF = 'http://localhost:5000/images/';
  const PF = 'https://blog-webapp-2qd6.onrender.com/images/'

  return (
    <>
        <div className='post'>
          {post.photo && <img src={PF + post.photo} 
                 alt="" 
                 className='postImg' />}
            
            <div className="postInfo">
                <div className="postCats">
                {post.categories.map((c,index) => {
                  return <span key={index} className="postCat">{c.name}</span>
                })}  
                </div>
                <Link to={`/post/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                  <span className="postTitle">{post.title}</span>
                </Link>
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
              <p className='postDesc'>{post.desc}</p>
        </div>
    </>
  )
}

export default Post
