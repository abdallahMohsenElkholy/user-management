export interface User {
  id?: any;
  username?: string;
  fullName?: string;
  password?: string;
  permissions?: number;
  joinDate?: string;
  location?: string;
  email?: string;
  image?: string;
}

export interface permission {
  name: string;
  value: number;
}
