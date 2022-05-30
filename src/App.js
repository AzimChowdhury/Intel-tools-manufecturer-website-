import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Home/Navbar";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Footer from './Home/Footer';
import Purchase from "./Purchase/Purchase";
import RequireAuth from '../src/Shared/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard/Dashboard";
import MyProfile from "./Dashboard/MyProfile";
import MyOrders from "./Dashboard/MyOrders";
import AddReview from "./Dashboard/AddReview";
import MyPortfolio from "./MyPortfolio/MyPortfolio";
import NotFound from "./Shared/NotFound";
import AllUsers from "./Dashboard/AllUsers";
import AddProduct from "./Dashboard/AddProduct";
import AllOrders from "./Dashboard/AllOrders";
import RequireAdmin from "./Shared/RequireAdmin";

import ManageProducts from "./Dashboard/ManageProducts";
import Payment from "./Dashboard/Payment";


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register />}></Route>


        {/* nested route for dashboard */}
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="myOrder" element={<MyOrders></MyOrders>}></Route>
          <Route path="addReview" element={<AddReview></AddReview>}></Route>
          <Route path="payment/:id" element={<Payment></Payment>}></Route>
          <Route path="users" element={<RequireAdmin><AllUsers></AllUsers></RequireAdmin>}></Route>
          <Route path="addProduct" element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path="orders" element={<RequireAdmin><AllOrders></AllOrders></RequireAdmin>}></Route>
          <Route path="manageProducts" element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>
        </Route>


        <Route path='/purchase/:id' element={<RequireAuth><Purchase></Purchase></RequireAuth>}></Route>
        <Route path='/portfolio' element={<MyPortfolio />}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
