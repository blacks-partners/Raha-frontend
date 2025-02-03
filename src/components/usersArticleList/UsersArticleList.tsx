import RoundFrame from "@/components/roundFrame/RoundFrame";
import Link from "next/link";
import ColorLink from "@/components/colorLink/ColorLink";
import Style from "../UsersArticleList/UsersArticleList.module.css";
import { JSX } from "react";
import RoundFrameStyle from "@/styles/loginees_post_list.module.css";

// 日付をスラッシュ形式にフォーマットする関数
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

interface Props {
  pagedata: {
    articleId: undefined | string;
    title: string;
    content: string;
    user: {
      userId: number;
      name: string;
      email: string;
      password: string;
      introduction: string;
      created_at: string;
      updated_at: string;
    };
    commentList: [
      {
        commentId: number;
        content: string;
        created_at: string;
        updated_at: string;
      }
    ];
    created_at: string;
    updated_at: string;
  }[];
}

export default function UsersArticleList({ pagedata }: Props) {
  const splitAndLimitByHeadings = (content: string): JSX.Element[] => {
    // ### ごとに分割して配列化
    const sections = content.split("###");
    // 最初の3行を取得
    return sections.slice(0, 3).map((section, index) => (
      <p key={index}>
        {index > 0 && <strong>###</strong>} {/* 先頭以外に ### を追加 */}
        {section.trim()}
      </p>
    ));
  };

  const sortedData = [...pagedata].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return (
    <ul className={Style.ul}>
      {sortedData.map((post) => (
        <li key={post.articleId}>
          <Link href={`/post_details/${post.articleId}`}>
            <div className={RoundFrameStyle.frame}>
              <div>
                <p>作成日: {formatDate(post.created_at)}</p>
              </div>
              <span>作成者:</span>
              <ColorLink
                url={`/user/${post.user.userId}`}
                colorLinkText={post.user.name}
              ></ColorLink>

              <h3>「{post.title}」</h3>
              <p>{splitAndLimitByHeadings(post.content)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
