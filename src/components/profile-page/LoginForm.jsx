import React, { useState } from 'react';
import { login } from '../../utils/services';
import ErrorMessage from '../common/ErrorMessage';
import Input from '../common/Input';
import { setValues } from '../../utils/functions';

const LoginForm = ({
	errorMessage,
	setErrorMessage,
	setProfile,
	setIsLoading,
}) => {
	const [credentials, setCredentials] = useState({
		email: 'admin@test.com',
		password: 'admin123',
	});

	const submitLogin = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const response = await login(credentials);
			if (response.data) {
				setProfile(response.data.user);
				setErrorMessage({ email: '', password: '' });
			}
		} catch (error) {
			setError(error.response);
		} finally {
			setIsLoading(false);
		}
	};

	const setError = (errorResponse) => {
		if (errorResponse.data.email) {
			setValues(setErrorMessage, 'email', errorResponse.data.email[0]);
		}
		if (errorResponse.data.password) {
			setValues(setErrorMessage, 'password', errorResponse.data.password[0]);
		}

		const isServerError = errorResponse.status.toString().startsWith('5');
		if (isServerError) {
			setValues(
				setErrorMessage,
				'otherError',
				'Internal server error. Please try again later'
			);
		}
	};

	const handleChange = (e) => {
		setValues(setCredentials, e.target.name, e.target.value);
	};

	return (
		<div className='wrap'>
			<form className='filterForm' onSubmit={submitLogin}>
				<Input
					classes='filter-input'
					label='Email'
					name='email'
					value={credentials.email}
					onChange={handleChange}
					errorMessage={errorMessage.email}
				/>
				<Input
					classes='filter-input'
					label='Password'
					name='password'
					value={credentials.password}
					onChange={handleChange}
					errorMessage={errorMessage.password}
				/>
				<div className='button-container'>
					<button className='form-button' type='submit'>
						Login
					</button>
				</div>
				{errorMessage.otherError && (
					<ErrorMessage errorMessage={errorMessage.otherError} />
				)}
			</form>
		</div>
	);
};

export default LoginForm;
