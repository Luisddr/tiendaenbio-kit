# @atiempo/tiendaenbio-kit

Kit de integración para tiendas artesanales de TiendaEnBio: expone RPCs de lectura, helpers de checkout por WhatsApp y utilidades de analítica.

## Instalación

```bash
npm install @atiempo/tiendaenbio-kit
```

## Configuración

Instancia el cliente pasando la URL pública y la clave anónima de tu proyecto Supabase.
Estas variables se llaman habitualmente `SUPABASE_URL` y `SUPABASE_ANON_KEY`
(o `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` en Next.js,
`PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` en Astro).

```ts
import { createTiendaEnBioClient } from '@atiempo/tiendaenbio-kit';

const client = createTiendaEnBioClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

## RPCs de lectura

Todas las funciones devuelven `{ data, error }`. Si `error` es `null`, `data`
contiene el resultado; si ocurre un problema, `data` es `null` y `error` es un
`Error`. El campo `price` siempre llega como `number`, ya convertido internamente.

### getPublicStore

```ts
import { createTiendaEnBioClient, getPublicStore } from '@atiempo/tiendaenbio-kit';

const client = createTiendaEnBioClient(supabaseUrl, supabaseAnonKey);

const { data: store, error } = await getPublicStore(client, 'mi-tienda');
if (error) {
  console.error(error.message);
} else {
  console.log(store?.store_name);
}
```

### getPublicProducts

```ts
import { createTiendaEnBioClient, getPublicProducts } from '@atiempo/tiendaenbio-kit';

const client = createTiendaEnBioClient(supabaseUrl, supabaseAnonKey);

const { data: products, error } = await getPublicProducts(client, 'mi-tienda');
if (error) {
  console.error(error.message);
} else {
  // product.price es number
  products?.forEach((p) => console.log(p.name, p.price));
}
```

### getPublicProductBySlug

```ts
import { createTiendaEnBioClient, getPublicProductBySlug } from '@atiempo/tiendaenbio-kit';

const client = createTiendaEnBioClient(supabaseUrl, supabaseAnonKey);

const { data: product, error } = await getPublicProductBySlug(
  client,
  'mi-tienda',
  'mi-producto',
);
if (error) {
  console.error(error.message);
} else {
  console.log(product?.name, product?.price); // price es number
}
```

## Flujo de checkout WhatsApp

Ejemplo end-to-end: obtener el producto, registrar al comprador, crear la orden
y construir el link de WhatsApp.

```ts
import {
  createTiendaEnBioClient,
  getPublicProductBySlug,
  createOrGetCustomer,
  createPendingOrder,
  buildWhatsAppUrl,
} from '@atiempo/tiendaenbio-kit';

const client = createTiendaEnBioClient(supabaseUrl, supabaseAnonKey);

// 1. Obtener producto y store_id
const { data: product, error: productError } = await getPublicProductBySlug(
  client,
  'mi-tienda',
  'mi-producto',
);
if (productError || !product) throw productError;

// 2. Registrar o recuperar el comprador
const { data: customer, error: customerError } = await createOrGetCustomer(
  client,
  {
    storeId: product.store_id,
    name: 'Ana García',
    email: 'ana@ejemplo.com',
    phone: '+34600000000',
  },
);
if (customerError || !customer) throw customerError;

// 3. Crear la orden en estado pendiente
const { data: order, error: orderError } = await createPendingOrder(client, {
  storeId: product.store_id,
  customerId: customer.customer_id,
  productId: product.product_id,
  quantity: 1,
});
if (orderError || !order) throw orderError;

// 4. Construir el link de WhatsApp y redirigir
const whatsappUrl = buildWhatsAppUrl({
  whatsapp: product.whatsapp!,
  productName: product.name,
  orderId: order.order_id,
});
window.open(whatsappUrl, '_blank');
```

## Conectar una tienda nueva en menos de 30 minutos

1. **Instalar el paquete**

   ```bash
   npm install @atiempo/tiendaenbio-kit
   ```

2. **Configurar variables de entorno**

   Obtén la URL y la clave anónima desde el dashboard de Supabase →
   **Project Settings → API**.

   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_ANON_KEY=eyJ...
   ```

3. **Instanciar el cliente**

   ```ts
   import { createTiendaEnBioClient } from '@atiempo/tiendaenbio-kit';
   const client = createTiendaEnBioClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY!,
   );
   ```

4. **Verificar la conexión**

   ```ts
   const { data, error } = await getPublicStore(client, 'tu-slug');
   console.log(data); // debe devolver los datos de tu tienda
   ```

5. **Implementar el flujo de checkout** usando los helpers de `checkout.ts`:
   `createOrGetCustomer`, `createPendingOrder` y `buildWhatsAppUrl`
   (ver sección anterior).

## Variables de entorno por stack

| Stack | Variables |
|---|---|
| **HTML/JS plano** | Define `SUPABASE_URL` y `SUPABASE_ANON_KEY` como `const` directamente en el código, o cárgalas desde un `.env` usando un build step mínimo (esbuild, Vite). |
| **Next.js** | Usa `.env.local` con el prefijo `NEXT_PUBLIC_`: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. |
| **Astro** | Usa `.env` o `.env.local` con el prefijo `PUBLIC_`: `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`. |
