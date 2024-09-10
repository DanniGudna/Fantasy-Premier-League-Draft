## ➤ Prerequisites

- [Node.js](https://nodejs.org/en/)

## ➤ Technology

This project uses the following technology

- [React](https://reactjs.org/) A JavaScript library for building user interfaces
- [Create React App](https://github.com/facebook/create-react-app) Create React apps with no build configuration.
- [Tailwindcss](https://tailwindcss.com) for a utility first CSS workflow.
- [Typescript](https://www.typescriptlang.org/) Types added to Javascript.
- [Chart.js](https://www.chartjs.org/) Charts
- [Cypress](https://www.cypress.io/) e2e tessting

## ➤ The Project

This project displays various stats and info of a Head to head draft league in fantasy draft for the premier league> https://draft.premierleague.com/league
It is written in typescript react and uses Tailwind for css. This was teh readme for version 1 that was submitted after working on it for 2 days.

## ➤ How to run

```bash
  cd .\api\
  npm install
  node server.js
  cd ..
  cd .\my-app\
  npm install
  npm start
```

The project has 2 folders
Api and my-app. You have to run npm install in both folders.
In the api folder run the command node server.js. It should display this message in the console if it is working> Server is running on port 3001
Then run npm start in the App folder and navigate no http://localhost:3000/
You can use the league code 46795 to test.
If you have your own H2H draft league then you can find the id by inspecting the network tab on the fantasy premier league site.
I did it by going to the Standings tab and refreshing. Then you should be able to see your league id in the network tab ( see picture)
![leagueID](leagueid.png)

The app only handles H2H leageus, there is still some work required ot handle non H2H draft leagues but the work for it is about 60% finished so it is disabled for now.

There was plan to do individual player stat pages but unfortunatly I didnt have the time. The pages exist but no data is displayed.

## ➤ Code

I used create react app to start the project but the rest of the code is mine.
Some of the css are from various tailwind sources.
The chart is made with chart.js.
I spent the weekend on this project plus about 2 hours on monday on the readme and cleanup.

Most of the heavy lifting is done in the utils.tsx file. It analyzes the response from the fantasy api and creates intresting stats from it.
for example>

- Longest win,loss and undefeated streaks in the league
- List of all the results for each player
- line chart of leaguepoints and points over time and also ranking over time
- ranking over time had to be figured out by analyzing the data as the current rank is the only thing the api returns
- Highest and lowest scores in a week.

## ➤ TODOs

- individual player stats pages
- better look for the scoring and streak content card
- on hover for the matches in the match card
- cypress tests.
- last 5 games result in the table
- better look for the charts in dark mode (also in general)
- fix mobile view after version 2 changes
- convert to vite and next.js
- fix bug for page name when deployed to github pages

League numbers> 48617

46765 46766

Link https://dannigudna.github.io/Fantasy-Premier-League-Draft/
