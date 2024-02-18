import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navigation'>
			<Link className='navLink' to='/products'>
				Products
			</Link>
			<Link className='navLink' to='/'>
				<img
					width={30}
					height={30}
					src='https://cdn-icons-png.freepik.com/256/1077/1077114.png'
					alt=''
				/>
			</Link>
		</nav>
	);
};

export default Navbar;
