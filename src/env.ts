import { z } from 'zod';

if (typeof window !== 'undefined') {
  throw new Error('@/env must only be imported in server code.');
}

const optionalString = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().min(1).optional()
);

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().min(1, 'DIRECT_URL is required'),
  AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
  NEXT_PUBLIC_SITE_URL: optionalString,
  GOOGLE_CLIENT_ID: optionalString,
  GOOGLE_CLIENT_SECRET: optionalString,
  GITHUB_CLIENT_ID: optionalString,
  GITHUB_CLIENT_SECRET: optionalString,
  RESEND_API_KEY: optionalString,
  DUFFEL_ACCESS_TOKEN: optionalString,
  USE_DEMO_FLIGHTS: optionalString,
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: optionalString,
  NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN: optionalString,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function formatEnvErrors(error: z.ZodError) {
  return Object.entries(error.flatten().fieldErrors)
    .map(([key, messages]) => `${key}: ${messages?.join(', ')}`)
    .join('\n');
}

function loadServerEnv(): ServerEnv {
  const skipValidation = process.env.SKIP_ENV_VALIDATION === 'true';

  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    const message = `Invalid environment variables:\n${formatEnvErrors(parsed.error)}`;

    if (skipValidation) {
      console.warn(message);
      return serverEnvSchema.parse({
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://placeholder',
        DIRECT_URL: process.env.DIRECT_URL ?? 'postgresql://placeholder',
        AUTH_SECRET: process.env.AUTH_SECRET ?? 'development-secret-placeholder',
      });
    }

    throw new Error(message);
  }

  return parsed.data;
}

export const env = loadServerEnv();

export function isStripeConfigured() {
  return Boolean(env.STRIPE_SECRET_KEY && env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

export function isDuffelConfigured() {
  return Boolean(env.DUFFEL_ACCESS_TOKEN);
}

/** Duffel test tokens start with `duffel_test_` and are safe to use in production for demos. */
export function isDuffelTestMode() {
  return env.DUFFEL_ACCESS_TOKEN?.startsWith('duffel_test_') ?? false;
}

export function isDemoFlightsMode() {
  return env.USE_DEMO_FLIGHTS === 'true';
}

/** Demo flights only when explicitly forced or Duffel is not configured. */
export function shouldUseDemoFlights() {
  return isDemoFlightsMode() || !isDuffelConfigured();
}

export function isResendConfigured() {
  return Boolean(env.RESEND_API_KEY);
}

export function isMapboxConfigured() {
  return Boolean(env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN);
}
