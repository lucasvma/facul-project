import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, JWT_SECRET, GOOGLE_ID, GOOGLE_SECRET, MONGODB_URI } = process.env

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                },
            },
            async authorize(credentials, req) {
                console.log('credentials', credentials)
                if (credentials.username === 'test@test.com' && credentials.password === 'test') {
                    return {
                        id: 2,
                        name: 'Lucas',
                        email: credentials.username
                    }
                }
                return null
            }
        }),
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        }),
        Providers.Google({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        }),
    ],
    callback: {
        jwt: async ({ token, user }) => {
            console.log('jwt callback')
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            console.log('session callback')
            session.accessToken = token.accessToken
            return session
        }
    },
    secret: AUTH_SECRET,
    session: {
        jwt: true,
        secret: JWT_SECRET
    },
    pages: {
        signIn: '/login',
    },
    theme: 'dark',
    debug: true,
    database: MONGODB_URI,
})
