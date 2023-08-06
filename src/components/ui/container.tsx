import * as elements from "typed-html";

import { cn } from "@/lib/utils";

export interface ContainerProps extends JSX.HtmlTag, elements.Children {}

const Container = ({
  children,
  class: className,
  ...attributes
}: ContainerProps) => {
  return (
    <div
      class={cn("mx-auto w-full max-w-[1200px] px-4 lg:px-12", className)}
      {...attributes}
    >
      {children}
    </div>
  );
};

export { Container };
