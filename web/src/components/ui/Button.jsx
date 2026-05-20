import { cn } from "../../lib/utils";

export function Button({ className, variant = "primary", size = "md", children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-500 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-dark-border dark:text-slate-200 dark:hover:bg-slate-800",
    ghost: "bg-transparent hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
