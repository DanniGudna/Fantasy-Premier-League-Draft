/*  eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs'); // Import the fs module

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// todo not all endpoints have params!
function getJsonFallback(leagueID, endpointPath) {
  const filePath = `./Json/${endpointPath}/${leagueID}.json`; // Adjust the file path as needed
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null; // Return null if there's an error reading the file
  }
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/data/:leagueID', async (req, res) => {
  const { leagueID } = req.params;
  const url = `https://draft.premierleague.com/api/league/${leagueID}/details`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // attempt to get JSON fallback
    const fallback = getJsonFallback(leagueID, "details");
    if (fallback) {
      res.status(200).json(fallback)
    }
    else {
      // console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.get('/api/football-players', async (req, res) => {
  const url = `https://draft.premierleague.com/api/bootstrap-static`;
  try {
    const response = await axios.get(url);
    res.json(response.data.elements);
  } catch (error) {
    // todo JSON fallback

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO this does not work
app.get('/api/scores/:round', async (req, res) => {
  const { round } = req.params;
  const url = `https://draft.premierleague.com/api/event/${round}/live`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // todo JSON fallback

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO = maybe this should be individual instead of all
app.get('/api/transactions/:leagueID', async (req, res) => {
  const { leagueID } = req.params;
  const url = `https://draft.premierleague.com/api/draft/league/${LeagueID}/transactions`;
  try {
    const response = await axios.get(url);
    res.json(response.data.transactions);
  } catch (error) {
    // todo JSON fallback

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/draft/:leagueID', async (req, res) => {
  const { leagueID } = req.params;
  const url = `https://draft.premierleague.com/api/draft/${leagueID}/choices`;
  try {
    const response = await axios.get(url);
    res.json(response.data.choices);
  } catch (error) {
    // todo JSON fallback

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// https://draft.premierleague.com/api/bootstrap-static

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

