export interface Order {
  id?: string;
  userId?: number;
  productIds: any[];
  totalAmount: number;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}