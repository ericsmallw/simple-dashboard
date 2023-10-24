import 'reflect-metadata';
import {GET} from '../route';
import UsersBusinessManager from './../users_business_manager';

describe('User Route', () => {
    describe('GET', () => {
        const getUsersSpy = jest.spyOn(UsersBusinessManager.prototype, 'getUsers').mockImplementation((...args: unknown[]): Promise<any> => {
            return new Promise((resolve, reject) => {
                resolve(new Response(JSON.stringify({}), {status: 200}));
            });
        });

        it('should not return an error if page is not provided', async () => {
            const result = await GET(new Request('https://example.com/api/auth/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }));

            expect(result).toHaveProperty('status', 200);
        });

        it('should call getUsers', async () => {
            await GET(new Request('https://example.com/api/auth/users?page=1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }));

            expect(getUsersSpy).toBeCalled();
        });
    });
});
