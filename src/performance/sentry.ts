import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';

Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.SENTRY_DSN,

    debug: process.env.NODE_ENV === 'development',
    environment: process.env.NODE_ENV,
    release: 'frontend@' + process.env.npm_package_version,
    // This enables automatic instrumentation (highly recommended)
    // If you only want to use custom instrumentation:
    // * Remove the `BrowserTracing` integration
    // * add `Sentry.addTracingExtensions()` above your Sentry.init() call
    integrations: [
        Sentry.breadcrumbsIntegration(),
        Sentry.captureConsoleIntegration(),
        Sentry.browserProfilingIntegration(),
        Sentry.browserTracingIntegration(
            {
                _experiments: {
                    enableInteractions: true,
                }
            }
        ),
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
            traceXHR: true,

        }),
        Sentry.debugIntegration(),
        Sentry.dedupeIntegration(),
        Sentry.functionToStringIntegration(),
        Sentry.globalHandlersIntegration(),
        Sentry.linkedErrorsIntegration(),
        Sentry.replayIntegration(),
    ],

    // For finer control of sent transactions you can adjust this value, or
    // use tracesSampler
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', '/^\/api\//'],
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export {
    SentryRoutes
};
