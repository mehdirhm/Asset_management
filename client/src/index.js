import React from 'react';

import ReactDOM  from 'react-dom/client';
// import { render } from "react-dom";
import reportWebVitals from './reportWebVitals';


// import './fonts/Iranian-Sans.ttf';
import Main from "./main"
import './index.css';




const rootElement = ReactDOM.createRoot(document.getElementById("root")) 
rootElement.render(<Main/>);
// render(
//  <Main/>,
//   rootElement
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
