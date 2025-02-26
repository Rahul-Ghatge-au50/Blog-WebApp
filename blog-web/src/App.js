
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider } from 'react-router-dom';
import Topbar from './Component/TopBar/Topbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Setting from './Pages/Setting/Setting';
import Single from './Pages/Single/Single'
import Write from './Pages/Write/Write';
import { useContext } from 'react';
import { Context } from './Context/Context';




// function App() {

//   const {user} = useContext(Context);
  
//   const routers = createBrowserRouter(

//     createRoutesFromElements(
//       <Route path='/' element={<Register />}>
//         <Route index element={<Home />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/setting' element={<Setting />} />
//         <Route path='/write' element={<Write />} />
//         {/* <Route>
//         {user ? (<Route path='/write' element={<Write/>} />) : (<Route path='/register' element={<Register/>} />)}
//         </Route> */}
//         <Route path='/login' element={<Login />} />
//         {/* {user ? (<Route index element={<Home/>}/>) : (<Route path='/login' element={<Login/>} />) } */}
//         <Route path='/login'>
//         {user ? <Route index element={<Home/>} /> : <Route path='/login' element={<Login/>} />}
//         </Route>
//         <Route path='/post/:id' element={<Single />} />
//       </Route>
//     )
//   )
  

//   return (
//     <RouterProvider router={routers} />
//   );
// }


function App() {
  const { user } = useContext(Context);

  const routers = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Redirect to Register if user is not logged in */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/setting" element={user ? <Setting /> : <Navigate to="/login" />} />
        <Route path="/write" element={user ? <Write /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={<Single />} />
      </>
    )
  );

  return <RouterProvider router={routers} />;
}

export default App;
