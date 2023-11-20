export interface Product {
  id: string;
  name: string | null;
  price: number;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
};
