import Button from "@/components/button/Button";
import Dialog from "@/components/dialog/Dialog";
import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import Toast from "@/components/toast/Toast";
import styles from "@/styles/post_details.module.css";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function PostDetails() {
  const router = useRouter();

  const postDate = "2025-01-07 09:50";
  const posterName = "らは太郎";
  const postTitle = "Javaの基礎";
  const article = "#はじめに";
  const commentDate = "2025-01-07 12:00";
  const commenterName = "山田花子";

  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");

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
    console.log("handleSubmitが呼ばれました！");
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

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleEditClick = () => {
    router.push("/edit_post");
  };

  // コメント削除フロー

  const commentDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const commentEditClick = () => {
    setIsCommentEditing(true);
  };
  const handleCommentEditComplete = () => {
    router.push("#");
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
        <EditRoundFrame
          deleteClick={handleDeleteClick}
          editClick={handleEditClick}
        >
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
        </EditRoundFrame>

        <h1 className={styles.comment_title}>コメント</h1>

        {/* コメントの部分 */}
        <EditRoundFrame
          deleteClick={commentDeleteClick}
          editClick={commentEditClick}
        >
          <div>
            {commentDate}
            <br />
            <label htmlFor="name">コメント者:</label>
            {commenterName}
            <br />
            <label htmlFor="comment"></label>
            <input
              className={styles.input}
              type="text"
              name="comment"
              id="comment"
              value={comment}
              readOnly={!isCommentEditing}
              onChange={(e) => setComment(e.target.value)}
            />

            {isCommentEditing && (
              <div style={{ marginTop: "10px" }}>
                <Button
                  type="button"
                  buttonText="編集完了"
                  size="S"
                  buttonClick={handleCommentEditComplete}
                />
              </div>
            )}
          </div>
        </EditRoundFrame>

        <RoundFrame
          onFrameClick={() => {
            inputRef.current?.focus();
          }}
        >
          <div>
            <label htmlFor="comment"></label>
            <input
              className={styles.input}
              type="text"
              name="post_comment"
              id="post_comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              ref={inputRef}
            />
            <div className={styles.button}>
              <Button type="submit" buttonText="投稿" size="S" />
            </div>
          </div>
        </RoundFrame>
      </Form>
    </Layout>
  );
}
