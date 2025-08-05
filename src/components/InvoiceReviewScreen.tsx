import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share, CheckCircle, MapPin, Calendar, User, Receipt } from 'lucide-react';
import DownloadOptionsSheet from './DownloadOptionsSheet';

interface SelectedProduct {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

interface InvoiceReviewScreenProps {
  onBack: () => void;
  onSaveInvoice: () => void;
  selectedProducts: SelectedProduct[];
  customer: Customer;
  remarks: string;
}

const InvoiceReviewScreen = ({ onBack, onSaveInvoice, selectedProducts, customer, remarks }: InvoiceReviewScreenProps) => {
  const [isDownloadSheetOpen, setIsDownloadSheetOpen] = useState(false);

  const subtotal = selectedProducts.reduce(
    (sum, product) => sum + (product.unitPrice * product.quantity), 
    0
  );
  const tax = subtotal * 0.15; // 15% VAT
  const totalAmount = subtotal + tax;

  // Generate invoice data
  const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = (format: string) => {
    console.log(`Downloading invoice as ${format}...`);
    // TODO: Implement actual download functionality
    setIsDownloadSheetOpen(false);
  };

  const handleShare = () => {
    console.log('Opening share options...');
    // TODO: Implement share functionality
  };

  return (
    <div className="mobile-container bg-background">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">Review Invoice</h1>
              <p className="text-sm text-muted-foreground">Step 4 of 5 - Review and save invoice</p>
            </div>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="flex-1 overflow-y-auto p-6 pb-32">
          {/* Invoice Header */}
          <div className="card-premium p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">INVOICE</h2>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-primary">{invoiceNumber}</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Date: {currentDate}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Bill To:</h3>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{customer.address}</p>
                </div>
              </div>
            </div>

            {/* Sales Rep & Location */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Sales Representative:</p>
                <p className="font-medium">Ahmed Al-Mohammed</p>
              </div>
              <div>
                <p className="text-muted-foreground">Due Date:</p>
                <p className="font-medium">{dueDate}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="card-premium p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Receipt className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Items</h3>
            </div>
            
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground border-b border-border/50 pb-2">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Unit Price</span>
                <span className="text-right">Total</span>
              </div>

              {/* Items */}
              {selectedProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-4 gap-2 text-sm py-2">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                  </div>
                  <span className="text-center">{product.quantity}</span>
                  <span className="text-right">SAR {product.unitPrice.toFixed(2)}</span>
                  <span className="text-right font-medium">SAR {(product.quantity * product.unitPrice).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-border/50 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">SAR {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (15%):</span>
                <span className="font-medium">SAR {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-2">
                <span>Total Amount:</span>
                <span className="text-primary">SAR {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {remarks && (
            <div className="card-premium p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">Remarks & Notes</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{remarks}</p>
            </div>
          )}

          {/* Payment Terms */}
          <div className="card-premium p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-3">Payment Terms</h3>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">• Payment due within 30 days of invoice date</p>
              <p className="text-muted-foreground">• Late payments may incur additional charges</p>
              <p className="text-muted-foreground">• For any queries, please contact our sales team</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-card/95 backdrop-blur-md border-t border-border/50 p-6">
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Button
                onClick={() => setIsDownloadSheetOpen(true)}
                variant="outline"
                size="default"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="default"
                className="flex-1"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            <Button
              onClick={onSaveInvoice}
              variant="premium"
              size="full"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Save & Issue Invoice
            </Button>
          </div>
        </div>

        {/* Download Options Sheet */}
        <DownloadOptionsSheet
          isOpen={isDownloadSheetOpen}
          onClose={() => setIsDownloadSheetOpen(false)}
          invoiceNumber={invoiceNumber}
        />
      </div>
    </div>
  );
};

export default InvoiceReviewScreen;