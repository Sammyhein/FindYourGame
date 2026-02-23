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
            <article>
                <h1 className="mb-5 text-6xl  uppercase">{game.name}</h1>
                <iframe src={game.video_url} title={`Vidéo de ${game.name}`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="mb-5 lg:w-300 lg:h-150 h-75 w-150 place-self-center-safe" allowFullScreen></iframe>
                <article className="md:flex md:justify-evenly rounded-2xl gap-10 items-start">
                    <section>
                        <img src={game.image_url} alt={game.name} className="w-2xl top-10"/>
                    </section>
                    <section className="md:max-w-xl flex flex-col gap-4">
                        <section className="flex gap-3 flex-row-reverse mb-3">
                            {game.free_to_play === true && (<p className=" bg-green-600 rounded-3xl p-2 font-bold border-3 border-white text-[10px]">Gratuit</p>)}
                            <p className=" bg-purple-800 rounded-3xl font-bold p-2 border-3 border-white text-[10px]">{game.company_name}</p>
                        </section>
                        <section className="flex flex-wrap gap-5 justify-center-safe mb-2">
                            <p className="text-red-300">Genre(s):</p>
                            {game.category.map((cat, index)=> <p className=" bg-red-950 rounded-2xl p-2 font-black border-2 border-red-300 text-[10px]" key={index}>{cat}</p>)}
                        </section>
                        <section className="flex flex-wrap gap-5 justify-center-safe mb-2">
                            <p className="text-blue-300">Platforme(s):</p>
                            {game.platforms.map((platform, index) => <p className=" bg-blue-900 rounded-2xl p-2 font-black border-2 border-blue-300 text-[10px]" key={index}>{platform}</p>)}
                        </section>
                        <p className="text-left text-[12px]">{game.description}</p>

                        
                        <button className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5" onClick={()=>{navigate(-1)}}>Retour</button>
                        
                    </section>
                </article>
            </article>)
        })}
    </>)
}

export default DescriptionGame;