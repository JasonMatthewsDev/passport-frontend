import React, { useState } from 'react';

import './App.css';

import { AddFactory, Factory } from './components';

const { REACT_APP_SOCKET_URL } = process.env;
let webSocket = new WebSocket(REACT_APP_SOCKET_URL);

const App = () => {
  const [factories, setFactories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  //For the purposes of this demo the entire tree is rebuilt and sent on each change.
  webSocket.onmessage = ({ data }) => setFactories(JSON.parse(data).Factories);
  //If server disconnects, try to reconnect every 5 seconds
  webSocket.onclose = () => setTimeout(() => {
    webSocket = new WebSocket(REACT_APP_SOCKET_URL);
    webSocket.onmessage = ({ data }) => setFactories(JSON.parse(data).Factories);
  }, 5000);

  return (
    <>
      <ul className="tree-container">
        Root
        <div className="tree-root">
          {factories.map(({ _id, name, lowerBound, upperBound, nodes }) => (<Factory name={name} lowerBound={lowerBound} upperBound={upperBound} nodes={nodes} _id={_id} key={_id} />))}
        </div>
      </ul>
      <div className="add-factory-form">
        {
          showAddForm ?
            <AddFactory onSubmit={() => setShowAddForm(false)} /> :
            <button onClick={() => setShowAddForm(true)}>Create Factory</button>
        }
      </div>
    </>
  )
}

export default App;
