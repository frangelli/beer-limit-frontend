import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveExpense, loadCategories } from '../actions';
import Header from './Header';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

class ExpenseInputPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      category: 0,
      description: "",
      createdAt: null,
      budget: null
    };
  }

  componentDidMount() {
    this.props.loadCategories();
    this.amountInput.focus();
  }

  save(e) {
    e.preventDefault();
    let objToSave = Object.assign({}, this.state, {createdAt: moment().format()});
    this.props.saveExpense(objToSave);
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
            <SelectField
              floatingLabelText="Category"
              value={this.state.category}
              onChange={(e, index, value) => {
                this.setState({category: value});
              }}
              fullWidth={true}
            >
              {categoriesList}
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
    categories: state.mainReducer.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveExpense,
    loadCategories
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(ExpenseInputPage);
