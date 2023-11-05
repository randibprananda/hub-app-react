import { create } from 'zustand';

export const useShopDecorationStore = create((set) => ({
  leftMenuActive: 1,
  rightMenuActive: 'Beranda',
  isNewBanner: false,
  filterProduk: 'TERLARIS',
  bannerType: 'BESAR',
  setLeftMenuActive: (change) => set({ leftMenuActive: change }),
  setRightMenuActive: (change) => set({ rightMenuActive: change }),
  setIsNewBanner: (change) => set({ isNewBanner: change }),
  setFilterProduk: (change) => set({ filterProduk: change }),
  setBannerType: (change) => set({ bannerType: change }),
}));
