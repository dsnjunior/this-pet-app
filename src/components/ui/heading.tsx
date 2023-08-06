import * as elements from "typed-html";

export interface HeadingProps extends JSX.HtmlTag {
  title: string;
  description: string;
}

export const Heading = ({
  title,
  description,
  ...attributes
}: HeadingProps) => {
  return (
    <div {...attributes}>
      <h2 class="text-3xl font-bold tracking-tight">{title}</h2>
      <p class="text-sm text-gray-700">{description}</p>
    </div>
  );
};
