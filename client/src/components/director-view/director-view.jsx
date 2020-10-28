import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export class DirectorView extends React.Component {
 
constructor() {
    super();

    this.state = {};
  }

  render() {
        
    const { movie, director } = this.props;

    if (!director) return null;

    return (
      
        
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title>{movie.director.name}</Card.Title>
              
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>

    );
  }
}