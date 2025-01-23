import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import Button from "../button/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Style from "../markDown/markDown.module.css";
import Input from "../input/Input";
interface Props {
  buttonText: string;
  title: string;
  textarea: string;
}

export default function MarkDown({ buttonText, title, textarea }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState("");
  const [touch, setTouch] = useState(false);

  const onSubmit = () => {
    //トーストに変更するか、表示しないかどちらかにする
    reset(); // フォームをリセット
    setPreview(""); // プレビューをクリア
  };

  const textChange = (event: any) => {
    setPreview(event.target.value);
  };

  const formatChange = () => {
    setTouch(!touch);
  };

  return (
    <>
      <div>
        <Form handleSubmit={handleSubmit(onSubmit)} noValidate={false}>
          <Input
            label="タイトル"
            type="text"
            inputName="title"
            inputId="title"
            value={title}
          ></Input>
          <div>
            <div>
              <h3>内容</h3>
              <div className={Style.formContent}>
                {touch ? (
                  <h3 onClick={formatChange} className={Style.label}>
                    内容(MarkDown)
                  </h3>
                ) : (
                  <h3 onClick={formatChange} className={Style.labelColor}>
                    内容(MarkDown)
                  </h3>
                )}
                {!touch ? (
                  <h3 onClick={formatChange} className={Style.label}>
                    プレビュー
                  </h3>
                ) : (
                  <h3 onClick={formatChange} className={Style.labelColor}>
                    プレビュー
                  </h3>
                )}
              </div>

              <div className={Style.spUI}>
                {touch ? (
                  <textarea
                    {...register("content", { required: true })}
                    onChange={textChange}
                    className={Style.textarea}
                    placeholder="### はじめに"
                    value={textarea}
                  />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className={Style.html}
                  >
                    {preview}
                  </ReactMarkdown>
                )}
              </div>
            </div>
            <div className={Style.pcUl}>
              <textarea
                {...register("content", { required: true })}
                onChange={textChange}
                className={Style.textarea}
                placeholder="### はじめに"
                value={textarea}
              />

              <ReactMarkdown remarkPlugins={[remarkGfm]} className={Style.html}>
                {preview}
              </ReactMarkdown>
            </div>
          </div>

          <Button buttonText={buttonText} size="M" type="submit"></Button>
        </Form>
      </div>
    </>
  );
}
