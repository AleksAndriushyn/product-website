import React, { useEffect, useState } from 'react';
import { Cookie } from '../../utils/Cookie';
import { getUserInfo, logout } from '../../utils/services';
import Spinner from '../common/Spinner';
import logoutIcon from '../../images/logout.jpg';
import LoginForm from './LoginForm';

const Profile = () => {
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });

	useEffect(() => {
		const getProfile = async () => {
			setIsLoading(true);
			try {
				const response = await getUserInfo();
				if (response.data) {
					setProfile(response.data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		if (Cookie.get('token') && !profile) {
			getProfile();
		}
	}, []);

	const onLogout = async () => {
		setIsLoading(true);
		try {
			await logout();
			setProfile(null);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='profile'>
			{profile ? (
				<div className='info-container'>
					<div className='info'>
						<img alt='' src={profile.profile_image} width={100} height={100} />
						<span>{profile.name}</span>
						<span>{profile.email}</span>
					</div>
					<div className='logout' onClick={onLogout}>
						<img width={50} height={50} alt='' src={logoutIcon} />
						<div>Logout</div>
					</div>
				</div>
			) : (
				<LoginForm errorMessage={errorMessage} setErrorMessage={setErrorMessage} setProfile={setProfile} setIsLoading={setIsLoading} />
			)}
		</div>
	);
};

export default Profile;
