import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
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
    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
    callbacks: {
        redirect: async (url, baseUrl) => {
            return baseUrl
            // return url.startsWith(baseUrl)
            //     ? Promise.resolve(url)
            //     : Promise.resolve(baseUrl)
        }
    }
})
