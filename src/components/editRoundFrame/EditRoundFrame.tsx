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
  return (
    <RoundFrame>
      <div className={EditRoundFrameStyle.iconLayout}>
        <div className={EditRoundFrameStyle.icons}>
          <button
            onClick={deleteClick}
            className={EditRoundFrameStyle.icon}
            type="button"
          >
            <div>
              <Image
                src="/common/delete_icon.png"
                alt="削除アイコン"
                width={20}
                height={20}
              ></Image>
            </div>
          </button>
          <button
            onClick={editClick}
            className={EditRoundFrameStyle.icon}
            type="button"
          >
            <div>
              <Image
                src="/common/edit_icon.png"
                alt="編集アイコン"
                width={20}
                height={20}
              ></Image>
            </div>
          </button>
        </div>
      </div>
      {children}
    </RoundFrame>
  );
}
