import { AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/button';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../../ui/alert-dialog';

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    productName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirmDialog({ isOpen, productName, onClose, onConfirm }: DeleteConfirmDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <AlertDialogTitle className="text-xl">Confirmar Exclusão</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base">
                        Tem certeza que deseja excluir o produto <strong>"{productName}"</strong>?
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Excluir Produto
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
