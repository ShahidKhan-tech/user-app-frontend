import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  //**************initiliazing the form */
  initForm() {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  //***********submitting the form */

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.signIn(
      this.signInForm.value.email,
      this.signInForm.value.password
    );
  }
}
