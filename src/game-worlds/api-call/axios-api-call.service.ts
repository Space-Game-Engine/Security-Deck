import {HttpService} from '@nestjs/axios';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {AxiosError} from 'axios';
import {catchError, firstValueFrom} from 'rxjs';

import {LoginParameters} from '../types';

import {ApiCall} from './api-call.interface';
import {authHeader, loginUser, registerUser} from './api-constants';

@Injectable()
export class AxiosApiCallService implements ApiCall {
	constructor(private readonly httpService: HttpService) {}
	public async loginUser(
		loginParameters: LoginParameters,
		internalURL: string,
		authKey: string,
	): Promise<string> {
		const {data} = await firstValueFrom(
			this.httpService
				.post(`${internalURL}/${loginUser}`, loginParameters, {
					headers: {
						'Content-Type': 'application/json',
						[authHeader]: authKey,
					},
				})
				.pipe(
					catchError((error: AxiosError) => {
						throw new InternalServerErrorException(error);
					}),
				),
		);

		return data.access_token;
	}

	public async registerUser(
		userId: number,
		internalURL: string,
		authKey: string,
	): Promise<LoginParameters> {
		const {data} = await firstValueFrom(
			this.httpService
				.get<LoginParameters>(`${internalURL}/${registerUser}/${userId}`, {
					headers: {
						'Content-Type': 'application/json',
						[authHeader]: authKey,
					},
				})
				.pipe(
					catchError((error: AxiosError) => {
						throw new InternalServerErrorException(error);
					}),
				),
		);

		return data;
	}
}
