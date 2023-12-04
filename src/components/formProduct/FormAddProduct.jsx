import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FromAddProduct = () => {
  const [name, setName] = useState("");
  const [specification, setSpecification] = useState("");
  const [unit, setUnit] = useState("");
  const [qty, setQty] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const saveProduct = async (e) => {
    e.preventDefault();
    if (!name || !unit || !qty) {
      setMsg("Name, Unit, and Quantity are required.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/products", {
        name: name,
        specification: specification,
        unit: unit,
        qty: qty,
        group: group,
        status: status,
        date: date,
        
        description: description,
        // price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("An error occurred while saving the product.");
      }
    }
  };

  return (
    <div className="container mt-6">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <h1 className="title is-3 has-text-centered">Add New Product</h1>
              <form onSubmit={saveProduct}>
                <p className="has-text-centered has-text-danger">{msg}</p>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Product Name"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Specification</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={specification}
                      onChange={(e) => setSpecification(e.target.value)}
                      placeholder="Product Specification"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Unit</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Product Unit"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Quantity</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="Product Quantity"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Group</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      placeholder="Product Group"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Status</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="D">D</option>
                        <option value="K">K</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Created At</label>
                  <div className="control">
                    <input
                      type="date"
                      className="input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Create Product Date"
                    />
                  </div>
                </div>
                
                <div className="field">
                  <label className="label">Description</label>
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
                      Save
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

export default FromAddProduct;
