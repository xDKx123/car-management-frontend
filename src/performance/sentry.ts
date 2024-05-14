import React from 'react';
import * as Sentry from '@sentry/react';
import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';

Sentry.init({
    dsn: process.env.SENTRY_DSN,

    debug: process.env.NODE_ENV === 'development',
    environment: process.env.NODE_ENV,
    release: 'frontend@' + process.env.npm_package_version,
    // This enables automatic instrumentation (highly recommended)
    // If you only want to use custom instrumentation:
    // * Remove the `BrowserTracing` integration
    // * add `Sentry.addTracingExtensions()` above your Sentry.init() call
    integrations: [
        Sentry.browserProfilingIntegration(),
        Sentry.browserTracingIntegration(),
        Sentry.browserApiErrorsIntegration(),
        // Or, if you are using react router, use the appropriate integration
        // See docs for support for different versions of react router
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect: React.useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes,
        }),
        Sentry.debugIntegration(),
        Sentry.dedupeIntegration(),
        Sentry.functionToStringIntegration(),
        Sentry.globalHandlersIntegration(),
        Sentry.linkedErrorsIntegration(),

    ],

    // For finer control of sent transactions you can adjust this value, or
    // use tracesSampler
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost'],
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export {
    SentryRoutes
}