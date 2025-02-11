"use client"

import { SidebarConteinerCancerviz } from "../../../application/components/SidebarConteinerCancerviz";
import { useFilters } from "../hooks/useFiltre";
import { GraphSection } from "./GraphSection";
import { SelectGraphFilter } from "./SampleSectionFilter";


export const GraphSectionWrapper = () => {
  const {
    countries,
    dataSources,
    isLoading,
    error,
    selectedFilters,
    handleFilterChange,
    handleResetFilters,
  } = useFilters();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarConteinerCancerviz
        ComponentselecteFilters={
          <SelectGraphFilter
            filters={{
              countries,
              dataSources,
            }}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            isLoading={isLoading}
            error={error}
          />
        }
        onResetFilters={handleResetFilters}
      />
      <div className="flex-1 p-4 md:p-6">
        <GraphSection />
      </div>
    </div>
  );
};

export default GraphSectionWrapper;
