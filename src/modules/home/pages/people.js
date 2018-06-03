import React, { Component } from "react";
import { connect } from '98k';
import Loading from '../components/loading';
import DetailItem from '../components/detail-item';

class People extends Component {
  render() {
    const { people, planets, films, species, vehicles, starships, match: { params: { id } } } = this.props;
    const person = people[id];

    return (
      <div className='container'>
        {person ? (
          <div>
            <DetailItem title='name'>{person.name}</DetailItem>
            <DetailItem title='height'>{person.height}</DetailItem>
            <DetailItem title='mass'>{person.mass}</DetailItem>
            <DetailItem title='hair color'>{person.hair_color}</DetailItem>
            <DetailItem title='skin color'>{person.skin_color}</DetailItem>
            <DetailItem title='eye color'>{person.eye_color}</DetailItem>
            <DetailItem title='birth year'>{person.birth_year}</DetailItem>
            <DetailItem title='gender'>{person.gender}</DetailItem>
            <DetailItem title='homeworld'>{planets[person.homeworld] || 'loading'}</DetailItem>
            <DetailItem title='films'>{person.films.map(v => films[v] || 'loading').join(', ')}</DetailItem>
            <DetailItem title='species'>{person.species.map(v => species[v] || 'loading').join(', ')}</DetailItem>
            <DetailItem title='vehicles'>{person.vehicles.map(v => vehicles[v] || 'loading').join(', ')}</DetailItem>
            <DetailItem title='starships'>{person.starships.map(v => starships[v] || 'loading').join(', ')}</DetailItem>
          </div>
        ) : (
          <Loading/>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch({ type: 'home/fetchPeople', payload: id });
  }
}

export default connect(state => ({ ...state.home }))(People);
