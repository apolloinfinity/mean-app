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
}
