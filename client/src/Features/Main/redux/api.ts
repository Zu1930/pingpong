import { Gamer, GamerObg, GamerWithOutId } from './type';

export const getGamersFetch = async (): Promise<Gamer[]> => {
  const res = await fetch('/api/gamers', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw message;
  }
  const data = await res.json();
  return data;
};

export const addGamerFetch = async (value: GamerWithOutId): Promise<Gamer> => {
  console.log(value);

  const res = await fetch('/api/gamers', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  const data = await res.json();
  return data;
};

export const changeStatusFetch = async (value: GamerObg): Promise<Gamer> => {
  console.log(value);

  const res = await fetch(`/api/gamers/${value.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ status: value.status }),
  });
  const data = await res.json();
  console.log(data);

  return data;
};

// export const deleteCourseFetch = async (value: GamerId): Promise<GamerId> => {
//   const res = await fetch(`/api/gamers/${value}`, {
//     method: 'DELETE',
//   });
//   return res.json();
// };
