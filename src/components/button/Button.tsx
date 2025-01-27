import Style from "../button/button.module.css";

interface Props {
  buttonClick?: () => void;
  id?: string;
  type: "submit" | "button" | "reset";
  buttonText: string;
  size: "M" | "S";
  disabled?: boolean;
}

export default function Button({
  buttonClick,
  id,
  type,
  buttonText,
  size,
  disabled,
}: Props) {
  return (
    <div className={Style.btnWrap}>
      <button
        onClick={buttonClick}
        id={id}
        type={type}
        className={Style[size]}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
}
