import React, { useState } from 'react';
import "./ExpenseForm.css";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const ExpenseForm = ({setWalletBalance,walletBalance,closeModel,setFormData}) => {
  const [data,setData] = useState({
      title: '',
      price: '',
      category: '',
      date: ''
    })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(walletBalance>parseInt(data.price)){
      setWalletBalance(walletBalance-parseInt(data.price));
      setFormData(data);
      enqueueSnackbar('Your Expense added successfully!')
      setData({
        title: '',
        price: '',
        category: '',
        date: ''
      });
    }else{
      enqueueSnackbar('Your Wallet Balance is low!')
    }
  };

  return (
    <div>
       <SnackbarProvider />
       <h1 className="modal_heading">Add Expenses</h1>
      <form onSubmit={handleSubmit}>
         <div className="inputs_top">
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="input_modal"
            placeholder="Title"
            required
          />
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleInputChange}
            className="input_modal"
            placeholder="Price"
            required
          />
        </div>
         <div className="inputs_bottom">
          <select
            name="category"
            value={data.category}
            onChange={handleInputChange}
            className="input_modal"
            required
          >
            <option value="">Select Category</option>
            <option value="Movie">Movie</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleInputChange}
            className="input_modal"
            placeholder="dd/mm/yy"
            required
          />
        </div>
        <div className="btn_group">
          <button type="submit" className='add_btn'>Add Expense</button>
         <button className='cancel_btn' onClick={closeModel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
