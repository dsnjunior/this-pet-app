import * as elements from "typed-html";

import { cn } from "@/lib/utils";

interface AvatarProps extends JSX.HtmlTag, elements.Children {}

const Avatar = ({ class: className, children, ...props }: AvatarProps) => (
  <span
    class={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

interface AvatarProps extends JSX.HtmlImageTag {}

const AvatarImage = ({ class: className, ...props }: AvatarProps) => (
  <img
    class={cn("aspect-square h-full w-full relative bg-black", className)}
    {...props}
  />
);

interface AvatarFallbackProps extends JSX.HtmlTag, elements.Children {}

const AvatarFallback = ({
  class: className,
  children,
  ...props
}: AvatarFallbackProps) => (
  <span
    class={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-slate-300 absolute inset-0",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

export { Avatar, AvatarImage, AvatarFallback };
