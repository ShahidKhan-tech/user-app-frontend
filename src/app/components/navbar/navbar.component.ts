import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authSub: Subscription;
  email: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.email = this.authService.getEmail();
    this.authSub = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.email = this.authService.getEmail();
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
