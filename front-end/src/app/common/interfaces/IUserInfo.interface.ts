export interface IUserInterface {
  name: string;
  gender: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  photo?: string;
  hobby: string;
  role: string;
  password?: string;
  isActive: boolean;
  _id: string;
}

export interface ICountry {
  id: string;
   name: string;
}
