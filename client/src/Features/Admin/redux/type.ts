export type Admin = {
  id: number;
  password: string;
};

export type AdminWithOutId = Omit<Admin, 'id'>;

export type AuthState = {
admin: Admin | undefined;
error: string | undefined;
};