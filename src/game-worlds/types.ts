export const API_CALL = Symbol('ApiCall');

export type GameWorld = {
	id: string;
	publicURL: string;
};

export type GameWorldsList = GameWorld[];

export type UserGameWorld = GameWorld & {
	habitatId: number;
};

export type UserGameWorldsList = UserGameWorld[];

export type LoginParameters = {
	userId: number;
	habitatId: number;
};

export type LoginDetailsResponse = {
	token: string;
	publicURL: string;
};
