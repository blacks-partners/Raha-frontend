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

  // 入力欄 初期値
  const [inputNameArea, setInputNameArea] = useState(inputStyle.usualInput);
  const [inputEmailArea, setInputEmailArea] = useState(inputStyle.usualInput);
  const [inputPassArea, setInputPassArea] = useState(inputStyle.usualInput);
  const [inputPass2Area, setInputPass2Area] = useState(inputStyle.usualInput);
  const [textArea, setTextArea] = useState(inputStyle.usualInput);

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
            label="名前"
            type="text"
            inputId="name"
            inputName="name"
            inputClass={inputNameArea}
            errorMessage={inputNameError}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder="例）山田太郎"
          />
          <Input
            label="メールアドレス"
            type="email"
            inputId="email"
            inputName="email"
            inputClass={inputNameArea}
            errorMessage={inputEmailError}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder="例）example@example.com"
          />
          <Input
            label="パスワード"
            type="password"
            inputId="password"
            inputName="password"
            inputClass={inputPassArea}
            errorMessage={inputPassError}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            placeholder="8文字以上16文字以内"
          />
          <Input
            label="確認用パスワード"
            type="password"
            inputId="password2"
            inputName="password2"
            inputClass={inputPass2Area}
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
              placeholder="例）エンジニア初心者です"
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
