import Style from "../button/button.module.css";

interface Props {
  buttonClick?: () => void;
  id?: string;
  type: "submit" | "button" | "reset";
  buttonText: string;
  size: "M" | "S";
}

export default function Button({
  buttonClick,
  id,
  type,
  buttonText,
  size,
}: Props) {
  return (
    <div>
      <button onClick={buttonClick} id={id} type={type} className={Style[size]}>
        {buttonText}
      </button>
    </div>
  );
}
