import ServiceForm from "../../_components/ServiceForm";

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <ServiceForm serviceId={params.id} />;
}
