import RoundFrameStyle from "../roundFrame/roundFrame.module.css";

interface Props {
  children: React.ReactNode;
}
export default function RoundFrame({ children }: Props) {
  return <div className={RoundFrameStyle.frame}>{children}</div>;
}
