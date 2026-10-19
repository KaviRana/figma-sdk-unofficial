import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch } from '../FigmaTypes';
declare class UserEntity extends FigmaEntityBase<User> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
