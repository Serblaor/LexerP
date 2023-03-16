import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Cryptocontext from './Cryptocontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <React.StrictMode>
     <BrowserRouter>
     <Cryptocontext>
      <App />
      </Cryptocontext>
    </BrowserRouter>
  </React.StrictMode>
);


