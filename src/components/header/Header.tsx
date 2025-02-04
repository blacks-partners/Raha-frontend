import Link from "next/link";
import { useState } from "react";
import HeaderStyle from "../header/header.module.css";
import Image from "next/image";
import useSWR from "swr";
import Toast from "../toast/Toast";

export default function Header() {
  const [hamburger, setHamburger] = useState(false);
  const [toast, setToast] = useState("");
  const [view, setView] = useState(false);
  const {
    data: res,
    error,
    isLoading,
  } = useSWR("/api/me", (url: string) => fetch(url));

  const loginStatus = !error && !isLoading && res && res.status === 200;
  console.log(res);

  const changeShape = () => {
    setHamburger(!hamburger);
  };

  const handleClick = async () => {
    try {
      const res = await fetch("/api/logout", {});

      if (res.ok) {
        setView(true);
        setToast("ログアウトしました");
        setTimeout(() => {
          setToast(""), setView(false);
        }, 2000);
      }
    } catch {
      setView(true);

      setToast("ログアウトに失敗しました");
      setTimeout(() => {
        setToast(""), setView(false);
      }, 2000);
    }
  };

  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.headerContents}>
        {view && <Toast toastText={toast}></Toast>}
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
            {loginStatus ? (
              <>
                <li>
                  <Link href="/">投稿一覧</Link>
                </li>
                <li>
                  <Link href="/mypage/post_list">マイページ</Link>
                </li>
                <li>
                  <Link href="/new_post">新規投稿</Link>
                </li>
                <li>
                  <Link href="/mypage">アカウント情報</Link>
                </li>
                <li>
                  <Link href="#" onClick={handleClick}>
                    ログアウト
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/">投稿一覧</Link>
                </li>
                <li>
                  <Link href="/login">ログイン</Link>
                </li>
                <li>
                  <Link href="/new_post">新規登録</Link>
                </li>
              </>
            )}
          </ul>
        )}
        <ul className={HeaderStyle.pcUl}>
          {loginStatus ? (
            <>
              <li>
                <Link href="/">投稿一覧</Link>
              </li>
              <li>
                <Link href="/mypage/post_list">マイページ</Link>
              </li>
              <li>
                <Link href="/new_post">新規投稿</Link>
              </li>
              <li>
                <Link href="/mypage">アカウント情報</Link>
              </li>
              <li>
                <Link href="#" onClick={handleClick}>
                  ログアウト
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/">投稿一覧</Link>
              </li>
              <li>
                <Link href="/login">ログイン</Link>
              </li>
              <li>
                <Link href="/register">新規登録</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
