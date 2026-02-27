import { useLocation } from "react-router-dom"
import type { dataStateResults } from "../interfaces/interface"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

function Results(){
    const [data, setData] = useState<dataStateResults[] | null>(null)
    const [loading, setLoading] = useState(true)

    // ── États pour l'IA ──────────────────────────────────────────────
    const [aiResponse, setAiResponse] = useState<string | null>(null)
    const [aiLoading, setAiLoading] = useState(false)
    const [aiError, setAiError] = useState<string | null>(null)
    // ────────────────────────────────────────────────────────────────

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

    // ── Déclenchement automatique de l'IA si aucun match ────────────
    // On surveille gamesFilter : dès qu'il est vide, on appelle l'IA
    useEffect(() => {
        if (gamesFilter?.length === 0) {
            async function getAIRecommendation() {
                setAiLoading(true)
                setAiError(null)

                try {
                    const response = await fetch("http://localhost:4242/ai-recommendation", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ reponsesList })
                    })

                    const data = await response.json()

                    if (!response.ok) throw new Error(data.error)

                    setAiResponse(data.recommendation)

                } catch (error) {
                    console.error("Erreur IA :", error)
                    setAiError("Le service IA est temporairement indisponible.")
                } finally {
                    setAiLoading(false)
                }
            }
            getAIRecommendation()
        }
    }, [gamesFilter?.length])  // se relance uniquement si le nombre de résultats change
    // ────────────────────────────────────────────────────────────────
     if(loading)return <h1>Loading...</h1>

    console.log(data);
     console.log(gamesFilter)

return(
    <>
    <Header />
    {/* POUR LES JEUX QUI CORRESPONDENT AUX CRITÈRES */}
    {gamesFilter?.length !== 0 && (<><h1 className="mb-5 text-5xl uppercase">Voici le/les jeu(x) que nous vous conseillons selon vos critères !</h1>
    <article className="flex flex-wrap gap-4 place-content-center-safe">
    {gamesFilter?.map((game)=>{
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
            <button className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5">Voir Plus</button>
            </Link>
        </article>
        )
    })}
    </article></>)}

    {/* POUR LES JEUX QUI CORRESPONDENT PAS AUX CRITÈRES */}
    {gamesFilter?.length === 0 && (<><h1 className="mb-5 text-5xl uppercase font-bold">OUPS!!!</h1>
    <h2 className="text-xl uppercase">Vos critères ne correspondent à aucun de nos jeux dans notre bibliothèque ! <br /> Recommencez la quizz en changeant certain de vos critères <br /></h2>
    <Link to={"/questions"}>
     <button className="border-2 border-purple-600 font-bold rounded-4xl mt-5 text-white">Recommencer</button>
     </Link>

    {/* ── Bloc IA (automatique) ────────────────────────────── */}
                <div className="mt-10 mb-5 max-w-2xl mx-auto bg-gray-900 border border-purple-700 rounded-3xl p-3">
                    <h3 className="text-purple-400 font-black text-2xl uppercase mb-1">
                        ✦ Recommandation par IA
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Notre IA te suggère des jeux en dehors de notre bibliothèque
                    </p>

                    {/* Chargement */}
                    {aiLoading && (
                        <p className="text-purple-300 animate-pulse font-semibold">
                            L'IA analyse ton profil...
                        </p>
                    )}

                    {/* Erreur */}
                    {aiError && (
                        <p className="text-red-400">{aiError}</p>
                    )}

                    {/* Réponse de l'IA */}
                    {aiResponse && (
                         <div className="flex flex-wrap gap-4 text-center justify-center" dangerouslySetInnerHTML={{ __html: aiResponse }}/>
                    )}
                </div>
    {/* ── Fin bloc IA ─────────────────────────────────────── */}

    <br /><h3 className="font-black text-purple-400 text-3xl"> OU <br /></h3>
    <h2 className="mb-5 text-xl uppercase mt-9">Veuillez regarder notre liste de jeux ci-dessous</h2>
    <article className="flex flex-wrap gap-4 place-content-center-safe">
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
            <button className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5">Voir Plus</button>
            </Link>
        </article>
        )
    })}
    </article></>)}
    </>
)
}

export default Results