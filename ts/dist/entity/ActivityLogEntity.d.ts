import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { ActivityLog, ActivityLogLoadMatch } from '../FigmaTypes';
declare class ActivityLogEntity extends FigmaEntityBase<ActivityLog> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: ActivityLogEntity): ActivityLogEntity;
    load(this: any, reqmatch?: ActivityLogLoadMatch, ctrl?: Control): Promise<ActivityLogEntity>;
}
export { ActivityLogEntity };
