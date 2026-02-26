import { useState,useEffect } from "react"
import type { categoryState } from "../interfaces/interface.ts"
import type { platformsState } from "../interfaces/interface.ts"


export default function AddGame(){
    //Pour la zone de text
    const cols=40
    const rows=10

    //Pour les Plateformes
    const [dataPlatforms, setDataPlatforms] = useState<platformsState[] | null>(null)
    const [loadingPlatforms, setLoadingPlatforms] = useState(true)

    const [newPlatforms, setNewPlatforms] = useState(["--Selectionnez une plateforme"])

    //Pour récupérer la valeur du select
    const [selectPlatforms, setSelectPlatfoms] = useState("")

    function addNewPlatform(){
        setNewPlatforms([...newPlatforms,"--Selectionnez une plateforme"])
    }

    //Pour les catégories
    const[dataCategory, setDataCategory] = useState<categoryState[] | null>(null)
    const [loadingCategory, setLoadingCategory] = useState(true)

    const [newCategories, setNewCategories] = useState(["--Selectionnez le genre--"])

        //pour récupérer la valeur du select
    const [selectCategory, setSelectCategory] = useState("")

    function addNewCategorie(){
        setNewCategories([...newCategories,"--Selectionnez le genre--"])
    }

    useEffect(()=>{
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

        async function getCategory() {
            try{
                const res = await fetch("http://localhost:4242/category");
                setDataCategory(await res.json())
            }catch(error){
                console.error("L'API des catégories n'a pas pu s'afficher")
            }finally{
                setLoadingCategory(false)
            }     
        } getCategory()},[])

        if(loadingPlatforms)return <h2>Loading...</h2>
        if(loadingCategory)return <h2>Loading...</h2>
    return(
    <>
    <p>Nom :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="text" placeholder="Nom" required/>

    <p>Année de sortie :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="number" placeholder="Année de sortie" required/>

    <p>Description :</p>
    <textarea name="description" cols={cols} rows={rows} className="border-2 rounded-2xl p-3 mb-2" required></textarea>

    <p>Url de l'image du jeu :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="text" placeholder="url image" required/>

    <p>Url de la vidéo du jeu :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="text" placeholder="url video" required/>

    <p>Âge minimum pour jouer (PG) :</p>
    <select className="border-2 rounded-2xl p-3 mb-2" name="parental_guidance">
        <option value="3">3</option>
        <option value="7">7</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="18">18</option>
    </select>

    <p>Est-ce gratuit ? :</p>
    <select className="border-2 rounded-2xl p-3 mb-2" name="free_to_play">
        <option value="true">Oui</option>
        <option value="false">Non</option>
    </select>

    <p>Nom de la compagnie du jeu</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="text" placeholder="Nom de compagnie" required/>

    <p>Est-ce un jeu en ligne ? :</p>
    <select className="border-2 rounded-2xl p-3 mb-2" name="online">
        <option value="true">Oui</option>
        <option value="false">Non</option>
    </select>

    <p>Pouvons-nous y jouer en multijoueur ? :</p>
    <select className="border-2 rounded-2xl p-3 mb-2" name="multiplayer">
        <option value="true">Oui</option>
        <option value="false">Non</option>
    </select>

    <p>Sur quelle(s) plateforme(s) pouvons-nous jouer à ce jeu ? </p>
    {newPlatforms.map((newPlat , index) =>{
        return(
            <select key={index} name="platforms" onChange={(e)=>setSelectPlatfoms(e.target.value)} className="border-2 rounded-2xl p-3 mb-2">
                <option value="newPlat">{newPlat}</option>
                {dataPlatforms?.map((platform)=>{return(<option key={platform.id_platforms} value={platform.name}>{platform.name}</option>)})}
                <option value="Autre">--Autre--</option>
            </select>
        )
    })}
    <button className="ml-3 border-purple-300 border-4 font-bold rounded-2xl" onClick={()=> addNewPlatform()}>Ajouter une plateforme</button>

    <p>Ce jeu est de quel(s) genre(s) ?</p>
    {newCategories.map((newCat, index) => {
            return(    
            <select key={index} name="category" onChange={(e)=>setSelectCategory(e.target.value)} className="border-2 rounded-2xl p-3 mb-2">
                <option value="newCat">{newCat}</option>
                {dataCategory?.map((category)=>{return(<option key={category.id_category} value={category.name}>{category.name}</option>)})}
                <option value="Autre">--Autre--</option>
            </select>
            )
    })}
    <button className="ml-3 border-purple-300 border-4 font-bold rounded-2xl" onClick={()=> addNewCategorie()}>Ajouter un genre</button>

    <br />
    <button className="uppercase border-purple-800 border-4 font-bold rounded-2xl mt-5">Ajouter le jeu dans la bibliothèque</button>
    </>
    )
}