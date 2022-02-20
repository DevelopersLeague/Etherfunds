import logo from './logo.svg';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CreateNewFund from './pages/CreateNewFund';
import FundDetails from './pages/FundDetails';
function App() {
  return (
    <>
      {" "}
      <ChakraProvider>
        <Router>
          <Navbar/>

          <Routes>
            <Route exact path='/' element={<LandingPage />}></Route>
            <Route exact path='/fundraiser/new/' element={<CreateNewFund />}></Route>

            <Route path='Fundraiser/:id' element={<FundDetails />}></Route>
          </Routes>
        </Router>
        
       {" "}
      </ChakraProvider>
    </>
  );
}

export default App;