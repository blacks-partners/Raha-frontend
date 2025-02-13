import Image from "next/image";
import RoundFrame from "../roundFrame/RoundFrame";
import EditRoundFrameStyle from "@/components/editOnlyRoundFrame/editRoundFrame.module.css";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}
export default function EditOnlyRoundFrame({ children }: Props) {
  return (
    <div className={EditRoundFrameStyle.frame}>
      <div className={EditRoundFrameStyle.iconLayout}>
        <div className={EditRoundFrameStyle.icons}>
          <Link href={"/mypage/edit"}>
            <Image
              src="/common/edit_icon.png"
              alt="編集アイコン"
              width={20}
              height={20}
            ></Image>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
