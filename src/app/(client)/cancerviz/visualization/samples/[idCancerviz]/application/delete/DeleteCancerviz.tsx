import { useState, useEffect } from "react";
import { Button } from "@/ui/shadcn/button";
import { configEnv } from "@/config/configEnv";

interface DeleteCancervizProps {
  onClose: () => void;
  cancervizId: number | undefined;
}

export const DeleteCancerviz: React.FC<DeleteCancervizProps> = ({
  onClose,
  cancervizId,
}) => {
  const [cancervizData, setCancervizData] = useState<any>(null);

  useEffect(() => {
    if (cancervizId) {
      const fetchData = async () => {
        const response = await fetch(
          `${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/cancerviz/${cancervizId}`
        );
        const data = await response.json();
        setCancervizData(data);
      };

      fetchData();
    }
  }, [cancervizId]);

  const handleConfirmDelete = async () => {
    if (!cancervizId) return;

    const response = await fetch(
      `${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/cancerviz/${cancervizId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Recargar la página después de la eliminación
      window.location.reload();
    } else {
      // En caso de error, simplemente cerramos el diálogo sin hacer nada
      onClose();
    }
  };

  return (
    <>
      {cancervizData ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h3 className="text-sm font-semibold text-black mb-4">Delete Confirmation</h3>
          <p className="text-sm text-gray-800 mb-4">
            You are about to delete the Cancerviz with the following details:
          </p>
          <div className="mb-6 space-y-1">
            <p className="text-sm text-black"><strong>ID:</strong> {cancervizData.id}</p>
            <p className="text-sm text-black"><strong>Project ID:</strong> {cancervizData.projectId}</p>
            <p className="text-sm text-black"><strong>Cancer Type:</strong> {cancervizData.cancerType}</p>
            <p className="text-sm text-black"><strong>Sample ID:</strong> {cancervizData.sampleId}</p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </>
  );
};
