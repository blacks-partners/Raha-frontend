import Dialog from "@/components/dialog/Dialog";
import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";
import RoundFrame from "@/components/roundFrame/RoundFrame";

export default function Home() {
  return (
    <>
      <Layout
        headContent="Rahaサイト,投稿一覧,エンジニア"
        headName="Rahaサイト"
        headTitle="Raha"
        pageTitle="投稿一覧"
      >
        <EditRoundFrame>
          <p>作成日：2025-1-7</p>
          <p>作成者：山竹森楓奏</p>
          <p>「javaの基礎をまとめました」</p>
          <p>#はじめに</p>
          <p>　　- Java初学者です</p>
          <p>#Javaの基礎</p>
          <p>　　- Java初学者です</p>
        </EditRoundFrame>{" "}
        <MarkDown buttonText="投稿" textarea="" title=""></MarkDown>
      </Layout>
    </>
  );
}
