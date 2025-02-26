import React, { useContext,useEffect, useState } from 'react'
import './sidebar.css';
//import axios from 'axios';
import { Context } from '../../Context/Context';
//import { Link } from 'react-router-dom';
import img from '../../Images/profile-image.jpg';
import axios from 'axios';


function Sidebar() {
    // const [cats, setCats] = useState([]);
    const {user} = useContext(Context);
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');


    const getSingle = async () => {
        try{
            const res  = await axios.get(`http://localhost:5000/api/user/getSingleUser/${user._id}`)
            setName(res.data.others.username);
            setDesc(res.data.others.desc)
        }catch(error){
            console.error("Error in getSingle :",error.message);
        }
    }

    useEffect(() => {
        // const getCat = async () => {
        //     const res = await axios.get('http://localhost:5000/api/category/');
        //     setCats(res.data);
        // }
        // getCat();
        if(user._id) getSingle();
    }, [])

    const PF = 'http://localhost:5000/images/'

    return (
        <>
            <div className='sidebar'>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>ABOUT ME</span>
                    {user ? (<img src={PF + user.profileImg}
                        alt=""
                        className='sidebarImg' />) :
                        (<img src={img}
                        alt=""
                        className='sidebarImg' />)}
                    <span className='sidebarName'>{name}</span>
                    <div>
                    <p className='sidebarDesc' >{desc ? desc : ''}</p>
                    </div>
                </div>
                <div className="sidebarItem">
                    {/* <span className='sidebarTitle'>CATEGORIES</span>
                    <ul className='sidebarList'>
                        {
                            cats.map((item) => (
                                <Link to={`/?cat=${item.name}`} style={{textDecoration:'none',color:'inherit'}}>
                                    <li className='sidebarListItem'>{item.name}</li>
                                </Link>
                            ))
                        }
                    </ul> */}
                </div>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>FOLLOW US</span>
                    <div className="sidebarSocial">
                        <i className="sidebarIcon fa-brands fa-square-facebook" />
                        <i className="sidebarIcon fa-brands fa-square-instagram" />
                        <i className="sidebarIcon fa-brands fa-square-twitter" />
                        <i className="sidebarIcon fa-brands fa-pinterest" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Sidebar
