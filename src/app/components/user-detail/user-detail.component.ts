import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  private id: string;
  user: any;
  userId: string;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.id = this.route.snapshot.params["id"];
    this.userService.getUser(this.id).subscribe((user) => {
      this.user = user;
      this.isLoading = false;
      this.userId = this.authService.getUserId();
    });
  }
  //*********edit habdler goes here */
  editHandler() {
    this.router.navigate(["edit-user", this.id]);
  }
  //**************delete handler goes here */
  deleteHandler() {
    this.userService.deleteUser(this.id);
  }
}
