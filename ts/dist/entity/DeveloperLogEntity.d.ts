import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { DeveloperLog, DeveloperLogCreateData } from '../FigmaTypes';
declare class DeveloperLogEntity extends FigmaEntityBase<DeveloperLog> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: DeveloperLogEntity): DeveloperLogEntity;
    create(this: any, reqdata?: DeveloperLogCreateData, ctrl?: Control): Promise<DeveloperLogEntity>;
}
export { DeveloperLogEntity };
