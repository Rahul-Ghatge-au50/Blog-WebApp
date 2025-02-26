import { useContext, useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import './setting.css';
// import Img from '../../Images/settingImg.jpeg';
import { Context } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Setting() {
    const { user,dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [desc,setDesc] = useState("");
    const [success,setSuccess] = useState(false);
    const navigate = useNavigate();

    const getSingleUser = async () => {
        try{
            const res = await axios.get(`https://blog-webapp-2qd6.onrender.com/api/user/getSingleUser/${user._id}`);

            if(res.status === 200){
                setEmail(res.data.others.email);
                setUsername(res.data.others.username);
                setDesc(res.data.others.desc)
            }else{
                alert(res.data.message);
            }
        }catch(error){
            console.error("Error in getSingleUser :",error.message);
        }
    }

    useEffect(() => {
        getSingleUser();
    },[]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updateUser = {
            userid: user._id,
            username, email, desc
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updateUser.profileImg = fileName;
            try {
                await axios.post('https://blog-webapp-2qd6.onrender.com/api/upload/', data)
            } catch (error) {
                console.error("Error in handleUpdate :",error.message);
            }
        }
        try {
            const res = await axios.put(`https://blog-webapp-2qd6.onrender.com/api/user/${user._id}`, updateUser );
            dispatch({type:"UPDATE_SUCCESS",payload:res.data.updatedUser});
            setSuccess(true);

            if(res.status === 200){
                alert(res.data.message);
                setEmail("");
                setUsername("");
                setDesc('');
            }
        } catch (err) { 
            dispatch({type:"UPDATE_FAILURE"});
        }
    };


    const handleDelete = async () => {
        try{

            const userValue = prompt("Are you sure to Delete!");
            console.log('userValue::: ', userValue);

            if(userValue === 'Yes' || userValue === 'yes'){
                const res = await axios.delete(`https://blog-webapp-2qd6.onrender.com/api/user/${user._id}`);
                if(res.status === 200){
                    dispatch({type:"LOGOUT"});
                    navigate('/register');
                }
            };
        }catch(error){
            console.error("Error in handleDelete",error.message);
        }
    }

    const PF = 'https://blog-webapp-2qd6.onrender.com/images/'

    return (
        <>
            <div className="setting">
                <div className="settingWrapper">
                    <div className="settingTitle">
                        <span className="settingTitleUpdate">Update your Account</span>
                        {/* <button style={{border:"none",backgroundColor:"white"}} > */}
                        <i class="fa-solid fa-trash" style={{color:"red",fontSize:'20px',cursor:"pointer"}} onClick={handleDelete} />
                        {/* </button> */}
                    </div>
                    <form onSubmit={handleUpdate} className="settingForm">
                        <label>Profile Picture</label>
                        <div className="settingPP">
                            {(user.profileImg || file) ? 
                                <img src={file ? (URL.createObjectURL(file)) : (PF + user.profileImg)} alt="" /> :
                                <i class="fa-regular fa-user"
                                            style={{
                                                fontSize:'40px',
                                                border:"5px solid black",
                                                padding:"15px",
                                                borderRadius:"50%"
                                                }}
                                        ></i>}
                            <label htmlFor="fileInput">
                                <i className="settingPPIcon far fa-user-circle"></i>
                            </label>
                            <input
                                type="file"
                                id='fileInput'
                                style={{ display: 'none' }}
                                className='settingPPInput'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <label>Username</label>
                        <input
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='Enter the mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label>About You</label>
                        <input
                            type='desc'
                            placeholder='Enter something about you'
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        {/* <label>Password</label> */}
                        {/* <input
                            type='password'
                            placeholder='*****'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required /> */}
                        <button className='settingButton' type='submit'>
                            Update
                        </button>
                        {   success && 
                            <h5 style={{color:'Blue',textAlign:'center',marginTop:'20px'}}>Profile is Updated...</h5>
                        }
                    </form>
                </div>
                <Sidebar />
            </div>
        </>
    )
}

