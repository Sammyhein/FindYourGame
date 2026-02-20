import { useLocation , useNavigate} from "react-router-dom"
import type { dataStateResults } from "../interfaces/interface"
import { useState, useEffect } from "react"

function DescriptionGame(){
    const [data, setData] = useState<dataStateResults[] | null>(null)
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const gameId = location.state

    //ce qui va me permettre de revenir à la page précedente sur mon bouton retour
    const navigate = useNavigate()

    useEffect(() => {
             async function getData() {
                try{
                    const res = await fetch(`http://localhost:4242/description/${gameId}`);
                    setData(await res.json())
                }catch(error){
                    console.error("L'API n'a pas pu s'afficher")
                }finally{
                    setLoading(false)
                }     
            } getData()
        },[])
    
    if(loading)return <h1>Loading...</h1>

    console.log(data)
    
    return(<>
        {data?.map((game)=>{
            return(
            <>
                <h1>{game.name}</h1>
                <article className="flex bg-gray-900">
                    <section>
                        <img src={game.image_url} alt={game.name} />
                    </section>
                    <section>
                        <section className="flex gap-3 flex-row-reverse mb-3">
                            {game.free_to_play === true && (<p className=" bg-green-400 rounded-3xl p-2 font-bold border-3 border-white text-[12px]">Gratuit</p>)}
                            <p className=" bg-purple-800 rounded-3xl font-bold p-2 border-3 border-white text-[12px]">{game.company_name}</p>
                        </section>
                        <section className="flex flex-wrap gap-5 justify-center-safe mb-2">
                            <p className="text-red-300">Genre(s):</p>
                            {game.category.map((cat, index)=> <p className=" bg-red-950 rounded-2xl p-2 font-black border-2 border-red-300 text-[12px]" key={index}>{cat}</p>)}
                        </section>
                        <section className="flex flex-wrap gap-5 justify-center-safe mb-2">
                            <p className="text-blue-300">Platforme(s):</p>
                            {game.platforms.map((platform, index) => <p className=" bg-blue-900 rounded-2xl p-2 font-black border-2 border-blue-300 text-[12px]" key={index}>{platform}</p>)}
                        </section>
                        <p>{game.description}</p>

                        
                        <button onClick={()=>{navigate(-1)}}>Retour</button>
                        
                    </section>
                </article>
            </>)
        })}
    </>)
}

export default DescriptionGame;