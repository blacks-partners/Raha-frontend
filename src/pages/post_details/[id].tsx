import Button from "@/components/button/Button";
import Dialog from "@/components/dialog/Dialog";
import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import styles from "@/styles/post_details.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function PostDetails() {
  const router = useRouter();

  const [postDate, setPostDate] = useState("");
  const [posterName, setPosterName] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [article, setArticle] = useState("");
  const [commentDate, setCommentDate] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");

  // ダイアログ表示管理
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // コメントの編集可否を管理するステート
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  useEffect(() => {
    setPostDate("2025-01-07 09:50");
    setPosterName("らは太郎");
    setPostTitle("Javaの基礎");
    setArticle("#はじめに");
    setCommentDate("2025-01-07 12:00");
    setCommenterName("山田花子");
    setComment("参考になります");
    setNewComment("いいね");
  }, []);

  // メインフォーム送信時
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ボタン押下時に指定のページに遷移
    router.push("/post_details");
  };

  //   記事削除アイコン押下時の処理

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  // 「はい」ボタン押下時 (削除実行)
  const confirmDelete = () => {
    alert("削除しました");
    setShowDeleteDialog(false);
    // 実際は削除API呼び出し後、一覧ページへ遷移など
    // router.push("/list");
  };

  // 「いいえ」ボタン押下時 (ダイアログを閉じる)
  const closeDialog = () => {
    setShowDeleteDialog(false);
  };

  //   記事編集アイコン押下時の処理

  const handleEditClick = () => {
    // ここでは例としてトップページへ移動
    router.push("/");
  };

  //  コメント削除アイコン押下時

  const commentDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  //  コメント編集アイコン押下時

  const commentEditClick = () => {
    // コメント編集モードをオンにする
    setIsCommentEditing(true);
  };

  // 編集完了ボタン押下時
  const handleCommentEditComplete = () => {
    router.push("/edit_post");
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Layout
        headTitle="投稿詳細"
        headName="投稿詳細"
        headContent="投稿詳細"
        pageTitle="投稿詳細画面"
      >
        {/* 削除ダイアログ */}
        {showDeleteDialog && (
          <Dialog
            dialogText="本当に削除しますか？"
            yesButtonText="はい"
            noButtonText="いいえ"
            okButton={confirmDelete}
            noButton={closeDialog}
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
    </>
  );
}
