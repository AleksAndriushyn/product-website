export const setValues = (setFunction, name, value) => {
	setFunction((prevValues) => ({
		...prevValues,
		[name]: value,
	}));
};
