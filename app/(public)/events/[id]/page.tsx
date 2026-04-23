import EventDetail from "@/components/public-section/events/EventDetail";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const resolvedParams = await params;
  return <EventDetail eventId={Number(resolvedParams.id)} />;
}
