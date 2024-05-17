import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
    verifyRequest: "/auth-verify-request",
    newUser: "/join",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "Email을 입력하세요" },
        password: { label: "비밀번호", type: "password", placeholder: "비밀번호를 입력하세요" },
      },
      async authorize(_, req) {
        const user = { id: "1", name: "whm0304", email: "whm0304@naver.com", password: "12345" };
        if (user) return user;
        else return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
