import inputStyle from "@/components/input/input.module.css";
import Image from "next/image";

interface Props {
  label: string | React.ReactNode;
  type: "email" | "password" | "date" | "number" | "text" | string;
  inputId: string;
  placeholder?: string;
  value?: string | number;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputName: string;
  inputClass?: string;
  errorMessage?: string;
  passMessage?: string;
  autocomplete?: string;
  iconClick?: () => void;
  passIcon?: boolean;
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
  passMessage,
  autocomplete,
  iconClick,
  passIcon,
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
            className={`${inputClass} ${passMessage}`}
            autoComplete={autocomplete}
          />
          {(label === "パスワード" || label === "確認用パスワード") && (
            <div className={inputStyle.iconStyle} onClick={iconClick}>
              {passIcon ? (
                <Image
                  src="/common/eye_icon01.png"
                  alt="目のアイコン"
                  width={256}
                  height={256}
                  className={`${inputClass} ${passMessage}`}
                />
              ) : (
                <Image
                  src="/common/eye_icon02.png"
                  alt="目のアイコン"
                  width={256}
                  height={256}
                  className={`${inputClass} ${passMessage}`}
                />
              )}
            </div>
          )}
        </div>
        <p className={inputStyle.errorMessage}>{errorMessage}</p>
        <p className={inputStyle.passMessage}>{passMessage}</p>
      </div>
    </>
  );
}
