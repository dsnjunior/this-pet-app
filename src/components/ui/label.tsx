import * as elements from "typed-html";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export interface LabelProps
  extends JSX.HtmlLabelTag,
    elements.Children,
    VariantProps<typeof labelVariants> {}

const Label = ({ class: className, children, ...attributes }: LabelProps) => (
  <label class={cn(labelVariants(), className)} {...attributes}>
    {children}
  </label>
);

export { Label };
