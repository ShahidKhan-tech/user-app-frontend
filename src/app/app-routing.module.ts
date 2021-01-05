import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { LoginComponent } from "./components/login/login.component";
import { ResisterComponent } from "./components/resister/resister.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { UsersComponent } from "./components/users/users.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "", component: UsersComponent },
  { path: "login", component: LoginComponent },
  { path: "resister", component: ResisterComponent },
  { path: "add-user", component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: "userDetail/:id",
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-user/:id",
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
