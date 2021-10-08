import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const { GITHUB_ID, GITHUB_SECRET } = process.env

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: null
    },
    // A db is optional, but required to persist accounts in a db
    // db: process.env.DATABASE_URL,
    callbacks: {
        redirect: async (url, baseUrl) => {
            return baseUrl
        }
    }
})
