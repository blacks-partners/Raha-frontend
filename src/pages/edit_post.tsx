import Input from "@/components/input/Input";
import Layout from "@/components/layout/Layout";

export default function EdidPost() {
  return (
    <>
      <Layout
        headTitle={"投稿編集"}
        headName={"投稿編集"}
        headContent={"投稿編集"}
        pageTitle={"投稿編集画面"}
      >
        <Input
          label={"タイトル"}
          type={"text"}
          inputId={"title"}
          inputName={"title"}
        ></Input>
      </Layout>
    </>
  );
}
