import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[500px] px-4 py-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center mb-4">
            Inserisci i tuoi dettagli
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input placeholder="Nome" required className="w-full" />
          <Input placeholder="Email" type="email" required className="w-full" />
          <Input placeholder="Numero di telefono" required className="w-full" />
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none"
            placeholder="Messaggio"
            rows={4}
          />
          <Button
            type="submit"
            className="w-full h-12 bg-primary text-white text-base sm:text-lg"
          >
            Invia Richiesta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
