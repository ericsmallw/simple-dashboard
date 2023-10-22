import {inject, injectable} from 'tsyringe';
import ResetPasswordRequest from '@/app/models/reset_password_request';
import type {ResetPasswordService} from './reset_password_service';

@injectable()
/**
 * @description Business manager for reset password
 */
export default class ResetPasswordBusinessManager {
  private _resetPasswordService: ResetPasswordService;

  /**
   * @description Constructor
   * @param {ResetPasswordService} resetPasswordService
   */
  constructor(
    @inject('ResetPasswordService')
      private resetPasswordService: ResetPasswordService
  ) {
    this._resetPasswordService = resetPasswordService;
  }

  /**
   * @description Reset password
   * @param {ResetPasswordRequest} request
   * @return {Promise<any>}
   **/
  async resetPassword(request: ResetPasswordRequest): Promise<any> {
    console.log('*****1');
    const ERRORS = this.verifyRequest(request);
    if (ERRORS.length > 0) {
      return Response.json({error: ERRORS}, {status: 400});
    }

    return this._resetPasswordService.resetPassword(request);
  }

  /**
   * @description Verify request
   * @param {ResetPasswordRequest} request
   * @return {string[]}
   **/
  verifyRequest(request: ResetPasswordRequest): string[] {
    const ERRORS: string[] = [];

    if (request.newPassword !== request.newPasswordAgain) {
      ERRORS.push('New passwords do not match');
    }

    if (request.newPassword.length < 8) {
      ERRORS.push('New password must be at least 8 characters long');
    }

    if (!/\d/.test(request.newPassword)) {
      ERRORS.push('New password must contain at least 1 number');
    }

    if (!/[A-Z]/.test(request.newPassword)) {
      ERRORS.push('New password must contain at least 1 uppercase letter');
    }

    if (!/[a-z]/.test(request.newPassword)) {
      ERRORS.push('New password must contain at least 1 lowercase letter');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(request.newPassword)) {
      ERRORS.push('New password must contain at least 1 special character');
    }

    return ERRORS;
  }
}
