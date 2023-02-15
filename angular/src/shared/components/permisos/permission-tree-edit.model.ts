import { FlatPermissionDto } from './../../service-proxies/service-proxies';

export interface PermissionTreeEditModel {

    permissions: FlatPermissionDto[];

    grantedPermissionNames: string[];

}
