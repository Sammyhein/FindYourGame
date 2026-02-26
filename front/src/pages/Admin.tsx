import { useState } from "react"
import AddGame from "../components/AddGame"
import ModDelGame from "../components/ModDelGame"
import { Link } from "react-router-dom"

export default function Admin(){
    const [hiddenAdd, setHiddenAdd] = useState(true)
    const [hiddenModDel, setHiddenModDel] = useState(true)

    return(
    <>
    <h1 className="text-5xl mb-5">Bonjour Admin ! <br />Que voulez-vous faire ?</h1>
    <button className="border-purple-800 border-4 font-bold rounded-4xl mr-2" onClick={() => {
        if(hiddenAdd=== true){
            setHiddenAdd(false)
            setHiddenModDel(true)
        }else if(hiddenAdd === false){
            setHiddenAdd(true)
        }
        }}>Ajouter un jeu</button>
    <button className="border-purple-800 border-4 font-bold rounded-4xl" onClick={() => {
        if(hiddenModDel===true){
            setHiddenAdd(true)
            setHiddenModDel(false)
        }else if(hiddenModDel===false){
            setHiddenModDel(true)
        }
        }}>Modifier ou Supprimer un jeu</button>
    <Link to={"/"}>
    <button className="border-purple-800 border-4 font-bold rounded-4xl">Retourner à la première page</button>
    </Link>
    <br/>
    <form className="mt-10 text-left" action="submit" hidden={hiddenAdd}>
        <AddGame />
    </form>
    <section hidden={hiddenModDel}>
        <ModDelGame />
    </section>
    </>
    )
}