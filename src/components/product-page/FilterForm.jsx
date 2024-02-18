import React from 'react';
import Input from '../common/Input';

const FilterForm = ({ submitFunc, filters, onChange }) => {
	return (
		<form onSubmit={submitFunc} className='filterForm'>
			<Input
				label='Title'
				classes='filter-input'
				name='title'
				value={filters.title}
				onChange={onChange}
			/>
			<Input
				label='Price from'
				classes='filter-input'
				name='price_from'
				type='number'
				value={filters.price_from}
				onChange={onChange}
			/>
			<Input
				label='Price to'
				classes='filter-input'
				name='price_to'
				type='number'
				value={filters.price_to}
				onChange={onChange}
			/>
			<Input
				label='Date from'
				classes='filter-input'
				name='from'
				type='date'
				value={filters.from}
				onChange={onChange}
			/>
			<Input
				label='Date to'
				classes='filter-input'
				name='to'
				type='date'
				value={filters.to}
				onChange={onChange}
			/>
			<div className='button-container'>
				<button className='form-button' type='submit'>
					Search
				</button>
			</div>
		</form>
	);
};

export default FilterForm;
