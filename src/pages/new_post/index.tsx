import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();

  const [postTitle, setPostTitle] = useState("");
  const [postTextarea, SetPostTextarea] = useState("");

  const handlePost = () => {
    // ここでAPIリクエストなど実行してもOK
    // 最終的にページ遷移:
    router.push("/post_details");
  };
  return (
    <Layout
      headContent="新規投稿"
      headName="新規投稿"
      headTitle="新規投稿"
      pageTitle="新規投稿"
    >
      <MarkDown
        buttonText="投稿"
        textarea={postTextarea}
        onContentChange={SetPostTextarea}
        title={postTitle}
        onTitleChange={setPostTitle}
        onPost={handlePost}
      ></MarkDown>
    </Layout>
  );
}
