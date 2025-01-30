import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSideProps } from "next";

interface EditPostProps {
  postData: {
    title: string;
    content: string;
    articleId: number;
  };
  token: string;
}

export default function EditPost({ postData, token }: EditPostProps) {
  const router = useRouter();
  console.log(postData);
  console.log(postData.title);
  console.log(postData.content);
  // タイトルと内容を親で管理（編集可能にする）
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);

  // 「投稿」ボタン押下時に呼ばれる
  const handlePost = async () => {
    console.log(
      "getServerSidePropsで取得したpostDataがわたってきてるか確認",
      postData
    );
    console.log(
      "getServerSidePropsで取得したtoken(JWT)がわたってきてるか確認",
      token
    );

    // PUTリクエストでデータを更新
    const response = await fetch(
      `http://localhost:8080/articles/${postData.articleId}`,
      {
        //API設計書の通りのmethod

        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //headersに渡されたtokenを格納
          // "X-AUTH-TOKEN": token,
        },
        //bodyに含めれたtitleとcontentをJSON文字列に変換
        body: JSON.stringify({ title, content }),
      }
    );
    console.log(
      "変数responseにparamsと同じ記事データが格納されたか確認",
      response
    );

    if (response.ok) {
      // 更新が成功したら該当する投稿詳細画面へ遷移
      router.push(`/post_details/${postData.articleId}`);
    } else {
      // エラー処理（エラーメッセージを表示するなど）
      console.error("Failed to update post:", await response.text());
    }
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
        title={title}
        textarea={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onPost={handlePost}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context.paramsからidを取得
  const { id } = context.params as { id: string };
  //リクエスト情報からcookiesを取得
  const userCookie = context.req.cookies;
  console.log("cookies内の情報の閲覧", userCookie);

  //クッキーの中のトークンを取得
  // const token = userCookie.token;
  // console.log("tokenの閲覧", token);

  //params.idと同じidをもつ記事データのフェッチ

  const response = await fetch(`http://localhost:8080/articles/${id}`);
  console.log(response);
  const postData = await response.json();
  console.log(postData);
  if (!response.ok) {
    // response.ok が false の場合、エラーとして扱う
    console.error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postData,
      // token,
      //引数に渡すもの
    },
  };
};
