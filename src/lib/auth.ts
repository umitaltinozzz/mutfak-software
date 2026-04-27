import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { User } from "next-auth"

const prisma = new PrismaClient()

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      businessId: string
      business: {
        id: string
        name: string
        slug: string
        plan: string
        subdomain: string | null
      }
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    businessId: string
    business: {
      id: string
      name: string
      slug: string
      plan: string
      subdomain: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    businessId: string
    business: {
      id: string
      name: string
      slug: string
      plan: string
      subdomain: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              business: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  plan: true,
                  subdomain: true,
                  isActive: true
                }
              }
            }
          })

          if (!user || !user.isActive || !user.business.isActive) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            businessId: user.businessId,
            business: user.business
          } as User
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.businessId = user.businessId
        token.business = user.business
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      session.user.businessId = token.businessId
      session.user.business = token.business
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to business dashboard after login
      if (url.startsWith("/auth/signin")) {
        return `${baseUrl}/dashboard`
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
} 