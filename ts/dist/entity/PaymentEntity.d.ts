import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Payment, PaymentLoadMatch } from '../FigmaTypes';
declare class PaymentEntity extends FigmaEntityBase<Payment> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: PaymentEntity): PaymentEntity;
    load(this: any, reqmatch?: PaymentLoadMatch, ctrl?: Control): Promise<PaymentEntity>;
}
export { PaymentEntity };
