
import Sidebar from '../../Component/Sidebar/Sidebar';
import SinglePost from '../../Component/SinglePost/SinglePost';
import './single.css';

function Single() {
    return (
        <>
            <div className='single'>
                <SinglePost/>
                <Sidebar />
            </div>

        </>
    )
}

export default Single;