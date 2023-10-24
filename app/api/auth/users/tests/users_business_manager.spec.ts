import 'reflect-metadata';
import {container} from 'tsyringe';
import moment from 'moment';
import Auth0UsersService from './../auth0_users_service';
import UsersBusinessManager from './../users_business_manager';

describe('Users Business Manager', () => {
    container.register('UsersService', Auth0UsersService);
    const usersBusinessManager = container.resolve(UsersBusinessManager);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('getUsers', () => {
        it('should call usersService.getUsers', async () => {
            const getUsersSpy = jest.spyOn(Auth0UsersService.prototype, 'getUsers').mockImplementation((...args: unknown[]): Promise<any> => {
                return new Promise((resolve, reject) => {
                    resolve(new Response(JSON.stringify({}), {status: 200}));
                });
            });

            await usersBusinessManager.getUsers(1);

            expect(getUsersSpy).toBeCalled();
        });
    });

    describe('getLoggedInUsersInDateRange', () => {
        it('should throw an error if start date is not in the correct format', async () => {
            const result = await usersBusinessManager.getLoggedInUsersInDateRange('', '10/12/2020');

            expect(result).toHaveProperty('status', 400);
        });

        it('should throw an error if end date is not in the correct format', async () => {
           const result = await usersBusinessManager.getLoggedInUsersInDateRange('10/12/2020', '');

           expect(result).toHaveProperty('status', 400);
        });

        it('should call usersService.getLoggedInUsersInDateRange', async () => {
           const getLoggedInUsersInDateRangeSpy = jest.spyOn(Auth0UsersService.prototype, 'getLoggedInUsersInDateRange').mockImplementation((...args: unknown[]): Promise<any> => {
                return new Promise((resolve, reject) => {
                     resolve(new Response(JSON.stringify({}), {status: 200}));
                });
           });

           await usersBusinessManager.getLoggedInUsersInDateRange(moment().format(), moment().format());

           expect(getLoggedInUsersInDateRangeSpy).toBeCalled();
        });
    });
});
