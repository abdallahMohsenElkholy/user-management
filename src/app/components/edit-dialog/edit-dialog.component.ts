import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User, permission } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    TranslateModule
  ],
  providers: [provideNativeDateAdapter() ,UserService],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  private _userService = inject(UserService);
  userForm!: FormGroup;
  hide = true;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      joinDate: ['', Validators.required],
      permissions: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    if (this.data.type === 'edit') {
      this.getUser(this.data.userId);
    }
  }

  getUser(id: number) {
    this._userService.getUser(id).subscribe((user: User) => {
      console.log(user);

      this.userForm = this.fb.group({
        id: [user.id],
        fullName: [user.fullName, Validators.required],
        joinDate: [user.joinDate, Validators.required],
        permissions: [user.permissions, Validators.required],
        location: [user.location, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
      });
    });
  }

  permissions: permission[] = this._userService.permissions;

  editUser() {
    this.dialogRef.close(this.userForm.value);
  }
}
