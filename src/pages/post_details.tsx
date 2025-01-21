import Button from "@/components/button/Button";
import EditRoundFrame from "@/components/editRoundFrame/EditRoundFrame";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import styles from "@/styles/post_details.module.css";

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
            <EditRoundFrame>
              <label htmlFor="date">作成日：</label>
              2025-01-07
              <br />
              <label htmlFor="name">作成者：</label>
              らは太郎
              <br />
              <label htmlFor="title"></label>
              「Javaの基礎をまとめました」
              <label htmlFor="details"></label>
              <br /># はじめに
              <br />- Java初学者です！
              <br />- メモ程度にまとめます。
              <br /># 対象者
              <br />
              - Java初学者。
              <br /># 開発環境
              <br />
              - Java17
              <br /># javaの基礎
              <br />
              ~~~
              <br />
              ## サンプルコード
              <br />
              ~~~
            </EditRoundFrame>

            <h1 className={styles.comment_title}>{"コメント"}</h1>

            <EditRoundFrame>
              <div>
                2025-01-07 09:50
                <br />
                <label htmlFor="name">コメント者:</label>
                らは太郎
                <br />
                <label htmlFor="comment"></label>
                <input
                  className={styles.input}
                  type="text"
                  name="comment"
                  id="comment"
                  value="参考になりますssssssssssssssssssssssssswwwww"
                />
              </div>
            </EditRoundFrame>

            <RoundFrame>
              <div>
                <label htmlFor="comment"></label>
                <input
                  className={styles.input}
                  type="text"
                  name="post_comment"
                  id="post_comment"
                />
                <Button type={"submit"} buttonText={"投稿"} size={"S"}></Button>
              </div>
            </RoundFrame>
          </Form>
        </Layout>
      </div>
    </>
  );
}
