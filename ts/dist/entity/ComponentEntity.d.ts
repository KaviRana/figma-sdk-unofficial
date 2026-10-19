import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Component, ComponentLoadMatch } from '../FigmaTypes';
declare class ComponentEntity extends FigmaEntityBase<Component> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: ComponentEntity): ComponentEntity;
    load(this: any, reqmatch?: ComponentLoadMatch, ctrl?: Control): Promise<ComponentEntity>;
}
export { ComponentEntity };
