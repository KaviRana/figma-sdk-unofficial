import { FigmaEntityBase } from '../FigmaEntityBase';
import type { FigmaSDK } from '../FigmaSDK';
import type { Control } from '../types';
import type { Webhook, WebhookLoadMatch, WebhookListMatch, WebhookCreateData, WebhookUpdateData, WebhookRemoveMatch } from '../FigmaTypes';
declare class WebhookEntity extends FigmaEntityBase<Webhook> {
    constructor(client: FigmaSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    load(this: any, reqmatch?: WebhookLoadMatch, ctrl?: Control): Promise<WebhookEntity>;
    list(this: any, reqmatch?: WebhookListMatch, ctrl?: Control): Promise<WebhookEntity[]>;
    create(this: any, reqdata?: WebhookCreateData, ctrl?: Control): Promise<WebhookEntity>;
    update(this: any, reqdata?: WebhookUpdateData, ctrl?: Control): Promise<WebhookEntity>;
    remove(this: any, reqmatch?: WebhookRemoveMatch, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
