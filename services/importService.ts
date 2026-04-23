import axiosInstance from "@/services/axiosInstance";

import type { EventApiEnvelope, EventStatus } from "@/services/eventService";

const IMPORT_API_PREFIX = "/api/v1/import/events";

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
