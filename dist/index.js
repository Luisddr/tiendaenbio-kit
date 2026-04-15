// src/client.ts
import { createClient } from "@supabase/supabase-js";
function createTiendaEnBioClient(supabaseUrl, supabaseAnonKey) {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// src/store.ts
async function getPublicStore(client, storeSlug) {
  try {
    const { data, error } = await client.rpc("get_public_store", { store_slug: storeSlug });
    if (error) return { data: null, error: new Error(error.message) };
    const rows = data;
    if (!rows || rows.length === 0) return { data: null, error: null };
    return { data: rows[0], error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
async function getPublicProducts(client, storeSlug) {
  try {
    const { data, error } = await client.rpc("get_public_products", { store_slug: storeSlug });
    if (error) return { data: null, error: new Error(error.message) };
    const rows = data ?? [];
    const products = rows.map((row) => ({ ...row, price: Number(row.price) }));
    return { data: products, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
async function getPublicProductBySlug(client, storeSlug, productSlug) {
  try {
    const { data, error } = await client.rpc("get_public_product_by_slug", {
      store_slug: storeSlug,
      product_slug: productSlug
    });
    if (error) return { data: null, error: new Error(error.message) };
    const rows = data ?? [];
    if (rows.length === 0) return { data: null, error: null };
    const row = rows[0];
    return { data: { ...row, price: Number(row.price) }, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// src/checkout.ts
async function createOrGetCustomer() {
}
async function createPendingOrder() {
}
function buildWhatsAppUrl() {
}

// src/analytics.ts
async function reportEvent(_client, _params) {
  return Promise.resolve();
}
export {
  buildWhatsAppUrl,
  createOrGetCustomer,
  createPendingOrder,
  createTiendaEnBioClient,
  getPublicProductBySlug,
  getPublicProducts,
  getPublicStore,
  reportEvent
};
