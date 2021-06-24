//import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "./App.css";
import Menu from "./Components/Menu/Menu";
import Rodape from "./Components/Rodape/Rodape";
import Feed from "./Components/Feed/Feed";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SingleNonConform from "./Components/SingleNonConform/SingleNonConform";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Feed />
          </Route>
          <Route path="/nao-conformidade/:id">
            <SingleNonConform />
          </Route>
        </Switch>
        <Rodape />
      </BrowserRouter>
    </div>
  );
}

export default App;
