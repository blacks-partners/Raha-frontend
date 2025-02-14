import Edit from "@/components/edit/edit";
import Button from "@/components/button/Button";
import Dialog from "@/components/dialog/Dialog";

import styles from "@/components/comment/comment.module.css";

import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Toast from "../toast/Toast";

const formatDate = (dateString: string): string => {
  // "Z"を付与するなどで明示的にUTCとして扱う
  const date = new Date(
    dateString.endsWith("Z") ? dateString : dateString + "Z"
  );
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("ja-JP", options).replace(/,/g, "");
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

interface CommentProps {
  comment: Comment;
  loginUserId: number;
  token: string;
}

export default function Comment({ comment, loginUserId, token }: CommentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { commentId } = comment;
  const commentUserId = comment.user.userId;
  const commentDate = formatDate(comment.createdAt);
  const commenterName = comment.user.name;
  const content = comment.content;

  const [editContent, setEditContent] = useState(content);

  // トースト表示管理
  const [showToast, setShowToast] = useState(false);

  // コメント編集モード
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  // コメント削除用ダイアログ
  const [showDeleteCommentDialog, setShowDeleteCommentDialog] = useState(false);

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

  // コメント削除ダイアログ表示
  const handleCommentDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteCommentDialog(true);
  };

  // ダイアログ非表示
  const closeCommentDialog = () => {
    setShowDeleteCommentDialog(false);
  };

  // コメント編集
  const handleCommentEdit = () => {
    setIsCommentEditing(true);
  };
  const handleCommentEditComplete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
          content: editContent,
        }),
      }
    );

    if (response.ok) {
      router.push(`/${pathname}`);
    }
    setIsCommentEditing(false);
  };

  // コメント削除
  const deleteComment = async () => {
    setShowDeleteCommentDialog(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
      }
    );
    showToastFor2Seconds(() => {
      router.push(`/${pathname}`);
    });
  };

  return (
    <>
      {showToast && <Toast toastText="削除しました" />}

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
      {loginUserId == commentUserId && (
        <Edit deleteClick={handleCommentDelete} editClick={handleCommentEdit} />
      )}
      <div>
        <div className={styles.comment_header}>
          <Link href={"#"} className={styles.comment_name}>
            <span>{commenterName}</span>
          </Link>
          <span className={styles.comment_date}>{commentDate}</span>
        </div>
        {isCommentEditing ? (
          <div>
            <textarea
              className={styles.comment_input}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            ></textarea>
            <div className={styles.button_container}>
              <Button
                type="button"
                buttonText="キャンセル"
                size="S"
                buttonClick={() => {
                  setEditContent(content);
                  setIsCommentEditing(false);
                }}
                disabled={!content.trim()}
              />
              <span className={styles.button_margin}></span>
              <Button
                type="button"
                buttonText="完了"
                size="S"
                buttonClick={handleCommentEditComplete}
                disabled={!content.trim()}
              />
            </div>
          </div>
        ) : (
          <pre className={styles.comment_content}>{content}</pre>
        )}
      </div>
    </>
  );
}
