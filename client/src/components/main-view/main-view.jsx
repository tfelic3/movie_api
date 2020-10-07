import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
	constructor() {
		super();
		// code executed right when the component is created in the memory

		this.state = {
			movie: null,
			selectedMovie: null,
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

	onBackClick(movie) {
		this.setState({
			selectedMovie: null,
		});
	}

	render() {
		// If the state isn't initialized, this will throw on runtime
		// before the data is initially loaded
		const { movies, selectedMovie } = this.state;

		//Before the movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<div className="main-view">
				{selectedMovie ? (
					<MovieView
						movie={selectedMovie}
						onClick={(movie) => this.onBackClick(movie)}
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
		);
	}
}
