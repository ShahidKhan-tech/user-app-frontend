import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authStatusListner = new Subject<boolean>();
  token: string;
  isAuthenticated: boolean = false;
  tokenTimer: any;
  email: string;
  userId: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}
  //*********************sign up goes here */

  signUp(email: string, password: string) {
    const data = { email: email, password: password };
    this.http.post(`${BACKEND_URL}/signUp`, data).subscribe((data) => {
      this.router.navigate(["/login"]);
      this.flashMessages.show("Please login to continue", {
        cssClass: "alert-success",
        timeout: 3000,
      });
    });
  }

  //****************** Sing in goes here*/
  signIn(email: string, password: string) {
    const data = { email: email, password: password };
    this.http
      .post<{
        email: string;
        token: string;
        expiresIn: number;
        userId: string;
      }>(`${BACKEND_URL}/signIn`, data)
      .subscribe((result) => {
        const token = result.token;
        this.token = token;
        if (token) {
          const expiresInDuration = result.expiresIn;
          this.userId = result.userId;

          //*******setting auth timer */
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.email = result.email;

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          //***********saving to localstorage */
          this.saveAuthData(token, expirationDate, this.userId, this.email);
          this.authStatusListner.next(true);
          this.router.navigate(["/"]);
          this.flashMessages.show("you  have logged In successfully", {
            cssClass: "alert-success",
            timeout: 3000,
          });
        }
      });
  }

  //***********getting token */
  getToken() {
    return this.token;
  }

  //**********chekcing ffor authentication */
  getIsAuth() {
    return this.isAuthenticated;
  }
  //**********listing to auth */
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  //******************getting email ***/
  getEmail() {
    return this.email;
  }

  //***********get User Id */
  getUserId() {
    return this.userId;
  }

  //***********logout handler */
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.email = null;
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
    this.flashMessages.show("you  have logged out", {
      cssClass: "alert-success",
      timeout: 3000,
    });
  }

  //****************************setting auto logout handler */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //****************saveing the auth data  */
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    email: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
  }

  //*******************clearing the local storage after logout
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
  }

  //**************************automating the logout or setting token on particular time
  autoAuthUser() {
    const autoUserAuth = this.getAuthData();
    if (!autoUserAuth) {
      return;
    }
    const now = new Date();
    const expiresIn = autoUserAuth.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = autoUserAuth.token;
      this.isAuthenticated = true;
      this.userId = autoUserAuth.userId;
      this.email = autoUserAuth.email;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  //****************get the auth data from the localstorage
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      email: email,
      userId: userId,
    };
  }
}
