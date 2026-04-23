import axiosInstance from "@/services/axiosInstance";

import type { EventCategory, EventListMeta, EventOrganizer, EventStatus } from "@/services/eventService";

const SAVED_EVENT_API_PREFIX = "/api/v1/saved-events";

type SavedEventApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: EventListMeta;
};

export type SavedEventListQueryParams = {
  page?: number;
  pageSize?: number;
  status?: EventStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type SavedEventSummary = {
  eventId: number;
  title: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  startTime: string;
  endTime: string;
  status: EventStatus;
  coverImageUrl?: string;
  category?: EventCategory;
  organizer?: EventOrganizer;
  savedAt?: string;
};

export type SaveEventPayload = {
  eventId: number;
};

export type SaveEventMutationData = {
  eventId: number;
  saved: boolean;
};

export type SavedEventCheckData = {
  eventId: number;
  isSaved: boolean;
  title?: string;
  status?: EventStatus;
  coverImageUrl?: string;
};

export const getSavedEvents = async (params?: SavedEventListQueryParams) => {
  const response = await axiosInstance.get<SavedEventApiEnvelope<SavedEventSummary[]>>(
    SAVED_EVENT_API_PREFIX,
    { params },
  );

  return response.data;
};

export const saveEvent = async (payload: SaveEventPayload) => {
  const response = await axiosInstance.post<SavedEventApiEnvelope<SaveEventMutationData>>(
    SAVED_EVENT_API_PREFIX,
    payload,
  );

  return response.data;
};

export const unsaveEvent = async (eventId: number) => {
  const response = await axiosInstance.delete<SavedEventApiEnvelope<SaveEventMutationData>>(
    `${SAVED_EVENT_API_PREFIX}/${eventId}`,
  );

  return response.data;
};

export const checkSavedEvent = async (eventId: number) => {
  const response = await axiosInstance.get<SavedEventApiEnvelope<SavedEventCheckData>>(
    `${SAVED_EVENT_API_PREFIX}/check/${eventId}`,
  );

  return response.data;
};
