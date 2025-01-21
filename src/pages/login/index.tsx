import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import inputStyle from "@/components/input/input.module.css";
import ColorLink from "@/components/ColorLink/ColorLink";
import loginStyle from "@/styles/Login.module.css";

export default function Login() {
  // メールアドレス、パスワード 初期値
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 入力欄 初期値
  const [inputEmailArea, setInputEmailArea] = useState(inputStyle.usualInput);
  const [inputPassArea, setInputPassArea] = useState(inputStyle.usualInput);

  // エラーメッセージ 初期値
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // 画面遷移
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  // 「ログイン」を押下した時
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (email.trim() === "") {
      setEmailError("メールアドレスを入力してください");
      setInputEmailArea(inputStyle.errorInput);
      hasError = true;
    } else {
      setEmailError("");
      setInputEmailArea(inputStyle.usualInput);
    }

    if (password.trim() === "") {
      setPassError("パスワードを入力してください");
      setInputPassArea(inputStyle.errorInput);
      hasError = true;
    } else {
      setPassError("");
      setInputPassArea(inputStyle.usualInput);
    }
    setIsValid(!hasError);
    if (!hasError) {
      router.push("/");
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
          />
          <Input
            label="パスワード"
            type="password"
            inputId="password"
            placeholder="パスワードを入力してください"
            inputName="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            inputClass={inputPassArea}
            errorMessage={passError}
          />
          <div className={loginStyle.linkWrap}>
            <ColorLink colorLinkText="ユーザー登録はこちら" url="/register" />
          </div>
          <div className={loginStyle.btnWrap}>
            <Button type="submit" buttonText="ログイン" size="M" />
          </div>
        </Form>
      </Layout>
    </>
  );
}
