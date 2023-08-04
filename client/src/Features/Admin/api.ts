import { Admin, AdminWithOutId } from './type';

export const authLogFetch = async (admin: AdminWithOutId): Promise<Admin> => {
  const res = await fetch('/api/admin/auth', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(admin),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json()
};

export const authCheckUserFetch = async (): Promise<Admin> => {
  const res = await fetch('/api/admin/check');
  return res.json();
};

export const logOutFetch = async (): Promise<void> => {
  await fetch('/api/admin/logout');
};
