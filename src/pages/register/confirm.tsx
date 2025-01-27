import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import confirmStyle from "@/styles/Confirm.module.css";
import { useRouter } from "next/router";

export default function Confirm() {
  const router = useRouter();
  const { name, email, password } = router.query;

  //登録を押下した時
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        console.log("登録成功");
        router.push("/login");
      } else {
        console.error("登録失敗");
      }
    } catch {
      console.error("登録失敗");
    }
  };

  return (
    <>
      <Layout
        headTitle={"ユーザー登録確認"}
        headName={"description"}
        headContent={"ユーザーの登録を確認する画面"}
        pageTitle={"ユーザー登録確認"}
      >
        <Form handleSubmit={handleSubmit} noValidate={false}>
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
