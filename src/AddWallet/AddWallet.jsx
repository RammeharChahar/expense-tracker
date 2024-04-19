import React, { useState } from 'react';
import "./AddWallet.css"

const AddWallet = ({walletBalance,setWalletBalance,closeModel}) => {

 const [addBalance,setAddBalance] = useState();

  const handleInputChange = (e) => {
    setAddBalance(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWalletBalance(walletBalance+parseInt(addBalance));
  };

  return (
    <div>
       <h1 className="modal_heading_1">Add Balance</h1>
      <form onSubmit={handleSubmit}>
         <div className="inputs_top">
          <input
            type="number"
            name="income"
            value={addBalance}
            onChange={handleInputChange}
            className="input_modal_1"
            placeholder="Income Amount"
            required
          />
          <button type="submit" className='add_btn_1'>Add Balance</button>
         <button className='cancel_btn' onClick={closeModel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddWallet;
