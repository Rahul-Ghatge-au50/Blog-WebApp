import React, { useContext, useEffect, useState } from 'react';
import './singlepost.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../Context/Context';

function SinglePost() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const PF = 'http://localhost:5000/images/'
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();


    console.log("uopdateMode ??",updateMode);
    useEffect(() => {
        try{
            console.log("id>>>",id)
            const getPost = async () => {
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                console.log('res::: ', res);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
            }
            getPost();
        }catch(error){
            console.error("Error in useEffect",error.message);
        }
    }, [id])


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
            window.location.replace('/')
        } catch (err) {
            console.error("Error in handleDelete :",err.message)
        }
    }

    const handleUpdate = async ( ) => {
        try{
            let updateStory = {
                username:user.username,
                title,
                desc
            }
            console.log("file >>>",file)
            if (file) {
                const data = new FormData();
                const fileName = Date.now() + file.name;
                data.append("name", fileName);
                data.append("file", file);
                updateStory.photo = fileName;
                try {
                    await axios.post('http://localhost:5000/api/upload/', data)
                } catch (error) {
                    console.error("Error in handleUpdate :",error.message);
                }
            }

            axios.put(`http://localhost:5000/api/posts/${post._id}`,updateStory);
            setUpdateMode(false);
            navigate('/');
        }catch(err){
            console.error("Error in handleUpdate :",err.message)
        }
    }

    return (
        <>
            {user ? (
                <div className='singlePost'>
                    <div className="singlePostWrapper">
                        {!updateMode && post.photo &&
                            <img src={PF + post.photo} alt="" className='singlePostImg' />
                        }
                        {updateMode ? (
                            <>
                                <label htmlFor="fileInput">
                                    <img src={file ? (URL.createObjectURL(file)) : (PF + post.photo)} alt="" className='singlePostImg'  />
                                </label>
                                {/* <label htmlFor="fileInput">
                                    <i className="settingPPIcon far fa-user-circle"></i>
                                </label> */}
                                <input
                                    type="file"
                                    id='fileInput'
                                    style={{ display: 'none' }}
                                    className='settingPPInput'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />

                                <input
                                    type='text'
                                    value={title}
                                    className='singlePostTitleInput'
                                    autoFocus
                                    onChange={(e) => setTitle(() => {
                                        if(e.target.value.length > 50){
                                            alert('Title is largr than 50 char')
                                            return e.target.value.substring(0,50);
                                        }
                                    })}
                                />
                            </>
                        ) : (
                            <h1 className='singlePostTitle'>
                                {title}
                                {
                                    post.username === user.username &&
                                    (<div className="singlePostEdit">
                                        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                        <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                    </div>)
                                }
                            </h1>
                        )
                        }
                        <div className="singlePostInfo">
                            <Link to={`/?user=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span>Author: <b className='singlePostAuthor'>{post.username}</b></span>
                            </Link>
                            <span>{new Date(post.createdAt).toDateString()}</span>
                        </div>
                        {
                            updateMode ? (
                                <textarea 
                                className='singlePostDescInput' 
                                cols="50"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)} />
                            ) : (
                                <p className='singlePostDesc'>{post.desc}</p>
                            )
                        }
                        {
                            updateMode && (
                                <button className='singlePostBtn' onClick={handleUpdate}>
                                    Update
                                </button> 
                            )
                        }
                    </div>
                </div>)
                : (<h1 style={{ color: 'red', fontSize: '30px', flex: '9', textAlign: 'center' }}>
                    User is not Logged
                </h1>)
            }
        </>
    )
}

export default SinglePost
