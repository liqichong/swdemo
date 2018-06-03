import React, { Component } from 'react';

export default class DetailItem extends Component {
  render() {
    return (
      <dl className='row text-center border-bottom'>
        <dt className='col-4'>{this.props.title}</dt>
        <dd className='col-8'>{this.props.children}</dd>
      </dl>
    );
  }
}
