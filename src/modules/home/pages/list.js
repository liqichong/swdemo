import React, { Component } from "react";
import { connect } from '98k';

class List extends Component {
  render() {
    return (
      <div>list</div>
    );
  }

  componentDidMount() {
    this.props.dispatch({ type: 'home/fetchList', payload: 1 });
  }
}

export default connect(state => state.home)(List);
