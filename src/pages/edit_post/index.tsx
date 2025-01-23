import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import { useState } from "react";

export default function EdidPost() {
  const [title, setTitle] = useState("Javaの基礎");
  const [content, setContent] = useState("あいう");

  const button = "投稿";

  return (
    <>
      <Layout
        headTitle={"投稿編集"}
        headName={"投稿編集"}
        headContent={"投稿編集"}
        pageTitle={"投稿編集画面"}
      >
        <MarkDown
          buttonText={button}
          title={title}
          textarea={content}
        ></MarkDown>
      </Layout>
    </>
  );
}
