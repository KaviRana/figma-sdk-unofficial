import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { ComponentSet, ComponentSetLoadMatch } from '../FigmaTypes';
declare class ComponentSetEntity extends FigmaEntityBase<ComponentSet> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: ComponentSetEntity): ComponentSetEntity;
    load(this: any, reqmatch?: ComponentSetLoadMatch, ctrl?: Control): Promise<ComponentSetEntity>;
}
export { ComponentSetEntity };
