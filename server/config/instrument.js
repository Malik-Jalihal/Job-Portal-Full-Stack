// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Only initialize Sentry if DSN is provided
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      nodeProfilingIntegration(),
      Sentry.mongooseIntegration()
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    environment: process.env.NODE_ENV || 'development'
  });
  
  // Manually call startProfiler
  Sentry.profiler.startProfiler();
} else {
  console.warn('⚠️  SENTRY_DSN not configured - error tracking disabled')
}