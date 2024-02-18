export const Cookie = {
	saveAccessToken(data) {
		Cookie.setCookieInSeconds('token', data.access_token, data.expires_in);
	},

	setCookieInSeconds: (name, value, seconds) => {
		const miliseconds = Number(seconds) * 1000;
		const expiredDate = Cookie.getExpiredData(miliseconds);
		Cookie.setCookie(name, value, expiredDate);
	},

	getExpiredData: (miliseconds) => {
		const dateNow = new Date();
		dateNow.setTime(dateNow.getTime() + miliseconds);
		return dateNow;
	},

	get: (name) => {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
				return cookie.substring(name.length + 1, cookie.length);
			}
		}
		return null;
	},

	setCookie: (name, value, expiredDate) => {
		const expires = expiredDate ? `expires=${expiredDate};` : '';
		document.cookie = `${name}=${value};${expires}path=/`;
	},

	deleteCookie: (name) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	},
};
