import React from 'react';

const Product = ({ product }) => {
	return (
		<div className='product'>
			<h3>{product.title}</h3>
			<img src={product.thumbnail} alt='' width={100} height={100} />
			<p>{product.body}</p>
			<p>{product.price}</p>
		</div>
	);
};

export default Product;
