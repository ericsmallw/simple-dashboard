import type {ResendEmailService} from './resend_email_service';
import {inject, injectable} from 'tsyringe';

@injectable()
/**
 * @description Business logic for resending verification email
 */
export default class ResendEmailBusinessManager {
  private _resendEmailService: ResendEmailService;

  /**
   * @description Constructor
   * @param {ResendEmailService} resendEmailService
   */
  constructor(
      @inject('ResendEmailService')
        private resendEmailService: ResendEmailService
  ) {
    this._resendEmailService = resendEmailService;
  }

  /**
   * @description Resend verification email in Auth0
   * @param {string} userId - Auth0 user ID
   * @return {Promise<any>}
   */
  resendEmail(userId: string) {
    return this._resendEmailService.resendEmail(userId);
  }
}
