import * as elements from "typed-html";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90",
        destructive: "bg-red-800 text-white hover:bg-red-800/90",
        outline:
          "border border-black bg-background hover:bg-orange-400 hover:text-white",
        secondary: "bg-orange-400 text-white hover:bg-orange-400/80",
        ghost: "hover:bg-orange-400 hover:text-white",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = (JSX.HtmlButtonTag | JSX.HtmlAnchorTag) &
  elements.Children &
  VariantProps<typeof buttonVariants>;

const Button = ({
  class: className,
  variant,
  size,
  children,
  ...attributes
}: ButtonProps) => {
  const Component = "href" in attributes ? "a" : "button";
  return (
    <Component
      class={cn(buttonVariants({ variant, size, className }))}
      {...attributes}
    >
      {children}
    </Component>
  );
};

export { Button };
