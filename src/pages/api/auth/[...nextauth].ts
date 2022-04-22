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
  // jwt: {
  //   signingKey: process.env.SIGNING_KEY,
  // },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user.email);

      const { email } = user;
      // console.log("THIS IS EMAIL:", email);

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );
        // console.log("SUCESS FAUNA:", res);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
