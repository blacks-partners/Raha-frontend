import inputStyle from "@/components/input/input.module.css";

interface Props {
  label: string | React.ReactNode;
  type: "email" | "password" | "date" | "number" | "text";
  inputId: string;
  placeholder?: string;
  value?: string | number;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputName: string;
  inputClass: string;
  errorMessage?: string;
}

export default function Input({
  label,
  type,
  inputId,
  inputName,
  handleChange,
  value,
  placeholder,
  errorMessage,
  inputClass,
}: Props) {
  return (
    <>
      <div className={inputStyle.wrap}>
        <div className={inputStyle.inputAreaWrap}>
          <label htmlFor={inputId}>{label}</label>
          <input
            type={type}
            id={inputId}
            name={inputName}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            className={inputClass}
          />
        </div>
        <p className={inputStyle.errorMessage}>{errorMessage}</p>
      </div>
    </>
  );
}
