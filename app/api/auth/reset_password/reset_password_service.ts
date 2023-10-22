import ResetPasswordRequest from '@/app/models/reset_password_request';

export interface ResetPasswordService {
    resetPassword(resetPasswordRequest: ResetPasswordRequest): Promise<any>;
}
