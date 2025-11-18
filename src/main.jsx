import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Welcome from './components/Welcome'
import Cake from './components/Cake'
import About from './components/About'
import Memories from './components/Memories'
import Final from './components/Final'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Welcome />} />
          <Route path="cake" element={<Cake />} />
          <Route path="about" element={<About />} />
          <Route path="memories" element={<Memories />} />
          <Route path="final" element={<Final />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
