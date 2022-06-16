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
- [Demonstration & Features](#demonstration)
- [Technologies Used](#technologies-used)
- [Local Setup](#localsetup)
- [License](#license-)
- [Authors](#authors)

<br />

# instructions to start the project

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
