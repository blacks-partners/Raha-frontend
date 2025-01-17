interface Props {
  action?: string;
  method?: string;
  children: React.ReactNode;
  handleSubmit: () => void;
}

export default function Form({
  action,
  method,
  children,
  handleSubmit,
}: Props) {
  return (
    <form onSubmit={handleSubmit} action={action} method={method}>
      {children}
    </form>
  );
}
