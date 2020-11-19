import React from 'react';

import axios from 'axios';
import MoviesList from '../movies-list/movies-list';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';

//Styling

import Card from 'react-bootstrap/Card';

export class UserView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null,
			email: null,
			birthday: null,
			favoriteMovies: [],
		};
	}

	componentDidMount() {
		//authentication
		const accessToken = localStorage.getItem('token');
		this.getUser(accessToken);
	}

	getUser(token) {
		const username = localStorage.getItem('user');

		axios
			.get(`https://tessmovieapp.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			.then((res) => {
				this.setState({
					username: res.data.Username,
					password: res.data.Password,
					email: res.data.Email,
					birthday: res.data.Birthday,
					favoriteMovies: res.data.FavoriteMovies,
				});
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	render() {
		const { movies } = this.props;

		const MovieNames = movies.filter((movie) =>
			this.state.favoriteMovies.includes(movie._id)
		);

		return (
			<div>
				<Container>
					<h1>My Profile</h1>
					<br />
					<Card>
						<Card.Body>
            <Card.Text>Username: {this.state.username}</Card.Text>
						
							<Card.Text>Email: {this.state.email}</Card.Text>
							<Card.Text>Birthday {this.state.birthday}</Card.Text>
						
							Favorite Movies:
							{MovieNames.map((movie) => (
								
                <Card.Text>{movie.Title}</Card.Text>
							))}
              <Link to={'/users/update'}>
								<Button variant="primary">Update Profile</Button>
								<br />
								<br />
							</Link>
							<Button onClick={() => this.deleteUser()}>Delete User</Button>
							<br />
							<br />
							<Link to={`/`}>Back</Link>
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}
