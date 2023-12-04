import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { useReactToPrint } from "react-to-print";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const userRole = "supervisor";
      if (userRole !== "supervisor") {
        console.log("Access Denied");
        return;
      }
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = (id) => {
    // Use the correct function name here
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div ref={componentRef}>
        <h1 className="title">Product </h1>
        <h2 className="subtitle">List of Products</h2>
        <Link to="/products/add" className="button is-primary mb-2">
          Add New
        </Link>
        <table className="table1">
          <thead>
            <tr>
              <th>No. </th>
              <th>Product Name </th>
              <th>Unit </th>
              <th>Qty</th>
              <th>Created by </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left", padding: "3px" }}>{product.name}</td>
                <td style={{ textAlign: "left", padding: "3px" }}>{product.unit}</td>
                <td style={{ textAlign: "right", padding: "3px" }}>{product.qty}</td>
                <td style={{ textAlign: "left", padding: "4px" }}>{product.user.name}</td>
                <td className="icons">
                  <span>
                    <Link to={`/product-detail/${product.uuid}`}>
                      <AiOutlineEye size={22} color={"black"} />
                    </Link>
                  </span>
                  <span>
                    <Link
                      to={`/products/edit/${product.uuid}`}
                      style={{ textDecoration: "none", color: "green" }}
                    >
                      <FaEdit size={22} />
                    </Link>
                  </span>
                  <span>
                    <FaTrashAlt
                      size={20}
                      color={"blue"}
                      onClick={() => confirmDelete(product.uuid)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr/>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default ProductList;
