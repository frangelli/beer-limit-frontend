import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import _ from 'lodash';
import uuid from 'uuid/v4';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';

class OverviewPage extends Component {

  componentDidMount() {
    //load all the stuff
  }

  render() {
    let expensesList = _.map(this.props.expenses, (ex) => {
      return (
        <TableRow key={uuid()}>
          <TableRowColumn>{ex.categoryId}</TableRowColumn>
          <TableRowColumn>{ex.amount}</TableRowColumn>
          <TableRowColumn>{ex.description}</TableRowColumn>
          <TableRowColumn>{ex.date}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className="container">
        <Header/>
        <DatePicker
          hintText="Controlled Date Input"
          value={this.state.controlledDate}
          onChange={this.handleChange}
        />
        <Table
          selectable={false}
          multiSelectable={false}
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
        </Table>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    expenses: state.mainReducer.expenses
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(OverviewPage);
