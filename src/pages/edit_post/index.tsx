import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Layout from "@/components/layout/Layout";
import MarkDown from "@/components/markDown/MarkDown";

export default function EdidPost() {
  return (
    <>
      <Layout
        headTitle={"投稿編集"}
        headName={"投稿編集"}
        headContent={"投稿編集"}
        pageTitle={"投稿編集画面"}
      >
        <MarkDown
          buttonText={"完了"}
          title={"Javaの基礎"}
          textarea={"あいう"}
        ></MarkDown>
      </Layout>
    </>
  );
}
