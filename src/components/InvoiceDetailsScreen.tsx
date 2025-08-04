import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Calendar, User, CreditCard, MapPin, Phone } from 'lucide-react';
import DownloadOptionsSheet from './DownloadOptionsSheet';

interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceDetails {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  paymentTerms: string;
  notes?: string;
}

interface InvoiceDetailsScreenProps {
  invoiceData: InvoiceDetails;
  onBack: () => void;
}

const InvoiceDetailsScreen = ({ invoiceData, onBack }: InvoiceDetailsScreenProps) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'overdue':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  return (
    <>
      <div className="mobile-container bg-background pb-20">
        <div className="p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="touch-friendly"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  {invoiceData.invoiceNumber}
                </h1>
                <p className="text-muted-foreground md:text-lg">Invoice Details</p>
              </div>
            </div>
            <Button
              onClick={() => setShowDownloadOptions(true)}
              className="btn-primary touch-friendly"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>

          <div className="tablet-two-column">
            {/* Left Column - Main Content */}
            <div className="flex-1 space-y-6 md:space-y-8">
              {/* Invoice Info */}
              <div className="card-premium p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                  Invoice Information
                </h2>
                
                <div className="responsive-grid-2 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Invoice Date</p>
                        <p className="font-medium text-foreground">{formatDate(invoiceData.date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Terms</p>
                        <p className="font-medium text-foreground">{invoiceData.paymentTerms}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Due Date</p>
                        <p className="font-medium text-foreground">{formatDate(invoiceData.dueDate)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(invoiceData.status)}`}>
                        {invoiceData.status.charAt(0).toUpperCase() + invoiceData.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="card-premium p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                  Customer Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium text-foreground">{invoiceData.customerName}</p>
                      <p className="text-sm text-muted-foreground">{invoiceData.customerEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                    <p className="text-foreground">{invoiceData.customerPhone}</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <p className="text-foreground">{invoiceData.customerAddress}</p>
                  </div>
                </div>
              </div>

              {/* Itemized List */}
              <div className="card-premium p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                  Items
                </h2>
                
                <div className="space-y-4">
                  {/* Table Header - Hidden on mobile */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border/50">
                    <div className="col-span-5">Item</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Unit Price</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>
                  
                  {/* Items */}
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="md:grid md:grid-cols-12 md:gap-4 md:items-center py-3 border-b border-border/30 last:border-b-0">
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <span className="font-semibold text-foreground">{formatCurrency(item.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Qty: {item.quantity}</span>
                          <span>@ {formatCurrency(item.unitPrice)}</span>
                        </div>
                      </div>
                      
                      {/* Desktop Layout */}
                      <div className="hidden md:block md:col-span-5">
                        <p className="font-medium text-foreground">{item.name}</p>
                      </div>
                      <div className="hidden md:block md:col-span-2 text-center">
                        <span className="text-foreground">{item.quantity}</span>
                      </div>
                      <div className="hidden md:block md:col-span-2 text-right">
                        <span className="text-foreground">{formatCurrency(item.unitPrice)}</span>
                      </div>
                      <div className="hidden md:block md:col-span-3 text-right">
                        <span className="font-semibold text-foreground">{formatCurrency(item.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {invoiceData.notes && (
                <div className="card-premium p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
                    Notes
                  </h2>
                  <p className="text-foreground leading-relaxed">{invoiceData.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column - Totals Summary */}
            <div className="md:w-80 lg:w-96">
              <div className="card-premium p-4 md:p-6 sticky top-6">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                  Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">{formatCurrency(invoiceData.subtotal)}</span>
                  </div>
                  
                  {invoiceData.discount && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium text-success">-{formatCurrency(invoiceData.discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax (15%)</span>
                    <span className="font-medium text-foreground">{formatCurrency(invoiceData.tax)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-xl md:text-2xl font-bold text-foreground">{formatCurrency(invoiceData.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DownloadOptionsSheet
        isOpen={showDownloadOptions}
        onClose={() => setShowDownloadOptions(false)}
        invoiceNumber={invoiceData.invoiceNumber}
      />
    </>
  );
};

export default InvoiceDetailsScreen;