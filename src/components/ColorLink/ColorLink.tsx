import Link from "next/link";
import ColorLinkStyle from "@/components/ColorLink/ColorLink.module.css";

interface Props {
  colorLinkText: string | boolean;
  url: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function ColorLink({ colorLinkText, url, onClick }: Props) {
  return (
    <Link href={url} className={ColorLinkStyle.LinkText} onClick={onClick}>
      {colorLinkText}
    </Link>
  );
}
