import { useState } from "react"
import { Link } from "react-router-dom"

export default function Password(){
    const [inputA, setInputA] = useState("")
    const [inputP, setInputP] = useState("")
    const password = inputP === "0000" && inputA ==="admin@findyourgame.com"

    return(
    <form onSubmit={(e) => e.preventDefault()}>
    <h1 className="mb-4">Please enter email and password</h1>
    <input  className="border-2 rounded-2xl p-3" type="text" placeholder="Email" onChange={(e) => {setInputA(e.target.value)}}/>
    <input  className="border-2 rounded-2xl p-3" type="password" placeholder="Password" onChange={(e) => {setInputP(e.target.value)}}/>
    <Link to="/results">
    <button disabled={!password}>Confirm</button>
    </Link>
    </form>
    )
}