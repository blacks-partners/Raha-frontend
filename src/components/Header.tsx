import Link from "next/link";
import Styles from "@/styles/Home.module.css";

export default function Header() {
  return (
    <div className={Styles.header}>
      <div>
        <p>
          <Link href="/login">ログイン</Link>
        </p>
        <p>
          <Link href="/newPost">新規投稿</Link>
        </p>
        <p>
          <Link href="/list">投稿一覧</Link>
        </p>
        <p>
          <Link href="/myPage">マイページ</Link>
        </p>
      </div>
    </div>
  );
}
