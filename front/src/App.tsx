//import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  

  return (
    <>
     <h1>FIND YOUR GAME</h1>
     <Link to={"/questions"}>
     <button>START</button>
     </Link>
    </>
  )
}

export default App
