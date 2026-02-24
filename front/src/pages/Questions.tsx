import { useEffect , useState} from "react"
import { Link } from 'react-router-dom'
import questionsData from "../data/questionsData.tsx"
import type { questionsState } from "../interfaces/interface.ts"
import type { categoryState } from "../interfaces/interface.ts"
import type { platformsState } from "../interfaces/interface.ts"
import ReponsesLayout from "../components/ReponsesLayout.tsx"

const questionsTyped: questionsState[] = questionsData

function Questions(){
    
    const[dataCategory, setDataCategory] = useState<categoryState[] | null>(null)
    const [loadingCategory, setLoadingCategory] = useState(true)

    const [dataPlatforms, setDataPlatforms] = useState<platformsState[] | null>(null)
    const [loadingPlatforms, setLoadingPlatforms] = useState(true)
    

    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [reponsesList, setReponsesList] = useState({
    parental_guidance:0,
    free_to_play:"",
    platforms:"",
    category:"",
    online:"",
    multiplayer:""
    })

    useEffect(() => {
        async function getCategory() {
            try{
                const res = await fetch("http://localhost:4242/category");
                setDataCategory(await res.json())
            }catch(error){
                console.error("L'API des catégories n'a pas pu s'afficher")
            }finally{
                setLoadingCategory(false)
            }     
        } getCategory()

        async function getPlaforms() {
            try{
                const res = await fetch("http://localhost:4242/platforms");
                setDataPlatforms(await res.json())
            }catch(error){
                console.error("L'API des catégories n'a pas pu s'afficher")
            }finally{
                setLoadingPlatforms(false)
            }     
        } getPlaforms()
        ; }, [])

    if(loadingCategory)return <h2>Loading...</h2>
    if(loadingPlatforms)return <h2>Loading...</h2>

    return(
        <>
        {/* on commence par l'affichage des question et lui dire de continuer de s'afficher tant qu'il reste des question */}
        {currentQuestion !== questionsTyped.length && (
            <>
             <h2 className="text-purple-500 font-bold uppercase text-2xl">{questionsTyped[currentQuestion].question}</h2>
            <h1 className="text-7xl mb-5">{questionsTyped[currentQuestion].description}</h1>
            {/* On importe la mise en page des réponse */}
            < ReponsesLayout questionsTyped={questionsTyped} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} dataPlatforms={dataPlatforms} dataCategory={dataCategory} reponsesList={reponsesList}/>
            </>
            )
        }
        <br/>

        {/* Quand on est à la dernière question */}
        {currentQuestion === questionsTyped.length && (<>
            <h2 className="text-purple-500 font-bold uppercase text-2xl">Merci pour vos réponses !</h2>
            <h1 className="text-7xl mb-5">Êtes-vous prêt(e)s à voir les jeux qui vous correspondent ? </h1>
            {/* le state c'est ce qui va me permettre d'exporter mes réponses à la page résultat en utilisant useLocation */}
            <Link to={"/results"} state={reponsesList}>
            <button className="rounded-full bg-linear-65 from-purple-800 to-purple-500 font-black uppercase text-white mb-5 mt-5 text-4xl border-2">Résultats</button>
            </Link>
            <br />
            <button className="border-2 border-purple-600 font-bold rounded-4xl mt-5 mr-5" onClick={()=>{
                setCurrentQuestion(0);
                setReponsesList({
                    parental_guidance:0,
                    free_to_play:"",
                    platforms:"",
                    category:"",
                    online:"",
                    multiplayer:""
                    })
            }}>Recommencer</button>
        </>)
        }
        {currentQuestion !== 0 && (<button className="bg-purple-800 font-bold rounded-4xl mt-5" onClick={()=>{setCurrentQuestion(currentQuestion-1);
        }}>Retour</button>)}
        </>
    )
}

export default Questions