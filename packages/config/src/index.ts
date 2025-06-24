// Environment configuration following coding standards - no direct process.env access
interface EnvironmentConfig {
  readonly sanity: {
    readonly projectId: string;
    readonly dataset: string;
    readonly apiVersion: string;
    readonly token?: string;
  };
  readonly site: {
    readonly url: string;
    readonly title: string;
    readonly description: string;
  };
  readonly analytics: {
    readonly googleAnalyticsId?: string;
  };
  readonly forms: {
    readonly netlifyFormsEnabled: boolean;
  };
}

// Validate and create config object
function createConfig(): EnvironmentConfig {
  // Get environment variables with validation
  const sanityProjectId = process.env.PUBLIC_SANITY_PROJECT_ID;
  const sanityDataset = process.env.PUBLIC_SANITY_DATASET || 'production';
  const siteUrl = process.env.SITE_URL || 'http://localhost:4321';
  
  if (!sanityProjectId) {
    throw new Error('PUBLIC_SANITY_PROJECT_ID environment variable is required');
  }

  return {
    sanity: {
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: '2023-05-03',
      token: process.env.SANITY_API_TOKEN,
    },
    site: {
      url: siteUrl,
      title: 'Colourfully Digital Foundation',
      description: 'Empowering communities through digital literacy and inclusion',
    },
    analytics: {
      googleAnalyticsId: process.env.PUBLIC_GOOGLE_ANALYTICS_ID,
    },
    forms: {
      netlifyFormsEnabled: process.env.NODE_ENV === 'production',
    },
  } as const;
}

// Export validated config
export const config = createConfig();

// Export types
export type { EnvironmentConfig };
