import Link from "next/link";
import ColorLinkStyle from "@/components/ColorLink/ColorLink.module.css";

interface Props {
  colorLinkText: string;
  url: string;
}

export default function ColorLink({ colorLinkText, url }: Props) {
  return (
    <Link href={url} className={ColorLinkStyle.LinkText}>
      {colorLinkText}
    </Link>
  );
}
