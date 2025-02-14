import RoundFrame from "@/components/roundFrame/RoundFrame";

import ColorLink from "@/components/colorLink/ColorLink";
import Style from "../lists/lists.module.css";
import { JSX, useState } from "react";
import { useRouter } from "next/router";

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
      createdAt: string;
      updatedAt: string;
    };
    commentList: [
      {
        commentId: number;
        content: string;
        createdAt: string;
        updatedAt: string;
      }
    ];
    createdAt: string;
    updatedAt: string;
  }[];
}

export default function Lists({ pagedata }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const router = useRouter();

  const totalPage = Math.ceil((pagedata || []).length / perPage);

  const sliceData = pagedata.slice(
    currentPage * perPage - perPage,
    currentPage * perPage
  );

  const splitAndLimitByHeadings = (content: string): JSX.Element[] => {
    // ### ごとに分割して配列化
    const sections = content.split("###");
    // 最初の3行を取得
    return sections.slice(0, 3).map((section, index) => (
      <div key={index}>
        {index > 0 && <strong>###</strong>} {/* 先頭以外に ### を追加 */}
        <p>{section.trim()}</p>
      </div>
    ));
  };

  const sortedData = [...sliceData].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <ul className={Style.ul}>
        {sortedData.map((post) => (
          <li
            key={post.articleId}
            onClick={(e) => {
              router.push(`/post_details/${post.articleId}`);
            }}
          >
            <RoundFrame>
              <div>
                <p>作成日: {formatDate(post.createdAt)}</p>
              </div>
              <span>作成者:</span>
              <ColorLink
                url={`/user/${post.user.userId}`}
                colorLinkText={post.user.name}
                onClick={(e) => {
                  e.stopPropagation(); // これで親へのイベント伝播を防ぐ
                  router.push(`/user/${post.user.userId}`);
                }}
              ></ColorLink>

              <h3>「{post.title}」</h3>
              {splitAndLimitByHeadings(post.content)}
            </RoundFrame>
          </li>
        ))}
      </ul>

      <div className={Style.pageNation}>
        <div>
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            前へ
          </button>
        </div>
        <p>
          {currentPage}/{totalPage}
        </p>
        <div>
          <button
            onClick={() =>
              currentPage < totalPage && setCurrentPage(currentPage + 1)
            }
          >
            次へ
          </button>
        </div>
      </div>
    </>
  );
}
