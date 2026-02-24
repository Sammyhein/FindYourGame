import { useState, useEffect } from "react"
import AddGame from "../components/AddGame"
import ModDelGame from "../components/ModDelGame"

export default function Admin(){
    const [hiddenAdd, setHiddenAdd] = useState(true)
    const [hiddenModDel, setHiddenModDel] = useState(true)

    return(
    <>
    <h1 className="text-5xl mb-5">Bonjour Admin ! <br />Que voulez-vous faire ?</h1>
    <button className="border-purple-800 border-4 font-bold rounded-4xl mr-2" onClick={() => {
        setHiddenAdd(false)
        setHiddenModDel(true)
        }}>Ajouter un jeu</button>
    <button className="border-purple-800 border-4 font-bold rounded-4xl" onClick={() => {
        setHiddenAdd(true)
        setHiddenModDel(false)
        }}>Modifier ou Supprimer un jeu</button>
    <br/>
    <form className="mt-10" action="submit" hidden={hiddenAdd}>
        <AddGame />
    </form>
    <article className="mt-10" hidden={hiddenModDel}>
        <ModDelGame />
    </article>
    </>
    )
}