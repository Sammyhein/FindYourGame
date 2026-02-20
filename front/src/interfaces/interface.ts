export interface dataState{
    id:number;
    name:string;
    description:string;
    category:string[];
    company_name:string;
    free_to_play:boolean;
    image_url:string;
    multiplayer:boolean;
    online:boolean;
    parental_guidance:number;
    platforms:string[];
    previous_grame:string;
    release_year:2025;
}

export type dataStateResults = Pick<dataState,"id" | "name" | "category" | "free_to_play" | "multiplayer" | "online" | "parental_guidance" | "image_url" |"company_name" | "platforms">

export interface questionsState{
    id:number;
    question:string;
    description:string;
    reponses:string[];
    input:boolean;
    needsData:boolean;
    callData:string | null
}

export interface categoryState{
    id_category:number;
    name:string
}

export interface platformsState{
    id_platforms:number;
    name:string
}

export interface reponsesLayoutProps{
    questionsTyped:questionsState[];
    currentQuestion:number;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
    dataPlatforms:platformsState[] | null;
    dataCategory:categoryState[] | null
    reponsesList:{
    parental_guidance:number,
    free_to_play:string,
    platforms:string,
    category:string,
    online:string,
    multiplayer:string
    }
}