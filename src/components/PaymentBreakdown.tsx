import { toast } from "react-toastify";
import { useHistory } from "react-router";

import TextField from "../common/TextField";
import { useStore } from "../store";
import { useForm } from "react-hook-form";
import { Months } from "./PaymentOption";
import useCompoundInterest from "../Hooks/useCompoundInterest";
import { initialState } from "../store/index";

type FormData = {
  amount: string | number;
  tenor: string;
};

const PaymentBreakdown = () => {
  const { amount, tenor } = useStore((state) => state.store);
  const setSingleData = useStore((state) => state.setSingleData);
  const setStore = useStore((state) => state.setStore);


// https://kwaba-api.herokuapp.com/
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: amount | 0,
    },
  });
  const history = useHistory();

  const [interest] = useCompoundInterest();

  const formattedAmount = amount ? amount.toLocaleString() : 0;

  const onSubmit = handleSubmit(async (data) => {
    const newData = {
      ...data,
      monthlyPayment: interest.toFixed(2),
    };
    try {
      let request = await fetch(
        "https://kwaba-api.herokuapp.com/api/v1/rent/approve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      let response = await request.json();

      if (response.successful) {
        setStore(initialState);
        toast.success("Rent approved");
        history.push("/");
      }
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  });

  return (
    <div className="flex__container">
      <div className="payment__option payment__breakdown">
        <div className="payment__option--header">
          <h3>Payment Breakdown</h3>
        </div>
        <form onSubmit={onSubmit} className="payment__option--form form">
          <TextField
            {...register("amount", { required: true })}
            type="number"
            label="Rent request amount"
            value={amount}
            onChange={(e: any) => {
              setSingleData("amount", parseInt(e.target.value));
              setValue("amount", e.target.value);
            }}
            error={errors.amount && "Enter the request amount"}
          />
          <div className="form-group">
            <label htmlFor="tenor" className="form__label">
              Choose a monthly plan
            </label>
            <select
              {...register("tenor", { required: true })}
              className="form__select"
              onChange={(e: any) => {
                setSingleData("tenor", parseInt(e.target.value));
              }}
              defaultValue={tenor}
              value={tenor}
            >
              {Months.map((month: number) => (
                <option key={month} value={month}>
                  {month} months
                </option>
              ))}
              {errors.tenor && (
                <div className="form__error">
                  <span className="form__error-text">Select monthly plan</span>
                </div>
              )}
            </select>
          </div>
          <div className="payment__breakdown--breakdown">
            <div className="breakdown__option">
              <p className="title">Pre-approved amount</p>
              <p className="value">₦ {formattedAmount}</p>
            </div>
            <div className="breakdown__option">
              <p className="title">Monthly payment</p>
              <p className="value">
                ₦ {parseFloat(interest.toFixed(2)).toLocaleString()}
              </p>
            </div>
            <div className="breakdown__option">
              <p className="title">Tenor</p>
              <p className="value">{tenor} months</p>
            </div>
          </div>
          <div className="form-button">
            <button className="form__button secondary">Accept</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentBreakdown;
