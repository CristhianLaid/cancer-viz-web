"use client"

import { useFilters } from "../hooks/useFilter";
import SampleSection from "./SampleSection";
import { SidebarConteinerCancerviz } from "../../../application/components/SidebarConteinerCancerviz";
import { SelectSampleFilter } from "./SelectSampleFilter";

export const SampleSectionWrapper = () => {
  const {
    countries,
    cancerTypes,
    dataSources,
    constructionProtocols,
    sampleTypes,
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
          <SelectSampleFilter
            filters={{
              countries,
              cancerTypes,
              dataSources,
              constructionProtocols,
              sampleTypes,
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
        <SampleSection filters={selectedFilters} />
      </div>
    </div>
  );
};

export default SampleSectionWrapper;
