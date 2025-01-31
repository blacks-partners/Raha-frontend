import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.appendHeader("Set-cookie", `loginID=;path=/;Max-Age=0;httpOnly`);
  return res.status(200).json({
    result: "ok",
    message: "ログアウトできました",
  });
}
