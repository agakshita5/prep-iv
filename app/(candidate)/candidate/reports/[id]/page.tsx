// candidate report
export default async function CandidateReport({params}:{ params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>Candidate report: {id}</h1>;
}
