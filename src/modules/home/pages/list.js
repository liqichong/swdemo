import React, { Component } from "react";
import { connect } from '98k';

import Loading from '../components/loading';
import ListItem from '../components/list-item';
import Pagination from '../components/pagination';

class List extends Component {
  render() {
    const { loading, list, people, match: { params: { page = 1 } } } = this.props;
    const listData = list[page];

    return (
      <div className='container'>
        {loading && <Loading/>}
        {listData && (
          <ul className='list-group'>
            {listData.people.map(p => <ListItem people={people[p]}></ListItem>)}
          </ul>
        )}
        {list.count && (
          <Pagination page={page} count={list.count} prev={!listData || !!listData.prev} next={!listData || !!listData.next}/>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { page = 1 } = this.props.match.params;
    this.props.dispatch({ type: 'home/fetchList', payload: page });
  }

  componentWillReceiveProps(nextProps) {
    const page = nextProps.match.params.page;
    if(this.props.match.params.page !== page) {
      this.props.dispatch({ type: 'home/fetchList', payload: page });
    }
  }
}

export default connect(state => ({ ...state.home, loading: state.loading.home }))(List);
