
import { SidebarConteinerCancerviz } from "../application/components/SidebarConteinerCancerviz";
import { SampleSection } from "./application/components/SampleSection";


export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarConteinerCancerviz />

      <div className="flex-1 p-4 md:p-6">
        <SampleSection />
      </div>
    </div>
  );
}