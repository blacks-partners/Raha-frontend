import Layout from "@/components/layout/Layout";
import Lists from "@/components/lists/Lists";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:8000/articles");
  const articles = await res.json();

  const paths = articles.map((article: any) => ({
    params: { id: article.user.userId.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:8000/articles`);
  const articles = await res.json();

  return {
    props: {
      articles,
      userId: params?.id || null, // 動的ルートのIDを渡す
    },
  };
};

interface Article {
  id: number;
  user: {
    userId: string;
  };
  title: string;
  content: string;
}

export default function PostList({
  articles,
  userId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const filteredData = articles.filter(
    (articles: any) => articles.user.userId === Number(userId)
  );

  const usersName = filteredData[0].user.name;
  return (
    <Layout
      headContent={`${usersName}の投稿一覧`}
      headName={`${usersName}の投稿一覧`}
      pageTitle={`${usersName}の投稿一覧`}
      headTitle={`${usersName}の投稿一覧`}
    >
      <Lists pagedata={filteredData}></Lists>
    </Layout>
  );
}
