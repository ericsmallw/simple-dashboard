/**
 * UsersService interface
 */
export interface UsersService {
    getUsers(page: number): Promise<any>;
}
