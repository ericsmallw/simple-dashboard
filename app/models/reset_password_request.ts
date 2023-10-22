/**
 * PasswordResetRequest model
 */
export default class ResetPasswordRequest {
  userId!: string;
  oldPassword!: string;
  newPassword!: string;
  newPasswordAgain!: string;
}
