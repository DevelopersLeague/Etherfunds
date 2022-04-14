import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CreateNewFund from './pages/CreateNewFund';
import FundDetails from './pages/FundDetails';
import FundsCreatedByMe from './pages/FundsCreatedByMe';
import ContributedToFunds from './pages/ContributedToFunds';
import WithdrawalRequests from './pages/WithdrawalRequests';
import WithdrawalRequestApprove from './pages/WithdrawalRequestApprove';
import { useMetamask } from "use-metamask";
import { ethers } from 'ethers';
import client from './client';
import ContractInfo from './backend/artifacts/contracts/EtherFund.sol/EtherFund.json'
function App() {

  const { connect, metaState } = useMetamask();
  console.log(metaState);

  useEffect(() => {
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(ethers.providers.Web3Provider);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (metaState.isConnected)
    {
      client.setProvider(window.ethereum);
      client.setContract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        ContractInfo.abi
      );
      // client.getAllCampaigns().then((campaigns) => {  
      //   console.log(campaigns);
      // })
    }  
  }, [metaState])

  return (
    <>
      {" "}
      <ChakraProvider>
        
        <Router>
          <Navbar/>

          <Routes>
            <Route exact path='/' element={<LandingPage />}></Route>
            <Route exact path='/myfunds' element={<FundsCreatedByMe />}></Route>
            <Route exact path='/mycontributions' element={<ContributedToFunds />}></Route>
            <Route exact path='/fundraiser/new/' element={<CreateNewFund />}></Route>

            <Route path='Fundraiser/:id' element={<FundDetails />}></Route>
            <Route path='Fundraiser/:id/withdrawalrequests' element={<WithdrawalRequests />}></Route>
            <Route path='Fundraiser/:id/withdrawalrequests/:id' element={<WithdrawalRequestApprove />}></Route>
          </Routes>
        </Router>
        
       {" "}
      </ChakraProvider>
    </>
  );
}

export default App;