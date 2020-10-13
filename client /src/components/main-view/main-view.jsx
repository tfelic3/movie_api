import React from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();
		// code executed right when the component is created in the memory

		this.state = {
			movie: null,
			selectedMovie: null,
			user: null,
		};
	}

	// One of the "hooks" available in a React Component
	componentDidMount() {
		axios
			.get('https://tessmovieapp.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}


	onLoggedIn(user) {
		this.setState({
			user,
		});
	} 

	render() {
		const { movies, selectedMovie, user } = this.state;

		if (!user) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;
		
		//*if (user) return < LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
	
		// Before the movies have been loaded
		if (!movies) return <div className="main-view" />;
	
		return (
		
				
					
		  <div className="main-view">
			  <div className="container">
			{selectedMovie ? (
			  <MovieView
				movie={selectedMovie}
				onClick={() => this.onMovieClick(null)}
			  />
			) : (
				
			  movies.map((movie) => (

				<MovieCard 

				  key={movie._id}
				
				  movie={movie}
				  
				  onClick={(movie) => this.onMovieClick(movie)}
				 
				/>
				
			
				
				
				
			  ))
			
			  )} 
			</div>
		  </div>
		 
	
		);
	  }
	}
	