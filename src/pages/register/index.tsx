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

  const handleSubmit = () => {
    console.log("aaa");
  };
  return (
    <>
      <Layout
        headTitle={"ユーザー登録"}
        headName={"description"}
        headContent={"rahaユーザー登録"}
        pageTitle={"ユーザー登録"}
      >
        <Form handleSubmit={handleSubmit}>
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
            <Button type="button" buttonText="登録" size="M" />
          </div>
        </Form>
      </Layout>
    </>
  );
}
