import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-resister",
  templateUrl: "./resister.component.html",
  styleUrls: ["./resister.component.css"],
})
export class ResisterComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }
  //**************initiliazing the form */
  initForm() {
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  //***********submitting the form */
  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.authService.signUp(
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );
  }
}
