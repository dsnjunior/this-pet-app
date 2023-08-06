import * as elements from "typed-html";

export const Template = ({
  title,
  children,
}: elements.Children & { title: string }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <title>{title}</title>
      <script src="/public/htmx.org@1.9.4.min.js"></script>
      <script src="/public/hyperscript.org@0.9.11.min.js"></script>
      <link href="/public/styles.css" rel="stylesheet"></link>
    </head>
    <body>{children}</body>
    <script src="/public/lucide@0.263.0.min.js"></script>
    <script>lucide.createIcons();</script>
  </html>
);
