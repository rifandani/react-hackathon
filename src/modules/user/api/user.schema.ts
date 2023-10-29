import { z } from 'zod';

export type UserSchema = z.infer<typeof userSchema>;

export const userProviderData = z.object({
  displayName: z.string().nullable(),
  email: z.string().email(),
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  providerId: z.string(),
  uid: z.string(),
});

export const userStsTokenManager = z.object({
  accessToken: z.string(),
  expirationTime: z.number(), // time in milliseconds
  refreshToken: z.string(),
});

export const userSchema = z.object({
  apiKey: z.string(),
  appName: z.string(),
  createdAt: z.string(), // time in milliseconds
  displayName: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  isAnonymous: z.boolean(),
  lastLoginAt: z.string(), // time in milliseconds
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  providerData: z.array(userProviderData),
  stsTokenManager: userStsTokenManager,
  tenantId: z.string().nullable(),
  uid: z.string(),
});
