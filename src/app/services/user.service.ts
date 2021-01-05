import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { User } from "../models/user.model";

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: "root",
})
export class UserService {
  private users: User[];

  private userUpdated = new Subject<{ users: User[] }>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {
    this.getUsers();
  }

  getUserUpdateListner() {
    return this.userUpdated.asObservable();
  }

  // *************creating a new user
  createNewUser(name: string, city: string, description: string) {
    const data = { name: name, city: city, description: description };
    this.http.post(`${BACKEND_URL}/createUser`, data).subscribe((res) => {
      this.router.navigate(["/"]);
      this.flashMessages.show("new user created successfully!", {
        cssClass: "alert-success",
        timeout: 3000,
      });
    });
  }

  //*************get all the user */
  getUsers() {
    this.http
      .get<{ users: User[] }>(`${BACKEND_URL}/getUsers`)
      .subscribe((res) => {
        this.users = res.users;
        this.userUpdated.next({
          users: [...this.users],
        });
      });
  }

  //*************get a single user */

  getUser(id: string) {
    return this.http.get(`${BACKEND_URL}/getUser/${id}`);
  }

  //***********updating user */

  updateUser(id: string, user: User) {
    this.http.put(`${BACKEND_URL}/edit-user/${id}`, user).subscribe((user) => {
      this.router.navigate(["/"]);
      this.flashMessages.show("user updated successfully!", {
        cssClass: "alert-success",
        timeout: 3000,
      });
    });
  }

  //****************deleting user */
  deleteUser(id: string) {
    this.http.delete(`${BACKEND_URL}/deleteUser/${id}`).subscribe((data) => {
      this.router.navigate(["/"]);
      this.flashMessages.show("user deleted!", {
        cssClass: "alert-success",
        timeout: 3000,
      });
    });
  }
}
