import ProtectedRoute from "@/ProtectedRoute";
import GraphSectionWrapper from "./application/components/GraphSectionWrapper";

export default function Page() {
  return (
    <ProtectedRoute>
      <GraphSectionWrapper/>
    </ProtectedRoute>
  );
}