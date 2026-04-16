import { TiendaEnBioClient } from './client';
export interface EventParams {
    storeSlug: string;
    productId: string;
    eventType: 'view' | 'checkout_click';
}
export declare function reportEvent(client: TiendaEnBioClient, params: EventParams): Promise<void>;
