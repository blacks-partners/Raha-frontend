import Image from "next/image";
import Style from "../edit/edit.module.css";

interface Props {
  deleteClick: () => void;
  editClick: () => void;
}

export default function Edit({ deleteClick, editClick }: Props) {
  return (
    <>
      <div className={Style.iconLayout}>
        <div className={Style.icons}>
          <button onClick={deleteClick} className={Style.icon} type="button">
            <div>
              <Image
                src="/common/delete_icon.png"
                alt="削除アイコン"
                width={20}
                height={20}
              ></Image>
            </div>
          </button>
          <button onClick={editClick} className={Style.icon} type="button">
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
    </>
  );
}
