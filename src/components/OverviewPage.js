import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import _ from 'lodash';
import uuid from 'uuid/v4';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { setStartDate, setEndDate, loadExpenses, loadCategories } from '../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class OverviewPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredExpenses: [],
      category: 0
    };
    this.filterByDate = this.filterByDate.bind(this);
  }

  componentDidMount() {
    this.props.loadExpenses(this.props.startDate, this.props.endDate).then(()=> {
      this.filterByDate();
    });
    if (!this.props.categories || this.props.categories.length === 0) {
      this.props.loadCategories();
    }
  }

  filterByDate() {
    let filteredExpenses = _.filter(this.props.expenses, (ex) => {
      return moment(ex.createdAt).isBetween(moment(this.props.startDate), moment(this.props.endDate));
    });

    if (this.state.category !== 0) {
      filteredExpenses = _.filter(filteredExpenses, (ex) => {
        return ex.category._id === this.state.category;
      });
    }
    this.setState({filteredExpenses});
  }

  render() {
    let total = 0;
    let expensesList = _.map(this.state.filteredExpenses, (ex) => {
      total = total + parseFloat(ex.amount);
      return (
        <TableRow key={uuid()}>
          <TableRowColumn>{ex.category.name}</TableRowColumn>
          <TableRowColumn>{ex.amount}</TableRowColumn>
          <TableRowColumn>{ex.description}</TableRowColumn>
          <TableRowColumn>{ex.createdAt}</TableRowColumn>
        </TableRow>
      );
    });
    let categoriesList = _.map(this.props.categories, (cat) => {
      return (
        <MenuItem key={cat._id} value={cat._id} primaryText={cat.name} />
      );
    });
    return (
      <div className="container">
        <Header/>
        <DatePicker
          floatingLabelText="Start Date"
          autoOk={true}
          hintText="Start Date"
          value={this.props.startDate}
          onChange={(e, date) => {
            this.props.setStartDate(date);
          }}
          fullWidth={true}
        />
        <DatePicker
          floatingLabelText="End Date"
          autoOk={true}
          hintText="End Date"
          value={this.props.endDate}
          onChange={(e, date) => {
            this.props.setEndDate(date);
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
          <MenuItem key={0} value={0} primaryText="All" />
          {categoriesList}
        </SelectField>
        <RaisedButton label="Filter"
          primary={false}
          style={{margin: 12}}
          fullWidth={true}
          onClick={this.filterByDate.bind(this)}
           />
        <Table
          selectable={false}
          multiSelectable={false}
          fixedFooter={true}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
            >
            <TableRow>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={true}
            >
            {expensesList}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn><strong>TOTAL:</strong></TableRowColumn>
              <TableRowColumn>{total.toFixed(2)}</TableRowColumn>
              <TableRowColumn></TableRowColumn>
              <TableRowColumn></TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    expenses: state.mainReducer.expenses,
    startDate: state.mainReducer.startDate,
    endDate: state.mainReducer.endDate,
    categories: state.mainReducer.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setStartDate,
    setEndDate,
    loadExpenses,
    loadCategories
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(OverviewPage);
