import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authToken: any;
	user: any;
	httpOptions = {
		headers: new HttpHeaders({ 'Content-type': 'application/json' })
	};

	constructor(private http: HttpClient) {}

	registerUser(user) {
		return this.http.post<any>(
			`http://localhost:3000/users/register`,
			user,
			this.httpOptions
		);
	}

	authenticateUser(user) {
		return this.http.post<any>(
			`http://localhost:3000/users/authenticate`,
			user,
			this.httpOptions
		);
	}

	getProfile() {
		this.loadToken();
		const headers = new HttpHeaders({
			'Content-type': 'application/json',
			Authorization: this.authToken
		});
		console.log(``);
		return this.http.get(`http://localhost:3000/users/profile`, {
			headers: headers
		});
	}

	storeUserData(token, user) {
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	loadToken() {
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	logout() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
}
