import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Home/Navbar";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Footer from './Home/Footer';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
