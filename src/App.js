import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
//import { Container} from "@material-ui/core";
import List from './pages/List'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Detail from './pages/Detail';
function App() {
  return (
    <Router>
      <Navbar/>
      <div style={{marginTop: 0}}>
          <Switch>
            <Route exact path='/list' >
              <List></List>
            </Route>
            <Route exact path='/home'>
              <Home></Home  >
            </Route>
            <Route exact path='/detail/:id'>
              <Detail/>
            </Route>
            <Redirect to='/home'/>
            </Switch>
         
      </div>
    </Router>
  );
}

export default App;
