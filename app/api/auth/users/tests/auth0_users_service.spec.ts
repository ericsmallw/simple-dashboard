import 'reflect-metadata';
import {container} from "tsyringe";
import Auth0UsersService from "../auth0_users_service";

describe('Auth0 Update Users Service', () => {
    container.register('UsersService', Auth0UsersService);
    const usersService = container.resolve(Auth0UsersService);
    const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((...args: unknown[]): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve(new Response(JSON.stringify({total: 1}), {status: 200}));
        });
    });

    afterAll(() => {
       jest.restoreAllMocks();
    });

    describe('getUsers', () => {
       it('should call fetch', async () => {
            await usersService.getUsers(1);
            expect(fetchSpy).toBeCalled();
       });
    });

    describe('getLoggedInUsersInDateRange', () => {
       it('should call fetch', async () => {
           await usersService.getLoggedInUsersInDateRange('2020-01-01', '2020-01-01');
           expect(fetchSpy).toBeCalled();
       });
    });
});
