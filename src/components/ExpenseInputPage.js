import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveExpense } from '../actions';
import Header from './Header';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class ExpenseInputPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      categoryId: 1,
      description: "",
      createdAt: null,
      budgetId: null
    };
  }

  save(e) {
    e.preventDefault();
    let objToSave = Object.assign({}, this.state, {createdAt: moment().format()});
    this.props.saveExpense(objToSave);
  }

  render() {
    return (
      <div className="container">
        <Header />
            <TextField
              hintText="Amount"
              floatingLabelText="Amount"
              type="number"
              value={this.state.amount}
              onChange={(e) => {
                this.setState({amount: e.currentTarget.value});
              }}
              fullWidth={true}
            />
            <SelectField
              floatingLabelText="Category"
              value={this.state.categoryId}
              onChange={(e, index, value) => {
                console.log(value);
                this.setState({categoryId: value});
              }}
              fullWidth={true}
            >
              <MenuItem value={1} primaryText="Beer" />
              <MenuItem value={2} primaryText="Food" />
              <MenuItem value={3} primaryText="Travel" />
            </SelectField>
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
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveExpense
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(ExpenseInputPage);
