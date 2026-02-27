require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const sql = neon(`${process.env.DATABASE_URL}`);

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors())
app.use(express.json());

app.get('/games', async (_, res) => {
  const response = await sql`SELECT g.id_game AS id, g.name, g.release_year, g.previous_game, g.description, g.image_url, g.parental_guidance, g.free_to_play, g.company_name, g.online, g.multiplayer, ARRAY_AGG(DISTINCT p.name) AS platforms, ARRAY_AGG(DISTINCT c.name) AS category, g.video_url FROM games g
LEFT JOIN games_platforms gp ON g.id_game =gp.id_game
LEFT JOIN platforms p ON gp.id_platform = p.id_platform
LEFT JOIN games_category gc ON g.id_game =gc.id_game
LEFT JOIN category c ON gc.id_category = c.id_category
GROUP BY g.id_game
ORDER BY g.id_game;`;
  res.json(response);
});

app.get('/category', async (_, res) =>{
  const response = await sql `SELECT * FROM category`;
  res.json(response)
})

app.get('/platforms', async (_, res) =>{
  const response = await sql `SELECT * FROM platforms`;
  res.json(response)
})

app.get('/description/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id)
  const result = await sql `SELECT g.id_game AS id, g.name, g.release_year, g.previous_game, g.description, g.image_url, g.parental_guidance, g.free_to_play, g.company_name, g.online, g.multiplayer, ARRAY_AGG(DISTINCT p.name) AS platforms, ARRAY_AGG(DISTINCT c.name) AS category, g.video_url FROM games g
LEFT JOIN games_platforms gp ON g.id_game =gp.id_game
LEFT JOIN platforms p ON gp.id_platform = p.id_platform
LEFT JOIN games_category gc ON g.id_game =gc.id_game
LEFT JOIN category c ON gc.id_category = c.id_category
WHERE g.id_game = ${id} 
GROUP BY g.id_game
ORDER BY g.id_game
`;
  res.json(result)
})

// ── Route IA Groq ─────────────────────────────────────────────────────────────
app.post('/ai-recommendation', async (req, res) => {
  const { reponsesList } = req.body

  const prompt = `
Tu es un expert en jeux vidéo. Un joueur recherche un jeu avec ces critères :
- Catégorie/genre : ${reponsesList.category !== "null" ? reponsesList.category : "pas de préférence"}
- Plateforme : ${reponsesList.platforms !== "null" ? reponsesList.platforms : "pas de préférence"}
- Multijoueur : ${reponsesList.multiplayer === "true" ? "oui" : reponsesList.multiplayer === "false" ? "non" : "pas de préférence"}
- En ligne : ${reponsesList.online === "true" ? "oui" : reponsesList.online === "false" ? "non" : "pas de préférence"}
- Gratuit : ${reponsesList.free_to_play === "true" ? "oui" : reponsesList.free_to_play === "false" ? "non" : "pas de préférence"}
- Classification parentale max : ${reponsesList.parental_guidance}

Suggère 3 jeux adaptés à ce profil. Pour chaque jeu, génère une carte HTML avec des classes Tailwind en suivant EXACTEMENT ce modèle.
Répète autant de <span> que nécessaire pour TOUS les genres et TOUTES les plateformes du jeu.

<article class="bg-gray-900 rounded-4xl mb-5 relative max-w-xl text-center">
    <h2 class="uppercase text-2xl font-bold text-purple-100">NOM_DU_JEU_AVEC_UN_EMOJI_ADAPTÉ</h2>
    <div class="flex flex-wrap gap-2 p-3 justify-center">
      <span style="background:#14532d; border:2px solid #86efac" class="rounded-2xl p-2 font-black text-xs text-white">SI_LE_JEU_EST_GRATUIT</span>
      <span style="background:#1e3a5f; border:2px solid #93c5fd" class="rounded-2xl p-2 font-black text-xs text-white">EN_LIGNE_OU_NON</span>
      <span style="background:#422006; border:2px solid #fde047" class="rounded-2xl p-2 font-black text-xs text-white">MULTIJOUEUR_OU_SOLO</span>
      <span style="background:#450a0a; border:2px solid #fca5a5" class="rounded-2xl p-2 font-black text-xs text-white">PARENTAL_GUIDANCE</span>
    </div>
    <div class="flex flex-wrap gap-2 p-3 justify-center">
        <span class="text-red-300 text-xs">Genre(s) :</span>
        <span class="text-red-300 text-xs">GENRE_1</span>
        <span class="text-red-300 text-xs">|</span>
        <span class="text-red-300 text-xs">GENRE_2</span>
    </div>
    <div class="flex flex-wrap gap-2 p-3 justify-center">
        <span class="text-blue-300 text-xs">Plateforme(s) :</span>
        <span class="text-blue-300 text-xs">PLATEFORME_1</span>
        <span class="text-blue-300 text-xs">|</span>
        <span class="text-blue-300 text-xs">PLATEFORME_2</span>
    </div>
    <p class="text-gray-300 p-3">DESCRIPTION_COURTE_MAIS_PAS_TROP_ET_ENTHOUSIASTE_QUI_FAIT_REVER</p>
</article>

Réponds UNIQUEMENT avec le HTML des 3 cartes, aucun texte avant ou après, aucun markdown, aucune balise \`\`\`.
  `.trim()

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`  // ✅ clé sécurisée dans .env
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }]
      })
    })

    const data = await response.json()
    const recommendation = data.choices[0].message.content

    res.json({ recommendation })

  } catch (error) {
    console.error("Erreur Groq :", error)
    res.status(500).json({ error: "Le service IA est temporairement indisponible." })
  }
})
// ─────────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});