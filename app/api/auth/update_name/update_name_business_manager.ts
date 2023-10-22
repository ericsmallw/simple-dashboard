import {inject, injectable} from 'tsyringe';
import type {UpdateNameService} from './update_name_service';
import UpdateNameRequest from '@/app/models/update_name_request';

@injectable()
/**
 * @description UpdateNameBusinessManager
 */
export default class UpdateNameBusinessManager {
  private _updateNameService: UpdateNameService;

  /**
   * @description Constructor
   * @param {UpdateNameService} updateNameService
   */
  constructor(
      @inject('UpdateNameService') private updateNameService: UpdateNameService
  ) {
    this._updateNameService = updateNameService;
  }

  /**
   * @description Update name
   * @param {UpdateNameRequest} request
   * @return {Promise<any>}
   */
  updateName(request: UpdateNameRequest) {
    return this._updateNameService.updateName(request);
  }
}
