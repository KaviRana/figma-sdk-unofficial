import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { OEmbed, OEmbedLoadMatch } from '../FigmaTypes';
declare class OEmbedEntity extends FigmaEntityBase<OEmbed> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: OEmbedEntity): OEmbedEntity;
    load(this: any, reqmatch?: OEmbedLoadMatch, ctrl?: Control): Promise<OEmbedEntity>;
}
export { OEmbedEntity };
