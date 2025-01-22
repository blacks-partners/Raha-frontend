import Layout from "@/components/layout/Layout";
import { useState } from "react";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import inputStyle from "@/components/input/input.module.css";
import Button from "@/components/button/Button";
import style from "@/styles/mypage.module.css";

export default function Home() {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [introduction, setIntroduction] = useState("");
  // メールアドレスバリデーション
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //マイページに戻る処理
  const backToMypage = () => {
    location.href = "/mypage";
  };

  //　submit時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 項目の不備がないとき:false、不備があるとき:TRUE
    let hasError = false;
    // 項目に不備がある場合、データを送信させない
    if (hasError) {
      return;
    }
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
      </Layout>
    </>
  );
}
