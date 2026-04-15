import { TiendaEnBioClient } from './client';
import { KitResult, PublicProduct, PublicProductDetail, PublicStore } from './types';

export async function getPublicStore(
  client: TiendaEnBioClient,
  storeSlug: string,
): Promise<KitResult<PublicStore | null>> {
  try {
    const { data, error } = await client.rpc('get_public_store', { store_slug: storeSlug });
    if (error) return { data: null, error: new Error(error.message) };
    const rows = data as PublicStore[];
    if (!rows || rows.length === 0) return { data: null, error: null };
    return { data: rows[0], error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export async function getPublicProducts(
  client: TiendaEnBioClient,
  storeSlug: string,
): Promise<KitResult<PublicProduct[]>> {
  try {
    const { data, error } = await client.rpc('get_public_products', { store_slug: storeSlug });
    if (error) return { data: null, error: new Error(error.message) };
    const rows = (data ?? []) as (Omit<PublicProduct, 'price'> & { price: string })[];
    const products: PublicProduct[] = rows.map((row) => ({ ...row, price: Number(row.price) }));
    return { data: products, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export async function getPublicProductBySlug(
  client: TiendaEnBioClient,
  storeSlug: string,
  productSlug: string,
): Promise<KitResult<PublicProductDetail | null>> {
  try {
    const { data, error } = await client.rpc('get_public_product_by_slug', {
      store_slug: storeSlug,
      product_slug: productSlug,
    });
    if (error) return { data: null, error: new Error(error.message) };
    const rows = (data ?? []) as (Omit<PublicProductDetail, 'price'> & { price: string })[];
    if (rows.length === 0) return { data: null, error: null };
    const row = rows[0];
    return { data: { ...row, price: Number(row.price) }, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
