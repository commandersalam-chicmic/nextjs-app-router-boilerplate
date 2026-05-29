import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils";

export const ALERT_SEVERITY = {
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "error",
} as const;

export type AlertSeverity = (typeof ALERT_SEVERITY)[keyof typeof ALERT_SEVERITY];

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: AlertSeverity;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, severity = ALERT_SEVERITY.Info, children, ...props }, ref) => {
    let Icon = Info;
    if (severity === ALERT_SEVERITY.Success) {
      Icon = CheckCircle;
    } else if (severity === ALERT_SEVERITY.Warning) {
      Icon = AlertTriangle;
    } else if (severity === ALERT_SEVERITY.Error) {
      Icon = XCircle;
    }

    let styles =
      "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800/30";
    if (severity === ALERT_SEVERITY.Success) {
      styles =
        "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800/30";
    } else if (severity === ALERT_SEVERITY.Warning) {
      styles =
        "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800/30";
    } else if (severity === ALERT_SEVERITY.Error) {
      styles =
        "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/20 dark:text-rose-300 dark:border-rose-800/30";
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex items-start gap-3 rounded-md border p-3 text-sm transition-all duration-200",
          styles,
          className,
        )}
        {...props}
      >
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1">{children}</div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert };
