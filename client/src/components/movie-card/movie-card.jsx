import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";

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
			  Username: res.data.Username,
			  FavoriteMovies: res.data.FavoriteMovies,
			 
			});
		  })
		  .catch(function (err) {
			console.log(err);
		  });
	  }

	  addNewMovie = (e) =>{

		const { FavoriteMovies } = this.props;

		e.preventDefault();
		axios
		  .put(`https://tessmovieapp.herokuapp.com/users`,favoriteMovies). then ((favoriteMovies)=> {
		  console.log(favoriteMovies);
		  
	   } )

catch((err)=>{console.log(err)})		
	  }
	  


	render() {
		const { movie} = this.props;
		const {user} = this.props;
	


		return (
      
			 
			<Card>

				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					
					<Button variant="outline-dark" onClick={this.addNewMovie}>
						Add to Favorites
					</Button>
					<Link to={`/movies/${movie._id}`}>
					<Button variant="outline-dark">
						More Info
					</Button>
					</Link>
				</Card.Body>
			
		
			</Card>
		
    
		);
	}
}
