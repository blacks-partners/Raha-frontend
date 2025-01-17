import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import Input from "@/components/input/Input";
import Layout from "@/components/layout/Layout";
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
        {/* input スタイル確認用 */}
        <Input
          label={"メールアドレス"}
          type={"email"}
          inputId={"email"}
          inputName={"email"}
        />
        <Input
          label={"確認用パスワード"}
          type={"email"}
          inputId={"email"}
          inputName={"email"}
        />
        <Input
          label={"自己紹介"}
          type={"email"}
          inputId={"email"}
          inputName={"email"}
        />
        <Input
          label={"パスワード"}
          type={"email"}
          inputId={"email"}
          inputName={"email"}
        />
        <Input
          label={"名前"}
          type={"email"}
          inputId={"email"}
          inputName={"email"}
        />
        {/* <EditRoundFrame>
          <p>作成日：2025-1-7</p>
          <p>作成者：山竹森楓奏</p>
          <p>「javaの基礎をまとめました」</p>
          <p>#はじめに</p>
          <p>　　- Java初学者です</p>
          <p>#Javaの基礎</p>
          <p>　　- Java初学者です</p>
        </EditRoundFrame>{" "} */}
      </Layout>
    </>
  );
}
