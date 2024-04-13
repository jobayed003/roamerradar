/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 **/
export const publicRoutes: string[] = ['/', '/cars', '/flights', '/things', '/auth/verify-email', '/flights-category'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in user to home page
 * @type {string[]}
 **/
export const authRoutes: string[] = ['/auth/register', '/auth/login'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 **/
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 **/
export const DEFAULT_LOGIN_REDIRECT: string = '/stays-category';
