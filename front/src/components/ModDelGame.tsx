import { useState, useEffect } from "react"
import type { dataStateResults } from "../interfaces/interface"
import { Link } from "react-router-dom"

export default function ModDelGame(){
    const [data, setData] = useState<dataStateResults[] | null>(null)
    const [loading, setLoading] = useState(true)

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
    return(
    <>
    {data?.map((game)=>{
        const gameId = game.id
        return(
        <article key={game.id} className="bg-gray-900 rounded-4xl mb-5 relative max-w-xl">
            <section className="mb-2">
                <section className="absolute right-5 top-3 flex gap-3">
                    {game.free_to_play === true && (<p className=" bg-green-600 rounded-3xl p-2 font-bold border-3 border-white text-[12px]">Gratuit</p>)}
                    <p className=" bg-purple-800 rounded-3xl font-bold p-2 border-3 border-white text-[12px]">{game.company_name}</p>
                </section>
                <img src={game.image_url} alt={game.name} className="place-self-center-safe rounded-t-4xl"/>
                <h2 className="uppercase text-[2rem] font-bold text-purple-100">{game.name}</h2>
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
            <button className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5 mr-2">Modifier</button>
            </Link>
            <Link to={"/descriptionGame"} state={gameId}>
            <button className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5">Supprimer</button>
            </Link>
        </article>
        )
    })}
    </>)
}