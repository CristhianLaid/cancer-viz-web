import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/ui/shadcn/dialog";


interface DialogSimpleProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleDialog: () => void;
}
export const DialogSimple = ({
  children,
  isOpen,
  toggleDialog,
  title,
  description,
}: DialogSimpleProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
