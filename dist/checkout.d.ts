import { TiendaEnBioClient } from './client';
import { CreateCustomerParams, CreateOrderParams, KitResult } from './types';
export declare function createOrGetCustomer(client: TiendaEnBioClient, params: CreateCustomerParams): Promise<KitResult<string>>;
export declare function createPendingOrder(client: TiendaEnBioClient, params: CreateOrderParams): Promise<KitResult<string>>;
export declare function buildWhatsAppUrl(phone: string, product: {
    name: string;
    price: number;
}, quantity?: number): string;
