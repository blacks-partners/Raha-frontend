import Link from "next/link";
import liginStyle from "@/styles/Login.module.css";

export default function Login() {
  return (
    <>
      <Layout
        headTitle="ログイン"
        headName="description"
        headContent="rahaログインページ"
        pageTitle="ログイン"
      >
        {/* タイトルコンポーネント */}
        <h1>ログイン</h1>
        {/* フォームコンポーネント */}
        <form action="" method="POST">
          {/* inputコンポーネント？ */}
          <label htmlFor="email">
            メールアドレス
            <input type="text" id="email" value={""} />
          </label>
          <label htmlFor="password">
            パスワード
            <input type="password" id="password" value={""} />
          </label>
          <Link href="/">ユーザー登録はこちら</Link>
          {/* ボタンコンポーネント */}
          <button type="submit">ログイン</button>
        </form>
      </Layout>
    </>
  );
}
