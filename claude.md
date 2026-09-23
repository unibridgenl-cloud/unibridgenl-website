# Marketing analytics workspace

## Layout

- `fetchers/` — scripts that pull data from each source
- `data/` — raw data pulled by the fetchers, one folder per source:
  - `gsc/` — Google Search Console
  - `ga4/` — Google Analytics 4
  - `ads/` — Google Ads
  - `semrush/` — Semrush
- `dashboard/` — dashboard built on top of `data/`
- `reports/` — generated reports
