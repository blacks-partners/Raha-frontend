interface Props {
  label: string;
  type: "email" | "password" | "date" | "number";
  inputId: string;
  placeholder?: string;
  value?: string | number;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputName: string;
}

export default function Input({
  label,
  type,
  inputId,
  inputName,
  handleChange,
  value,
  placeholder,
}: Props) {
  return (
    <>
      <label htmlFor={label}></label>
      <input
        type={type}
        id={inputId}
        name={inputName}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
}
