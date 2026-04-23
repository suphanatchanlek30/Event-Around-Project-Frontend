import axiosInstance from "@/services/axiosInstance";

const EVENT_API_PREFIX = "/api/v1/events";

export type EventApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: EventListMeta;
};

export type EventListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "PENDING_APPROVAL";

export type EventCategory = {
  categoryId: number;
  name: string;
};

export type EventOrganizer = {
  userId: number;
  fullName: string;
};

export type EventSummary = {
  eventId: number;
  title: string;
  locationName?: string;
  startTime: string;
  endTime: string;
  status: EventStatus;
  coverImageUrl?: string;
  savedCount?: number;
  shortDescription?: string;
  category?: EventCategory;
  organizer?: EventOrganizer;
};

export type EventDetail = {
  eventId: number;
  title: string;
  description: string;
  shortDescription?: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  startTime: string;
  endTime: string;
  status: EventStatus;
  cancelReason?: string;
  coverImageUrl?: string;
  category?: EventCategory;
  organizer?: EventOrganizer;
  savedCount?: number;
  isSaved?: boolean;
};

export type EventListQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: number;
  status?: EventStatus;
  startFrom?: string;
  endTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type NearbyEventQueryParams = EventListQueryParams & {
  latitude: number;
  longitude: number;
  radiusKm?: number;
};

export type MapEventQueryParams = {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  categoryId?: number;
  search?: string;
};

export type NearbyEventSummary = EventSummary & {
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
};

export type MapEventSummary = {
  eventId: number;
  title: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  distanceKm?: number;
  startTime: string;
  endTime?: string;
  status?: EventStatus;
  coverImageUrl?: string;
  category?: EventCategory;
};

export type CreateEventPayload = {
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
  status: "DRAFT" | "PUBLISHED";
};

export type UpdateEventPayload = Partial<Omit<CreateEventPayload, "status">> & {
  status?: "DRAFT" | "PUBLISHED";
};

export type CancelEventPayload = {
  reason: string;
};

export type EventMutationResult = {
  eventId: number;
  status?: EventStatus;
  deleted?: boolean;
  reason?: string;
  title?: string;
  locationName?: string;
  categoryId?: number;
  organizerId?: number;
};

export const getPublicEvents = async (params?: EventListQueryParams) => {
  const response = await axiosInstance.get<EventApiEnvelope<EventSummary[]>>(EVENT_API_PREFIX, {
    params,
  });

  return response.data;
};

export const getEventDetail = async (eventId: number) => {
  const response = await axiosInstance.get<EventApiEnvelope<EventDetail>>(
    `${EVENT_API_PREFIX}/${eventId}`,
  );

  return response.data;
};

export const createEvent = async (payload: CreateEventPayload) => {
  const response = await axiosInstance.post<EventApiEnvelope<EventMutationResult>>(
    EVENT_API_PREFIX,
    payload,
  );

  return response.data;
};

export const updateEvent = async (eventId: number, payload: UpdateEventPayload) => {
  const response = await axiosInstance.patch<EventApiEnvelope<EventMutationResult>>(
    `${EVENT_API_PREFIX}/${eventId}`,
    payload,
  );

  return response.data;
};

export const deleteEvent = async (eventId: number) => {
  const response = await axiosInstance.delete<EventApiEnvelope<EventMutationResult>>(
    `${EVENT_API_PREFIX}/${eventId}`,
  );

  return response.data;
};

export const publishEvent = async (eventId: number) => {
  const response = await axiosInstance.post<EventApiEnvelope<EventMutationResult>>(
    `${EVENT_API_PREFIX}/${eventId}/publish`,
  );

  return response.data;
};

export const cancelEvent = async (eventId: number, payload: CancelEventPayload) => {
  const response = await axiosInstance.post<EventApiEnvelope<EventMutationResult>>(
    `${EVENT_API_PREFIX}/${eventId}/cancel`,
    payload,
  );

  return response.data;
};

export const getMyEvents = async (params?: EventListQueryParams) => {
  const response = await axiosInstance.get<EventApiEnvelope<EventSummary[]>>(
    `${EVENT_API_PREFIX}/my-events`,
    {
      params,
    },
  );

  return response.data;
};

export const getUpcomingEvents = async (params?: EventListQueryParams) => {
  const response = await axiosInstance.get<EventApiEnvelope<EventSummary[]>>(
    `${EVENT_API_PREFIX}/upcoming`,
    {
      params,
    },
  );

  return response.data;
};

export const getActiveEvents = async (params?: EventListQueryParams) => {
  const response = await axiosInstance.get<EventApiEnvelope<EventSummary[]>>(
    `${EVENT_API_PREFIX}/active`,
    {
      params,
    },
  );

  return response.data;
};

export const getNearbyEvents = async (params: NearbyEventQueryParams) => {
  const response = await axiosInstance.get<EventApiEnvelope<NearbyEventSummary[]>>(
    `${EVENT_API_PREFIX}/nearby`,
    {
      params,
    },
  );

  return response.data;
};

export const getMapEvents = async (params?: MapEventQueryParams) => {
  const response = await axiosInstance.get<EventApiEnvelope<MapEventSummary[]>>(
    `${EVENT_API_PREFIX}/map`,
    {
      params,
    },
  );

  return response.data;
};
