import Button from "../button/Button";
import Form from "../form/Form";
import Style from "../dialog/dialog.module.css";
interface Props {
  dialogText: string;
  yesButtonText: string;
  noButtonText: string;
  okButton: () => void;
  noButton: () => void;
  handleSubmit: () => void;
}

export default function Dialog({
  dialogText,
  yesButtonText,
  noButtonText,
  okButton,
  noButton,
  handleSubmit,
}: Props) {
  return (
    <div className={Style.dialog}>
      <Form handleSubmit={handleSubmit}>
        <div>
          <p className={Style.text}>{dialogText}</p>
          <div className={Style.buttonWrap}>
            <Button
              buttonText={yesButtonText}
              size="S"
              type="submit"
              buttonClick={okButton}
            ></Button>
            <Button
              buttonText={noButtonText}
              size="S"
              type="submit"
              buttonClick={noButton}
            ></Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
