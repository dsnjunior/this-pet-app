import * as elements from "typed-html";

import { cn } from "@/lib/utils";

export interface InputProps extends JSX.HtmlInputTag {}

const Input = ({ class: className, ...attributes }: InputProps) => {
  return (
    <input
      class={cn(
        "flex h-10 w-full rounded-md border border-black bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...attributes}
    />
  );
};

export { Input };
