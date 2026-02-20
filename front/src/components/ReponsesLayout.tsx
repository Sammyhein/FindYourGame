import { useState } from "react"
import type { reponsesLayoutProps } from "../interfaces/interface"

export default function ReponsesLayout({questionsTyped, currentQuestion, setCurrentQuestion, dataPlatforms, dataCategory, reponsesList} : reponsesLayoutProps){
    const [inputAge, setInputAge] = useState(0)

        if(questionsTyped[currentQuestion].callData === "parental_guidance"){
            return(
            <>
            <form action="" className="flex gap-2 justify-center" onSubmit={(e) => {
                e.preventDefault()
                if(inputAge !== 0){
                    reponsesList.parental_guidance=inputAge
                    setCurrentQuestion(currentQuestion+1);
                }else{
                    alert("Vous devez inscrire votre âge")
                }
                }}>
            <input required type="number" placeholder="Votre âge en nombre" onChange={(e)=>{setInputAge(Number(e.target.value))}}/><p>ans</p>
            </form>
             <button onClick={()=>{
                if(inputAge !== 0){
                    reponsesList.parental_guidance=inputAge
                    setCurrentQuestion(currentQuestion+1);
                }else{
                    alert("Vous devez inscrire votre âge")
                }
                
                }}>Suivant</button>
            </>
            )
        } else if (questionsTyped[currentQuestion].callData === "free_to_play"){
            return(
                <>
                {questionsTyped[currentQuestion].reponses.map((reponse : string, index : number)=>{
                    return(
                    <button key={index} onClick={()=> {
                        if(reponse === "oui")reponsesList.free_to_play="true"
                        else if(reponse ==="non") reponsesList.free_to_play="false"
                        else if(reponse==="Pas d'importances")reponsesList.free_to_play="null"
                        setCurrentQuestion(currentQuestion +1);
                    }}>{reponse}</button>
                    )
                })}
                </>
            )
        } else if (questionsTyped[currentQuestion].callData === "platforms"){
            return(
                <>
                {dataPlatforms?.map((platform, index : number)=>{return (<button key={index} onClick={()=>{
                    setCurrentQuestion(currentQuestion +1);
                    reponsesList.platforms=platform.name}}>{platform.name}</button>)})}
                <button onClick={()=>{
                    setCurrentQuestion(currentQuestion +1);
                    reponsesList.platforms="null"}}>{questionsTyped[currentQuestion].reponses}</button>
                </>
            )
        } else if (questionsTyped[currentQuestion].callData === "category"){
            return(
                <>
                {dataCategory?.map((category, index)=>{return(<button key={index} onClick={() => {
                    reponsesList.category=category.name
                    setCurrentQuestion(currentQuestion+1);
                    }}>{category.name}</button>)})}
                <button onClick={()=>{
                    setCurrentQuestion(currentQuestion +1);
                    reponsesList.category="null"}}>{questionsTyped[currentQuestion].reponses}</button>
                </>)
        } else if (questionsTyped[currentQuestion].callData === "online"){
            return(
                <>
                {questionsTyped[currentQuestion].reponses.map((reponse : string, index : number)=>{return(<button key={index} onClick={()=>{
                    if(reponse === "oui")reponsesList.online="true"
                    else if(reponse ==="non") reponsesList.online="false"
                    else if(reponse==="Pas d'importances")reponsesList.online="null"
                    setCurrentQuestion(currentQuestion+1)}}>{reponse}</button>)})}
                </>)
        } else if(questionsTyped[currentQuestion].callData === "multiplayer"){
            return(
                <>
                {questionsTyped[currentQuestion].reponses.map((reponse :string, index : number)=>{return(<button key={index} onClick={()=>{
                    if(reponse === "oui")reponsesList.multiplayer="true"
                    else if(reponse ==="non") reponsesList.multiplayer="false"
                    else if(reponse==="Pas d'importances")reponsesList.multiplayer="null"
                    setCurrentQuestion(currentQuestion+1)}}>{reponse}</button>)})}
                </>)
        }
    }

// PREMIERE VERSION DU CODE
//function reponsesLayout(){
//         //Mise en page pour les questions qui demandent un input
//         if(questionsTyped[currentQuestion].input === true && questionsTyped[currentQuestion].id === 0){
//             return (
//             <>
//             <form action="" className="flex gap-2 justify-center">
//             <input type="number" placeholder="Écrivez votre réponse ici"/><p>ans</p>
//             </form>
//             <button onClick={()=>{
//                             currentQuestion < questionsTyped.length - 1 && (setCurrentQuestion(currentQuestion+1))
//                             }}>Suivant</button>
//             </>)
//         } else if(questionsTyped[currentQuestion].input === true && questionsTyped[currentQuestion].id !==0){
//             return (
//             <>
//             <form action="" className="flex gap-2 justify-center">
//             <input type="text" placeholder="Écrivez votre réponse ici"/>
//             </form>
//             </>)
//         }

//         //Mise en page pour les question qui ont besoin de la data
//         if(questionsTyped[currentQuestion].needsData === true && questionsTyped[currentQuestion].callData === "category"){
//             return(
//                 <>
//                 {dataCategory?.map((category, index)=>{
//                     return(
//                         <>
//                         <button key={index} onClick={() => {setCurrentQuestion(currentQuestion+1)}}>{category.name}</button>
//                         </>
//                     )
//                 })}
//                 </>
//             )
//         }else if(questionsTyped[currentQuestion].needsData === true && questionsTyped[currentQuestion].callData === "platforms"){
//             return(
//                 <>
//                 {dataPlatforms?.map((platform, index)=>{
//                    return(
//                     <>
//                     <button key={index} onClick={() => {setCurrentQuestion(currentQuestion+1)}}>{platform.name}</button>
//                     </>
//                    )
//                 })}
//                 </>
//             )
//         }

//         //Mise en page pour les réponses prédéfinie dans les questions
//         if(questionsTyped[currentQuestion].input === false){
//             return(
//                 <>
//                     {questionsTyped[currentQuestion].reponses.map((reponse, index)=>{
//                         //console.log(index)
//                         return(
//                         <>
//                         <button key={index} onClick={()=>{
//                             setCurrentQuestion(currentQuestion+1)
//                             }}>{reponse}</button>
//                         </>)
//                     })}
//                 </>
//             )
//         }
//     }