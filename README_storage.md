# Supabase

We use [Supabase with Moralis Auth](https://docs.moralis.io/docs/supabase-authentication) and using their Postgres relational database.

_Follow the instructions below to setup Supabase locally or read their [official site](https://supabase.com/docs) for more details._

# Prerequisites

1. [Docker](https://docs.docker.com/get-docker/)
2. [Supabase CLI](https://supabase.com/docs/guides/cli)

# Local Setup

Full guide [here](https://supabase.com/docs/guides/cli/local-development) or just the [video](https://www.youtube.com/watch?v=vyHyYpvjaks).

1. `supabase login` and use the `supabaseAccessToken` access token from `.env`
2. `supabase start` to start local Supabase Studio in docker
3. `supabase stop` to stop local Supabase Studio

# Migration

Full guide [here](https://supabase.com/docs/guides/cli/local-development#database-migrations) or just the [video](https://www.youtube.com/watch?v=Kx5nHBmIxyQ)

1. `supabase start` - start your local Supabase
1. `supabase status` - pick Studio URL
1. `supabase db diff --use-migra {CHANGE_SUMMARY} -f {CHANGE_SUMMARY}` - prepare new migrations on top of the old once

# Deployment

Deploy to Dev ([docs](https://supabase.com/docs/guides/cli/local-development#deploy-your-project))

1. `supabase link --project-ref wmmjdexrwjxkfgxntrcu` - link local db to Dehub Dev
1. `supabase db remote commit` - Capture any changes that you have made to your database before setting up the CLI
1. `supabase db push` - push to dev

Deploy to Prod ([docs](https://supabase.com/docs/guides/cli/managing-environments#overview))

1. Automatically done by Github Actions after merging to `main`. _(See relevant `yml` under `.github/workflows`)_
