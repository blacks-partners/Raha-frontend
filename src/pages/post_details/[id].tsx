import Comment from "@/components/comment/Comment";
import Button from "@/components/button/Button";
import Dialog from "@/components/dialog/Dialog";
import Edit from "@/components/edit/edit";

import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import Toast from "@/components/toast/Toast";
import styles from "@/styles/post_details.module.css";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

interface User {
  userId: number;
  name: string;
}

interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface Props {
  postData: {
    articleId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    commentList: Comment[];
  };
  loginUserId: number;
  token: string;
}

export default function PostDetails({ postData, loginUserId, token }: Props) {
  const router = useRouter();
  const { articleId, title, content, user, createdAt, updatedAt, commentList } =
    postData;
  const postUserId = user.userId;
  const posterName = user.name;
  const postDate = formatDate(createdAt);

  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");

  // 記事削除用ダイアログ
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // トースト表示管理
  const [showToast, setShowToast] = useState(false);

  // トーストを2秒表示する関数
  const showToastFor2Seconds = (onComplete?: () => void) => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
      if (onComplete) onComplete();
    }, 2000);

    // 再度トーストを表示するタイミングで重複しないようcleanup
    return () => clearTimeout(timer);
  };

  // 記事編集ページ遷移
  const handlePostEdit = () => {
    router.push(`/edit_post/${articleId}`);
  };

  // 記事の削除ダイアログ表示
  const handlePostDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };

  // 記事の削除ダイアログ非表示
  const closeDialog = () => {
    setShowDeleteDialog(false);
  };

  // 記事削除
  const confirmDelete = async () => {
    setShowDeleteDialog(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/articles/${articleId}`,
      {
        method: "DELETE",
        headers: {
          "X-AUTH-TOKEN": token,
        },
      }
    );

    if (response.ok) {
      showToastFor2Seconds(() => {
        router.push("/");
      });
    }
  };

  // テキストエリアの onChange ハンドラー
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setNewComment(value);

    if (value.length > 500) {
      setCommentError("コメントは500文字以内で入力してください");
    } else if (value.length == 0) {
      setCommentError("コメントを入力してください");
    } else {
      setCommentError("");
    }
  };

  // 新規コメント投稿処理（フォーム送信時）
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginUserId == null) {
      router.push("/login");
    } else {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
          articleId,
          userId: loginUserId,
          content: newComment,
        }),
      });

      if (response.ok) {
        setNewComment("");
        setCommentError("");
        router.push(`/post_details/${articleId}`);
      }
    }
  };

  // ログイン画面遷移
  const handleLoginClick = () => {
    router.push("/login");
  };

  // 入力欄フォーカス用
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout
      headTitle="投稿詳細"
      headName="投稿詳細"
      headContent="投稿詳細"
      pageTitle="投稿詳細画面"
    >
      {showToast && <Toast toastText="削除しました" />}

      {/* 削除ダイアログ（記事用） */}
      {showDeleteDialog && (
        <Dialog
          dialogText="記事を削除してもよろしいですか？"
          yesButtonText="削除"
          noButtonText="キャンセル"
          okButton={confirmDelete}
          noButton={closeDialog}
          handleSubmit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {/* 記事の部分 */}
      <RoundFrame>
        <div>
          {loginUserId == postUserId && (
            <Edit deleteClick={handlePostDelete} editClick={handlePostEdit} />
          )}
          <div>
            <div>
              <div>
                <Link href={"#"} className={styles.post_name}>
                  <span className={styles.post_name}>{posterName}</span>
                </Link>
                <div className={styles.post_date_container}>
                  <p className={styles.label}>
                    作成日 <span>{postDate}</span>
                  </p>
                  <p className={styles.label}>
                    更新日 <span>{postDate}</span>
                  </p>
                </div>
              </div>
              <h1 className={styles.post_title}>{title}</h1>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`markdown-body ${styles.post_content}`}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </RoundFrame>
      <br />
      <br />
      <br />
      {/* コメントの部分 */}
      <RoundFrame>
        <p className={styles.comment_title}>コメント</p>
        {commentList.length > 0 ? (
          <>
            {commentList
              .sort((a, b) => {
                // updatedAt の昇順で比較
                const updatedA = new Date(a.updatedAt).getTime();
                const updatedB = new Date(b.updatedAt).getTime();
                if (updatedA !== updatedB) {
                  return updatedA - updatedB;
                }
                // updatedAt が同じ場合、createdAt の昇順で比較
                const createdA = new Date(a.createdAt).getTime();
                const createdB = new Date(b.createdAt).getTime();
                if (createdA !== createdB) {
                  return createdA - createdB;
                }
                // さらに、両者が同じ場合は commentId の昇順で比較
                return a.commentId - b.commentId;
              })
              .map((comment) => (
                <Comment
                  comment={comment}
                  loginUserId={loginUserId}
                  token={token}
                  key={comment.commentId}
                />
              ))}
          </>
        ) : (
          <div>
            <p>この投稿にはコメントがありません</p>
          </div>
        )}
      </RoundFrame>

      <br />
      <br />
      <br />

      <RoundFrame
        onFrameClick={() => {
          inputRef.current?.focus();
        }}
      >
        {loginUserId == null ? (
          <div>
            <p className={styles.login_text}>ログインするとコメントできます</p>
            <Button
              type="button"
              buttonText={"ログイン"}
              size={"S"}
              buttonClick={handleLoginClick}
            ></Button>
          </div>
        ) : (
          <Form handleSubmit={handleSubmit} noValidate={false}>
            <div>
              <textarea
                className={styles.textarea}
                placeholder="ここにコメントを入力してください"
                value={newComment}
                onChange={handleOnChange}
              ></textarea>
              {commentError && (
                <p className={styles.error_msg}>{commentError}</p>
              )}
              <div className={styles.button}>
                <Button
                  type="submit"
                  buttonText="投稿"
                  size="S"
                  disabled={!!commentError}
                />
              </div>
            </div>
          </Form>
        )}
      </RoundFrame>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // パスパラメータ取得
  const { id } = context.params as { id: string };

  // Cookie情報取得
  const userCookie = context.req.cookies;

  // トークン未対応
  const loginUserId = userCookie.loginID || null;
  const token = userCookie.token || null;

  // 記事詳細情報取得
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/articles/${id}`);
  try {
    const postData = await response.json();
    return {
      props: {
        postData,
        loginUserId,
        token,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
