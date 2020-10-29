import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movies } = this.props;
    // const favoriteMovieList = movies.filter((movie) =>
    //   this.state.favoriteMovies.includes(movie._id)
    // );
    return (
      <div>
        <Container>
          <h1>My Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Password: xxxxxx</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday {this.state.Birthday}</Card.Text>
              Favorite Movies:
            
              <br />
              <br />
              <Link to={'/user/update'}>
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