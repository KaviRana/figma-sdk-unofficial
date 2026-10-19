import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { CommentReaction, CommentReactionListMatch, CommentReactionCreateData, CommentReactionRemoveMatch } from '../FigmaTypes';
declare class CommentReactionEntity extends FigmaEntityBase<CommentReaction> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: CommentReactionEntity): CommentReactionEntity;
    list(this: any, reqmatch?: CommentReactionListMatch, ctrl?: Control): Promise<CommentReactionEntity[]>;
    create(this: any, reqdata?: CommentReactionCreateData, ctrl?: Control): Promise<CommentReactionEntity>;
    remove(this: any, reqmatch?: CommentReactionRemoveMatch, ctrl?: Control): Promise<CommentReactionEntity>;
}
export { CommentReactionEntity };
