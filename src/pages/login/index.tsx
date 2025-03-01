import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import inputStyle from "@/components/input/input.module.css";
import ColorLink from "@/components/colorLink/ColorLink";
import loginStyle from "@/styles/Login.module.css";
import Toast from "@/components/toast/Toast";
import toastStyle from "@/components/toast/Toast.module.css";

export default function Login() {
  // メールアドレス、パスワード 初期値
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 入力欄スタイル 初期値
  const [inputEmailArea, setInputEmailArea] = useState(inputStyle.usualInput);
  const [inputPassArea, setInputPassArea] = useState(inputStyle.usualInput);

  // エラーメッセージ 初期値
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // 画面遷移
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  // トースト
  const [toast, setToast] = useState(toastStyle.toastAreaHidden);

  // メールアドレスバリデーション
  const validateEmail = (value: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  };

  // パスワードを表示
  const [passType, setPassType] = useState("password");
  const [passIcon, setPassIcon] = useState(true);

  const iconClick = () => {
    if (passType === "password") {
      setPassType("text");
      setPassIcon(false);
    } else {
      setPassType("password");
      setPassIcon(true);
    }
  };

  // 「ログイン」を押下した時
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    // アドレスエラー
    if (email.trim() === "") {
      setEmailError("メールアドレスを入力してください");
      setInputEmailArea(inputStyle.errorInput);
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("メールアドレスを正しく入力してください");
      setInputEmailArea(inputStyle.errorInput);
      hasError = true;
    } else {
      setEmailError("");
      setInputEmailArea(inputStyle.usualInput);
    }

    // パスワードエラー
    if (password.trim() === "") {
      setPassError("パスワードを入力してください");
      setInputPassArea(inputStyle.errorInput);
      hasError = true;
    } else {
      setPassError("");
      setInputPassArea(inputStyle.usualInput);
    }

    // // fetchでユーザー情報取得
    if (email.trim() !== "" && password.trim() !== "") {
      // 本番サーバ用のコード
      //   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // レスポンスをjson形式で取得し、usersに格納
      const users = await res.json();
      //     // レスポンスからトークンを取得し、tokenに格納
      //     const token = await res.headers.get("X-AUTH-TOKEN");

      if (res.ok) {
        console.log(res.status, "成功");
      } else {
        console.log(res.status, "失敗");
      }

      // POSTしたユーザが存在するかの条件分岐
      if (users.userId > 0) {
        console.log("ログイン成功");
        setToast(toastStyle.toastArea);
        // 仮としてクライアント側でクッキーを設定（認証系はサーバ側で設定した方がセキュリティ的に良い）
        document.cookie = `loginID=${users.userId}; path=/; max-age=3600; secure; samesite=strict`;
        //       document.cookie = `token=${token}; path=/; max-age=3600; secure; samesite=strict`;
      } else {
        setPassError("メールアドレス又はパスワードが誤っています");
        setInputEmailArea(inputStyle.errorInput);
        setInputPassArea(inputStyle.errorInput);
        hasError = true;
      }
    }

    // エラーではない場合にホームへ遷移
    setIsValid(!hasError);
    if (!hasError) {
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  };

  return (
    <>
      <Layout
        headTitle="ログイン"
        headName="description"
        headContent="rahaログインページ"
        pageTitle="ログイン"
      >
        <Form method="POST" handleSubmit={handleSubmit} noValidate={true}>
          <Input
            label="メールアドレス"
            type="email"
            inputId="email"
            placeholder="メールアドレスを入力してください"
            inputName="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            inputClass={inputEmailArea}
            errorMessage={emailError}
            autocomplete="username"
          />
          <Input
            label="パスワード"
            type={passType}
            inputId="password"
            placeholder="パスワードを入力してください"
            inputName="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            inputClass={inputPassArea}
            errorMessage={passError}
            autocomplete="new-password"
            iconClick={iconClick}
            passIcon={passIcon}
          />
          <div className={loginStyle.linkWrap}>
            <ColorLink colorLinkText="ユーザー登録はこちら" url="/register" />
          </div>
          <div className={loginStyle.btnWrap}>
            <Button type="submit" buttonText="ログイン" size="M" />
          </div>
          <Toast toastText={"ログインしました"} toastClass={toast} />
        </Form>
      </Layout>
    </>
  );
}
