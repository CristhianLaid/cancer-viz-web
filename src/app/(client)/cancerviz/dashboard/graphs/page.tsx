import { SidebarConteinerCancerviz } from "../domain/components/SidebarConteinerCancerviz";
import { GraphSection } from "./domain/components/GraphSection";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarConteinerCancerviz />

      <div className="flex-1 p-4 md:p-6">
        <GraphSection />
      </div>
    </div>
  );
}