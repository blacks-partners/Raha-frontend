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
          user: data,
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
