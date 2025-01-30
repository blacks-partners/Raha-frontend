import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.cookies;
  console.log("cookieの取得", cookies);

  if (!cookies?.loginID) {
    res.status(401).end();
    return;
  }

  res.status(200).json({ message: "ログインユーザー" });
}
