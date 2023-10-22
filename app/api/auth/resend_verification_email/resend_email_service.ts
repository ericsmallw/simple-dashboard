export interface ResendEmailService {
    resendEmail(userId: string): Promise<any>;
}
