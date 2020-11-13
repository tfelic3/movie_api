import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './update-view.scss';

export function UpdateView(props) {
	const [username, createUsername] = useState('');
	const [password, createPassword] = useState('');
	const [email, createEmail] = useState('');
    const [birthday, createDob] = useState('');
    const [movie, createMovie] = useState ('');

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put('https://tessmovieapp.herokuapp.com/users', {
				Username: username,
				Password: password,
				Email: email,
                Birthday: birthday,
                Movie: movies
			})
			.then((response) => {
				const data = response.data;
				alert('Your account has been Updated! Please login');
				console.log(data);
				window.open('/client', '_self');
			})
			.catch((e) => {
				console.log('Error updating your account.');
			});
	};

	return (
		<Container>
			<Form>
				<h1>Update User Profile</h1>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => createUsername(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => createEmail(e.target.value)}
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => createPassword(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicDob">
					<Form.Label>Birthday</Form.Label>
					<Form.Control
						type="date"
						placeholder="12/31/1999"
						value={birthday}
						onChange={(e) => createDob(e.target.value)}
					/>
				</Form.Group>

                <Form.Group controlId="formBasicMovie">
					<Form.Label>Movie</Form.Label>
					<Form.Control
						type=""
						placeholder="Add your favorite movie"
						value={movie}
						onChange={(e) => createMovie(e.target.value)}
					/>
				</Form.Group>


				
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}
