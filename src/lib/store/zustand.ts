"use client";

import { create } from "zustand";

interface RadioGroupStore {
  value?: string;
  radioValue?: (by: string) => void;
  setRadioValue?: (value: string) => void;
}

export const useRadioGroupStore = create<RadioGroupStore>()((set) => ({
  radioValue: (value) => set({ value }),
  setRadioValue: () => set((state) => ({ value: state.value })),
}));
