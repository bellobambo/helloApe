import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      userAddress: "",
      formData: null,
      setUserAddress: (address) => set(() => ({ userAddress: address })),
      setFormData: (data) => set(() => ({ formData: data })),
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
