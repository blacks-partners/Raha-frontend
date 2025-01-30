import Link from "next/link";
import ColorLinkStyle from "@/components/colorLink/colorLink.module.css";

interface Props {
  colorLinkText: string | boolean;
  url: string;
  onClick?: () => void;
}

export default function ColorLink({ colorLinkText, url, onClick }: Props) {
  return (
    <Link href={url} className={ColorLinkStyle.LinkText} onClick={onClick}>
      {colorLinkText}
    </Link>
  );
}
