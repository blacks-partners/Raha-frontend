import { useState } from "react";
import Form from "../form/Form";
import Button from "../button/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Style from "../markDown/markDown.module.css";
import Input from "../input/Input";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import "highlight.js/styles/github.css"; // コードブロックのスタイル
import rehypeHighlight from "rehype-highlight";

interface Props {
  buttonText: string;
  title: string; // 親から渡される初期タイトル
  onTitleChange?: (value: string) => void; // 親にタイトル変更を通知（任意）
  textarea: string; // 親から渡される初期本文
  onContentChange?: (value: string) => void; // 親に本文変更を通知（任意）
  onPost?: () => void; // 投稿完了時のコールバック
}

export default function MarkDown({
  buttonText,
  title,
  onTitleChange,
  textarea,
  onContentChange,
  onPost,
}: Props) {
  // プレビュー用
  const [preview, setPreview] = useState(textarea);
  const [touch, setTouch] = useState(false);

  // エラーメッセージ用
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");

  // フォーム送信時のハンドラ (react-hook-formを使わず独自に実装)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorTitle || errorContent) {
      return;
    }
    setPreview("");
    onPost?.();
  };

  // タイトル変更時
  const handleTitleChangeLocal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // 親のコールバックがあれば呼ぶ
    const newTitleValue = e.target.value;
    onTitleChange?.(newTitleValue);
    const titleLen = newTitleValue.trim().length;
    if (titleLen < 1) {
      setErrorTitle("タイトルを入力してください");
    } else if (titleLen > 50) {
      setErrorTitle("タイトルを50字以内で入力してください");
    } else {
      setErrorTitle("");
    }
  };

  // 本文変更時：入力のたびに文字数をチェックしてエラーを更新
  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPreview(newValue);
    onContentChange?.(newValue);
    const len = newValue.trim().length;
    if (len < 1) {
      setErrorContent("記事内容を入力してください");
    } else if (10000 < len) {
      setErrorContent("記事内容を10,000字以内で入力してください");
    } else {
      setErrorContent("");
    }
  };

  // MarkDown/プレビュー切り替え
  const formatChange = () => {
    setTouch(!touch);
  };
  console.log("プレビューの内容:", preview);

  return (
    <div>
      {/* 独自フォーム onSubmit */}
      <Form handleSubmit={handleSubmit} noValidate={false}>
        {/* タイトル */}
        <Input
          label="タイトル"
          type="text"
          inputName="title"
          inputId="title"
          placeholder="タイトルを入力してください"
          // 親のtitleを表示 (可変)
          value={title}
          // 親に変更を通知
          handleChange={handleTitleChangeLocal}
          inputClass={errorTitle ? Style.inputError : ""}
        />
        {/* タイトルエラー表示 */}
        {errorTitle && <p className={Style.error}>{errorTitle}</p>}

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
                  className={
                    errorContent
                      ? `${Style.textarea} ${Style.inputError}`
                      : Style.textarea
                  }
                  placeholder="記事内容を入力してください"
                  // ローカルプレビューと親のcontentを同期
                  value={preview}
                  onChange={textChange}
                />
              ) : (
                <ReactMarkdown
                  remarkPlugins={[
                    [remarkGfm, { listItemIndent: "one" }],
                    remarkDirective,
                  ]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  className={Style.html}
                >
                  {preview}
                </ReactMarkdown>
              )}
            </div>
          </div>

          <div className={Style.pcUl}>
            <textarea
              className={
                errorContent
                  ? `${Style.textarea} ${Style.inputError}`
                  : Style.textarea
              }
              placeholder="記事内容を入力してください"
              value={preview}
              onChange={textChange}
            />
            <ReactMarkdown
              remarkPlugins={[
                [remarkGfm, { listItemIndent: "one" }],
                remarkDirective,
              ]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              className={Style.html}
            >
              {preview}
            </ReactMarkdown>
          </div>
        </div>

        {/* 本文のエラー表示 */}
        {errorContent && <p className={Style.error}>{errorContent}</p>}

        <Button
          buttonText={buttonText}
          size="M"
          type="submit"
          disabled={!!errorTitle || !!errorContent}
        />
      </Form>
    </div>
  );
}
