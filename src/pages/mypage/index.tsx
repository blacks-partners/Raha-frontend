import Layout from "@/components/layout/Layout";
import { useState } from "react";
import Image from "next/image";
import style from "@/styles/mypage.module.css";
import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import ColorLink from "@/components/colorLink/ColorLink";
import Dialog from "@/components/dialog/Dialog";

export default function Home() {
  // ユーザー情報のstate（仮置き）
  const [username, setUsername] = useState("仮名前");
  const [userEmail, setUserEmail] = useState("仮メールアドレス");
  const [userIntroduction, setUserIntroduction] = useState("仮自己紹介");
  const [isVisible, setIsVisible] = useState(false);

  // カラーリンクをクリックするとダイアログが表示されるように
  const showDialog = () => {
    setIsVisible(true);
  };

  // ダイアログを閉じる処理（本当は他の処理が必要ですが、仮置きの処理）
  const hideDialog = () => {
    setIsVisible(false);
  };
  return (
    <>
      <Layout
        headContent="Rahaサイト,投稿一覧,エンジニア"
        headName="Rahaサイト"
        headTitle="Raha"
        pageTitle="ユーザー情報詳細"
      >
        <EditRoundFrame>
          <div>
            <p>名前：{username}</p>

            <p>メールアドレス：{userEmail}</p>

            <p>自己紹介：{userIntroduction}</p>
          </div>
        </EditRoundFrame>
        <div className={style.withdrawal}>
          <ColorLink
            colorLinkText={"退会はこちら"}
            url={"#!"}
            onClick={showDialog}
          />
        </div>
        {isVisible && (
          <Dialog
            dialogText="本当に退会しますか？"
            noButtonText="いいえ"
            yesButtonText="はい"
            okButton={hideDialog}
            noButton={hideDialog}
            handleSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      </Layout>
    </>
  );
}
