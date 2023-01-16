# 🚀 Solar Rocket (v1.0) 🚀

## Welcome to the BenManage Solar Rocket developer assessment!

This is a simple project designed to not only test your React skills, but also to gauge your ability to learn and figure out new things. Don't worry if you encounter something you don't know. [Google](https://www.google.com/) is your friend 😊.

## Technical information

- This project contains both the server-side and client-side code for this app.
- The server-side code is using [ExpressJS](https://expressjs.com/).
- The client-side is using [React](https://reactjs.org/) with [MUI](https://mui.com/) and [TypeScript](https://www.typescriptlang.org/).

## Getting Started
- Fork this repository and work on your local machine. When you are finished, push your changes and submit the link to your repository.
- You will need to install packages by running `npm i` in the root directory, as well as the client and server directories, in order to get started
- You can run both the client and server simultaneously by running `npm start` in the root directory
- The first time the app runs, the JSON data for the API will be copied to a `/server/.data` directory. If the data for whatever reason gets corrupted, you can refresh the data by safely deleting the `/server/.data` directory and it will be regenerated the next time the server runs.
- The client app should launch at [http://localhost:3000/](http://localhost:3000/)
- You can test [GraphQL](https://graphql.org/) queries using [GraphiQL](https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme) at [http://localhost:5000/graphql](http://localhost:5000/graphql)
- 🚨🚨🚨 **When you're done, please remember to push your changes back to GitHub!** 🚨🚨🚨

&nbsp;

---
⚠️ People who have the NetFree™️ filter have reported getting the following error when running the app:

    Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.

To fix the issue, try adding the following line to the `/client/.env`:

    DANGEROUSLY_DISABLE_HOST_CHECK=true
---
&nbsp;

## Tasks

1. On the "Missions" page you can currently you can sort the data by "Title" or "Date". The "sort direction" button does not work. Make it work so that when clicking the sort button, the order of the sorting is reversed.
1. Add the ability to sort missions by "operator".
1. The fuel deliveries page currently has no content. We need to show the details of upcoming fuel deliveries on this page. Use the [Solar Rocket Fuel Deliveries API](https://github.com/BenManage/solar-rocket/blob/main/API.md) to pull the fuel delivery data. Make it look pretty.
1. Someone started creating a dialog to create new missions, but they never finished it (and it doesn't even have the right fields). Update the dialog to create new missions with the necessary data and use the API to save the data so it shows up on the missions page.

## Extra Credit (if you really want to impress us 😊)
1. Add the ability for users to modify and delete missions.
1. Add any other improvements that you think the mission page can use.