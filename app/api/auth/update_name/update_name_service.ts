import UpdateNameRequest from '@/app/models/update_name_request';

export interface UpdateNameService{
    updateName(request: UpdateNameRequest): Promise<any>;
}
