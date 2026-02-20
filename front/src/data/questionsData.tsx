const questionsData = [
    {
    "id":0,
    "question":"Question 1",
    "description":"Quel âge as-tu ?",
    "reponses":[],
    "input":true,
    "needsData":false,
    "callData": "parental_guidance"
    },
    {
    "id":1,
    "question":"Question 2",
    "description":"Cherches-tu un jeu gratuit ?",
    "reponses":["oui","non","Pas d'importances"],
    "input":false,
    "needsData":false,
    "callData": "free_to_play"
    },
    {
    "id":2,
    "question":"Question 3",
    "description":"Sur quel plateforme veux-tu jouer ?",
    "reponses":["Pas d'importances"],
    "input":false,
    "needsData":true,
    "callData":"platforms"
    },
    {
    "id":3,
    "question":"Question 4",
    "description":"Quel(s) genre(s) de jeu(x) recherches-tu ?",
    "reponses":["Pas d'importances"],
    "input":false,
    "needsData":true,
    "callData":"category"
    },
    {
    "id":4,
    "question":"Question 5",
    "description":"Veux-tu jouer en ligne ?",
    "reponses":["oui","non","Pas d'importances"],
    "input":false,
    "needsData":false,
    "callData":"online"
    },
     {
    "id":5,
    "question":"Question 6",
    "description":"Veux-tu jouer avec d'autres personnes ?",
    "reponses":["oui","non","Pas d'importances"],
    "input":false,
    "needsData":false,
    "callData":"multiplayer"
    }
]

export default questionsData