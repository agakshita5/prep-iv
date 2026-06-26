// recruiter evaluation
export default async function RecruiterEvaluation({params}:{ params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>Recruiter evaluation: {id}</h1>;
}
