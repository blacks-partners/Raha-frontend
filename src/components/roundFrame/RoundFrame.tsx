import RoundFrameStyle from "../roundFrame/roundFrame.module.css";

interface Props {
  children: React.ReactNode;
  onFrameClick?: () => void; // クリックイベント用
}
export default function RoundFrame({ children, onFrameClick }: Props) {
  return (
    <div className={RoundFrameStyle.frame} onClick={onFrameClick}>
      {children}
    </div>
  );
}
