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
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import { loadBudgets, loadCategories, saveBudget } from '../actions';
import LinearProgress from 'material-ui/LinearProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class BudgetPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBudgetModal: false,
      category: null,
      limit: 0
    };
  }
  componentDidMount() {
    this.props.loadBudgets();
    if (!this.props.categories || this.props.categories.length === 0) {
      this.props.loadCategories();
    }
  }

  filterByDate(date) {
    console.log('filter budget by date');
  }

  saveBudget() {
    if (!this.state.category || this.state.limit <= 0) {
      window.alert('All the values are mandatory!!!');
      return;
    }
    let objToSave = {
      category: this.state.category,
      limit: this.state.limit
    }

    this.props.saveBudget(objToSave).then(() => {
      this.setState({
        showBudgetModal: false,
        limit: 0,
        category: null
      });
      this.props.loadBudgets();
    });
  }

  render() {
    let budgetsList = _.map(this.props.budgets, (b) => {
      let percentage = (b.current * 100) / b.limit;
      return (
        <TableRow key={uuid()}>
          <TableRowColumn>{b.category.name}</TableRowColumn>
          <TableRowColumn>{b.limit}</TableRowColumn>
          <TableRowColumn>
            {percentage.toFixed()}%
            {
              <LinearProgress mode="determinate" value={percentage} />
            }
          </TableRowColumn>
          <TableRowColumn>{moment(b.createdAt).format('MM.YYYY')}</TableRowColumn>
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
          floatingLabelText="Budged Date"
          autoOk={true}
          hintText="Budget Date"
          onChange={(e, date) => {
            this.props.filterByDate(date);
          }}
          fullWidth={true}
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
              <TableHeaderColumn>Limit</TableHeaderColumn>
              <TableHeaderColumn>%</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={true}
            >
            {budgetsList}
          </TableBody>
        </Table>
        <FloatingActionButton
          className="add-btn"
          onClick={() => {
            this.setState({showBudgetModal: true});
          }}
          >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add new Budget"
          actions={
            [
              <FlatButton
                label="Cancel"
                primary={false}
                onClick={(e) => {
                  this.setState({showBudgetModal: false});
                }}
              />,
              <FlatButton
                label="Save Budget"
                primary={true}
                onClick={this.saveBudget.bind(this)}
              />,
            ]
          }
          modal={true}
          open={this.state.showBudgetModal}
        >
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
            hintText="Limit"
            floatingLabelText="Limit"
            type="number"
            ref={(input) => { this.limitInput = input; }}
            value={this.state.limit}
            onChange={(e) => {
              this.setState({limit: e.currentTarget.value});
            }}
            fullWidth={true}
          />
        </Dialog>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    budgets: state.mainReducer.budgets,
    categories: state.mainReducer.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadBudgets,
    loadCategories,
    saveBudget
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(BudgetPage);
