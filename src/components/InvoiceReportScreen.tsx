import React, { useState, useRef } from 'react';
import { Download, Share2, Printer, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface InvoiceReportScreenProps {
  invoiceData: InvoiceData;
  onBack: () => void;
}

interface InvoiceData {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerAddress: string;
  salesRep: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  remarks?: string;
  visitData?: {
    startTime: string;
    location: {
      latitude: number;
      longitude: number;
      address?: string;
    };
  };
}

const InvoiceReportScreen: React.FC<InvoiceReportScreenProps> = ({ invoiceData, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Mock PDF generation - in real app would use jsPDF or similar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "PDF Generated",
        description: `Invoice ${invoiceData.invoiceNumber} saved to downloads`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Could not generate PDF",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      // Mock image generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Image Generated",
        description: `Invoice ${invoiceData.invoiceNumber} saved as image`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Could not generate image",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const shareWhatsApp = () => {
    const message = `Invoice ${invoiceData.invoiceNumber}
Customer: ${invoiceData.customerName}
Total: ${formatCurrency(invoiceData.total)}
Date: ${new Date().toLocaleDateString()}

Items:
${invoiceData.items.map(item => 
  `• ${item.name} x${item.quantity} = ${formatCurrency(item.total)}`
).join('\n')}

Thank you for your business!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const shareViaSystem = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoiceData.invoiceNumber}`,
          text: `Invoice for ${invoiceData.customerName} - Total: ${formatCurrency(invoiceData.total)}`,
        });
      } catch (error) {
        console.log('Share cancelled:', error);
      }
    } else {
      toast({
        title: "Share not supported",
        description: "System sharing is not available on this device",
        variant: "destructive"
      });
    }
  };

  const hasVisitData = invoiceData.visitData;

  return (
    <div className="mobile-container bg-background min-h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="text-lg font-semibold">Invoice Report</h1>
          <Button variant="ghost" size="sm">
            <Printer className="w-4 h-4" />
          </Button>
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-auto">
          <div ref={reportRef} className="p-6 bg-white text-black max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-primary">
              <h1 className="text-2xl font-bold text-primary mb-2">GASTOS SALES</h1>
              <p className="text-sm text-gray-600">Sales Invoice Report</p>
            </div>

            {/* Visit Status */}
            <div className="mb-6">
              {hasVisitData ? (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Visit Completed Properly</p>
                    <p className="text-xs text-green-600">
                      Started: {formatDateTime(invoiceData.visitData.startTime)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium text-red-800">Visit Info: Not Started Properly</p>
                </div>
              )}
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Invoice Information</h3>
                <p className="text-sm"><strong>Invoice #:</strong> {invoiceData.invoiceNumber}</p>
                <p className="text-sm"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p className="text-sm"><strong>Sales Rep:</strong> {invoiceData.salesRep}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <p className="text-sm"><strong>Name:</strong> {invoiceData.customerName}</p>
                <p className="text-sm"><strong>Address:</strong> {invoiceData.customerAddress}</p>
              </div>
            </div>

            {/* Visit Details */}
            {hasVisitData && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Visit Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Start Time:</strong> {formatDateTime(invoiceData.visitData.startTime)}</p>
                  </div>
                  <div>
                    <p><strong>Location:</strong></p>
                    <p className="text-xs text-gray-600">
                      {invoiceData.visitData.location.address || 
                       `${invoiceData.visitData.location.latitude.toFixed(4)}, ${invoiceData.visitData.location.longitude.toFixed(4)}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Items Table */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Items</h3>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-100 grid grid-cols-12 gap-2 p-3 text-xs font-semibold">
                  <div className="col-span-5">PRODUCT</div>
                  <div className="col-span-2 text-center">QTY</div>
                  <div className="col-span-3 text-right">UNIT PRICE</div>
                  <div className="col-span-2 text-right">TOTAL</div>
                </div>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3 text-sm border-t border-gray-200">
                    <div className="col-span-5">{item.name}</div>
                    <div className="col-span-2 text-center">{item.quantity}</div>
                    <div className="col-span-3 text-right">{formatCurrency(item.unitPrice)}</div>
                    <div className="col-span-2 text-right font-medium">{formatCurrency(item.total)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(invoiceData.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax/VAT (15%):</span>
                  <span>{formatCurrency(invoiceData.tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(invoiceData.total)}</span>
                </div>
              </div>
            </div>

            {/* Remarks */}
            {invoiceData.remarks && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Remarks</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{invoiceData.remarks}</p>
              </div>
            )}

            {/* QR Code Placeholder */}
            <div className="text-center mb-6">
              <div className="inline-block p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan for invoice details</p>
            </div>

            {/* Signature */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm mb-4">Customer Signature:</p>
                  <div className="border-b border-dashed border-gray-400 h-12"></div>
                </div>
                <div>
                  <p className="text-sm mb-4">Sales Representative:</p>
                  <div className="border-b border-dashed border-gray-400 h-12"></div>
                  <p className="text-xs text-center mt-1">{invoiceData.salesRep}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-card border-t border-border space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={generatePDF} 
              disabled={isGenerating}
              variant="outline"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              PDF
            </Button>
            <Button 
              onClick={generateImage} 
              disabled={isGenerating}
              variant="outline"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Image
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={shareWhatsApp} variant="default">
              <Share2 className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button onClick={shareViaSystem} variant="default">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceReportScreen;