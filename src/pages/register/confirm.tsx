import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import Toast from "@/components/toast/Toast";
import confirmStyle from "@/styles/Confirm.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import toastStyle from "@/components/toast/Toast.module.css";

export default function Confirm() {
  const router = useRouter();
  const { name, email, password, introduction, created_at, updated_at } =
    router.query;

  const [toast, setToast] = useState(toastStyle.toastAreaHidden);
  //登録を押下した時
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userRes = await fetch("http://localhost:8000/users");
      const users = await userRes.json();
      const maxId =
        users.length > 0 ? Math.max(...users.map((user: any) => user.id)) : 0;

      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: maxId + 1,
          name: name,
          email: email,
          password: password,
          introduction: "",
          created_at: new Date().toISOString(),
          updated_at: "",
        }),
      });
      if (res.ok) {
        console.log("成功");
        setToast(toastStyle.toastArea);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      } else {
        console.error("失敗");
      }
    } catch {
      console.error("失敗");
    }
  };

  const returnBtn = () => {
    router.push("/register");
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
              <p>氏名：{name}</p>
              <p>メールアドレス：{email}</p>
            </div>
          </RoundFrame>
          <div className={confirmStyle.btnWrap}>
            <Button
              type={"button"}
              buttonText={"戻る"}
              size={"M"}
              buttonClick={returnBtn}
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
