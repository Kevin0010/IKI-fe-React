import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FromEditStock = () => {
  const [stockName, setStockName] = useState("");
  const [d, setD] = useState("");
  const [k, setK] = useState("");
  const [inStock, setInStock] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState(""); // Fix: Use setExitDate instead of setexitDate
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getStocksById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stocks/${id}`);
        setStockName(response.data.stockName);
        setD(response.data.d);
        setK(response.data.k);
        setInStock(response.data.inStock);
        setDate(response.data.date);
        setDescription(response.data.description);
        setEntryDate(response.data.entryDate);
        setExitDate(response.data.exitDate);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getStocksById();
  }, [id]);
  const updateStock = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/stocks/${id}`, {
        stockName: stockName,
        d: d,
        k: k,
        inStock: inStock,
        date: date,
        description: description,
        entryDate: entryDate,
        exitDate: exitDate,
      });
      navigate("/stocks");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container mt-6">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <h1 className="title is-3 has-text-centered">Edit Stock</h1>
              <form onSubmit={updateStock}>
                <p className="has-text-centered has-text-danger">{msg}</p>
                <div className="field">
                  <label className="label">Stock Name:</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={stockName}
                      onChange={(e) => setStockName(e.target.value)}
                      placeholder="Stock Name"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">In:</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={d}
                      onChange={(e) => setD(e.target.value)}
                      placeholder="..."
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Out:</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={k}
                      onChange={(e) => setK(e.target.value)}
                      placeholder="..."
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">In Stock:</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={inStock}
                      onChange={(e) => setInStock(e.target.value)}
                      placeholder="..."
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Created At:</label>
                  <div className="control">
                    <input
                      type="date"
                      className="input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Create Stock Date"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Stock Entry Date:</label>
                  <div className="control">
                    <input
                      type="date"
                      className="input"
                      value={entryDate}
                      onChange={(e) => setEntryDate(e.target.value)}
                      placeholder="Entry Date"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Stock Exit Date:</label>
                  <div className="control">
                    <input
                      type="date"
                      className="input"
                      value={exitDate}
                      onChange={(e) => setExitDate(e.target.value)}
                      placeholder="Exit Date"
                    />
                  </div>
                </div>
                {/* Include other fields as needed */}
                <div className="field">
                  <label className="label">Description:</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-success">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromEditStock;
