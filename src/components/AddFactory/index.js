import React, { useEffect, useRef } from 'react';
import { useAlert } from 'react-alert';

import './index.css';

const { REACT_APP_API_ORIGIN = '' } = process.env;

const AddFactory = ({ onSubmit }) => {
  const nameInputRef = useRef(null);
  const alert = useAlert()

  useEffect(() => nameInputRef.current.focus(), []);

  //Send request to create a new factory
  const submitHandler = async e => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      lowerBound: e.target.lowerBound.value,
      upperBound: e.target.upperBound.value,
      itemCount: e.target.itemCount.value,
    };

    onSubmit();

    const res = await fetch(`${REACT_APP_API_ORIGIN}/factory`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 201) {
      const { error } = await res.json();
      alert.error(error);
    } else {
      alert.success('Factory Created');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="add-factory-container">
        <div className="add-factory-control">
          <label>Name <span className="required">*</span></label>
          <input type="text" name="name" placeholder="Name..." pattern="[a-zA-Z0-9 -]+" ref={nameInputRef} required />
        </div>
        <div className="add-factory-control">
          <label>Item Count <span className="required">*</span></label>
          <input type="number" name="itemCount" placeholder="Item Count..." defaultValue="3" min="1" max="15" required />
        </div>
        <div className="add-factory-control">
          <label>Lower Bound <span className="required">*</span></label>
          <input type="number" name="lowerBound" defaultValue="1" placeholder="Lower Bound..." required />
        </div>
        <div className="add-factory-control">
          <label>Upper Bound <span className="required">*</span></label>
          <input type="number" name="upperBound" defaultValue="500" placeholder="Upper Bound..." required />
        </div>
        <button type="submit">Add Factory</button>
      </div>
    </form>
  )
};

export default AddFactory;