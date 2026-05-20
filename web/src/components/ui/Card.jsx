import { cn } from "../../lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark transition-shadow duration-200 border border-transparent dark:border-dark-border/50", 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
