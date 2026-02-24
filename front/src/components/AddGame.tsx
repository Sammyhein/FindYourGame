export default function AddGame(){

//   {
//     "id": 1,
//     "name": "Légendes Pokemon : Z-A",
//     "release_year": 2025,
//     "previous_game": "undefined",
//     "description": "Pokémon Légendes : Z-A t’emmène dans une aventure totalement nouvelle au cœur d’Illumis, une métropole vivante où la ville elle-même devient ton terrain de jeu. Entre exploration libre, captures dynamiques et combats nerveux en temps réel, chaque rue cache une surprise et chaque nuit peut te propulser dans des affrontements spectaculaires.Redécouvre l’univers Pokémon sous un angle plus moderne et intense : stratégie, action et mise en scène immersive se mélangent pour offrir une expérience plus rythmée que jamais. Ajoute à ça le grand retour des Méga-Évolutions et une ambiance urbaine unique… et tu obtiens une aventure pensée pour les joueurs qui veulent ressentir le combat autant que le vivre. ✨ En bref : un Pokémon plus vivant, plus rapide, plus ambitieux — une nouvelle façon d’explorer, de combattre et de devenir un véritable dresseur.",
//     "image_url": "https://gaming-cdn.com/images/products/16028/orig/legendes-pokemon-z-a-switch-nintendo-eshop-cover.jpg?v=1760611596",
//     "parental_guidance": 7,
//     "free_to_play": false,
//     "company_name": "Nintendo",
//     "online": false,
//     "multiplayer": false,
//     "platforms": [
//       "Nintendo Switch",
//       "Nintendo Switch 2"
//     ],
//     "category": [
//       "Action",
//       "Aventure",
//       "RPG"
//     ],
//     "video_url": "https://www.youtube.com/embed/yhV4b4DkewQ?si=Edy_iyHLK-IKc-4r"
//   }
    const cols=40
    const rows=10
  
    return(
    <>
    <p>Nom :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="text" placeholder="Nom" required/>

    <p>Année de sortie :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="number" placeholder="Année de sortie" required/>

    <p>Description :</p>
    <textarea name="description" cols={cols} rows={rows} className="border-2 rounded-2xl p-3 mb-2" required></textarea>

    <p>Url de l'Image du jeu :</p>
    <input className="border-2 rounded-2xl p-3 mb-2" type="text" placeholder="url image" required/>

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
    
    </>
    )
}