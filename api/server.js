/*  eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/data/:leagueID', async (req, res) => {
  const { leagueID } = req.params;
  const url = `https://draft.premierleague.com/api/league/${leagueID}/details`;
  try {
    console.log("try)")
    const response = await axios.get(url);
    console.log("🚀 ~ file: server.js:21 ~ app.get ~ response:", response)
    res.json(response.data);
  } catch (error) {
    console.log("error")
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})