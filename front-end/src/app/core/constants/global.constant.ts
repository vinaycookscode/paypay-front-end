export enum GENDER_TYPES {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export  enum USER_ROLES_ENUM {
  SUPER = 'SUPER_ROLE',
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE'
}

export let USER_ROLES_FOR_VIEW: { [key: string]: string} = {
  SUPER_ROLE: 'SUPER',
  USER_ROLE: 'USER',
  ADMIN_ROLE: 'ADMIN'
};

export let DB_ROLES_BY_STRING: { [key: string]: string} = {
  SUPER: 'SUPER_ROLE',
  USER : 'USER_ROLE',
  ADMIN : 'ADMIN_ROLE'
};

export const USER_ROLES_ON_SCREEN: { SUPER_ROLE: string, USER_ROLE: string, ADMIN_ROLE: string } = {
  SUPER_ROLE: 'Super',
  USER_ROLE: 'User',
  ADMIN_ROLE: 'Admin',
};


export enum NAVIGATE_CONSTANTS {
  ADD_USER = 'add user',
  DELETE_USER = 'delete user',
  EDIT_USER = 'edit user',
  ADD_PERFORMANCE_REVIEW = 'add review'
}
