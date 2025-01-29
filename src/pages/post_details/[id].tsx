import Button from "@/components/button/Button";
import Dialog from "@/components/dialog/Dialog";
import Edit from "@/components/edit/edit";

import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import Toast from "@/components/toast/Toast";
import styles from "@/styles/post_details.module.css";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function PostDetails() {
  const router = useRouter();

  // ログインユーザーのID（仮置き）
  const loggedInUserId = 1; // 本来は認証システムから取得

  // 投稿とコメントのユーザーID（仮置き）
  const postUserId = 1;
  const commentUserId = 1;

  const postDate = "2025-01-07 09:50";
  const posterName = "らは太郎";
  const postTitle = "Javaの基礎";
  const article = "#はじめに";
  const commentDate = "2025-01-07 12:00";
  const commenterName = "山田花子";

  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");

  const [commentError, setCommentError] = useState(""); // エラーメッセージの状態
  const [newCommentError, setNewCommentError] = useState("");

  // 記事削除用ダイアログ
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // コメント削除用ダイアログ
  const [showDeleteCommentDialog, setShowDeleteCommentDialog] = useState(false);

  // コメント編集モード
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  // トースト表示管理
  const [showToast, setShowToast] = useState(false);

  // フォーム送信
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length <= 500) {
      console.log("Comment submitted:", comment);
    } else {
      setCommentError("コメントは500文字以内で入力してください");
    }
  };

  //  トーストを2秒表示する関数
  const showToastFor2Seconds = (onComplete?: () => void) => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
      if (onComplete) onComplete();
    }, 2000);

    // 再度トーストを表示するタイミングで重複しないようcleanup
    return () => clearTimeout(timer);
  };

  // 記事削除フロー

  const handlePostDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };
  const confirmDelete = () => {
    setShowDeleteDialog(false);
    // 表示後に "/" へ画面遷移
    showToastFor2Seconds(() => {
      router.push("/");
    });
  };
  const closeDialog = () => {
    setShowDeleteDialog(false);
  };

  // 記事編集

  const handlePostEdit = () => {
    router.push("/edit_post");
  };

  // コメント削除フロー

  const handleCommentDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteCommentDialog(true);
  };
  // 削除（はい）押下: 遷移せずトーストのみ表示
  const deleteComment = () => {
    setShowDeleteCommentDialog(false);
    showToastFor2Seconds();
  };
  const closeCommentDialog = () => {
    setShowDeleteCommentDialog(false);
  };

  // コメント編集

  const handleCommentEdit = () => {
    setIsCommentEditing(true);
  };
  const handleCommentEditComplete = () => {
    if (comment.trim()) {
      // コメントが空でないことを確認
      router.push("#");
    }
  };
  //コメント編集時、500文字超えたらエラー出す
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // 一度高さをautoに設定してから
    textarea.style.height = `${textarea.scrollHeight}px`; // スクロール高さに基づいて高さを設定

    const editCommentValue = textarea.value;
    if (editCommentValue.length > 500) {
      setCommentError("500文字まで記載してください");
    } else {
      setCommentError("");
      setComment(editCommentValue);
    }
  };

  //コメント投稿時、500文字超えたらエラー出す
  const handleCommentPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTextarea = e.target;
    newTextarea.style.height = "auto"; // 一度高さをautoに設定してから
    newTextarea.style.height = `${newTextarea.scrollHeight}px`; // スクロール高さに基づいて高さを設定

    const newCommentValue = newTextarea.value;
    if (newCommentValue.length > 500) {
      setNewCommentError("500文字まで記載してください");
    } else {
      setNewCommentError("");
      setNewComment(newCommentValue);
    }
  };

  // 入力欄フォーカス用
  const commentRef = useRef<HTMLTextAreaElement>(null);

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

      {/* 削除ダイアログ（コメント用） */}
      {showDeleteCommentDialog && (
        <Dialog
          dialogText="コメントを削除してもよろしいですか？"
          yesButtonText="削除"
          noButtonText="キャンセル"
          okButton={deleteComment}
          noButton={closeCommentDialog}
          handleSubmit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}

      <Form handleSubmit={handleSubmit} noValidate={false}>
        {/* 記事の部分 */}
        <RoundFrame>
          {loggedInUserId === postUserId && (
            <Edit deleteClick={handlePostDelete} editClick={handlePostEdit} />
          )}
          <label htmlFor="date">作成日：</label>
          {postDate}
          <br />
          <label htmlFor="name">作成者：</label>
          {posterName}
          <br />
          <label htmlFor="title"></label>
          {postTitle}
          <br />
          <label htmlFor="article"></label>
          {article}
        </RoundFrame>

        <h1 className={styles.comment_title}>コメント</h1>

        {/* コメントの部分 */}
        <RoundFrame>
          {loggedInUserId === commentUserId && (
            <Edit
              deleteClick={handleCommentDelete}
              editClick={handleCommentEdit}
            />
          )}
          <div>
            {commentDate}
            <br />
            <label htmlFor="name">コメント者:</label>
            {commenterName}
            <br />
            <label htmlFor="comment"></label>
            <textarea
              className={styles.textarea}
              name="comment"
              id="comment"
              value={comment}
              readOnly={!isCommentEditing}
              onChange={handleCommentChange}
              ref={commentRef}
            />
            {commentError && <p className={styles.error}>{commentError}</p>}
            {isCommentEditing && (
              <div className={styles.editButton}>
                <Button
                  type="button"
                  buttonText="編集完了"
                  size="S"
                  buttonClick={handleCommentEditComplete}
                  disabled={!comment.trim()}
                />
              </div>
            )}
          </div>
        </RoundFrame>

        <RoundFrame
          onFrameClick={() => {
            commentRef.current?.focus();
          }}
        >
          <div>
            <label htmlFor="comment"></label>
            <textarea
              className={styles.textarea}
              name="post_comment"
              id="post_comment"
              placeholder="コメントを追加してください"
              value={newComment}
              onChange={handleCommentPost}
              ref={commentRef}
            />
            {newCommentError && (
              <p className={styles.error}>{newCommentError}</p>
            )}
            <div className={styles.button}>
              <Button
                type="submit"
                buttonText="投稿"
                size="S"
                disabled={!newComment.trim()}
              />
            </div>
          </div>
        </RoundFrame>
      </Form>
    </Layout>
  );
}
