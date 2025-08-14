# Redcare Starhub
This project is a small frontend application to explore trending repositories on GitHub.

## Features

- Displays the most starred repositories created in the last 7 days
- Local "starring" of repositories (saved in localStorage)
- Filter by programming language
- View starred repositories in a separate tab
- Infinite scroll to load more results

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- GitHub REST API v3

## Development

```bash
npm install
npm run dev
```

## Code Quality & Testing

- TypeScript strict mode is used (`tsc --noEmit`)
- ESLint is configured with auto-fix:
  ```bash
  npm run lint
  ```
- Tests are written with [Vitest](https://vitest.dev/) and can be run with:
  ```bash
  npm test
  ```
- Coverage reports:
  ```bash
  npm run test:coverage
  ```

## OpenAPI Client Generation

API types and clients are generated using `openapi-generator-cli`.  
To update the generated code:

```bash
npm run gen:openAPI
```

The OpenAPI spec is located at: `src/__api__/github.yaml`  
The generated code is written to: `src/__generated__/github`

## Notes

- Starring is local only and does not affect GitHub
- The app uses the public GitHub API and may hit rate limitsblic GitHub API and may hit rate limits