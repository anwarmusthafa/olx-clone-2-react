import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { FirebaseContext } from './Store/Context';
import { db, auth, storage } from './Firebase/config';

ReactDOM.render(
  <FirebaseContext.Provider value={{ db, auth, storage }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
