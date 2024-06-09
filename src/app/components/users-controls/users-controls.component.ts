import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { User, permission } from '../../core/interfaces/user.interface';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-controls',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    EditDialogComponent,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './users-controls.component.html',
  styleUrl: './users-controls.component.scss',
  // providers: [UserService],
})
export class UsersControlsComponent {
  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  selectedPermission: permission | undefined;
  constructor(public dialog: MatDialog) {
    this.permissions.unshift({
      name: 'all',
      value: 0,
    });
    this.filterByPermission(0);
  }

  permissions: permission[] = this._userService.permissions;
  addUser() {
    this.openAddDialog('500ms', '500ms');
  }

  searchUsers(event: any) {
    this._userService.searchUsers(event.target.value);
  }

  filterByPermission(permission: number) {
    this.selectedPermission = this.permissions.find(
      (p) => p.value === permission
    );
    this._userService.filterByPermission(permission);
  }

  openAddDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { type: 'add' },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('The dialog was closed');
      if (!!result) {
        this._userService.addUser(result);
        this._userService.getUsers();
      }
    });
  }
}
