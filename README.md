<br />

<p align="center">
    <img src="public/logo192.png" width="80" height="80"/>
    <img src="public/Ethereum.svg" width="80" height="80"/>
</p>

<h2 align="center">Etherfunds</h2>

<p align="center">
  A fundraising decentralised application (DAPP), that eliminates middlemen while improving the integrity of the entire process.
  <br />
  <br />
  <a href="#table-of-content"><b>Explore the docs »</b></a>
  <br />
  <br />
  <a href="#architecture">Architecture</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://github.com/DevelopersLeague/Etherfunds" target="_blank">Code</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#local-setup">Local Setup</a>
  <br />
</p>

<br />

<p align="center">



https://user-images.githubusercontent.com/56788568/231786213-3be540b1-e84b-4c82-ab46-6a466af932d6.mp4


</p> 

### Table Of Content

- [Features](#features)
- [Motivation](#motivation)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Local Setup](#local-setup)
- [License](#license-)
- [Authors](#authors)

<br />

## Features

- **Immutable transactions:** Blockchain being an immutable ledger will not allow any room for tampering
- **On-time donations:** Normally it might even take many months upto years for gathering of funds and deliverun to the needy people due to the tedious and manual nature of existing systems, but Blockchain technology ensures that the transactions will not take a long time to transfer funds to deprived people
- **Eliminating middlemen:** Blockchain eliminates the need for a middleman due to Peer-to-Peer transactions. With large, centralized charities, there is always the possibility that too many levels of management will eat into their funds. With blockchain-based charities, the number of middlemen between donors and those they want to help is brought to a minimum
- **Clear and concise UI:** The front-end is built with minimalistic Chakra UI components. Since users are generally cautious when it comes to transactions, the application provides descriptive steps through toastcards, alerts, etc.

## Motivation

The existing fundraising platforms suffer from the following problems:
- Even with legitimate charitable organizations, some of these charities only allocate a small portion of their donations to the actual cause and the remaining goes to corporate sponsors and private operators.
- Tampering of transactions

**Enter blockchain technology**, an immutable ledger where every record can be traced to its creation. Decentralized and distributed among its users, blockchain allows them to track transactions and be sure of the absence of fraudulent activities.


**Why only Ethereum Blockchain**

- The currency of Ethereum network is Ether which is a well established cryptocurrency. These days there are many new cryptocurrencies Scam Initial Coin Offerings(ICO) are completely fabricated, with fake bios of nonexistent team members and technical whitepapers
- The community of developers which would help us in bug resolution

## Corner-cases

**What if owner of fund is not a legitimate person and uses the fund for his own benefits after withdrawal?**
- A safety and trust team could be created to verify personal information, the identity of recipients, and they make sure that all funds raised on Etherfunds are going to the right place. They work closely with state and local officials and law enforcement to assist in any investigations.
- The goal is to automate the process with least human interactions thereby eliminating any chances of malpractice during transaction and establishing a P2P network

**What if owner is a NGO and then they distribute money to management as well as to the cause, but they majorly used their funds for management, can you do something about it?**
- same as above
- Or we can have separate privacy policies or terms of usage for such cases

<br />

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
<img src="./docs/block_digram_svg.svg" />
<br />

### E-R diagram

- ER diagram shows the databases involved

<br />
<img src="./docs/er_diagram.svg" width="90%"/>
<br />


## Technologies Used

- Workflow and Architecture Design
  - Excalidraw • Draw.io
- Frontend
  - React.js and related packages
  - CSS and related packages
- Blockchain network: Ethereum
- Smart contracts are written in **Solidity** programming language
- Smart contracts compilation and deployment to test network was done using **Hardhat**
- Blockchain wallet used: **MetaMask** 
- Javascript library to communicate with blockchain: **Ethers.js**

## running with docker

- run ```docker compose up --build```
- add custom chain in metamask with rpc url ```http://localhost:8545/``` and chainid 1337
- make sure you reset account data in metamask
- visit http://localhost:3000

## Local-Setup

1. clone the project to your local environment
2. make sure you have node.js version ^14.19.0
3. make sure you have npm version ^8.5.5
4. run `$ npm install` to install dependencies for react app
5. run `$ cp .env.example .env.development.local`
6. run `$ cd src/backend` to cd into the backend directory
7. run `$ npm install` to install dependencies for the backend
8. open two terminals in one terminal run `$ npx hardhat node` to start a local blockchain
9. in second terminal run `$ npx hardhat run --network localhost scripts/deploy_etherfund.js` to deploy the smart contract and copy the address printed in the terminal
10. open the `.env.development.local` file from project root and set the variable `REACT_APP_CONTRACT_ADDRESS` to the address copied above
11. run `$ cd ../..` to go back to the project root and run `$ npm start` to start the react project
12. Now in your React-app, enter password in your metamask wallet or any other blockchain wallet
13. Switch to TestNetwork or add one preferably having `RPC URL` as ```http://localhost:8545``` with chain-id of 31337
14. Create dummy accounts, you can find the private keys of dummy accounts in the terminal where ``npx hardhat node`` was ran
15. You may see an error in browser console of ``call revert exception``, in that case, kindly reset your account and refresh the page
16. You can use the site, congrats 🎉
17. In case of any other errors, kindly create an [issue here](https://github.com/DevelopersLeague/Etherfunds/issues/new)


### License 📜

[GNU General Public License v3.0](/LICENSE)

### Authors

- Aniket More
    - [LinkedIn](https://www.linkedin.com/in/aniket-more-2b97571b1/) • [Twitter](https://twitter.com/aniket_more311) 
- Chirag Mahajan
    - [Linkedin](https://www.linkedin.com/in/chirag-mahajan-b09144137/) • [GitLab](https://gitlab.com/chiragmahajan3101)
- Shyren More
    - [LinkedIn](https://www.linkedin.com/in/shyrenmore/) • [Gmail](mailto:shyren.more30@gmail.com)
