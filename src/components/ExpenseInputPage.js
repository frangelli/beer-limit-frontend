import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveExpense, loadCategories, loadBudgets } from '../actions';
import Header from './Header';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import Snackbar from 'material-ui/Snackbar';

class ExpenseInputPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      category: 0,
      description: "",
      createdAt: null,
      budget: null,
      showNotification: false,
      notificationMessage: "",
      notificationTime: 3000
    };
    this.setCurrentBudget = this.setCurrentBudget.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadBudgets();
    this.amountInput.focus();
  }

  setCurrentBudget(category) {
    let budget = _.find(this.props.budgets, (b) => {
      return b.category._id === category;
    });

    if (budget) {
      const quarter = budget.limit / 4;
      const half = budget.limit / 2;
      if (budget.current >= budget.limit) {
        this.setState({
          notificationMessage: `WAAAT!!! You are ${budget.current - budget.limit} euro over your limit for this category!`,
          showNotification: true,
          notificationTime: 6000
        });
      } else if (budget.current >= 3 * quarter) {
        this.setState({
          notificationMessage: `HEADS UP!!! You have less then a quarter of your limit for this category!`,
          showNotification: true,
          notificationTime: 6000
        });
      } else if (budget.current >= half) {
        this.setState({
          notificationMessage: `HEADS UP!!! You have less then a half of your limit for this category!`,
          showNotification: true,
          notificationTime: 6000
        });
      }
    }
  }

  save(e) {
    e.preventDefault();
    let objToSave = Object.assign({}, this.state, {createdAt: moment().format()});

    if (this.state.amount <= 0 || this.state.category === 0) {
      this.setState({
        notificationMessage: "Ops! Already had too many beers? You forgot the values!",
        showNotification: true
      });
      this.amountInput.focus();
      return;
    }

    this.props.saveExpense(objToSave).then(() => {
      this.setState({
        amount: 0,
        category: 0,
        description: "",
        createdAt: null,
        budget: null,
        notificationMessage: "Expense saved... ( I hope it was beer! )",
        showNotification: true
      });
      this.amountInput.focus();
    });
  }

  render() {
    let categoriesList = _.map(this.props.categories, (cat) => {
      return (
        <MenuItem key={cat._id} value={cat._id} primaryText={cat.name} />
      );
    });
    return (
      <div className="container">
        <Header />
            <SelectField
            floatingLabelText="Category"
            value={this.state.category}
            onChange={(e, index, value) => {
              this.setState({category: value});
              this.setCurrentBudget(value);
            }}
            fullWidth={true}
            >
            {categoriesList}
            </SelectField>
            <TextField
              hintText="Amount"
              floatingLabelText="Amount"
              type="number"
              ref={(input) => { this.amountInput = input; }}
              value={this.state.amount}
              onChange={(e) => {
                this.setState({amount: e.currentTarget.value});
              }}
              fullWidth={true}
              />
            <TextField
              hintText="Description (Optional)"
              floatingLabelText="Description (Optional)"
              multiLine={true}
              rows={2}
              rowsMax={4}
              fullWidth={true}
              value={this.state.description}
              onChange={(e) => {
                this.setState({description: e.currentTarget.value});
              }}
            />
            <RaisedButton label="Save"
              primary={true}
              style={{margin: 12}}
              fullWidth={true}
              onClick={this.save.bind(this)}
               />
           <Snackbar
             open={this.state.showNotification}
             message={this.state.notificationMessage}
             autoHideDuration={this.state.notificationTime}
             onRequestClose={()=> {
               this.setState({showNotification: false, notificationTime: 3000});
             }}
           />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    categories: state.mainReducer.categories,
    budgets: state.mainReducer.budgets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveExpense,
    loadCategories,
    loadBudgets
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(ExpenseInputPage);
