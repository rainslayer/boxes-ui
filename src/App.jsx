import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Game from "./components/Game";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { IconContext } from 'react-icons';
import AppRoutes from './const/routes';

function App() {
  return (
    <ChakraProvider>
      <IconContext.Provider value={{size: 32}}>
      <Router>
        <Routes>
          <Route path={AppRoutes.Root} element={<Game />} />
          <Route path={AppRoutes.SignIn} element={<SignIn />} />
          <Route path={AppRoutes.SignUp} element={<SignUp />} />
        </Routes>
        </Router>
        </IconContext.Provider>
    </ChakraProvider>
  );
}

export default App;
