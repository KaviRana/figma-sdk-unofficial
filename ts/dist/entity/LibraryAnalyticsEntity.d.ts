import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { LibraryAnalytics, LibraryAnalyticsLoadMatch } from '../FigmaTypes';
declare class LibraryAnalyticsEntity extends FigmaEntityBase<LibraryAnalytics> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: LibraryAnalyticsEntity): LibraryAnalyticsEntity;
    load(this: any, reqmatch?: LibraryAnalyticsLoadMatch, ctrl?: Control): Promise<LibraryAnalyticsEntity>;
}
export { LibraryAnalyticsEntity };
