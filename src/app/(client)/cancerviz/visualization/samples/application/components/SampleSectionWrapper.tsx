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
    <div className="flex">
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
        onResetFilters={handleResetFilters} // <- Lo pasamos al sidebar
      />
      <SampleSection filters={selectedFilters} />


    </div>
  );
};

export default SampleSectionWrapper;
