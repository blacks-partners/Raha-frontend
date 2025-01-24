import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EdidPost() {
  const router = useRouter();

  // タイトルと内容を親で管理（編集可能にする）
  const [title, setTitle] = useState("Javaの基礎");
  const [content, setContent] = useState("あいう");

  // 「投稿」ボタン押下時に呼ばれる
  // (画面遷移やAPI通信などの処理を親が担う)
  const handlePost = () => {
    // ここでAPIリクエストなど実行してもOK
    // 最終的にページ遷移:
    router.push("/post_details");
  };

  const button = "投稿";

  return (
    <Layout
      headTitle={"投稿編集"}
      headName={"投稿編集"}
      headContent={"投稿編集"}
      pageTitle={"投稿編集画面"}
    >
      <MarkDown
        buttonText={button}
        // 親のstateを渡す（ユーザーが編集できるようにする）
        title={title}
        textarea={content}
        // ユーザーが入力した値を受け取るためのコールバック
        onTitleChange={(newTitle) => setTitle(newTitle)}
        onContentChange={(newContent) => setContent(newContent)}
        // フォーム送信時に呼ばれるコールバック（投稿ボタン押下時）
        onPost={handlePost}
      />
    </Layout>
  );
}
