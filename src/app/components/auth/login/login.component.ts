import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  loginForm!: FormGroup;
  public hide: boolean = true;
  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.loginForm = this.fb.group({
      username: ['superuser', [Validators.required]],
      password: ['superuser', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe((user) => {
        console.log(!!user.value);
        if (!!user.value) {
          this._authService.redirectToUserManagement();
        }
      });
    }
  }
}
