import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Folder, FolderLoadMatch, FolderListMatch } from '../FigmaTypes';
declare class FolderEntity extends FigmaEntityBase<Folder> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: FolderEntity): FolderEntity;
    load(this: any, reqmatch?: FolderLoadMatch, ctrl?: Control): Promise<FolderEntity>;
    list(this: any, reqmatch?: FolderListMatch, ctrl?: Control): Promise<FolderEntity[]>;
}
export { FolderEntity };
