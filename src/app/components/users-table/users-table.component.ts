import { users } from './../../core/enums/user.enum';
import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { UsersControlsComponent } from '../users-controls/users-controls.component';
import { UserService } from '../../core/services/user.service';
import { User, permission } from '../../core/interfaces/user.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { HeaderComponent } from '../layout/header/header.component';
@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    TranslateModule,
    UsersControlsComponent,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    CommonModule,
    HeaderComponent,
    DatePipe
  ],
  providers: [
    DatePipe
  ]
})
export class UsersTableComponent {
  userId!: number;

  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  public users: User[] = [];
  permissions: permission[] = this._userService.permissions;

  displayedColumns: string[] = [
    'select',
    'fullname',
    'email',
    'location',
    'joinDate',
    'permissions',
    'edit',
  ];

  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  pageSizes = [5, 7, 10, 15];

  constructor(public dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getUsers();
    this._userService.usersForDisply.subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  logout() {
    this._authService.logout();
  }

  getUsers() {
    this._userService.getUsers();
  }

  deleteUser(userId: number) {
    this.userId = userId;
    this.openDeleteDialog('500ms', '500ms');
  }

  editUser(userId: number) {
    this.userId = userId;
    this.openEditDialog('500ms', '500ms');
  }

  getFormatedDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (!!result) {
        this._userService.deleteUser(this.userId).subscribe(() => {
          this.getUsers();
        });
      }
    });
  }
  openEditDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { userId: this.userId, type: 'edit' },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('The dialog was closed');
      if (!!result) {
        this._userService.updateUser(result).subscribe(() => {
          this.getUsers();
        });
      }
    });
  }

  getPermissions(permissions: number) {
    return this.permissions.find((p) => p.value === permissions)?.name;
  }
}
