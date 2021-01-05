import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlashMessagesModule } from "angular2-flash-messages";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./components/users/users.component";
import { UserCardComponent } from "./components/user-card/user-card.component";
import { LoginComponent } from "./components/login/login.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { ResisterComponent } from "./components/resister/resister.component";
import { AuthInterceptor } from "./services/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserCardComponent,
    LoginComponent,
    AddUserComponent,
    NavbarComponent,
    UserDetailComponent,
    ResisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
