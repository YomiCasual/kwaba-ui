import { useState } from "react";
import { useForm } from "react-hook-form";

// @components
import { useHistory } from "react-router-dom";
import TextField from "../common/TextField";
import { useStore } from "../store";

export type AccomodationProps = {
  id: number;
  title: string;
  checked: string | boolean;
};

type FormData = {
  amount: string;
  salary: string;
  tenor: string;
};

const PaymentOption = () => {
  const AccomodationOptions: AccomodationProps[] = [
    {
      id: 1,
      title: "Looking to renew my rent",
      checked: false,
    },
    {
      id: 2,
      title: "Want to pay for a new place",
      checked: false,
    },
    {
      id: 3,
      title: "I am still searching",
      checked: false,
    },
  ];
  const setStore = useStore((state) => state.setStore);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [accomodationOptions, setAccomodationOptions] = useState([
    ...AccomodationOptions,
  ]);
  const [accomodationStatus, setAccomodationStatus] = useState(
    {} as AccomodationProps
  );

  const checkValid = Object.keys(accomodationStatus).length === 0;

  const changeAccomodationStatus = (id: number) => {
    let newAccomodationOptions = accomodationOptions.map((option) => {
      if (option.id === id) {
        option.checked = true;
        setAccomodationStatus(option);
      } else {
        option.checked = false;
      }
      return option;
    });

    setAccomodationOptions(newAccomodationOptions);
  };

  const onSubmit = handleSubmit((data) => {
    if (checkValid) return;
    const newData = {
      salary: parseInt(data.salary),
      amount: parseInt(data.amount),
      tenor: data.tenor,
      accomodationStatus,
    };
    setStore(newData);
    history.push("/breakdown");
  });

  return (
    <div className="flex__container">
      <div className="payment__option">
        <div className="payment__option--header">
          <h3>Payment Option</h3>
          <div className="payment__option--header_loader">
            <p>1 of 3</p>
            <Loader />
          </div>
        </div>
        <form onSubmit={onSubmit} className="payment__option--form form">
          <div className="form-group">
            <label className="form__label">
              What is your accomodation status?
            </label>
            <div className="form__option-group">
              {accomodationOptions.map((option) => (
                <div
                  onClick={() => changeAccomodationStatus(option.id)}
                  key={option.id}
                  className={`form__option-group--item ${
                    option.checked && "active"
                  }`}
                >
                  {option.title}
                </div>
              ))}
            </div>
            {checkValid && (
              <div className="form__error">
                <span className="form__error-text">
                  Select accomodation status
                </span>
              </div>
            )}
          </div>

          <TextField
            {...register("amount", { required: true })}
            placeholder="Enter amount"
            label="How much is your request amount?"
            type="number"
            error={errors.amount && "Enter the request amount"}
          />
          <TextField
            {...register("salary", { required: true })}
            label="How much is your do you earn monthly?"
            placeholder="Enter amount"
            type="number"
            error={errors.salary && "Enter your monthly income"}
          />

          <div className="form-group">
            <label htmlFor="tenor" className="form__label">
              Choose a monthly plan
            </label>
            <select
              {...register("tenor", { required: true })}
              className="form__select"
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
          <div className="form-button">
            <button className="form__button primary">next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Loader = () => (
  <div className="loader__container">
    <div className="loader"></div>
  </div>
);

export const Months = Array.from(Array(12), (x, index) => index + 1);

export default PaymentOption;
