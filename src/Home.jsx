import React from 'react';
import RestAPI from './RestAPI';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    resourceIds: []
  };
  componentDidMount() {
    RestAPI.getResources().then(resourceIds => {
      this.setState({ resourceIds });
    });
  }
  render() {
    return (
      <div className="views-home">
        <h1>ESL Shadowing</h1>
        <nav className="home-nav">
          {this.state.resourceIds.map(id => (
            <Link key={id} to={`/esl-shadowing/audio/${id}`}>
              {id}
            </Link>
          ))}
        </nav>
      </div>
    );
  }
}

export default Home;
