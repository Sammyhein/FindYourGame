import { useLocation } from "react-router-dom"
import type { dataStateResults } from "../interfaces/interface"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Results(){
    const [data, setData] = useState<dataStateResults[] | null>(null)
    const [loading, setLoading] = useState(true)

    //Je récupère mes réponses des questions grâce à useLocation
    const location = useLocation()
    const reponsesList = location.state
    //console.log(reponsesList)

    useEffect(() => {
         async function getData() {
            try{
                const res = await fetch("http://localhost:4242/games");
                setData(await res.json())
            }catch(error){
                console.error("L'API n'a pas pu s'afficher")
            }finally{
                setLoading(false)
            }     
        } getData()
    },[])

    if(loading)return <h1>Loading...</h1>

    console.log(data);

    const gamesFilter = data?.filter(game =>{
        return(
        reponsesList.parental_guidance >= game.parental_guidance && 
        (reponsesList.free_to_play === "null" || game.free_to_play === (reponsesList.free_to_play === "true")) &&
        (reponsesList.platforms === "null" || game.platforms.includes(reponsesList.platforms)) &&
        (reponsesList.category === "null" || game.category.includes(reponsesList.category)) && 
        (reponsesList.online === "null" || game.online === (reponsesList.online==="true")) &&
        (reponsesList.multiplayer === "null" || game.multiplayer === (reponsesList.multiplayer === "true"))
        )
    })

return(
    <>
    <h1>Voici le/les jeu(x) que nous vous conseillons selon vos critères !</h1>
    <article className="flex flex-wrap gap-4 place-content-center-safe">
    {gamesFilter?.map((game)=>{
        const gameId = game.id
        return(
        <article key={game.id} className="bg-gray-900 rounded-4xl mb-5 relative max-w-xl">
            <section className="mb-2">
                <section className="absolute right-5 top-3 flex gap-3">
                    {game.free_to_play === true && (<p className=" bg-green-400 rounded-3xl p-2 font-bold border-3 border-white text-[12px]">Gratuit</p>)}
                    <p className=" bg-purple-800 rounded-3xl font-bold p-2 border-3 border-white text-[12px]">{game.company_name}</p>
                </section>
                <img src={game.image_url} alt={game.name} className="place-self-center-safe rounded-t-4xl"/>
                <h2 className="uppercase text-[2rem] font-bold text-purple-600">{game.name}</h2>
            </section>
            <section className="flex flex-wrap gap-5 justify-center-safe mb-2">
                <p className="text-red-300">Genre(s):</p>
                {game.category.map((cat, index)=> <p className=" bg-red-950 rounded-2xl p-2 font-black border-2 border-red-300 text-[12px]" key={index}>{cat}</p>)}
            </section>
            <section className="flex flex-wrap gap-5 justify-center-safe mb-2">
                <p className="text-blue-300">Platforme(s):</p>
                {game.platforms.map((platform, index) => <p className=" bg-blue-900 rounded-2xl p-2 font-black border-2 border-blue-300 text-[12px]" key={index}>{platform}</p>)}
            </section>
            <Link to={"/descriptionGame"} state={gameId}>
            <button className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5">Voir Plus</button>
            </Link>
        </article>
        )
    })}
    </article>
    </>
)
}

export default Results