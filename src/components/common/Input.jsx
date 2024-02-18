import React from 'react';
import ErrorMessage from './ErrorMessage';

const Input = ({
	name,
	value,
	type,
	onChange,
	classes,
	label,
	errorMessage,
}) => {
	return (
		<div className='form-input'>
			<label>{label}</label>
			<input
				className={classes}
				name={name}
				type={type ?? 'text'}
				value={value}
				placeholder={label}
				min={0}
				onChange={onChange}
			/>
			{errorMessage && <ErrorMessage errorMessage={errorMessage} />}
		</div>
	);
};

export default Input;
