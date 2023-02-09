import { SharedEnv } from './env';
import { defaultSharedProdEnv } from './environment.prod';

export const inheritPreviewEnvFrom = (
  originEnv: SharedEnv = defaultSharedProdEnv
): SharedEnv => ({
  ...originEnv,
  env: 'preview',

  api: '',

  supabase: {
    supabaseApiUrl: 'https://wmmjdexrwjxkfgxntrcu.supabase.co',
    supabasePublicAnonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtbWpkZXhyd2p4a2ZneG50cmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk3MzczMTYsImV4cCI6MTk4NTMxMzMxNn0.XgG7HSMbdqHUFXJlpSHN5ABBKlsaBP0OK3KKlKV3t1M',
  },

  contentful: {
    ...originEnv.contentful,
    website: {
      ...originEnv.contentful.website,
      environmentId: 'preview',
    },
    isPreview: true,
  },
});
