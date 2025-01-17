interface Props {
  toastText: string;
}

export default function ({ toastText }: Props) {
  return (
    <div>
      <div>{toastText}</div>
    </div>
  );
}
