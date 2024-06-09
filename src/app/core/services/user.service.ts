// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, permission } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { users } from '../enums/user.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  allUsers = new BehaviorSubject<User[]>([]);
  usersForDisply = new BehaviorSubject<User[]>([]);
  permissions: permission[] = [
    { name: 'Admin', value: 1 },
    { name: 'Contributor', value: 2 },
    { name: 'Viewer', value: 3 },
  ];
  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl + users.get).subscribe((users) => {
      this.allUsers.next(users);
      this.usersForDisply.next(users);
    });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl + users.get}/${id}`);
  }

  addUser(user: User): void {
    let NewUser: User = { ...user, image: this.getRandomImage() };
    this.http.post<User>(this.apiUrl + users.post, NewUser).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(user: User): Observable<User> {
    let NewUser: User = { ...user, image: this.getRandomImage() };
    return this.http.put<User>(
      `${this.apiUrl + users.update}/${user.id}`,
      NewUser
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + users.delete}/${userId}`);
  }

  searchUsers(query: string): void {
    let users = this.allUsers.getValue();
    users = users.filter((user: User) => {
      return (
        user['fullName']?.toLowerCase().includes(query.toLowerCase()) ||
        user['email']?.toLowerCase().includes(query.toLowerCase()) ||
        user['location']?.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.usersForDisply.next(users);
  }

  filterByPermission(permission: number): void {
    if (permission === 0) {
      this.usersForDisply.next(this.allUsers.getValue());
      return;
    }
    let users = this.allUsers.getValue();
    users = users.filter((user: User) => user['permissions'] === permission);
    this.usersForDisply.next(users);
  }

  userImages: string[] = [
    '../../../assets/images/user1.jpg',
    '../../../assets/images/user2.jpg',
    '../../../assets/images/user3.jpg',
  ];

  getRandomImage() {
    return this.userImages[Math.floor(Math.random() * this.userImages.length)];
  }
}
