import { useState } from "react";
import Form from "../form/Form";
import Button from "../button/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Style from "../markDown/markDown.module.css";
import Input from "../input/Input";

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

    // タイトル/本文の文字数チェック
    const titleLen = title.trim().length;
    const contentLen = preview.trim().length;

    let hasError = false;
    // タイトル: 1~50文字
    if (titleLen < 1 || titleLen > 50) {
      setErrorTitle("タイトルは1～50文字で入力してください");
      hasError = true;
    } else {
      setErrorTitle("");
    }

    // 本文: 1~10000文字
    if (contentLen < 1 || contentLen > 10000) {
      setErrorContent("記事内容は1～10000文字で入力してください");
      hasError = true;
    } else {
      setErrorContent("");
    }

    // エラーがなければ投稿処理
    if (!hasError) {
      // フォームのリセット等、必要に応じて実施
      setPreview("");
      // 親に投稿完了を通知 → 画面遷移など
      onPost?.();
    }
  };

  // タイトル変更時
  const handleTitleChangeLocal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // 親のコールバックがあれば呼ぶ
    onTitleChange?.(e.target.value);
  };

  // 本文変更時
  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPreview(newValue);
    onContentChange?.(newValue);
  };

  // MarkDown/プレビュー切り替え
  const formatChange = () => {
    setTouch(!touch);
  };

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
              className={
                errorContent
                  ? `${Style.textarea} ${Style.inputError}`
                  : Style.textarea
              }
              placeholder="記事内容を入力してください"
              value={preview}
              onChange={textChange}
            />
            <ReactMarkdown remarkPlugins={[remarkGfm]} className={Style.html}>
              {preview}
            </ReactMarkdown>
          </div>
        </div>

        {/* 本文のエラー表示 */}
        {errorContent && <p className={Style.error}>{errorContent}</p>}

        <Button buttonText={buttonText} size="M" type="submit" />
      </Form>
    </div>
  );
}
