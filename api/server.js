/*  eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs'); // Import the fs module

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};


// For some reason the league number 48617 is returning a response from the API with no data. This is a quick and dirty temp
// solution to get the data from a local json file instead.
// TODO do the check based on the SEASONS const object if possible
function checkIfPreviousSeason(leagueID) {
  if (leagueID === "48617" || leagueID === "46795") {
    return true;
  }
}

// todo not all endpoints have params!
function getJsonFallback(leagueID, endpointPath) {
  const filePath = `./Json/${endpointPath}/${leagueID}.json`; // Adjust the file path as needed
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('🚀 ~ getJsonFallback ~ data:', data === null);
    return JSON.parse(data);
  } catch (error) {
    console.log(error)
    return null; // Return null if there's an error reading the file
  }
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/data/:leagueID', async (req, res) => {
  const { leagueID } = req.params;
  
  const url = `https://draft.premierleague.com/api/league/${leagueID}/details`;
  try {
    if (checkIfPreviousSeason(leagueID)) {
      const fallback = getJsonFallback(leagueID, "details");
      res.status(200).json(fallback)
    }
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
  const url = `https://draft.premierleague.com/api/draft/league/${leagueID}/transactions`;
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

