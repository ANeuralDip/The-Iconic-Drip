import { BrowserRouter } from 'react-router-dom';
import NavigationWithRouter from './Navbar';
import Mens from './Mens';
import List from "./List";
import Homepage from './Homepage';
import SignUp from './SignUp';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationWithRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
