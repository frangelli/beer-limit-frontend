import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from "react-router-dom";
import TransactionIcon from 'material-ui/svg-icons/action/swap-horiz';
import OverviewIcon from 'material-ui/svg-icons/action/visibility';
import EuroIcon from 'material-ui/svg-icons/action/euro-symbol';
import CategoryIcon from 'material-ui/svg-icons/action/assignment';
import AppBar from 'material-ui/AppBar';

class Header extends Component {

  handleTabs(index) {
    switch (index) {
      case 1:
        this.props.history.push("");
        break;
      case 2:
        this.props.history.push("/overview");
        break;
      case 3:
        this.props.history.push("/budget");
        break;
      case 4:
        this.props.history.push("/categories");
        break;
      default:

    }
    this.setState({selectedTab: index});
  }

  render() {

    let selectedTab = 1
    const currentPath = this.props.history.location.pathname;
    if (currentPath.indexOf('overview') > -1) {
      selectedTab = 2;
    } else if (currentPath.indexOf('budget') > -1) {
      selectedTab = 3;
    } else if (currentPath.indexOf('categories') > -1) {
      selectedTab = 4;
    }
    return (
        <div className="main-nav">
          <AppBar iconStyleLeft={{display:'none'}} title="BEER LIMIT" className="top-bar"/>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabs.bind(this)}
          >
            <Tab
              icon={<TransactionIcon/>}
              label="Expense Input"
              value={1}>
            </Tab>
            <Tab
              icon={<OverviewIcon/>}
              label="Overview"
              value={2}>
            </Tab>
            <Tab
              icon={<EuroIcon/>}
              label="Budget"
              value={3}>
            </Tab>
            <Tab
              icon={<CategoryIcon/>}
              label="Categories"
              value={4}>
            </Tab>
          </Tabs>
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
  }, dispatch);
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(Header));
