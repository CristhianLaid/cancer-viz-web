import ProtectedRoute from "@/ProtectedRoute";
import { SampleSectionWrapper } from "./application/components/SampleSectionWrapper";

export default function Page() {
  return (
    <ProtectedRoute>
      <SampleSectionWrapper />
    </ProtectedRoute>
  );
}
