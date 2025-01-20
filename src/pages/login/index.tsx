import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import inputStyle from "@/components/input/input.module.css";
import loginStyle from "@/styles/Login.module.css";
import ColorLink from "@/components/ColorLink/ColorLink";

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

  // 「ログイン」を押下した時
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (email.trim() === "") {
      e.preventDefault();
      setEmailError("メールアドレスを入力してください");
      setInputEmailArea(inputStyle.errorInput);
    } else {
      setEmailError("");
      setInputEmailArea(inputStyle.usualInput);
    }
    if (password.trim() === "") {
      e.preventDefault();
      setPassError("パスワードを入力してください");
      setInputPassArea(inputStyle.errorInput);
    } else {
      setPassError("");
      setInputPassArea(inputStyle.usualInput);
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
        <Form handleSubmit={handleSubmit}>
          <Input
            label={"メールアドレス"}
            type={"email"}
            inputId={"email"}
            placeholder={"メールアドレスを入力してください"}
            inputName={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            inputClass={inputEmailArea}
            errorMessage={emailError}
          />
          <Input
            label={"パスワード"}
            type={"password"}
            inputId={"password"}
            placeholder={"パスワードを入力してください"}
            inputName={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            inputClass={inputPassArea}
            errorMessage={passError}
          />
          <div className={loginStyle.linkWrap}>
            <ColorLink
              colorLinkText={"ユーザー登録はこちら"}
              url={"/register"}
            />
          </div>
          <div className={loginStyle.btnWrap}>
            <Button type={"submit"} buttonText={"ログイン"} size={"M"} />
          </div>
        </Form>
      </Layout>
    </>
  );
}
