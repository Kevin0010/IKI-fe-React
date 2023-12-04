import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductModel.css"; // Import CSS
import { RiArrowGoBackLine } from "react-icons/ri";
//import { useReactToPrint } from "react-to-print";

const ProductDetail = () => {
  const { uuid } = useParams();
  const [product, setProduct] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${uuid}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [uuid]);

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <div>
      <div ref={componentRef} className="card product-detail">
        <div className="card-content product-detail-content">
          <h1 className="title is-4">Product Detail</h1>

          {product ? (
            <div>
              <div className="content product-info">
                <p className="subtitle is-6">
                  <strong>Name:</strong> {product.name}
                </p>
                <p className="subtitle is-6">
                  <strong>Specification:</strong> {product.specification}
                </p>
                <p className="subtitle is-6">
                  <strong>Unit:</strong> {product.unit}
                </p>
                <p className="subtitle is-6">
                  <strong>Quantity:</strong> {product.qty}
                </p>
                <p className="subtitle is-6">
                  <strong>Group:</strong> {product.group}
                </p>
                <p className="subtitle is-6">
                  <strong>Status:</strong> {product.status}
                </p>
                <p className="subtitle is-6">
                  <strong>Created At:</strong> {product.date}
                </p>
              </div>
            </div>
          ) : (
            <p className="loading-message">Loading...</p>
          )}
          <Link to="/products" className="goBackLink">
            <RiArrowGoBackLine className="goBackIcon" />
            Go Back
          </Link>
        </div>
      </div>
      {/* <button onClick={handlePrint}>Print</button> */}
    </div>
  );
};

export default ProductDetail;
