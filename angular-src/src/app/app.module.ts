import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

// Services
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent,
		ProfileComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		FlashMessagesModule.forRoot(),
		HttpClientModule
	],
	providers: [ ValidateService, AuthService, AuthGuard, LoggedInGuard ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
