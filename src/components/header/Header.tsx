import Link from "next/link";
import { useState } from "react";
import HeaderStyle from "../header/header.module.css";

export default function Header() {
  const [text, setText] = useState(true);
  //   const {
  //     data: res,
  //     error,
  //     isLoading,
  //   } = useSWR("フェッチAPI。認証", (url: string) => fetch(url));

  //   const loginStatus = !error && !isLoading && res && res.status === 200;
  //API確認次第、コメントの部分を表示させます！

  const handleClick = () => {
    setText(!text);
  };

  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.headerContents}>
        <ul className={HeaderStyle.navUl}>
          <li>
            {text && (
              <p>
                <a href="#" onClick={handleClick}>
                  ログイン
                </a>
              </p>
            )}
            {!text && (
              <p>
                <a href="#" onClick={handleClick}>
                  ログアウト
                </a>
              </p>
            )}
          </li>

          <li>
            <p>
              <Link href="/newPost">新規投稿</Link>
            </p>
          </li>
          <li>
            <p>
              <Link href="/list">投稿一覧</Link>
            </p>
          </li>
          <li>
            {!text && (
              <p>
                <a href="#" onClick={handleClick}>
                  マイページ
                </a>
              </p>
            )}
          </li>
        </ul>

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

        {/* {loginStatus&&(
           <p>
          <Link href="/myPage">マイページ</Link>
           </p>
        )}
       */}
      </div>
    </div>
  );
}
