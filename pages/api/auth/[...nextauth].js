import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios";

const { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, JWT_SECRET } = process.env

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
                    if (credentials.username === 'test@test.com' && credentials.password === 'test') {
                        return {
                            id: 2,
                            name: 'Lucas',
                            email: credentials.username
                        }
                    }
                    return null
                }
            }
        }),
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        }),
    ],
    callback: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id
            }
            return session
        }
    },
    debug: process.env.NODE_ENV === 'development',
    secret: AUTH_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: JWT_SECRET
    },
    pages: {
        signIn: '/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    },
})
