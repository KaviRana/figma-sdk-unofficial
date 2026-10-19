import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { AiUsage, AiUsageListMatch } from '../FigmaTypes';
declare class AiUsageEntity extends FigmaEntityBase<AiUsage> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: AiUsageEntity): AiUsageEntity;
    list(this: any, reqmatch?: AiUsageListMatch, ctrl?: Control): Promise<AiUsageEntity[]>;
}
export { AiUsageEntity };
