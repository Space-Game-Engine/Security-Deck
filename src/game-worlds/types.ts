export type GameWorld = {
	id: string;
	publicURL: string;
};

export type GameWorldsList = GameWorld[];

export type UserGameWorld = GameWorld & {
	habitatId: number;
};

export type UserGameWorldsList = UserGameWorld[];
