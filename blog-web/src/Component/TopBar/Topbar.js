import React from 'react'
import './topbar.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { useContext } from 'react';


function Topbar() {
    const {user,dispatch} = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch({type:"LOGOUT"});
        // window.location.replace('/login');
        navigate('/login');
    }

    const PF = 'https://blog-webapp-2qd6.onrender.com/images/';

    return (
        <>
            <div className='top'>
                <div className="topLeft">
                    {/* <i className="topIcon fa-brands fa-square-facebook" />
                    <i className="topIcon fa-brands fa-square-instagram" />
                    <i className="topIcon fa-brands fa-square-twitter" />
                    <i className="topIcon fa-brands fa-pinterest" /> */}
                    BLOG APP
                </div>
                <div className="topCenter">
                    <ul className="topList">
                        {user ? 
                        <>
                            <Link to='/' style={{ textDecoration: 'none', color: 'gray' }}>
                                <li className="ListItem">Home</li>
                            </Link>
                            <Link to='/write' style={{ textDecoration: 'none', color: 'gray' }}>
                                <li className="ListItem">Write</li>
                            </Link>
                        </>
                        : ''}
                        {/* <Link to='/' style={{ textDecoration: 'none', color: 'gray' }}>
                            <li className="ListItem">Contact</li>
                        </Link> */}
                        {user ? <li className="ListItem" onClick={handleLogout}>Logout</li> : ""}
                    </ul>
                </div>
                <div className="topRight">
                    {
                        user ? (
                            <>
                                <Link to='/setting' style={{textDecoration:'none',color:'inherit'}}>
                                    {
                                        user.profileImg ?   
                                        <img src={PF + user.profileImg}
                                        alt=""
                                        className='topImg' />
                                        :
                                        <i class="fa-regular fa-user"
                                            style={{
                                                fontSize:'20px',
                                                border:"3px solid black",
                                                padding:"8px",
                                                borderRadius:"60%"
                                                }}
                                        ></i>
                                    }
                                </Link>
                            </>
                        ) : (
                            <>
                                <ul className='topList'>
                                    <Link to='/login' style={{ textDecoration: 'none', color: 'gray' }}>
                                        <li className='ListItem'>LOGIN</li>
                                    </Link>
                                    <Link to='/register' style={{ textDecoration: 'none', color: 'gray' }}>
                                        <li className='ListItem'>REGISTER</li>
                                    </Link>
                                </ul>
                            </>
                        )
                    }
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Topbar
