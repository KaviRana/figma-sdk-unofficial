import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Variable, VariableLoadMatch, VariableCreateData } from '../FigmaTypes';
declare class VariableEntity extends FigmaEntityBase<Variable> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: VariableEntity): VariableEntity;
    load(this: any, reqmatch?: VariableLoadMatch, ctrl?: Control): Promise<VariableEntity>;
    create(this: any, reqdata?: VariableCreateData, ctrl?: Control): Promise<VariableEntity>;
}
export { VariableEntity };
