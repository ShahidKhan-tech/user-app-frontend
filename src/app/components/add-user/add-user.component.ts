import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  id: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.getId();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      city: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  private getId() {
    this.id = this.route.snapshot.params["id"];
    if (!this.id) {
      return;
    }

    this.userService.getUser(this.id).subscribe(
      (user) => {
        this.user = user;
        this.userForm.patchValue({
          name: this.user.name,
          city: this.user.city,
          description: this.user.description,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    if (this.user) {
      this.userService.updateUser(this.id, this.userForm.value);
    } else {
      this.userService.createNewUser(
        this.userForm.value.name,
        this.userForm.value.city,
        this.userForm.value.description
      );
    }
  }
  onCancel() {
    this.userForm.reset();
  }
}
