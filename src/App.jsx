import React from "react"
import { BrowserRouter } from "react-router-dom"
import AppRouters from "./routes/AppRouters"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'

function App() {
  

  return <>

      <BrowserRouter>
        <AppRouters/>
      </BrowserRouter>
    </>
  
}

export default App
