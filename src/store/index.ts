import create, { SetState, GetState } from "zustand";
import { AccomodationProps } from "../components/PaymentOption";

interface initialStateProps {
  amount: number;
  salary: number;
  tenor: number | string;
  accomodationStatus: AccomodationProps;
}
export const initialState: initialStateProps = {
  amount: 0,
  salary: 0,
  tenor: 1,
  accomodationStatus: {} as AccomodationProps,
};

interface useStoreType {
  store: initialStateProps;
  setStore: (data: initialStateProps) => void;
  setSingleData: (key: string, data: any) => void;
}

export const useStore = create<useStoreType>(
  (set: SetState<useStoreType>, get: GetState<useStoreType>) => ({
    store: {
      ...initialState,
    },
    setStore: (data) => {
      set({
        store: { ...data },
      });
    },
    setSingleData: (key: string, data: any) => {
      set((state) => ({
        store: {
          ...state.store,
          [key]: data,
        },
      }));
    },
  })
);
