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
  const response = await sql`SELECT g.id_game AS id, g.name, g.release_year, g.previous_game, g.description, g.image_url, g.parental_guidance, g.free_to_play, g.company_name, g.online, g.multiplayer, ARRAY_AGG(DISTINCT p.name) AS platforms, ARRAY_AGG(DISTINCT c.name) AS category FROM games g
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

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});