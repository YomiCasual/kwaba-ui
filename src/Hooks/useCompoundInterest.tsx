import { useEffect, useState } from "react";
import { useStore } from "../store";

function monthlyPayment(principal:number

, lengthOfLoan:number, rate:number) {
    rate = rate /100/12
 
    var e = Math.pow((1 + rate), lengthOfLoan);
var m = principal * ( (rate * e) / (e - 1) );
return m
  }

const useCompoundInterest = () => {
  const [interest, setInterest] = useState(0);
  const { amount, tenor } = useStore((state) => state.store);

  useEffect(() => {
    const newTenor: number = Number(tenor);
    if (amount) {
      let newMonthlyPayment = monthlyPayment(amount, newTenor, 2 )
      setInterest(newMonthlyPayment);
    } else setInterest(0);
  }, [amount, tenor]);

  return [interest];
};

export default useCompoundInterest;
