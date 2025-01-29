import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();

  const [postTitle, setPostTitle] = useState("");
  const [postTextarea, SetPostTextarea] = useState("");

  const handlePost = async () => {
    try {
      const response = await fetch("http://localhost:8000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle,
          content: postTextarea,
        }),
      });
      //ここでデータ(articleのidがほしい)取ってくる
      const responseData = await response.json();
      const articleId = responseData.id;

      if (response.ok) {
        router.push(`/post_details/${articleId}`);
      }
    } finally {
      console.error("エラーが発生しました");
    }
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
