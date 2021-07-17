import { useEffect, useState } from "react";
import { useStore } from "../store";

const compoundInterest = (
  principal: number,
  time: number,
  rate: number,
  n: number
) => {
  const amount = principal * Math.pow(1 + rate / n, n * time);
  const interest = amount - principal;
  return interest;
};

const useCompoundInterest = () => {
  const [interest, setInterest] = useState(0);
  const { amount, tenor } = useStore((state) => state.store);

  useEffect(() => {
    const newTenor: number = Number(tenor);
    if (amount) {
      let newInterest = compoundInterest(amount, newTenor, 0.02, 1);
      const monthlyPayment = amount / newTenor + newInterest;
      setInterest(monthlyPayment);
    } else setInterest(0);
  }, [amount, tenor]);

  return [interest];
};

export default useCompoundInterest;
