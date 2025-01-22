import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import Layout from "@/components/layout/Layout";
import RoundFrame from "@/components/roundFrame/RoundFrame";
import confirmStyle from "@/styles/Confirm.module.css";

// 仮データ
const users = [
  {
    name: "山田太郎",
    email: "example@example.com",
  },
];

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(e);
};
export default function Confirm() {
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
            {users.map((user, index) => (
              <div key={index}>
                <p>氏名：{user.name}</p>
                <p>メールアドレス：{user.email}</p>
              </div>
            ))}
          </RoundFrame>
          <div className={confirmStyle.btnWrap}>
            <Button type={"submit"} buttonText={"登録"} size={"M"} />
            <Button type={"button"} buttonText={"戻る"} size={"M"} />
          </div>
        </Form>
      </Layout>
    </>
  );
}
