import React from 'react';
import { Link } from 'react-router-dom';

class Shadowing extends React.Component {
  render() {
    const id = this.props.match.params.id;

    return (
      <div className="views-shadowing">
        <h2>ESL Shadowing</h2>
        <Link to={`/subtitle/${id}`}>{id}</Link>
      </div>
    );
  }
}

export default Shadowing;
