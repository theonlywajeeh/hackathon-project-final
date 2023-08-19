import { getByEmail, verifyPassword } from "@/services/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    
    session: {
        jwt: true
    },
    providers: [

        CredentialsProvider({
            async authorize({ email, password }) {
                const user = getByEmail(email);
                if (!user) {
                    throw new Error("User not Found");
                }
               

                return { email };
            }
        }),
       
    ],
}
export default NextAuth(authOptions)