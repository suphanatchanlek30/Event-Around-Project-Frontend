import axiosInstance from "@/services/axiosInstance";

import type { EventApiEnvelope, EventListMeta, EventStatus } from "@/services/eventService";

const IMPORT_API_PREFIX = "/api/v1/import/events";
const IMPORT_HISTORY_PREFIX = "/api/v1/import/history";

// ─── Upload types ─────────────────────────────────────────────────────────────

export type ImportErrorItem = {
  row: number;
  field: string;
  detail: string;
};

export type ImportEventsResult = {
  totalRecords: number;
  successRecords: number;
  failedRecords: number;
  importLogId: number;
  errors: ImportErrorItem[];
};

export type ImportJsonEventPayload = {
  title: string;
  description: string;
  shortDescription?: string;
  locationName: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  categoryId: number;
  coverImageUrl?: string;
  status?: Extract<EventStatus, "DRAFT" | "PUBLISHED">;
};

export type ImportJsonPayload = {
  events: ImportJsonEventPayload[];
};

export type ImportCsvOptions = {
  file: File;
  defaultStatus?: Extract<EventStatus, "DRAFT" | "PUBLISHED">;
};

export const importEventsCsv = async ({ file, defaultStatus }: ImportCsvOptions) => {
  const formData = new FormData();
  formData.append("file", file);

  if (defaultStatus) {
    formData.append("defaultStatus", defaultStatus);
  }

  const response = await axiosInstance.post<EventApiEnvelope<ImportEventsResult>>(
    `${IMPORT_API_PREFIX}/csv`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const importEventsJson = async (payload: ImportJsonPayload) => {
  const response = await axiosInstance.post<EventApiEnvelope<ImportEventsResult>>(
    `${IMPORT_API_PREFIX}/json`,
    payload,
  );

  return response.data;
};

// ─── Import History ───────────────────────────────────────────────────────────

export type ImportStatus = "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "PROCESSING";
export type ImportStatusTone = "success" | "warning" | "danger" | "info";
export type ImportType = "CSV" | "JSON";

export type ImportHistoryItemMetrics = {
  processedRecords: number;
  pendingRecords: number;
  successRate: number;
};

export type ImportHistoryItemSource = {
  type: ImportType;
  fileName: string | null;
  defaultStatus: string | null;
};

export type ImportHistoryItemDisplay = {
  importId: string;
  title: string;
  subtitle: string;
};

export type ImportHistoryItemUser = {
  userId: number;
  fullName: string;
  email: string;
  role: string;
};

export type ImportHistoryItem = {
  importLogId: number;
  importNo: string;
  importType: ImportType;
  totalRecords: number;
  successRecords: number;
  failedRecords: number;
  defaultStatus: string | null;
  fileName: string | null;
  createdAt: string;
  status: ImportStatus;
  statusLabel: string;
  statusTone: ImportStatusTone;
  hasErrors: boolean;
  metrics: ImportHistoryItemMetrics;
  source: ImportHistoryItemSource;
  display: ImportHistoryItemDisplay;
  importedBy: ImportHistoryItemUser;
};

export type ImportHistorySummary = {
  status: {
    success: number;
    partialSuccess: number;
    failed: number;
    processing: number;
  };
  type: {
    csv: number;
    json: number;
  };
};

export type ImportHistoryMeta = EventListMeta & {
  summary: ImportHistorySummary;
};

export type ImportHistoryParams = {
  page?: number;
  pageSize?: number;
};

export type ImportHistoryEnvelope = {
  success: boolean;
  message: string;
  data: ImportHistoryItem[];
  meta: ImportHistoryMeta;
};

export const getImportHistory = async (
  params?: ImportHistoryParams,
): Promise<ImportHistoryEnvelope> => {
  const response = await axiosInstance.get<ImportHistoryEnvelope>(IMPORT_HISTORY_PREFIX, {
    params: {
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 20,
    },
  });

  return response.data;
};
