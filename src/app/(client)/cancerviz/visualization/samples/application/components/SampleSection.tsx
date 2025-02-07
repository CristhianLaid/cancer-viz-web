"use client"
import { useState } from "react";
import { useSample } from "../hooks/useSample";

export const SampleSection = () => {
  const { data, total, isLoading, error, setOffset, totalPages, limit, offset } = useSample();

  // Calculamos la página actual
  const currentPage = offset / limit;

  const handlePageChange = (newPage: number) => {
    setOffset(newPage * 20); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <main className="flex-1 p-4 md:p-6 w-full">
      <h1 className="text-3xl font-bold text-foreground mb-6">Samples</h1>
      <div>
        <h1>Samples</h1>
        {data && data.length > 0 ? (
          <ul>
            {data.map((sample) => (
              <li key={sample.id}>{sample.projectId}</li>
            ))}
          </ul>
        ) : (
          <p>No samples available.</p>
        )}

        {total && <p>Total Samples: {total}</p>}
        {totalPages && <p>Total Pages: {totalPages}</p>}

        {/* Botones de paginación */}
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous Page
          </button>
          <span> Page {currentPage + 1} of {totalPages} </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next Page
          </button>
        </div>
      </div>
    </main>
  );
};
