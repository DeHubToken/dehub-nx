# Moralis Cloud

# Dev notes

1. If a `shared-util` needed in `moralis-cloud` then refactor first to a one function + one file style (example `decimalToHex`)
1. Remove the util from `shared-util/**/index.ts` and import directly from the new file across the monorepo
