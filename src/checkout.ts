import { TiendaEnBioClient } from './client';
import { CreateCustomerParams, CreateOrderParams, KitResult } from './types';

export async function createOrGetCustomer(
  client: TiendaEnBioClient,
  params: CreateCustomerParams
): Promise<KitResult<string>> {
  try {
    const { data, error } = await client.rpc('create_or_get_customer', {
      _store_id: params.storeId,
      _name: params.name,
      _email: params.email,
      _phone: params.phone,
    });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as string, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export async function createPendingOrder(
  client: TiendaEnBioClient,
  params: CreateOrderParams
): Promise<KitResult<string>> {
  try {
    const { data, error } = await client.rpc('create_pending_order', {
      _store_id: params.storeId,
      _customer_id: params.customerId,
      _product_id: params.productId,
      _quantity: params.quantity ?? 1,
    });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as string, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export function buildWhatsAppUrl(
  phone: string,
  product: { name: string; price: number },
  quantity: number = 1
): string {
  const normalizedPhone = phone.startsWith('+')
    ? '+' + phone.slice(1).replace(/[^\d]/g, '')
    : phone.replace(/[^\d]/g, '');

  const total = product.price * quantity;
  const message =
    `Hola, me interesa realizar el siguiente pedido:\n` +
    `Producto: ${product.name}\n` +
    `Cantidad: ${quantity}\n` +
    `Precio unitario: $${product.price}\n` +
    `Total: $${total}\n` +
    `¿Está disponible?`;

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
