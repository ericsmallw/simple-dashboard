import 'reflect-metadata';
import {container} from 'tsyringe';
import UpdateNameBusinessManager from './../update_name_business_manager';
import Auth0UpdateNameService from './../auth0_update_name_service';

describe('Update Name Business Manager', () => {
    describe('updateName', () => {
        it('should call updateNameService.updateName', async () => {
            container.register('UpdateNameService', Auth0UpdateNameService);
            const updateNameSpy = jest
                .spyOn(Auth0UpdateNameService.prototype, 'updateName').mockImplementation((...args: unknown[]): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        resolve(new Response(JSON.stringify({}), {status: 200}));
                    });
                });

            const updateNameBusinessManager = container.resolve(UpdateNameBusinessManager);
            await updateNameBusinessManager.updateName({name: 'John Doe', userId: 'auth0|123456789'});

            expect(updateNameSpy).toBeCalled();
        });
    });
});
