import {LoginParameters} from '../types';

export interface ApiCall {
	registerUser(
		userId: number,
		internalURL: string,
		authKey?: string,
	): Promise<LoginParameters>;
	loginUser(
		loginParameters: LoginParameters,
		internalURL: string,
		authKey?: string,
	): Promise<string>;
}
