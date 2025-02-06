import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import Toast from "@/components/toast/Toast";
import confirmStyle from "@/styles/Confirm.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toastStyle from "@/components/toast/Toast.module.css";
import ColorLink from "@/components/colorLink/ColorLink";
import registerStyle from "@/styles/Register.module.css";

export default function Confirm() {
  const router = useRouter();
  const [addressError, setAddressError] = useState(false);
  // const { name, email, password, introduction, createdAt, updatedAt } =
  //   router.query;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // データを取得
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  });

  const [toast, setToast] = useState(toastStyle.toastAreaHidden);

  // 戻るボタンを押した時
  const backBtn = () => {
    location.href = "/register";
  };

  //登録を押下した時
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/register`);
      const users = await userRes.json();
      const maxId =
        users.length > 0 ? Math.max(...users.map((user: any) => user.id)) : 0;

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: maxId + 1,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          introduction: "",
          createdAt: new Date().toISOString(),
          updatedAt: "",
        }),
      });
      if (res.ok) {
        console.log("成功");
        setToast(toastStyle.toastArea);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
        localStorage.removeItem("userData");
      } else {
        console.error("失敗");
        setAddressError(true);
      }
    } catch {
      console.error("失敗");
    }
  };

  return (
    <>
      <Layout
        headTitle={"ユーザー登録確認"}
        headName={"description"}
        headContent={"ユーザーの登録を確認する画面"}
        pageTitle={"ユーザー登録確認"}
      >
        <Form handleSubmit={handleSubmit} noValidate={false}>
          <RoundFrame>
            <div>
              <p>氏名：{userData.name}</p>
              <p>メールアドレス：{userData.email}</p>
            </div>
          </RoundFrame>
          {addressError && (
            <p className={registerStyle.errorMessage}>
              このメールアドレスは既に登録されています。
              <br className={registerStyle.brBranch} />
              <ColorLink
                colorLinkText={"ログイン画面"}
                url={"/login"}
              ></ColorLink>
              よりログインしてください。
            </p>
          )}
          <div className={confirmStyle.btnWrap}>
            <Button
              type={"button"}
              buttonText={"戻る"}
              size={"M"}
              buttonClick={backBtn}
            />
            <Button type={"submit"} buttonText={"登録"} size={"M"} />
          </div>
          <Toast
            toastText={"登録しました。ログイン画面に遷移します。"}
            toastClass={toast}
          />
        </Form>
      </Layout>
    </>
  );
}
