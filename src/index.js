const {render} = wp.element;
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
/*
if (document.getElementById('ultimate-quick-view-for-woocommerce-settings')) {
  render(<App/>, document.getElementById('ultimate-quick-view-for-woocommerce-settings'));
}
*/

/*ReactDOM.render(<App />, document.getElementById('ultimate-quick-view-for-woocommerce-settings'));*/
if (document.getElementById('ultimate-quick-view-for-woocommerce-settings')) {
  const container = document.getElementById('ultimate-quick-view-for-woocommerce-settings');
  const root = createRoot(container);
  root.render(<App />);
}