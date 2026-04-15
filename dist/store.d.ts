import { TiendaEnBioClient } from './client';
import { KitResult, PublicProduct, PublicProductDetail, PublicStore } from './types';
export declare function getPublicStore(client: TiendaEnBioClient, storeSlug: string): Promise<KitResult<PublicStore | null>>;
export declare function getPublicProducts(client: TiendaEnBioClient, storeSlug: string): Promise<KitResult<PublicProduct[]>>;
export declare function getPublicProductBySlug(client: TiendaEnBioClient, storeSlug: string, productSlug: string): Promise<KitResult<PublicProductDetail | null>>;
