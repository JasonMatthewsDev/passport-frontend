import React, { useState } from 'react';

import './App.css';

import { AddFactory, Factory } from './components';

const WS_HOST = window.location.origin.replace(/^http/, 'ws');
let webSocket = new WebSocket(WS_HOST);

const App = () => {
  const [factories, setFactories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  //For the purposes of this demo the entire tree is rebuilt and sent on each change.
  webSocket.onmessage = ({ data }) => setFactories(JSON.parse(data).Factories);
  //If server disconnects, try to reconnect after 5 seconds. This is mostly for development
  //A more robust solution that retries more than once is probably a good idea for a real production app.
  webSocket.onclose = () => setTimeout(() => {
    webSocket = new WebSocket(WS_HOST);
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
