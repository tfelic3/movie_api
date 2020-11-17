import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';
import {UpdateView} from '../update-view/update-view';
import { DirectorView } from '../director-view/director-view';
import './main-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null,
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	getMovies(token) {
		axios
			.get('https://tessmovieapp.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// #1
				this.props.setMovies(response.data);
			})
			.catch(function (error) {
	console.log(error);
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

	render() {
		// #2
		let { movies } = this.props;
		let { user } = this.state;
		

		return (
			<Router basename="/client">
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

									return <MoviesList movies={movies} />;
								}}
							/>

							<Route path="/register" render={() => <RegistrationView />} />
							<Route
								path="/movies/:movieId"
								render={({ match }) => (
									<MovieView
										movie={movies.find((m) => m._id === match.params.movieId)}
									/>
								)}
							/>
							<Route
								path="/director/:name"
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
								path="/genres/:name"
								render={({ match }) => {
									return (
										<GenreView
											genre={
												movies.find((m) => m.Genre.Name === match.params.name)
													.Genre
											}
										/>
									);
								}}
							/>

							<Route
								path="/users"
								render={() => {
									return <UserView user={user} />;
								}}
							/>

<Route path="/register" render={() => <RegistrationView />} />

<Route path="/users/update" render={() => <UpdateView />} />
						</Row>
						<div className="button">
							<Button onClick={this.onLogOut}>Logout</Button>
						</div>
					</Container>
				</div>
			</Router>
		);
	}
}

let mapStateToProps = (state) => {
	return { movies: state.movies };
};

// #4
export default connect(mapStateToProps, { setMovies })(MainView);
