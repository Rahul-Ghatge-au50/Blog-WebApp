import './App.css';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Route, 
  Navigate 
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './Context/Context';

// Components
import Topbar from './Component/TopBar/Topbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Setting from './Pages/Setting/Setting';
import Single from './Pages/Single/Single';
import Write from './Pages/Write/Write';

function App() {
  const { user } = useContext(Context);

  const routers = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={
          <>
            <Topbar />
            {user ? <Home /> : <Navigate to="/register" />}
          </>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/setting" element={user ? <Setting /> : <Navigate to="/login" />} />
        <Route path="/write" element={user ? <Write /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={
          <>
            <Topbar />
            <Single />
          </>
        } />
      </>
    )
  );

  return <RouterProvider router={routers} />;
}

export default App;
