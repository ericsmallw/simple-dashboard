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
}
