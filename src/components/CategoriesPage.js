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
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import { loadCategories, saveCategory } from '../actions';
import LinearProgress from 'material-ui/LinearProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCategoryModal: false,
      name: ""
    };
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  saveCategory() {
    if (!this.state.name === "") {
      window.alert('All the values are mandatory!!!');
      return;
    }
    let objToSave = {
      name: this.state.name
    }

    this.props.saveCategory(objToSave).then(() => {
      this.setState({
        showCategoryModal: false,
        name: ""
      });
      this.props.loadCategories();
    });
  }

  render() {
    let categoriesList = _.map(this.props.categories, (c) => {
      return (
        <TableRow key={uuid()}>
          <TableRowColumn>{c.name}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className="container">
        <Header/>
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
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={true}
            >
            {categoriesList}
          </TableBody>
        </Table>
        <FloatingActionButton
          className="add-btn"
          onClick={() => {
            this.setState({showCategoryModal: true});
          }}
          >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add new Category"
          actions={
            [
              <FlatButton
                label="Cancel"
                primary={false}
                onClick={(e) => {
                  this.setState({showCategoryModal: false});
                }}
              />,
              <FlatButton
                label="Save Category"
                primary={true}
                onClick={this.saveCategory.bind(this)}
              />,
            ]
          }
          modal={true}
          open={this.state.showCategoryModal}
        >
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            type="text"
            ref={(input) => { this.categoryNameInput = input; }}
            value={this.state.name}
            onChange={(e) => {
              this.setState({name: e.currentTarget.value});
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
    categories: state.mainReducer.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadCategories,
    saveCategory
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(CategoriesPage);
