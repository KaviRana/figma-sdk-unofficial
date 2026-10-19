import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { DevResource, DevResourceListMatch, DevResourceCreateData, DevResourceUpdateData, DevResourceRemoveMatch } from '../FigmaTypes';
declare class DevResourceEntity extends FigmaEntityBase<DevResource> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: DevResourceEntity): DevResourceEntity;
    list(this: any, reqmatch?: DevResourceListMatch, ctrl?: Control): Promise<DevResourceEntity[]>;
    create(this: any, reqdata?: DevResourceCreateData, ctrl?: Control): Promise<DevResourceEntity>;
    update(this: any, reqdata?: DevResourceUpdateData, ctrl?: Control): Promise<DevResourceEntity>;
    remove(this: any, reqmatch?: DevResourceRemoveMatch, ctrl?: Control): Promise<DevResourceEntity>;
}
export { DevResourceEntity };
