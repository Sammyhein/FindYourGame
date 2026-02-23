//import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  

  return (
    <>
     <h1 className='text-7xl'>FIND YOUR GAME</h1>
     <Link to={"/questions"}>
     <button>Appuyez ici pour commencer</button>
     </Link>
    </>
  )
}

export default App
