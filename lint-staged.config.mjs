const config = {
  "src/**/*.{js,jsx,ts,tsx}": [() => "pnpm lint", () => "pnpm typecheck"],
};

export default config;
