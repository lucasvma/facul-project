import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios";

const { GITHUB_ID, GITHUB_SECRET } = process.env

export default NextAuth({
    providers: [
        Providers.Credentials({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                },
                async authorize(credentials) {
                    console.log('credentials', credentials)
                    const url = 'https://61885fd8057b9b00177f9c52.mockapi.io/api/v1/login'
                    const response = await axios.post(url, credentials)
                    return response.data || null
                }
            }
        }),
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        }),
    ],
    // session: {
    //     jwt: true,
    //     maxAge: 30 * 24 * 60 * 60, // 30 days
    //     updateAge: 24 * 60 * 60, // 24 hours
    // },
    // jwt: {
    //     secret: process.env.JWT_SECRET
    // },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: null
    },
    // A db is optional, but required to persist accounts in a db
    // db: process.env.MONGODB_URI,
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     return true
        // },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },
        // async session({ session, token, user }) {
        //     return session
        // },
        // async jwt({ token, user, account, profile, isNewUser }) {
        //     return token
        // }
    }
})
