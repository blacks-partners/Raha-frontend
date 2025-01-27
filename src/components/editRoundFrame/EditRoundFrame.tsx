import Image from "next/image";
import RoundFrame from "../roundFrame/RoundFrame";
import EditRoundFrameStyle from "../editRoundFrame/editRoundFrame.module.css";

interface Props {
  deleteClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  children: React.ReactNode;
}
export default function EditRoundFrame({
  deleteClick,
  editClick,

  children,
}: Props) {
  return <RoundFrame>{children}</RoundFrame>;
}
