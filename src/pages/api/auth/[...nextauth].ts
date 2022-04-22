import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user.user.email);

      const { email } = user.user;
      await fauna
        .query(q.Create(q.Collection("users"), { data: { email } }))
        .then((res) => {
          console.log(res);
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
  },
});
