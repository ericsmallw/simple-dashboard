import 'reflect-metadata';
import {container} from "tsyringe";
import Auth0UpdateNameService from "./../auth0_update_name_service";

describe('Auth0 Update Name Service', () => {
    afterAll(() => {
       jest.restoreAllMocks();
    });

   describe('updateName', () => {
      it('should call fetch', async () => {
          const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((...args: unknown[]): Promise<any> => {
              return new Promise((resolve, reject) => {
                  resolve(new Response(JSON.stringify({}), {status: 200}));
              });
          });
          const auth0UpdateNameService = container.resolve(Auth0UpdateNameService);
          await auth0UpdateNameService.updateName({name: 'John Doe', userId: 'auth0|123456789'});

          expect(fetchSpy).toBeCalled();
      });
   });
});
