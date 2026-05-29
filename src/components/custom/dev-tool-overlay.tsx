"use client";

import { Activity, Check, Copy, Terminal, Trash, X } from "lucide-react";
import { useState, type ReactElement } from "react";

import { Button } from "@/components";
import {
  DEV_TOOL_REQUEST_STATUS,
  useDevToolStore,
  type DevToolRequestStatus,
  type NetworkRequestLog,
} from "@/store/dev-tool-store";
import { cn } from "@/utils";

import styles from "./dev-tool-overlay.module.css";

function methodBadgeClassName(method: string): string {
  switch (method.toUpperCase()) {
    case "GET":
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    case "POST":
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    case "PUT":
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    case "DELETE":
      return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20";
  }
}

function statusBadgeClassName(status: DevToolRequestStatus, statusCode?: number): string {
  if (status === DEV_TOOL_REQUEST_STATUS.Pending) {
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse";
  }
  if (status === DEV_TOOL_REQUEST_STATUS.Error || (statusCode !== undefined && statusCode >= 400)) {
    return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
  }
  return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
}

function requestStatusLabel(req: NetworkRequestLog): string {
  if (req.status === DEV_TOOL_REQUEST_STATUS.Pending) {
    return "Pending";
  }
  return String(req.statusCode ?? "Error");
}

function payloadPreviewText(data: unknown): string | null {
  if (data === undefined || data === null || data === "") {
    return null;
  }
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data, null, 2);
  }
  switch (typeof data) {
    case "string":
      return data;
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
      return String(data);
    case "function":
      return "[Function]";
    default:
      return "";
  }
}

export function DevToolOverlay(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { requests, clearRequests } = useDevToolStore();

  const openDrawer = (): void => {
    setIsOpen(true);
  };

  const closeDrawer = (): void => {
    setIsOpen(false);
  };

  const handleCopy = async (id: string, curl: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(curl);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy cURL:", err);
    }
  };

  const renderFloatingToggle = (): ReactElement => (
    <button
      aria-label="Toggle network requests logger"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-100 shadow-lg border border-slate-700 hover:bg-slate-800 hover:scale-105 transition-all duration-300 group"
      type="button"
      onClick={openDrawer}
    >
      <Activity className="h-5 w-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
    </button>
  );

  const renderBackdrop = (): ReactElement => {
    if (!isOpen) {
      return <></>;
    }
    return (
      <button
        aria-label="Close network request logs"
        className="fixed inset-0 z-50 m-0 cursor-default border-0 bg-black/40 p-0 backdrop-blur-[2px] transition-opacity duration-300"
        type="button"
        onClick={closeDrawer}
      />
    );
  };

  const renderPanelHeader = (): ReactElement => (
    <div className="flex items-center justify-between border-b border-slate-800 p-4">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5 text-emerald-400" />
        <h2 className="font-semibold text-slate-100">Network Request Logs</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="h-8 px-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5"
          type="button"
          variant="ghost"
          onClick={clearRequests}
        >
          <Trash className="h-4 w-4" />
          <span className="text-xs">Clear</span>
        </Button>
        <button
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          type="button"
          onClick={closeDrawer}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const renderEmptyState = (): ReactElement => (
    <div className="flex flex-col items-center justify-center h-48 text-slate-500">
      <Activity className="h-10 w-10 mb-2 stroke-[1.5]" />
      <p className="text-sm">No requests captured yet.</p>
    </div>
  );

  const renderPayloadBlock = (req: NetworkRequestLog): ReactElement => {
    const text = payloadPreviewText(req.data);
    if (text === null) {
      return <></>;
    }
    return (
      <div className="mt-2 text-[10px] font-mono text-slate-500 bg-slate-950/50 p-2 rounded max-h-24 overflow-y-auto">
        <span className="text-slate-400">Payload: </span>
        {text}
      </div>
    );
  };

  const renderCopyCurlButton = (req: NetworkRequestLog): ReactElement => {
    const isCopied = copiedId === req.id;
    return (
      <button
        className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 px-2 py-1 text-[10px] text-slate-300 font-medium hover:text-white transition-all shadow-sm border border-slate-700"
        type="button"
        onClick={() => {
          void handleCopy(req.id, req.curl);
        }}
      >
        {isCopied ? (
          <>
            <Check className="h-3 w-3 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-slate-400" />
            <span>Copy cURL</span>
          </>
        )}
      </button>
    );
  };

  const renderRequestCard = (req: NetworkRequestLog): ReactElement => (
    <div
      className="rounded-lg border border-slate-800 bg-slate-900/40 p-3 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 group"
      key={req.id}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide",
              methodBadgeClassName(req.method),
            )}
          >
            {req.method}
          </span>
          <span
            className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded tracking-wide",
              statusBadgeClassName(req.status, req.statusCode),
            )}
          >
            {requestStatusLabel(req)}
          </span>
          {req.duration ? (
            <span className="text-[10px] text-slate-500 font-mono">
              {Math.round(req.duration)}ms
            </span>
          ) : null}
        </div>
        {renderCopyCurlButton(req)}
      </div>
      <div className="text-xs font-mono text-slate-300 break-all select-all font-medium py-1">
        {req.url}
      </div>
      {renderPayloadBlock(req)}
    </div>
  );

  const renderRequestList = (): ReactElement => {
    if (requests.length === 0) {
      return renderEmptyState();
    }
    return <>{requests.map((req) => renderRequestCard(req))}</>;
  };

  const renderDrawerPanel = (): ReactElement => (
    <div
      className={cn(
        "fixed top-0 right-0 z-50 h-full w-[450px] max-w-full bg-slate-950/90 border-l border-slate-800 text-slate-100 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out transform flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      {renderPanelHeader()}
      <div className={cn("flex-1 overflow-y-auto p-4 space-y-3", styles.scrollArea)}>
        {renderRequestList()}
      </div>
    </div>
  );

  return (
    <>
      {renderFloatingToggle()}
      {renderBackdrop()}
      {renderDrawerPanel()}
    </>
  );
}
