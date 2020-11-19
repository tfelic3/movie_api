import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			FavoriteMovies: [],
			movies: [],
		};
	}

	componentDidMount() {
		//authentication
		const accessToken = localStorage.getItem('token');
	}

	addNewMovie = (movieId) => {
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios
			.post(
				`https://tessmovieapp.herokuapp.com/users/${username}/movies/${movieId}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((movieId) => {
				console.log(movieId);
			});
	};

	removeMovie = (movieId) => {
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios
			.delete(
				`https://tessmovieapp.herokuapp.com/users/${username}/movies/${movieId}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((movieId) => {
				console.log(movieId);
			});
	};

	render() {
		const { movie } = this.props;
		const { user } = this.props;

		return (
			<Card>
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>

					<Button
						variant="outline-dark"
						onClick={() => this.addNewMovie(movie._id)}
					>
						Add to Favorites
					</Button>
					<br />
					<Button
						variant="dark"
						onClick={() => this.removeMovie(movie._id)}
					>
						Remove Favorite
					</Button>
					<br />
					<Link to={`/movies/${movie._id}`}>
						<Button variant="outline-dark">More Info</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}
