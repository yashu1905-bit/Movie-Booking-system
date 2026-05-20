import { cn } from "../../lib/utils";

export function Table({ className, children, ...props }) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b dark:border-dark-border", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={cn("border-b dark:border-dark-border transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50 data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800", className)} {...props} />;
}

export function TableHead({ className, ...props }) {
  return <th className={cn("h-12 px-5 text-left align-middle font-semibold text-[13px] text-slate-500 uppercase tracking-wider dark:text-slate-400 [&:has([role=checkbox])]:pr-0", className)} {...props} />;
}

export function TableCell({ className, ...props }) {
  return <td className={cn("px-5 py-4 align-middle text-[14px] text-slate-600 dark:text-slate-300 [&:has([role=checkbox])]:pr-0", className)} {...props} />;
}
