import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	user: any;

	constructor(private auth: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.auth.getProfile().subscribe(
			(profile) => {
				console.log(profile);
				this.user = profile.user;
			},
			(err) => {
				console.log(err);
				return false;
			}
		);
	}
}
