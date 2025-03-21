import { html } from 'hono/html';

// Preview mode indicator component
export const PreviewBanner = () => html`
  <div style="
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f9a825;
    color: #333;
    text-align: center;
    padding: 8px;
    z-index: 9999;
    font-weight: bold;
    font-family: monospace;
  ">
    PREVIEW MODE - For Team Only | <a href="/api/exit-preview" style="color: #333; text-decoration: underline;">Exit Preview</a>
  </div>
`;