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
    if ( fallback) {
       res.status(200).json(fallback)
    }
    else {
      // console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

