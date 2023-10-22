import VerifyPasswordRequest from '@/app/models/verify_password_request';

export interface VerifyPasswordService {
    verifyPassword(verifyPasswordRequest: VerifyPasswordRequest): Promise<any>;
}
