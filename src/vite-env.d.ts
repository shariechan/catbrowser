/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace JSX {
  interface IntrinsicElements {
    'l-hourglass': { size?: string, color?: string } & React.HTMLAttributes<HTMLElement>;
  }
}
