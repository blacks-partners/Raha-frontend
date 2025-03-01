import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import inputStyle from "@/components/input/input.module.css";
import Button from "@/components/button/Button";
import registerStyle from "@/styles/Register.module.css";
import ColorLink from "@/components/colorLink/ColorLink";
import { useRouter } from "next/router";

export default function Register() {
  // 新規登録　初期値
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");

  // スタイル 初期値
  const [inputNameStyle, setInputNameStyle] = useState(inputStyle.usualInput);
  const [inputEmailStyle, setInputEmailStyle] = useState(inputStyle.usualInput);
  const [inputPassStyle, setInputPassStyle] = useState(inputStyle.usualInput);
  const [inputPass2Style, setInputPass2Style] = useState(inputStyle.usualInput);

  // 画面遷移
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  // パスワードを表示
  const [passType, setPassType] = useState("password");
  const [confirmPassType, setconfirmPassType] = useState("password");
  const [passIcon, setPassIcon] = useState(true);
  const [confirmPassIcon, setConfirmPassIcon] = useState(true);

  const iconClick1 = () => {
    if (passType === "password") {
      setPassType("text");
      setPassIcon(false);
    } else {
      setPassType("password");
      setPassIcon(true);
    }
  };
  const iconClick2 = () => {
    if (confirmPassType === "password") {
      setconfirmPassType("text");
      setConfirmPassIcon(false);
    } else {
      setconfirmPassType("password");
      setConfirmPassIcon(true);
    }
  };

  // エラー 初期値
  const [inputNameError, setInputNameError] = useState("");
  const [inputEmailError, setInputEmailError] = useState("");
  const [inputPassError, setInputPassError] = useState("");
  const [inputPass2Error, setInputPass2Error] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    // メールアドレス
    const validateEmail = (value: string) => {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regexEmail.test(value);
    };
    // パスワード
    const validatePass = (value: string) => {
      const regexPass =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[a-zA-Z0-9@$!%*?&#]{8,16}$/;
      return regexPass.test(value);
    };

    // 入力値エラー
    if (name.trim() === "") {
      setInputNameError("この項目は必須です");
      setInputNameStyle(inputStyle.errorInput);
      hasError = true;
    } else {
      setInputNameError("");
      setInputNameStyle(inputStyle.usualInput);
    }

    if (email.trim() === "") {
      setInputEmailError("この項目は必須です");
      setInputEmailStyle(inputStyle.errorInput);
      hasError = true;
    } else if (!validateEmail(email)) {
      setInputEmailError("メールアドレスを正しく入力してください");
      setInputEmailStyle(inputStyle.errorInput);
      hasError = true;
    } else {
      setInputEmailError("");
      setInputEmailStyle(inputStyle.usualInput);
    }

    if (password.trim() === "") {
      setInputPassError("この項目は必須です");
      setInputPassStyle(inputStyle.errorInput);
      hasError = true;
    } else if (!validatePass(password)) {
      setInputPassError("パスワードを正しく入力してください");
      setInputPassStyle(inputStyle.errorInput);
      hasError = true;
    } else {
      setInputPassError("");
      setInputPassStyle(inputStyle.usualInput);
    }
    if (password2.trim() === "") {
      setInputPass2Error("この項目は必須です");
      setInputPass2Style(inputStyle.errorInput);
      hasError = true;
    } else if (password !== password2) {
      setInputPass2Error("パスワードが一致しません");
      setInputPass2Style(inputStyle.errorInput);
      hasError = true;
    } else {
      setInputPass2Error("");
      setInputPass2Style(inputStyle.usualInput);
    }

    // 入力値エラーがない場合の処理
    setIsValid(!hasError);
    if (!hasError) {
      // ユーザー情報をローカルストレージへ保存
      localStorage.setItem(
        "userData",
        JSON.stringify({ name, email, password })
      );
      router.push({
        pathname: "/register/confirm",
      });
    }
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
            label="名前"
            type="text"
            inputId="name"
            inputName="name"
            inputClass={inputNameStyle}
            errorMessage={inputNameError}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder="（例）山田太郎"
            autocomplete="off"
          />
          <Input
            label="メールアドレス"
            type="email"
            inputId="email"
            inputName="email"
            inputClass={inputEmailStyle}
            errorMessage={inputEmailError}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder="（例）example@example.com"
            autocomplete="username"
          />
          <Input
            label="パスワード"
            type={passType}
            inputId="password"
            inputName="password"
            inputClass={inputPassStyle}
            errorMessage={inputPassError}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            passMessage="半角英数と記号を含む8文字以上16字以内"
            autocomplete="new-password"
            iconClick={iconClick1}
            passIcon={passIcon}
          />
          <Input
            label="確認用パスワード"
            type={confirmPassType}
            inputId="password2"
            inputName="password2"
            inputClass={inputPass2Style}
            errorMessage={inputPass2Error}
            value={password2}
            handleChange={(e) => setpassword2(e.target.value)}
            placeholder="再度パスワードを入力"
            autocomplete="new-password"
            iconClick={iconClick2}
            passIcon={confirmPassIcon}
          />
          <div className={registerStyle.linkWrap}>
            <ColorLink colorLinkText="ログインはこちら" url="/login" />
          </div>

          <div className={registerStyle.btnWrap}>
            <Button type="submit" buttonText="登録確認へ" size="M" />
          </div>
        </Form>
      </Layout>
    </>
  );
}
