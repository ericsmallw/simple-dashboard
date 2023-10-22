import VerifyPasswordRequest from '@/app/models/verify_password_request';
import {inject, injectable} from 'tsyringe';
import type {VerifyPasswordService}
  from '@/app/api/auth/verify_password/verify_password_service';

@injectable()
/**
 * @description Business manager for verify password
 */
export default class VerifyPasswordBusinessManager {
  private _verifyPasswordService: VerifyPasswordService;

  /**
   * @description Constructor
   * @param {VerifyPasswordService} verifyPasswordService
   **/
  constructor(
      @inject('VerifyPasswordService')
        private verifyPasswordService: VerifyPasswordService
  ) {
    this._verifyPasswordService = verifyPasswordService;
  }

  /**
   * @description Verify password
   * @param {VerifyPasswordRequest} verifyPasswordRequest
   * @return {Promise<any>}
   **/
  verifyPassword(verifyPasswordRequest: VerifyPasswordRequest) {
    console.log('*****2');
    return this._verifyPasswordService.verifyPassword(verifyPasswordRequest);
  }
}
