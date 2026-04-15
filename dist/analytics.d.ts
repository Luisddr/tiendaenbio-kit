import { TiendaEnBioClient } from './client';
export interface EventParams {
    storeSlug: string;
    productId: string;
    eventType: 'view' | 'checkout_click';
}
export declare function reportEvent(_client: TiendaEnBioClient, _params: EventParams): Promise<void>;
