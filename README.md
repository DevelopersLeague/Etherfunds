<br />

<p align="center">
    <img src="public/logo192.png" width="80" height="80"/>
    <img src="public/Ethereum.svg" width="80" height="80"/>
</p>

<h2 align="center">Etherfunds</h2>

<p align="center">
  Blockchain based Fundraising platform, that eliminates middlemen while maintaining the integrity of the entire process.
  <br />
  <br />
  <a href="#table-of-content"><b>Explore the docs »</b></a>
  <br />
  <br />
  <a href="#architecture-and-design">Architecture</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#demonstration">Features</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#contributing">Local Setup</a>
  <br />
</p>

<br />

**Demo Video will be added here**

### Table Of Content

- [Architecture](#architecture-and-design)
- [Pages and description](#pages)
- [Technologies Used](#technologies-used)
- [Local Setup](#localsetup)
- [License](#license-)
- [Authors](#authors)

<br />

### Problem we are trying to solve?

Falana line 1
<br />
Falana line 2
<br />

**Problems with the exisiting sytem?**

Falana line
- Problem 1
- Problem 2

Our PS poses to develop an application that can automate transactions in a secured way and some more falana.

## Architecture 

We tried to follow ideal Software Development Design Principles such as.
- Do not repeat yourself (DRY)
- Keep it short and simple (KISS)
- You Ain’t Gonna Need It (YAGNI)

<br />

The presentation for Etherfunds can be found [here](https://www.canva.com/design/DAE3pEWUc1Y/Lrnk-dxztwBzIL4UkxrQvg/view#1).

### Block diagram

- The block diagram shows the overview of the system.
<br />
<img src="./images/architecture.svg" />
<br />

### Use-case diagram

- The use case shows the workflow in detail

### E-R diagram

- ER diagram shows the databases involved

## Pages

## Technologies Used

<br />

- Workflow and Architecture Design
  - Excalidraw | Draw.io
- Frontend
  - React.js and related packages
  - CSS and related packages
- Blockchain network: Ethereum
- Smart contracts compilation and deployment to test network was done using **Hardhat**

<br />

## Local Setup

1. clone the project to your local environment
2. make sure you have node.js version ^14.19.0
3. make sure you have npm version ^8.5.5
4. run `$ npm install` to install dependencies for react app
5. run `$ cp .env.example .env.development.local`
6. run `$ cd src/backend` to cd into the backend directorry
7. run `$ npm install` to install dependencies for the backend
8. open two terminals in one terminal run `$ npx hardhat node` to start a local blockchain
9. in second terminal run `$ npx hardhat run --network localhost scripts/deploy_etherfund.js` to deploy the smart contract and copy the address printed in the terminal
10. open the `.env.development.local` file from project root and set the variable `REACT_APP_CONTRACT_ADDRESS` to the address copied above
11. run `$ cd ../..` to go back to the project root and run `$ npm start` to start the react project
