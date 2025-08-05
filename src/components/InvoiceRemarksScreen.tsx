import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Calculator, Receipt } from 'lucide-react';

interface SelectedProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

interface InvoiceRemarksScreenProps {
  onBack: () => void;
  onContinue: (remarks: string) => void;
  selectedProducts: SelectedProduct[];
  customerName: string;
}

const InvoiceRemarksScreen = ({ onBack, onContinue, selectedProducts, customerName }: InvoiceRemarksScreenProps) => {
  const [remarks, setRemarks] = useState('');

  const subtotal = selectedProducts.reduce(
    (sum, product) => sum + (product.unitPrice * product.quantity), 
    0
  );
  const tax = subtotal * 0.15; // 15% VAT
  const totalAmount = subtotal + tax;

  const handleContinue = () => {
    onContinue(remarks.trim());
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
              <h1 className="text-xl font-semibold text-foreground">Tax & Remarks</h1>
              <p className="text-sm text-muted-foreground">Step 3 of 5 - Review calculations and add notes</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-32">
          {/* Invoice Summary */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Receipt className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Invoice Summary</h3>
            </div>
            <div className="card-premium p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Items:</span>
                  <span className="font-medium">{selectedProducts.length} products</span>
                </div>
                <div className="border-t border-border/50 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">SAR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (15%):</span>
                    <span className="font-medium">SAR {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-2">
                    <span>Total Amount:</span>
                    <span className="text-primary">SAR {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Calculation Details */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Tax Calculation</h3>
            </div>
            <div className="card-premium p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Rate:</span>
                  <span>15% VAT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Base:</span>
                  <span>SAR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Tax Amount:</span>
                  <span>SAR {tax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Breakdown */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-4">Product Breakdown</h3>
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div key={product.id} className="card-premium p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.quantity} × SAR {product.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        SAR {(product.quantity * product.unitPrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remarks Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Remarks & Notes</h3>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Add any special notes, payment terms, delivery instructions, or other remarks for this invoice..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="input-premium min-h-[120px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Optional - Leave blank if no remarks needed</span>
                <span>{remarks.length}/500</span>
              </div>
            </div>
          </div>

          {/* Common Remarks Suggestions */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Quick Add:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Payment due within 30 days',
                'Free delivery included',
                'Bulk discount applied',
                'Items subject to availability',
                'Installation service available'
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  onClick={() => {
                    const newRemarks = remarks ? `${remarks}\n${suggestion}` : suggestion;
                    if (newRemarks.length <= 500) {
                      setRemarks(newRemarks);
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-card/95 backdrop-blur-md border-t border-border/50 p-6">
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Final Amount</p>
              <p className="text-xl font-bold text-primary">SAR {totalAmount.toFixed(2)}</p>
            </div>
            <Button
              onClick={handleContinue}
              variant="premium"
              size="full"
            >
              Continue to Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceRemarksScreen;