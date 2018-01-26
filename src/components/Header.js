import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from "react-router-dom";
import TransactionIcon from 'material-ui/svg-icons/action/swap-horiz';
import OverviewIcon from 'material-ui/svg-icons/action/visibility';
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
      default:

    }
    this.setState({selectedTab: index});
  }

  render() {
    let selectedTab = (this.props.history.location.pathname.indexOf('overview') > -1) ? 2 : 1;
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
