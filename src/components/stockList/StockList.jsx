import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { useReactToPrint } from "react-to-print";

import "./Stock.css"

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    getStocks();
  }, []);
  const getStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/stocks");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const deleteStock = async (stockId) => {
    try {
      const userRole = "supervisor";
      if (userRole !== "supervisor") {
        console.log("Access Denied");
        return;
      }
      await axios.delete(`http://localhost:5000/stocks/${stockId}`);
      getStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const confirmDelete = (id) => {
    // Use the correct function name here
    confirmAlert({
      title: "Delete stock",
      message: "Are you sure you want to delete this stock?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteStock(id),
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
        <h1 className="title">Stock </h1>
        <h2 className="subtitle">List of Stocks</h2>
        <Link to="/stocks/add" className="button is-primary mb-2">
          Add New
        </Link>
        <table className="table1">
          <thead>
            <tr>
              <th>No.</th>
              <th>Stock Name</th>
              <th>Created At</th>
              <th>In</th>
              <th>Entry Date</th>
              <th>Out</th>
              <th>Exit Date</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={stock.uuid}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left",  padding: "4px" }}>{stock.stockName}</td>
                <td>{stock.date}</td>
                <td>{stock.d}</td>
                <td>{stock.entryDate}</td>
                <td>{stock.k}</td>
                <td>{stock.exitDate}</td>
                <td>{stock.inStock}</td>

                <td>{stock.description}</td>
                <td className="icons">
                  <span>
                    <Link
                      to={`/stocks/edit/${stock.uuid}`}
                      style={{ textDecoration: "none", color: "green" }}
                    >
                      <FaEdit size={22} />
                    </Link>
                  </span>
                  <span>
                    <FaTrashAlt
                      size={20}
                      color={"blue"}
                      onClick={() => confirmDelete(stock.uuid)}
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

export default StockList;
