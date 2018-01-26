import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import ExpenseInputPage from './components/ExpenseInputPage';
import OverviewPage from './components/OverviewPage';
import BudgetPage from './components/BudgetPage';

import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ExpenseInputPage}/>
          <Route path="/overview" component={OverviewPage}/>
          <Route path="/budget" component={BudgetPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
