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
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { setStartDate, setEndDate, loadExpenses } from '../actions';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'

class OverviewPage extends Component {

  componentDidMount() {
    this.props.loadExpenses(this.props.startDate, this.props.endDate);
  }

  filterByDate() {
    this.props.loadExpenses(this.props.startDate, this.props.endDate);
  }

  generateChartData() {

    let chartdata = []
    let categories = []

    let expenses = this.props.expenses;

    expenses.forEach(expense => {
      categories.includes(expense.category.name) ? null : categories.push(expense.category.name)
    })

    categories.forEach(category => {
      chartdata.push({ name: category, value: 0 })
    })

    expenses.forEach(expense => {
      chartdata.forEach(singlechartdata => {
        if (expense.category.name == singlechartdata.name) {
          singlechartdata.value = parseFloat(singlechartdata.value) + parseFloat(expense.amount)
        }
      })
    })

    return chartdata;

  }

  render() {


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]


    const chartData = this.generateChartData();


    let total = 0;
    let expensesList = _.map(this.props.expenses, (ex) => {
      total = total + parseFloat(ex.amount);
      return (
        <TableRow key={uuid()}>
          <TableRowColumn>{ex.category.name}</TableRowColumn>
          <TableRowColumn>{parseFloat(ex.amount).toFixed(2)} €</TableRowColumn>
          <TableRowColumn>{ex.description}</TableRowColumn>
          <TableRowColumn>{ex.createdAt}</TableRowColumn>
        </TableRow>
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
        <hr />
        <PieChart width={300} height={300}>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
            { chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>) }
          </Pie>
          <Legend verticalAlign="bottom" height={36}/>
          <Tooltip/>
        </PieChart>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    expenses: state.mainReducer.expenses,
    startDate: state.mainReducer.startDate,
    endDate: state.mainReducer.endDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setStartDate,
    setEndDate,
    loadExpenses
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(OverviewPage);
