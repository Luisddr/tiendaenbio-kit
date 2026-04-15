export interface PublicStore {
    store_id: string;
    store_name: string;
    whatsapp: string | null;
    instagram: string | null;
    tiktok: string | null;
    contact_email: string | null;
}
export interface PublicProduct {
    product_id: string;
    name: string;
    slug: string | null;
    description: string | null;
    price: number;
    type: string | null;
    image_url: string | null;
}
export interface PublicProductDetail {
    product_id: string;
    name: string;
    slug: string | null;
    description: string | null;
    price: number;
    type: string | null;
    image_url: string | null;
    store_id: string;
    store_name: string;
    whatsapp: string | null;
}
export interface CreateCustomerParams {
    storeId: string;
    name: string;
    email: string;
    phone: string;
}
export interface CreateOrderParams {
    storeId: string;
    customerId: string;
    productId: string;
    quantity?: number;
}
export type OrderError = 'product_not_in_store' | 'customer_not_in_store' | 'invalid_quantity';
export type KitResult<T> = {
    data: T;
    error: null;
} | {
    data: null;
    error: Error;
};
