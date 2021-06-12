import './App.css';
import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DangNhap from './components/DangNhap/DangNhap';
import TrangChu from './components/TrangChu/TrangChu';

function App(props) {
  

  return (
    <Router>
      <Switch>
        <Route exact path='/'><DangNhap/> </Route>
      </Switch>
      <Switch>
        <Route path='/trangChu'><TrangChu/> </Route>
      </Switch>
    </Router>
  );
}

export default App;
