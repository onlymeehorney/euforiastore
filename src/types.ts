export type Color = 'marrón' | 'azul' | 'rosa' | 'gris' | 'negro' | 'blanco' | 'rojo';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: Record<string, string>;
  colors: Color[];
}

export interface CartItem {
  productId: string;
  color: Color;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface CheckoutData {
  email: string;
  marketing: boolean;
  phone: string;
  saveInfo: boolean;
  shippingMethod: 'gratis' | 'express';
  address: {
    country: string;
    street: string;
    apt?: string;
    city: string;
    zip: string;
    state: string;
  };
  payment: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardholder: string;
  };
}
