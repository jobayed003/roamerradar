import { env, isGithubConfigured, isGoogleConfigured } from '@/env';
import { type NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

/**
 * Edge-safe Auth.js config used by middleware.
 * Keep Node-only providers (Credentials + bcrypt/DB) out of this file.
 */
const providers: NextAuthConfig['providers'] = [];

if (isGoogleConfigured()) {
  providers.push(
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      // Allow linking Google to an existing email/password account with the same verified email.
      allowDangerousEmailAccountLinking: true,
    })
  );
}

if (isGithubConfigured()) {
  providers.push(
    Github({
      clientId: env.GITHUB_CLIENT_ID!,
      clientSecret: env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

export default {
  providers,
  trustHost: true,
} satisfies NextAuthConfig;
