import './App.css';
import Header from './Components/Home/Header';
import Footer from './Components/Home/Footer';
import HomePage from './Components/Home/Home';
import SignUp from './Components/Authentication/Signup';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ForumPage from './Components/Forum/Forum';
import { useEffect } from 'react';
import Aos from 'aos';


function App() {

  useEffect(()=>{
    Aos.init();
  }, [])

  return (
    <div className="App">
      <Router>
        <Header/>
        <Route exact path='/' component={HomePage} />
        <Route path='/signup' render={()=><SignUp />} />
        <Route path='/forum' render={()=><ForumPage  />} />
        <Footer />
      </Router>

    </div>
  );
}

export default App;
