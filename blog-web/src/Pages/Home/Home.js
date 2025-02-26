import React, { useEffect, useState,useContext } from 'react'
import './home.css';
import Header from '../../Component/Header/Header';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Posts from '../../Component/Posts/Posts';
import axios from 'axios';
import { Context } from '../../Context/Context';

function Home() {
  const [post, setPost] = useState([]);
  const [title,seTtile] = useState('');
  const { user } = useContext(Context);

  const fetchPost = async () => {
    try{
      const res = await axios.get(`http://localhost:5000/api/posts/getAllPost/${user._id}`);
      setPost(res.data)
    }catch(error){
      console.error("Error in funtion fetchPost ::",error.message);
    }
  };

  const searchData = async () => {
    try{
      if(title){
        const res = await axios.get(`http://localhost:5000/api/posts/getSrotedSer/${title}`);
        setPost(res.data)
      }else{
        fetchPost();
      }
    }catch(error){
      console.error("Error in the searchData ",error.message);
    }
  }

  useEffect(() => {
    if(user) fetchPost();
  },[title]);


  return (
    <>
      <Header />
      <div className='searchBar'>
        <label htmlFor="input">
          <i className="topSearchIcon fa-solid fa-magnifying-glass" />
        </label>
        <input 
          type="text" 
          className='searchInput' 
          id="input" placeholder='Search By Name' 
          onChange={(e) => seTtile(e.target.value)} 
          onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          searchData();
                        }
                    }}
          />
      </div>
      <div className='home'>
        <Posts post={post} />
        <Sidebar />
      </div>
    </>
  )
}

export default Home
