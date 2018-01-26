import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

class Home extends Component {

  render() {
    return (
      <div>
        <h1>COUNTER: {this.props.count}</h1>
        <button
          className="btn btn-danger"
          onClick={(e) => {
            this.props.decrement();
          }}
        >-</button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            this.props.increment();
          }}
        >+</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    count: state.mainReducer.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    increment,
    decrement
  }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(Home);
