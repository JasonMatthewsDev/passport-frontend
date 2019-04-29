import React, { useState } from 'react';
import { useAlert } from 'react-alert';

import './index.css';

import { ClickInput } from '..';

const { REACT_APP_API_ORIGIN = '' } = process.env;

const Factory = factory => {
  const [deleteEnabled, setDeleteEnabled] = useState(true);
  const alert = useAlert()

  const { _id, lowerBound, name, nodes, upperBound } = factory;
  const nameRegexStr = '^[a-zA-Z0-9 -]+$';
  const nameRegex = new RegExp(nameRegexStr);

  const updateFactory = async change => {
    const body = JSON.stringify({
      _id,
      change
    });

    const res = await fetch(`${REACT_APP_API_ORIGIN}/factory`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  
    if (res.status !== 202) {
      const { error } = await res.json();
      alert.error(error);
    } else {
      alert.success('Factory Updated');
    }
  };

  const changeHandler = (field, val) => {
    if (field === 'name' && !nameRegex.test(val)) {
      return;
    }

    updateFactory({ [field]: val });
  };

  const deleteHandler = async () => {
    setDeleteEnabled(false);
  
    const res = await fetch(`${REACT_APP_API_ORIGIN}/factory`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
  
    if (res.status !== 202) {
      const { error } = await res.json();
      alert.error(error);
    } else {
      alert.success('Factory Deleted');
    }
  };

  return (
    <li className="container">
      <div className="factory-inputs-p">
        <span className="factory-name">
          <ClickInput value={name} onChange={v => changeHandler('name', v)} pattern="[a-zA-Z0-9 -]+" title="Letters, numbers, spaces and - only" />
        </span>
        {
          deleteEnabled ?
            <button className="factory-delete-button" onClick={deleteHandler}>
              <span role="img" aria-label="delete">❌</span>
            </button> :
            <span>&nbsp;</span>
        }
        <span className="factory-lower-bound">
          <ClickInput value={lowerBound} type="number" onChange={v => changeHandler('lowerBound', v)} />
        </span>
        <span className="factory-upper-bound">
          <ClickInput value={upperBound} type="number" onChange={v => changeHandler('upperBound', v)} />
        </span>
      </div>
      <ul>
        {nodes.map((n, i) => <li key={i}><div>{n}</div></li>)}
      </ul>
    </li>
  )
};

export default Factory;