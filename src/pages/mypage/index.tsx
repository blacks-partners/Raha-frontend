import Layout from "@/components/layout/Layout";
import { useState } from "react";
import style from "@/styles/mypage.module.css";
import ColorLink from "@/components/colorLink/ColorLink";
import Dialog from "@/components/dialog/Dialog";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import EditOnlyRoundFrame from "@/components/editOnlyRoundFrame/EditRoundFrame";
import Toast from "@/components/toast/Toast";
import toastStyle from "@/components/toast/Toast.module.css";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  introduction: string;
  created_at: string;
  updated_at: string;
};
export const getServerSideProps = (async (context) => {
  const userCookie = context.req.cookies;
  const res = await fetch(`http://localhost:8000/users/${userCookie.loginID}`);
  const user: User = await res.json();

  return {
    props: {
      user,
    },
  };
}) satisfies GetServerSideProps<{ user: User }>;

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // ユーザー情報のstate
  const [username, setUsername] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userIntroduction, setUserIntroduction] = useState(user.introduction);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState(toastStyle.toastAreaHidden);
  const [toastMessage, setToastMessage] = useState("退会が完了しました");

  // カラーリンクをクリックするとダイアログが表示されるように
  const showDialog = () => {
    setIsVisible(true);
  };

  const edit = () => {
    location.href = "/mypage/edit";
  };
  // ダイアログを閉じる処理（「いいえ」選択時）
  const hideDialog = () => {
    setIsVisible(false);
  };

  // DBからユーザー情報を削除する処理
  const delete_membership = (event: React.FormEvent<HTMLFormElement>) => {
    fetch(`http://localhost:8000/users/${user.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("退会処理に失敗しました");
        }
        return response.json();
      })
      .then(() => {
        setToast(toastStyle.toastArea);
        setTimeout(() => {
          location.href = "/";
        }, 2500);
      });
  };
  return (
    <>
      <Layout
        headContent="Rahaサイト,投稿一覧,エンジニア"
        headName="Rahaサイト"
        headTitle="Raha"
        pageTitle="ユーザー情報詳細"
      >
        <EditOnlyRoundFrame editClick={edit}>
          <div>
            <p>名前：{username}</p>

            <p>メールアドレス：{userEmail}</p>

            <p>自己紹介：{userIntroduction}</p>
          </div>
        </EditOnlyRoundFrame>
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
            okButton={delete_membership}
            noButton={hideDialog}
            handleSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
        <Toast toastText={toastMessage} toastClass={toast}></Toast>
      </Layout>
    </>
  );
}
