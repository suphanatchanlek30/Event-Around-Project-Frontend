import axiosInstance from "@/services/axiosInstance";

import type { EventApiEnvelope, EventStatus } from "@/services/eventService";

const ORGANIZER_API_PREFIX = "/api/v1/organizer";

export type OrganizerDashboardSummary = {
  totalEvents: number;
  draftEvents: number;
  publishedEvents: number;
  cancelledEvents: number;
  totalSavedCount: number;
};

export type OrganizerEventStats = {
  eventId: number;
  title: string;
  status: EventStatus;
  savedCount: number;
  startTime: string;
  endTime: string;
};

export const getOrganizerDashboard = async () => {
  const response = await axiosInstance.get<EventApiEnvelope<OrganizerDashboardSummary>>(
    `${ORGANIZER_API_PREFIX}/dashboard`,
  );

  return response.data;
};

export const getOrganizerEventStats = async (eventId: number) => {
  const response = await axiosInstance.get<EventApiEnvelope<OrganizerEventStats>>(
    `${ORGANIZER_API_PREFIX}/events/${eventId}/stats`,
  );

  return response.data;
};
