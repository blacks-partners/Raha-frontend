import Image from "next/image";
import RoundFrame from "./RoundFrame";

interface Props {
  deleteClick?: () => void;
  editClick?: () => void;
  children: React.ReactNode;
}
export default function EditRoundFrame({
  deleteClick,
  editClick,
  children,
}: Props) {
  return (
    <RoundFrame>
      <div>
        <button onClick={deleteClick}>
          <div>
            <Image
              src="/common/delete_icon.png"
              alt="削除アイコン"
              width={30}
              height={30}
            ></Image>
          </div>
        </button>
        <button onClick={editClick}>
          <div>
            <Image
              src="/common/edit_icon.png"
              alt="編集アイコン"
              width={30}
              height={30}
            ></Image>
          </div>
        </button>
      </div>
      {children}
    </RoundFrame>
  );
}
