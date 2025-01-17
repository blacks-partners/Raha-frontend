interface Props {
  buttonClick?: () => void;
  id?: string;
  type: "submit" | "button" | "reset";
  buttonText: string;
}

export default function Button({ buttonClick, id, type, buttonText }: Props) {
  return (
    <div>
      <button onClick={buttonClick} id={id} type={type}>
        {buttonText}
      </button>
    </div>
  );
}
