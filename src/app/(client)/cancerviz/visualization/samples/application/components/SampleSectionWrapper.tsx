"use client";

import { useFilters } from "../hooks/useFilter";
import { SidebarConteinerCancerviz } from "../../../application/components/SidebarConteinerCancerviz";
import { SelectSampleFilter } from "./SampleSectionFilter";
import { SampleSection } from "./SampleSection";
import { useDialogSimple } from "@/ui/hooks/useDialogSimple";
import { DialogSimple } from "@/ui/components/dialog/DialogSimple";
import { useState } from "react";
import { Button } from "@/ui/shadcn/button";
import useAuthStore from "@/ui/store/authStore";
import { DeleteCancerviz } from "../../[idCancerviz]/application/delete/DeleteCancerviz";
import { CreateCancerviz } from "../../[idCancerviz]/application/create/CreateCancerviz";

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

  const [RegisterId, setRegisterId] = useState<number>();
  const [
    isCreateDataCancerviz,
    openCreateDataCancerviz,
    closeCreateDataCancerviz,
  ] = useDialogSimple();
  const [
    isCreateEditCancerviz,
    openCreateEditCancerviz,
    closeCreateEditCancerviz,
  ] = useDialogSimple();
  const [
    isCreateDeleteCancerviz,
    openCreateDeleteCancerviz,
    closeCreateDeleteCancerviz,
  ] = useDialogSimple();

  const handleCreateClick = () => {
    openCreateDataCancerviz();
  };

  const handleEditClick = (id: number) => {
    setRegisterId(id);
    openCreateEditCancerviz();
  };

  const handleDeleteClick = (id: number) => {
    setRegisterId(id);
    openCreateDeleteCancerviz();
  };

  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

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
        <div className="mb-4">
          {isAdmin && (
            <Button onClick={handleCreateClick}>Add New Sample</Button>
          )}
        </div>
        <SampleSection
          filters={selectedFilters}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {isCreateDataCancerviz && (
          <DialogSimple
            isOpen={isCreateDataCancerviz}
            toggleDialog={closeCreateDataCancerviz}
            title="Add Cancerviz"
            description=""
          >
            <CreateCancerviz />
          </DialogSimple>
        )}

        {isCreateEditCancerviz && (
          <DialogSimple
            isOpen={isCreateEditCancerviz}
            toggleDialog={closeCreateEditCancerviz}
            title="Edit Cancerviz"
            description=""
          >
            <p>hla</p>
          </DialogSimple>
        )}

        {isCreateDeleteCancerviz && (
          <DialogSimple
            isOpen={isCreateDeleteCancerviz}
            toggleDialog={closeCreateDeleteCancerviz}
            title="Delete Cancerviz"
            description="Seguro que deseas eliminar"
          >
            <DeleteCancerviz
              onClose={closeCreateDeleteCancerviz}
              cancervizId={RegisterId}
            />
          </DialogSimple>
        )}
      </div>
    </div>
  );
};

export default SampleSectionWrapper;
