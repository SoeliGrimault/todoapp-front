export interface UserType {
  id: string;
  email: string;
  password: string;
  name: string;
  picture: string;
  role?: string;
  accessToken?: string | undefined;
}
