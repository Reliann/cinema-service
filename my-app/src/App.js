import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/userAuths/chooseAuth'
import HomePage from './components/HomePage'
import {AuthUserContextProvider} from './components/authenticatedUserContext'
import Forbidden from './components/ErrorComp/forbidden';
import NotFound from './components/ErrorComp/notFound';


function App() {
  return (
    <div className="App">
      <AuthUserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<HomePage/>}/>
            <Route path="/auth/*" element={<Auth />}/>
           
            <Route path="/403" element = {<Forbidden/>}/>
            <Route path="/404" element = {<NotFound/>}/>
            
            
            
          </Routes>
        </BrowserRouter>
      </AuthUserContextProvider>
      
    </div>
  );
}

export default App;
