import { BrowserRouter } from 'react-router-dom';
import NavigationWithRouter from './Navbar';
import {Modal, Button, Form} from 'react-bootstrap';
import {useState} from 'react';

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
