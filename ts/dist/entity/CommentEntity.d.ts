import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Comment, CommentListMatch, CommentCreateData, CommentRemoveMatch } from '../FigmaTypes';
declare class CommentEntity extends FigmaEntityBase<Comment> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: CommentEntity): CommentEntity;
    list(this: any, reqmatch?: CommentListMatch, ctrl?: Control): Promise<CommentEntity[]>;
    create(this: any, reqdata?: CommentCreateData, ctrl?: Control): Promise<CommentEntity>;
    remove(this: any, reqmatch?: CommentRemoveMatch, ctrl?: Control): Promise<CommentEntity>;
}
export { CommentEntity };
