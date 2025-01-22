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

interface PostDetailsProps {
  postDate: string;
  postName: string;
  postTitle: string;
  article: string;
  commentDate: string;
  commenterName: string;
  comment: string;
}

export default function PostDetails(props: PostDetailsProps) {
  const router = useRouter();
  const postDate = "2025-01-07 09:50";
  const posterName = "らは太郎";
  const postTitle = "Javaの基礎";
  const article = "#はじめに";
  const commentDate = "2025-01-07 12:00";
  const commenterName = "山田花子";

  const [comment, setComment] = useState("参考になります");

  const [newComment, setNewComment] = useState("いいね");

  // ダイアログ表示管理
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // コメントの編集可否を管理するステート
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  // メインフォーム送信時
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("handleSubmitが呼ばれました！");

    // ボタン押下時に指定のページに遷移
  };

  //   記事削除アイコン押下時の処理

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleDeleteClick called");
    setShowDeleteDialog(true);
    console.log("setShowDeleteDialog(true) done");
  };

  // 「はい」ボタン押下時 (削除実行)
  const confirmDelete = () => {
    setShowDeleteDialog(false);

    showToasts();
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

  const commentDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowDeleteDialog(true);
  };

  //  コメント編集アイコン押下時

  const commentEditClick = () => {
    // コメント編集モードをオンにする
    setIsCommentEditing(true);
  };

  // 編集完了ボタン押下時
  const handleCommentEditComplete = () => {
    router.push("#");
  };

  const [showToast, setShowToast] = useState(false);

  const showToasts = () => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    // 再度トーストを表示するタイミングなどでタイマーが重複しないようにクリーンアップ
    return () => clearTimeout(timer);
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
        {showToast && <Toast toastText="削除しました" />}
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
