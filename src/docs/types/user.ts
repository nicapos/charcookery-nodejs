import { z } from "zod";

const userInfoSchema = z.object({
  displayName: z.string().nullable(),
  email: z.string().email().nullable(),
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  providerId: z.string(),
  uid: z.string(),
});

export const userTokensSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
  expirationTime: z.number(),
});

export const FirebaseUserSchema = z
  .object({
    uid: z.string(),
    email: z.string().email().nullable(),
    emailVerified: z.boolean(),
    isAnonymous: z.boolean(),
    providerData: z.array(userInfoSchema),
    stsTokenManager: userTokensSchema,
    createdAt: z.string(),
    lastLoginAt: z.string(),
    apiKey: z.string(),
    appName: z.string().optional(),
  })
  .openapi({
    example: {
      uid: "9PxYKdW3sRfJgHmUnOlQ2xX7iTvAz1cE",
      email: "name@email.com",
      emailVerified: true,
      isAnonymous: false,
      providerData: [
        {
          providerId: "password",
          uid: "name@email.com",
          displayName: null,
          email: "name@email.com",
          phoneNumber: null,
          photoURL: null,
        },
      ],
      stsTokenManager: {
        refreshToken:
          "AMf-vBx89o8tBM5Qr_wpr63F-puasdfbVj7paHEtxVXcmvBrszAfJsZg1nkLanwRV9C3LJRO...fqSh",
        accessToken:
          "eyJhbGciOiJSUzI1NiIsImtpICZ6ImE2YzYzNTNmMmEzZWNxNjg2NTA1MzBkMTVmNmM0Y2H0...QTXg",
        expirationTime: 1700713863736,
      },
      createdAt: "1700710263291",
      lastLoginAt: "1700710263291",
      apiKey: "pGxbTdQ1uAfiKs2Jyv9HlOoLzVcnDZaYeXhqU7wS",
      appName: "[DEFAULT]",
    },
  });

export const LoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).openapi({ example: "password" }),
});

export const TokenCredentialsSchema = z.object({
  grant_type: z.string(),
  username: z.string(),
  password: z.string().min(8).openapi({ example: "password" }),
});
