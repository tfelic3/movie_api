import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';


export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onLoggedIn(username);
	};
	
  return (

    <Form>
		<h1>Welcome New User</h1>
		
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" value={username} onChange={e => setUsername(e.target.value)}/>
					<Form.Text className="text-muted">
    				</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formBasicChecbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Submit
  				</Button>
				  
			</Form>
			

/*
  <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
	</form> 
	 */
  );
 
}
