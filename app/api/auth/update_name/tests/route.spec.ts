import {PATCH} from '../route';
import UpdateNameBusinessManager from "./../update_name_business_manager";
describe('Update Name Route', () => {
    const URL = 'https://localhost:3000/api/auth/update_name';
   describe('PATCH', () => {
         it('should return an error if name is missing from body', async () => {
              const result = await PATCH(new Request(URL, {
                method: 'PATCH',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
              }));

              expect(result).toHaveProperty('status', 400);
         });

         it('should call updateNameService.updateName if name is in body', async () => {
            const updateNameSpy = jest
                .spyOn(UpdateNameBusinessManager.prototype, 'updateName')
                .mockImplementation((...args: unknown[]): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        resolve(new Response(JSON.stringify({}), {status: 200}));
                    });
                });

            await PATCH(new Request(URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'John Doe'
                })
            }));

            expect(updateNameSpy).toBeCalled();
         });
   });
});
