import styles from "./form.module.css";

interface Props {
  action?: string;
  method?: string;
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  noValidate: boolean;
}

export default function Form({
  action,
  method,
  children,
  handleSubmit,
  noValidate,
}: Props) {
  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
      action={action}
      method={method}
      noValidate={noValidate}
    >
      {children}
    </form>
  );
}
