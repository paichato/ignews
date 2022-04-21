import { NextApiRequest, NextApiResponse } from "next";
export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [{ id: 1, name: "Paichato" }];

  return response.json(users);
};
