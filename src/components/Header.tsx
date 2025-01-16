import Link from "next/link";
import Styles from "@/styles/Home.module.css";
import useSWR from "swr";

export default function Header() {
  //   const {
  //     data: res,
  //     error,
  //     isLoading,
  //   } = useSWR("フェッチAPI。クッキー持ってるかの認証", (url: string) => fetch(url));

  //   const loginStatus = !error && !isLoading && res && res.status === 200;
  //API確認次第、コメントの部分を表示させます！
  return (
    <div className={Styles.header}>
      <div>
        <p>
          <Link href="/login">ログイン</Link>
        </p>
        <p>
          <Link href="/logout">ログアウト</Link>
        </p>
        {/* {loginStatus&&(
           <p>
             <Link href="/login">ログイン</Link>
           </p>
        )}
        {!loginStatus&&(
           <p>
          <Link href="/logout">ログアウト</Link>
          </p>
        )}
        */}

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
