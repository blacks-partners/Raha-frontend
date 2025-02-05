import Layout from "@/components/layout/Layout";
import { useState } from "react";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import inputStyle from "@/components/input/input.module.css";
import Button from "@/components/button/Button";
import style from "@/styles/mypage.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Toast from "@/components/toast/Toast";
import toastStyle from "@/components/toast/Toast.module.css";

type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
  introduction: string;
  created_at: string;
  updated_at: string;
};
export const getServerSideProps = (async (context) => {
  const userCookie = context.req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/users/${userCookie.loginID}`
  );
  const user: User = await res.json();

  const allUsers = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`);
  const users = await allUsers.json();
  return {
    props: {
      user,
      users,
    },
  };
}) satisfies GetServerSideProps<{ user: User; users: any }>;

export default function Home({
  user,
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // エラーメッセージ 初期値
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  // style
  const [inputNameArea, setInputNameArea] = useState(inputStyle.usualInput);
  const [inputEmailArea, setInputEmailArea] = useState(inputStyle.usualInput);
  const [inputIntroductionArea, setInputIntroductionArea] = useState(
    inputStyle.introduction
  );
  // ユーザーデータ
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [introduction, setIntroduction] = useState(user.introduction);
  // メールアドレスバリデーション
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //マイページに戻る処理
  const backToMypage = () => {
    location.href = "/mypage";
  };

  console.log(user.userId);
  // Toast関連
  const [toast, setToast] = useState(toastStyle.toastAreaHidden);
  const [toastMessage, setToastMessage] = useState("変更が完了しました");

  //　submit時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 項目の不備がないとき:false、不備があるとき:TRUE
    let hasError = false;
    // 項目に不備がある場合、データを送信させない
    if (hasError) {
      return;
    }
    // クリックするたびに一度Toastのクラスをリセットする
    setToast(toastStyle.toastAreaHidden);
    if (name === "") {
      setNameError("名前を入力してください");
      setInputNameArea(inputStyle.errorInput);
      hasError = true;
    } else {
      setNameError("");
      setInputNameArea(inputStyle.usualInput);
      hasError = false;
    }

    if (email === "") {
      setEmailError("メールアドレスを入力してください");
      setInputEmailArea(inputStyle.errorInput);
      hasError = true;
    } else if (!emailPattern.test(email)) {
      setEmailError("メールアドレスの形式が正しくありません");
      setInputEmailArea(inputStyle.errorInput);
      hasError = true;
    } else if (emailPattern.test(email)) {
      setEmailError("");
      setInputEmailArea(inputStyle.usualInput);
      hasError = false;
    }
    if (email !== "" && emailPattern.test(email)) {
      hasError = false;
      fetch(`${process.env.NEXT_PUBLIC_URL}/users/${user.userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          introduction,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("登録に失敗しました");
          }
          return response.json();
        })
        .then(() => {
          setToast(toastStyle.toastArea);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  return (
    <>
      <Layout
        headContent="Rahaサイト,投稿一覧,エンジニア"
        headName="Rahaサイト"
        headTitle="Raha"
        pageTitle="ユーザー情報編集"
      >
        <Form method="POST" handleSubmit={handleSubmit} noValidate={true}>
          {" "}
          <Input
            label="名前"
            type="text"
            inputId="name"
            placeholder="（例）らは太郎"
            inputName="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            inputClass={inputNameArea}
            errorMessage={nameError}
          />
          <Input
            label="メールアドレス"
            type="email"
            inputId="email"
            placeholder="（例）hoge@example.com"
            inputName="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            inputClass={inputEmailArea}
            errorMessage={emailError}
          />
          <div className={inputStyle.wrap}>
            <div className={inputStyle.inputAreaWrap}>
              <label htmlFor="introduction">自己紹介</label>
              <textarea
                name="introduction"
                id="introduction"
                placeholder="内容を入力してください"
                className={inputIntroductionArea}
                onChange={(e) => setIntroduction(e.target.value)}
              >
                {introduction}
              </textarea>
            </div>
          </div>
          <div className={style.buttonArea}>
            <Button
              type="button"
              buttonText="戻る"
              size="M"
              buttonClick={backToMypage}
            />
            <Button type="submit" buttonText="登録" size="M" />
          </div>
        </Form>
        <Toast toastText={toastMessage} toastClass={toast}></Toast>{" "}
      </Layout>
    </>
  );
}
