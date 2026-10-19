import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Style, StyleLoadMatch } from '../FigmaTypes';
declare class StyleEntity extends FigmaEntityBase<Style> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: StyleEntity): StyleEntity;
    load(this: any, reqmatch?: StyleLoadMatch, ctrl?: Control): Promise<StyleEntity>;
}
export { StyleEntity };
