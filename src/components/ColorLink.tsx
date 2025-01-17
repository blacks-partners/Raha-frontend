import Link from "next/link";

interface Props {
  colorLinkText: string;
  url: string;
}

export default function ColorLink({ colorLinkText, url }: Props) {
  return <Link href={url}>{colorLinkText}</Link>;
}
