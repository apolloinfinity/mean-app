import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

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
			Authorization: `Bearer ${this.authToken}`
		});

		return this.http.get<any>(`http://localhost:3000/users/profile`, {
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

	loggedIn() {
		if (localStorage.id_token == undefined) {
			console.log('Hello');
			return true;
		} else {
			console.log('Goodbye');
			const helper = new JwtHelperService();
			console.log(helper.isTokenExpired(localStorage.id_token));
			return helper.isTokenExpired(localStorage.id_token);
		}
	}
}
