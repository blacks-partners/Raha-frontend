import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import Layout from "@/components/layout/Layout";

export default function Register() {
  const handleSubmit = () => {
    console.log("aaa");
  };
  return (
    <>
      <Layout
        headTitle={"ユーザー登録"}
        headName={"description"}
        headContent={"rahaユーザー登録"}
        pageTitle={"ユーザー登録"}
      >
        <Form handleSubmit={handleSubmit}>
          <Input
            label={"名前"}
            type={"text"}
            inputId={"name"}
            inputName={"name"}
            inputClass={""}
            errorMessage=""
            value={""}
            handleChange={""}
          />
        </Form>
      </Layout>
    </>
  );
}
