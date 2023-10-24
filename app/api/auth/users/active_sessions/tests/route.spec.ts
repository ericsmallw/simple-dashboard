import 'reflect-metadata';
import {container} from "tsyringe";
import {GET} from './../route';
import Auth0UsersService from "./../../auth0_users_service";
import UsersBusinessManager from "./../../users_business_manager";
describe('Active Sessions Route', () => {
    container.register('UsersService', Auth0UsersService);
    describe('GET', () => {
        it('should return an error if FROM parameter is not provided', async () => {
            const result = await GET(new Request('https://example.com/api/auth/users/active_sessions?to=2023-10-31', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should return an error if TO parameter is not provided', async () => {
            const result = await GET(new Request('https://example.com/api/auth/users/active_sessions?from=2023-10-01', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should call getLoggedInUsersInDateRange if no parameters are missing', async () => {
            const getLoggedInUsersInDateRangeSpy = jest
                .spyOn(UsersBusinessManager.prototype, 'getLoggedInUsersInDateRange')
                .mockImplementation((...args: unknown[]): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        resolve(new Response(JSON.stringify({}), {status: 200}));
                    });
                });

            await GET(new Request('https://example.com/api/auth/users/active_sessions?from=2023-10-01&to=2023-10-31', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }));

            expect(getLoggedInUsersInDateRangeSpy).toBeCalled();
        });
    });
});
