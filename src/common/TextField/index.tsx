import { useEffect, useRef } from "react";

interface TextFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string | boolean;
  value?: any;
}

const TextField: React.FC<TextFieldProps & React.HTMLProps<HTMLInputElement>> =
  (props) => {
    const { name, label, placeholder, children, error, value, ...rest } = props;
    const inputRef = useRef<any>(null);
    useEffect(() => {
      if (inputRef && inputRef.current) {
        let inputElement = inputRef?.current?.children[2];
        if (!value && value !== 0) {
          inputRef?.current?.classlist?.remove("active");
          inputElement?.removeAttribute("placeholder");
        } else {
          inputRef?.current?.classlist?.add("active");
        }
      }
    }, [value]);
    const handleFocus = (event: any) => {
      const { target } = event;

      target.parentNode.classList.add("active");

      target.setAttribute(
        "placeholder",
        target.getAttribute("data-placeholder")
      );
    };

    const handleBlur = (event: any) => {
      const { target } = event;

      if (!target.value && label) {
        target.parentNode.classList.remove("active");
        target.removeAttribute("placeholder");
      }
    };

    return (
      <div
        ref={inputRef}
        className={`form-group ${(value || value === 0) && "active"}`}
      >
        <label htmlFor={name} className={`form__label `}>
          {label}
        </label>
        <div className={`floating__label`}>{name}</div>

        <input
          {...rest}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-placeholder={placeholder ? placeholder : name}
          // type={"text"}
          placeholder={""}
          className="form__input"
          value={value}
        />
        {error && (
          <div className="form__error">
            <span className="form__error-text">{error}</span>
          </div>
        )}
      </div>
    );
  };

export default TextField;

export const SelectBox: React.FC<
  TextFieldProps & React.HTMLProps<HTMLSelectElement>
> = (props) => {
  const { name, label, placeholder, children, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      <div className="floating__label">{name}</div>

      <select {...rest} className="form__select">
        {children}
      </select>
    </div>
  );
};
