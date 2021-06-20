//import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "./App.css";
import Menu from "./Components/Menu/Menu";
import Rodape from "./Components/Rodape/Rodape";
import Feed from "./Components/Feed/Feed";

function App() {
  return (
    <div className="app">
      <Menu />
      <Feed />
      <Rodape />
    </div>
  );
}

export default App;
