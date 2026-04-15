import { TiendaEnBioClient } from './client';

export interface EventParams {
  storeSlug: string;
  productId: string;
  eventType: 'view' | 'checkout_click';
}

export async function reportEvent(
  _client: TiendaEnBioClient,
  _params: EventParams,
): Promise<void> {
  return Promise.resolve();
}
