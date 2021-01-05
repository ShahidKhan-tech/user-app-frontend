import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  userSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUsers();
    this.userSubscription = this.userService
      .getUserUpdateListner()
      .subscribe((res: { users: User[] }) => {
        this.isLoading = false;
        this.users = res.users;
      });
  }
}
