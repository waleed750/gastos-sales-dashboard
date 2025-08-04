import { FileText, FileSpreadsheet, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

interface DownloadOptionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber: string;
}

const DownloadOptionsSheet = ({ isOpen, onClose, invoiceNumber }: DownloadOptionsSheetProps) => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    // Placeholder for PDF download
    toast({
      title: "PDF Download",
      description: `${invoiceNumber} PDF download started`,
    });
    console.log('Downloading PDF for:', invoiceNumber);
    onClose();
  };

  const handleDownloadExcel = () => {
    // Placeholder for Excel download
    toast({
      title: "Excel Download",
      description: `${invoiceNumber} Excel download started`,
    });
    console.log('Downloading Excel for:', invoiceNumber);
    onClose();
  };

  const handlePrint = () => {
    // Placeholder for print
    toast({
      title: "Print Invoice",
      description: `Printing ${invoiceNumber}`,
    });
    console.log('Printing invoice:', invoiceNumber);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0">
        <SheetHeader className="text-center pb-6">
          <SheetTitle className="text-xl font-semibold">Download Options</SheetTitle>
          <SheetDescription>
            Choose how you'd like to download or share {invoiceNumber}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-3 pb-6">
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="w-full h-16 justify-start text-left touch-friendly"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Download as PDF</h3>
                <p className="text-sm text-muted-foreground">Standard format for sharing and printing</p>
              </div>
            </div>
          </Button>
          
          <Button
            onClick={handleDownloadExcel}
            variant="outline"
            className="w-full h-16 justify-start text-left touch-friendly"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Download as Excel</h3>
                <p className="text-sm text-muted-foreground">Editable spreadsheet format</p>
              </div>
            </div>
          </Button>
          
          <Button
            onClick={handlePrint}
            variant="outline"
            className="w-full h-16 justify-start text-left touch-friendly"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Printer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Print Invoice</h3>
                <p className="text-sm text-muted-foreground">Send directly to your printer</p>
              </div>
            </div>
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={onClose}
            variant="ghost"
            className="touch-friendly text-muted-foreground"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DownloadOptionsSheet;