import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/addUser/AddUser";
import EditUser from "./pages/editUser/EditUser";
import AddProduct from "./pages/addProduct/AddProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import UserDetail from "./components/userDetail/UserDetail";
import ProductDetail from "./components/productDetail/ProductDetail";
import Stocks from "./pages/Stocks";
import AddStock from "./pages/addStock/AddStock";
import EditStock from "./pages/editStock/EditStock";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/user-detail/:uuid" element={<UserDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/product-detail/:uuid" element={<ProductDetail />} />
          <Route path="/stocks" element={<Stocks/>} />
          <Route path="/stocks/add" element={<AddStock/>} />
          <Route path="/stocks/edit/:id" element={<EditStock/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
