import logo from './logo.svg';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
function App() {
  return (
    <>
      {" "}
      <ChakraProvider>
        <Navbar/>
        <LandingPage/>
       {" "}
      </ChakraProvider>
    </>
  );
}

export default App;