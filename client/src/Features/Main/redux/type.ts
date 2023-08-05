export type Gamer = {
  id: number;
  name: string;
  select: string;
  status?: boolean;
};

export type GamerId = Gamer['id'];

export type GamerObg = {
  id: GamerId;
  status: boolean;
}

export type GamerWithOutId = Omit<Gamer, 'id'>;

export type GamersState = {
  gamers: Gamer[];
  error: string | undefined;
};
