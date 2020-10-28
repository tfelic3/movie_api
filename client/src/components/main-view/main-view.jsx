import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import './main-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MainView extends React.Component {
	constructor() {
		super();
		// code executed right when the component is created in the memory

		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			Director: null,
		};
	}

	// One of the "hooks" available in a React Component
	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	onMovieClick(movies) {
		this.setState({
			selectedMovie: movies,
		});
	}

	onLoggedIn(authData) {
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLogOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');

		window.open('/', '_self');
	}

	getMovies(token) {
		axios
			.get('https://tessmovieapp.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign the result to the state
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { movies, selectedMovie, user, director } = this.state;

		if (!user)
			return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		// Before the movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<Router>
				<div className="main-view">
					<Container>
						<Row>
							<Route
								exact
								path="/"
								render={() => {
									if (!user)
										return (
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										);
									return movies.map((m) => (
										<Col xs={4}>
											{' '}
											<MovieCard key={m._id} movie={m} />{' '}
										</Col>
									));
								}}
							/>
							<Route path="/register" render={() => <RegistrationView />} />

							<Route
								path="/directors/:name"
								render={({ match }) => {
									if (!movies) return <div className="main-view" />;
									return (
										<DirectorView
											director={
												movies.find(
													(m) => m.Director.Name === match.params.name
												).Director
											}
										/>
									);
								}}
							/>

							<Route
								path="/movies/:movieId"
								render={({ match }) => (
									<MovieView
										movie={movies.find((m) => m._id === match.params.movieId)}
									/>
								)}
							/>
						</Row>
						<Button onClick={this.onLogOut}>Logout</Button>
					</Container>
				</div>
			</Router>
		);
	}
}
