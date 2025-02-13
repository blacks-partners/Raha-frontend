import Layout from "@/components/layout/Layout";
import Lists from "@/components/lists/Lists";
import UsersArticleList from "@/components/usersArticleList/UsersArticleList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import useSWR from "swr";
import style from "@/styles/mypage.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
// ↓cookie発火後コメントアウト解除

type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
  introduction: string;
  createdAt: string;
  updatedAt: string;
};
export const getServerSideProps = (async (context) => {
  const userCookie = context.req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/users/${userCookie.loginID}`
  );
  const user: User = await res.json();

  return {
    props: {
      user,
    },
  };
}) satisfies GetServerSideProps<{ user: User }>;

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/articles`,
    fetcher
  );

  console.log(user);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  //   本来はログインしているユーザーのuserIdで絞る
  const filteredData = data.filter(
    (articles: any) => articles.user.userId === user.userId
  );

  const emptyMessage = [];
  if (filteredData.length === 0) {
    emptyMessage.push(`${user.name}さんの投稿は0件です`);
  }

  return (
    <Layout
      headContent={`${user.name}さんの投稿一覧`}
      headName={`${user.name}さんの投稿一覧`}
      pageTitle={`${user.name}さんの投稿一覧`}
      headTitle={`${user.name}さんの投稿一覧`}
    >
      <div className={style.emptyMessage}>{emptyMessage}</div>
      <UsersArticleList pagedata={filteredData}></UsersArticleList>
    </Layout>
  );
}
