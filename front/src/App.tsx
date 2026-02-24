//import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  

  return (
    <>
     <h1 className='text-7xl'>FIND YOUR GAME</h1>
     <Link to={"/questions"}>
     <button className="border-2 border-purple-600 font-bold rounded-4xl mt-5 mr-5">Appuyez ici pour commencer</button>
     </Link>
    </>
  )
}

export default App
