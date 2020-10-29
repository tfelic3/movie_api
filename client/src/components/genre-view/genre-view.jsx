import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export class GenreView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
    const { movie, genre } = this.props;
    
    console.log(movie);

		if (!genre) return null;

		return (
			<div className="genre-view">
				<Container>
					<Card style={{ width: '25rem' }}>
						<Card.Body>

							<Card.Title>Genre Name: {genre.Name}</Card.Title>
                            <Card.Text>Director Bio: {genre.Description}</Card.Text>
				
							<Link to={`/`}>
								<Button variant="link">Back</Button>
							</Link>
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}
