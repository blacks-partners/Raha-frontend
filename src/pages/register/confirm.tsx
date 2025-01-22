import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import confirmStyle from "@/styles/Confirm.module.css";
import { useRouter } from "next/router";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export default function Confirm() {
  const router = useRouter();
  const { name, email, password } = router.query;

  return (
    <>
      <Layout
        headTitle={"ユーザー登録確認"}
        headName={"description"}
        headContent={"ユーザーの登録を確認する画面"}
        pageTitle={"ユーザー登録確認"}
      >
        <Form method="POST" handleSubmit={handleSubmit} noValidate={false}>
          <RoundFrame>
            <div>
              <p>氏名：{name}</p>
              <p>メールアドレス：{email}</p>
            </div>
          </RoundFrame>
          <div className={confirmStyle.btnWrap}>
            <Button type={"button"} buttonText={"戻る"} size={"M"} />
            <Button type={"submit"} buttonText={"登録"} size={"M"} />
          </div>
        </Form>
      </Layout>
    </>
  );
}
