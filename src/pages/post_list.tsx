import Layout from "@/components/layout/Layout";
import Lists from "@/components/lists/Lists";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostList() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/articles",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Layout
      headContent="投稿リスト"
      headName="投稿一覧"
      pageTitle="投稿一覧"
      headTitle="投稿一覧"
    >
      <Lists pagedata={data}></Lists>
    </Layout>
  );
}
