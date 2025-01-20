import Button from "@/components/Button";
import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";

export default function PostDetails() {
  return (
    <>
      <div>
        <Layout
          headTitle={"投稿詳細"}
          headName={"投稿詳細"}
          headContent={"投稿詳細"}
          pageTitle={"投稿詳細画面"}
        >
          <Form
            handleSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          >
            <EditRoundFrame>{"記事"}</EditRoundFrame>
          </Form>

          <h1>{"コメント"}</h1>

          <Form
            handleSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          >
            <EditRoundFrame>
              <form action="" method="post">
                2025-01-07 09:50
                <br />
                <label htmlFor="name">コメント者:</label>
                らは太郎
                <br />
                <input type="text" name="comment" id="comment"></input>
              </form>
            </EditRoundFrame>
          </Form>
          <RoundFrame>
            <form action="" method="post">
              <input type="text" name="comment" id="comment"></input>
              <Button type={"submit"} buttonText={"投稿"}></Button>
            </form>
          </RoundFrame>
        </Layout>
      </div>
    </>
  );
}
