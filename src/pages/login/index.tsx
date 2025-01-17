import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import liginStyle from "@/styles/Login.module.css";
import LayoutStyle from "../../components/layout/layout.module.css";

export default function Login() {
  // メールアドレス、パスワード初期値
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 「ログイン」を押下した時
  const handleSubmit = (event) => {
    event.preventDefault();
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
          {/* inputコンポーネント？ */}
          <Input
            label={"メールアドレス"}
            type={"email"}
            inputId={"email"}
            inputName={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={"パスワード"}
            type={"password"}
            inputId={"password"}
            inputName={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/" className="link">
            ユーザー登録はこちら
          </Link>

          <Button type={"submit"} buttonText={"ログイン"} />
        </Form>
      </Layout>
    </>
  );
}
