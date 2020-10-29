import React from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import './movie-view.scss';

export class MovieView extends React.Component {


	


	render() {
		const { movie} = this.props;



		return (

			
			
			<Card style ={{ width: '20rem', margin: "0 auto" }} >
			
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<div>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>

					
					<Card.Text>{'Director: '}</Card.Text> <Link to={`/director/${movie.Director.Name}`}> <Button>{movie.Director.Name}</Button>
					</Link>

					<Card.Text>{'Genre: '}</Card.Text> <Link to={`/genres/${movie.Genre.Name}`}>
					<Button>{movie.Genre.Name}</Button>
					</Link>



					<Link to={`/`}>
						
					<Card.Text>
					<Button variant="dark">
						Back
					</Button> 
					</Card.Text>	
					</Link>
					</div>
				
				
				</Card.Body>
				
			
		
			</Card>
		
		
			
			
		);
	}
}
