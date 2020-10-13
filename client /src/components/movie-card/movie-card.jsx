import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;

		return (
      
			 
			<Card>

				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					<Button onClick={() => onClick(movie)} variant="link" style={{color: "black"}}>
						More Info
					</Button>
				</Card.Body>
			
		
			</Card>
		
    
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};
