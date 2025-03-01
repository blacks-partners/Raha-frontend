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
    <div className={Style.overlay}>
      <div className={Style.dialog}>
        <Form handleSubmit={handleSubmit} noValidate={false}>
          <div>
            <p className={Style.text}>{dialogText}</p>
            <div className={Style.buttonWrap}>
              <Button
                buttonText={noButtonText}
                size="S"
                type="button"
                buttonClick={noButton}
              ></Button>
              <Button
                buttonText={yesButtonText}
                size="S"
                type="button"
                buttonClick={okButton}
              ></Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
