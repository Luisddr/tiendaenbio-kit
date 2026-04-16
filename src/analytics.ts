import { TiendaEnBioClient } from './client';

export interface EventParams {
  storeSlug: string;
  productId: string;
  eventType: 'view' | 'checkout_click';
}

export async function reportEvent(
  client: TiendaEnBioClient,
  params: EventParams,
): Promise<void> {
  try {
    await client.rpc('report_event', {
      _store_slug: params.storeSlug,
      _product_id: params.productId,
      _event_type: params.eventType,
    });
  } catch {
    // silenced — tracking must never break the storefront UX
  }
}
