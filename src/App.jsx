import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Profile from './components/profile-page/Profile';
import Products from './components/product-page/Products';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Profile />} />
				<Route path='/products' element={<Products />} />
			</Routes>
		</>
	);
}

export default App;

