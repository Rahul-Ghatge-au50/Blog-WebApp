import { useContext, useState } from 'react';
import './write.css';
import { Context } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Write() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            user_id:user._id,
            title,
            desc,
        };

        !file ?? alert('Image is required')

        if (file) {
            //Creating a new FormData object to store key value pair
            const data = new FormData();

            //Line no 24 means so tht the user cant upload same image with diff name and vice versa
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('https://blog-webapp-2qd6.onrender.com/api/upload', data)
            } catch ( err) {
            }
        }
        try {
            const res = await axios.post('https://blog-webapp-2qd6.onrender.com/api/posts/', newPost);
            //console.log(res);
            // window.location.replace('/post/' + res.data._id);
            navigate('/post/')
        } catch (err) {
            console.err('Error in the handleSubmit',err.message);
        }
    }

    return (
        <>{user ? (
            <div className="write">
                {file &&
                    <img src={URL.createObjectURL(file)}
                        alt="" className='writeImg' />
                }
                <form onSubmit={handleSubmit} className='writeForm'>
                    <div className="writeFormGrp">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fa-solid fa-plus"></i>
                        </label>
                        <input
                            id='fileInput'
                            type="file"
                            style={{ display: 'none' }}
                            onChange={e => setFile(e.target.files[0])}
                            required
                        />
                        <input
                            type="text"
                            className='writeInput'
                            placeholder='Title'
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="writeFormGrp">
                        <textarea type='text'
                            placeholder='Tell your story...'
                            className='writeInput writeText'
                            autoFocus={true}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    <button className='writeSubmit' type='submit'>
                        Publish
                    </button>
                </form>
            </div>): (
                window.location.replace('/login')
            )
        }
        </>
    )
}

export default Write;