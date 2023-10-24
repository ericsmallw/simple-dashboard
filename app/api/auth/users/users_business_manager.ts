import {inject, injectable} from 'tsyringe';
import type {UsersService} from './users_service';

@injectable()
/**
 * @description Business manager for users
 */
export default class UsersBusinessManager {
  private _usersService: UsersService;

  /**
   * @description Constructor
   * @param {UsersService} usersService
   */
  constructor(
      @inject('UsersService') private usersService: UsersService
  ) {
    this._usersService = usersService;
  }

  /**
   * @description Get users
   * @param {number} page
   * @return {Promise<any>}
   */
  getUsers(page: number) {
    return this._usersService.getUsers(page);
  }

  /**
   * @description Get number of logged in users in a date range
   * @param {Date} from
   * @param {Date} to
   * @return {Promise<any>}
   */
  getLoggedInUsersInDateRange(from: string, to: string) {
    const FROM = new Date(from);
    const TO = new Date(to);
    if (
      FROM.toString() === 'Invalid Date' ||
      TO.toString() === 'Invalid Date'
    ) {
      return Response.json({error: 'Invalid date'}, {status: 400});
    }

    return this._usersService.getLoggedInUsersInDateRange(from, to);
  }
}
