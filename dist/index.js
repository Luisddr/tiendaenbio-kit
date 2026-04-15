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
async function createOrGetCustomer(client, params) {
  try {
    const { data, error } = await client.rpc("create_or_get_customer", {
      _store_id: params.storeId,
      _name: params.name,
      _email: params.email,
      _phone: params.phone
    });
    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
async function createPendingOrder(client, params) {
  try {
    const { data, error } = await client.rpc("create_pending_order", {
      _store_id: params.storeId,
      _customer_id: params.customerId,
      _product_id: params.productId,
      _quantity: params.quantity ?? 1
    });
    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
function buildWhatsAppUrl(phone, product, quantity = 1) {
  const normalizedPhone = phone.startsWith("+") ? "+" + phone.slice(1).replace(/[^\d]/g, "") : phone.replace(/[^\d]/g, "");
  const total = product.price * quantity;
  const message = `Hola, me interesa realizar el siguiente pedido:
Producto: ${product.name}
Cantidad: ${quantity}
Precio unitario: $${product.price}
Total: $${total}
\xBFEst\xE1 disponible?`;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

// src/analytics.ts
async function reportEvent() {
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
