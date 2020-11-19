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
					username: res.data.username,
					password: res.data.password,
					email: res.data.email,
					birthday: res.data.birthday,
					favoriteMovies: res.data.favoriteMovies,
				});
			})
			.catch(function (err) {
				console.log(err);
			});
  }
  
  







	render() {
    const { movies } = this.props;

    const MovieNames = movies.filter( ( movie ) =>
    this.state.favoriteMovies.includes( movie._id )
  )
   

		return (

      <div>
				<Container>
					<h1>My Profile</h1>
					<br />
					<Card>
						<Card.Body> Favorite Movies: 
							
              {MovieNames.map((movie)=>(
                <Card.Text>{movie.title}</Card.Text>
              ))}

        
						</Card.Body>
					</Card>


          

          
          

				</Container>
			</div>
    

    )
    
	}
}
