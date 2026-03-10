// Types pour debounce - AUCUN ANY

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}