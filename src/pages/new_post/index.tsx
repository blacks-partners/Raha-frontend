import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface Props {
  data: {
    id: number;
    name: string;
    email: string;
    password: string;
    introduction: string;
    created_at: string;
    updated_at: string;
  };
}

export default function NewPost({ data }: Props) {
  const router = useRouter();

  const [postTitle, setPostTitle] = useState("");
  const [postTextarea, SetPostTextarea] = useState("");
  console.log("data", { data });
  const handlePost = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
          title: postTitle,
          content: postTextarea,
          userId: data.id,
        }),
      });
      const contentType = response.headers.get("Content-Type");
      console.log("レスポンス Content-Type:", contentType);

      // ❗ エラーレスポンスの処理 (JSON でない場合に `text()` を使う)
      if (!response.ok) {
        const errorText = await response.text();
        console.error("エラー発生:", errorText);
        return;
      }

      // ✅ JSON のレスポンスを取得
      const responseData = await response.json();
      console.log("レスポンスデータ:", responseData);

      const articleId = responseData.id;
      router.push(`/post_details/${articleId}`);
    } catch (error) {
      console.error("", error);
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

export const getServerSideProps = (async ({ req }) => {
  console.log("cookie", req.cookies);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/users/${req.cookies.loginID}`
  );

  const data = await res.json();
  console.log(data);
  // const token=req.cookies.token;渡す

  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: {
    [K: string]: string;
  };
}>;
