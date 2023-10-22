/**
 * UsersService interface
 */
export interface UsersService {
    getUsers(page: number): Promise<any>;
    getLoggedInUsersInDateRange(from: string, to: string): Promise<any>;
}
