import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import inputStyle from "@/components/input/input.module.css";
import Button from "@/components/button/Button";
import registerStyle from "@/styles/Register.module.css";

export default function Register() {
  // 新規登録　初期値
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [introduction, setIntroduction] = useState("");

  // スタイル 初期値
  const [inputNameStyle, setInputNameStyle] = useState(inputStyle.usualInput);
  const [inputEmailStyle, setInputEmailStyle] = useState(inputStyle.usualInput);
  const [inputPassStyle, setInputPassStyle] = useState(inputStyle.usualInput);
  const [inputPass2Style, setInputPass2Style] = useState(inputStyle.usualInput);

  // エラー 初期値
  const [inputNameError, setInputNameError] = useState("");
  const [inputEmailError, setInputEmailError] = useState("");
  const [inputPassError, setInputPassError] = useState("");
  const [inputPass2Error, setInputPass2Error] = useState("");

  // エラー
  const validateInput = (
    value: string,
    setError: (error: string) => void,
    setStyle: (style: string) => void,
    errorMessage: string
  ) => {
    if (value.toString().trim() === "") {
      setError(errorMessage);
      setStyle(inputStyle.errorInput);
    } else {
      setError("");
      setStyle(inputStyle.usualInput);
    }
  };

  const validateForm = () => {
    validateInput(
      name,
      setInputNameError,
      setInputNameStyle,
      "この項目は必須です"
    );

    // パスワード
    if (password === "") {
      setInputPassError("この項目は必須です");
      setInputPassStyle(inputStyle.errorInput);
    } else if (password.length < 8 || password.length > 16) {
      setInputPassError("パスワードは8文字以上16文字以下で入力してください");
      setInputPassStyle(inputStyle.errorInput);
    } else {
      setInputPassError("");
      setInputPassStyle(inputStyle.usualInput);
    }
    if (password2 === "") {
      setInputPass2Error("この項目は必須です");
      setInputPass2Style(inputStyle.errorInput);
    } else if (password !== password2) {
      setInputPass2Error("パスワードが一致しません");
      setInputPass2Style(inputStyle.errorInput);
    } else {
      setInputPass2Error("");
      setInputPass2Style(inputStyle.usualInput);
    }

    // メールアドレス
    const validateEmail = (value: string) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(value);
    };

    if (email === "") {
      setInputEmailError("この項目は必須です");
      setInputEmailStyle(inputStyle.errorInput);
    } else if (!validateEmail(email)) {
      setInputEmailError("正しいアドレス形式で入力してください");
      setInputEmailStyle(inputStyle.errorInput);
    } else {
      setInputEmailError("");
      setInputEmailStyle(inputStyle.errorInput);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
  };
  return (
    <>
      <Layout
        headTitle={"ユーザー登録"}
        headName={"description"}
        headContent={"rahaユーザー登録"}
        pageTitle={"ユーザー登録"}
      >
        <Form handleSubmit={handleSubmit} noValidate={true}>
          <Input
            label={<>名前{<span className={inputStyle.span}> *</span>}</>}
            type="text"
            inputId="name"
            inputName="name"
            inputClass={inputNameStyle}
            errorMessage={inputNameError}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder="例）山田太郎"
          />
          <Input
            label={
              <>メールアドレス{<span className={inputStyle.span}> *</span>}</>
            }
            type="email"
            inputId="email"
            inputName="email"
            inputClass={inputEmailStyle}
            errorMessage={inputEmailError}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder="例）example@example.com"
          />
          <Input
            label={<>パスワード{<span className={inputStyle.span}> *</span>}</>}
            type="password"
            inputId="password"
            inputName="password"
            inputClass={inputPassStyle}
            errorMessage={inputPassError}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            placeholder="8文字以上16文字以内"
          />
          <Input
            label={
              <>確認用パスワード{<span className={inputStyle.span}> *</span>}</>
            }
            type="password"
            inputId="password2"
            inputName="password2"
            inputClass={inputPass2Style}
            errorMessage={inputPass2Error}
            value={password2}
            handleChange={(e) => setpassword2(e.target.value)}
            placeholder="再度パスワードを入力"
          />
          <div className={registerStyle.textAreaWrap}>
            <label htmlFor="introduction">自己紹介</label>
            <textarea
              name="introduction"
              id="introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder={"例）よろしくお願いします"}
            ></textarea>
          </div>
          <div className={registerStyle.btnWrap}>
            <Button type="submit" buttonText="登録" size="M" />
          </div>
        </Form>
      </Layout>
    </>
  );
}
