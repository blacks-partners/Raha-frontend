import Layout from "@/components/layout/Layout";
import Lists from "@/components/lists/Lists";
import UsersArticleList from "@/components/usersArticleList/UsersArticleList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
// ↓cookie発火後コメントアウト解除
/*
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  introduction: string;
  created_at: string;
  updated_at: string;
};
export const getServerSideProps = (async (context) => {
  // cookieからユーザーIDを取得する
  const userCookie = context.req.cookies;
  //   DBからcookieのIDに相当するユーザー情報を取得する
  const res = await fetch(`http://localhost:8000/users/${userCookie.ID}`);
  const user: User = await res.json();

  return {
    props: {
      user,
    },
  };
}) satisfies GetServerSideProps<{ user: User }>;
*/

// cookie発火設定次第引数のコメントアウト解除

export default function PostList(/*a{
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>*/) {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/articles",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  //   本来はログインしているユーザーのuserIdで絞る
  const filteredData = data.filter(
    (articles: any) => articles.user.userId === 1
  );

  console.log(filteredData);
  return (
    <Layout
      /*本当は={`${user.name}の投稿一覧`}*/
      headContent="山田 太郎の投稿一覧"
      headName="山田 太郎の投稿一覧"
      pageTitle="山田 太郎の投稿一覧"
      headTitle="山田 太郎の投稿一覧"
    >
      <UsersArticleList pagedata={filteredData}></UsersArticleList>
    </Layout>
  );
}
