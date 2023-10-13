
import { HashRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from "./Routers";
import './index.css';

function App() {
  return (
    <HashRouter>
      <ToastContainer />
      <Routers />
    </HashRouter>
  )
}

export default App;
