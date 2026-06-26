export default async function InterviewRoom({params}:{ params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  return <h1>Interview room: {roomId}</h1>;
}