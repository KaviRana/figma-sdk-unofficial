import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { File, FileLoadMatch, FileListMatch } from '../FigmaTypes';
declare class FileEntity extends FigmaEntityBase<File> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: FileEntity): FileEntity;
    load(this: any, reqmatch?: FileLoadMatch, ctrl?: Control): Promise<FileEntity>;
    list(this: any, reqmatch?: FileListMatch, ctrl?: Control): Promise<FileEntity[]>;
}
export { FileEntity };
