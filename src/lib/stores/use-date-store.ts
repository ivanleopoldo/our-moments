import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { create } from "zustand";
import type { Dayjs, OpUnitType } from "dayjs";
import dayjs from "dayjs";

type DateState = {
  date: Dayjs;
};

type DateActions = {
  isToday: (date: Dayjs, granularity?: OpUnitType) => boolean;
  isAfter: (date: Dayjs, granularity?: OpUnitType) => boolean;
  setDate: (date: Dayjs) => void;
  addDays: (by: number) => void;
  addMonths: (by: number) => void;
  subDays: (by: number) => void;
  subMonths: (by: number) => void;
};

const useDateStoreBase = create<DateState & DateActions>((set) => ({
  date: dayjs(),
  isToday: (date, granularity = "day") =>
    date ? date.isSame(dayjs(), granularity) : false,
  isAfter: (date, granularity = "day") =>
    date ? date.isAfter(dayjs().startOf(granularity)) : false,
  setDate: (date) => set({ date }),
  addDays: (by) => set((state) => ({ date: state.date.add(by, "day") })),
  addMonths: (by) => set((state) => ({ date: state.date.add(by, "month") })),
  subDays: (by) => set((state) => ({ date: state.date.subtract(by, "day") })),
  subMonths: (by) =>
    set((state) => ({ date: state.date.subtract(by, "month") })),
}));

export const useDateStore = createSelectorFunctions(useDateStoreBase);
