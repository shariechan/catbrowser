import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Brand, ProductListItem } from '../models/product';

interface StoreContextType {
  brand: Brand | undefined;
  setBrand: React.Dispatch<React.SetStateAction<Brand | undefined>>;
  products: ProductListItem[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const [brand, setBrand] = useState<Brand>();
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const value = useMemo(() => ({
    brand, setBrand,
    products, setProducts,
    page, setPage,
    hasMore, setHasMore
  }), [brand, products, page, hasMore]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>

}

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
