import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //injecting the package in constructor)
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //login method
  onSubmit(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        //if successful
        this.router.navigate(['dashboard']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  //register method
  onSignup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration Successful');
        // user will be redirected back to login page after signing up
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        // user will be redirected back to register screen
        this.router.navigate(['/register']);
      }
    );
  }
  //log out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        // user will be redirected back to register screen
        this.router.navigate(['/register']);
      }
    );
  }
}
