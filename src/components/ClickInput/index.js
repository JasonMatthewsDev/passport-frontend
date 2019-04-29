import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const Input = ({ cancel, onChange, pattern, title, value, type = 'text' }) => {
  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);
  const keyDownHandler = ({ key }) => {
    if (key === 'Escape') {
      cancel();
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    onChange(inputRef.current.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <span className="click-input-wrapper">
        <input className="click-input-text" type={type} onKeyDown={keyDownHandler} ref={inputRef} defaultValue={value} pattern={pattern} title={title} />
        <button type="submit" className="click-input-button">
          <span role="img" aria-label="confirm">✔️</span>
        </button>
        <button className="click-input-button" onClick={cancel}>
          <span role="img" aria-label="cancel">❌</span>
        </button>
      </span>
    </form>
  )
}

const ClickInput = ({ value, onChange, pattern, title, type }) => {
  const [edit, setEdit] = useState(false);

  const Label = <span className="click-input-label" onClick={() => setEdit(true)}>{value}</span>;
  const changeHandler = v => {
    setEdit(false);
    onChange(v)
  }
  return (
    edit ? <Input value={value} cancel={() => setEdit(false)} onChange={changeHandler} type={type} pattern={pattern} title={title} /> : Label
  )
}

export default ClickInput;