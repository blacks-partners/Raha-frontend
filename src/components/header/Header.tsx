import Link from "next/link";
import { useState } from "react";
import HeaderStyle from "../header/header.module.css";
import Image from "next/image";

export default function Header() {
  const [text, setText] = useState(true);
  const [hamburger, setHamburger] = useState(false);
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
  const changeShape = () => {
    setHamburger(!hamburger);
  };

  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.headerContents}>
        <div className={HeaderStyle.headerIcons} onClick={changeShape}>
          {hamburger ? (
            <div className={HeaderStyle.hamburger}>
              <Image
                src="/common/hamburger02.png"
                alt="close"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <div className={HeaderStyle.hamburger}>
              <Image
                src="/common/hamburger01.png"
                alt="open"
                width={40}
                height={40}
                className={HeaderStyle.hamburger}
              />
            </div>
          )}
        </div>
        {hamburger && (
          <ul className={HeaderStyle.mobileUl}>
            <li>
              {text && (
                <p>
                  <Link href="/login" onClick={handleClick}>
                    ログイン
                  </Link>
                </p>
              )}
              {!text && (
                <p>
                  <Link href="#" onClick={handleClick}>
                    ログアウト
                  </Link>
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
                  <Link href="#" onClick={handleClick}>
                    マイページ
                  </Link>
                </p>
              )}
            </li>
          </ul>
        )}
        <ul className={HeaderStyle.pcUl}>
          <li>
            {text && (
              <p>
                <Link href="#" onClick={handleClick}>
                  ログイン
                </Link>
              </p>
            )}
            {!text && (
              <p>
                <Link href="#" onClick={handleClick}>
                  ログアウト
                </Link>
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
                <Link href="#" onClick={handleClick}>
                  マイページ
                </Link>
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
