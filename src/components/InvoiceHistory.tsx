import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Eye, Calendar } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  items: number;
}

interface InvoiceHistoryProps {
  onNavigate: (screen: string, data?: any) => void;
}

const InvoiceHistory = ({ onNavigate }: InvoiceHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'Al Rashid Trading Co.',
      amount: '$2,450.00',
      date: '2024-01-15',
      status: 'paid',
      items: 3
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customerName: 'Emirates Electronics',
      amount: '$1,875.50',
      date: '2024-01-14',
      status: 'pending',
      items: 5
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customerName: 'Gulf Construction Ltd',
      amount: '$3,200.00',
      date: '2024-01-12',
      status: 'paid',
      items: 2
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customerName: 'Khalid Motors LLC',
      amount: '$950.75',
      date: '2024-01-10',
      status: 'overdue',
      items: 1
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      customerName: 'Desert Tech Solutions',
      amount: '$1,680.25',
      date: '2024-01-08',
      status: 'paid',
      items: 4
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'overdue':
        return 'bg-destructive/10 text-destructive border border-destructive/20 rounded-full px-3 py-1 text-sm font-medium';
      default:
        return 'badge-warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Invoices</h1>
            <p className="text-muted-foreground md:text-lg">
              {filteredInvoices.length} invoices found
            </p>
          </div>
          <Button
            onClick={() => onNavigate('create-invoice')}
            className="btn-primary touch-friendly"
          >
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>

        <div className="tablet-two-column">
          {/* Left Column - Filters and List */}
          <div className="flex-1 space-y-6 md:space-y-8">
            {/* Filters */}
            <div className="card-premium p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-4 md:mb-6 md:text-lg">Filters</h3>
              
              <div className="space-y-4 md:space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by invoice # or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-premium pl-12 touch-friendly"
                  />
                </div>

                {/* Filter Row */}
                <div className="responsive-grid-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="input-premium touch-friendly">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="input-premium touch-friendly">
                      <SelectValue placeholder="All Dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Invoice List */}
            <div className="space-y-4 md:space-y-6">
              {filteredInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="card-premium p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground md:text-lg">
                          {invoice.invoiceNumber}
                        </h3>
                        <div className={`${getStatusBadge(invoice.status)} mt-1 sm:mt-0 self-start`}>
                          {getStatusText(invoice.status)}
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground mb-3">
                        {invoice.customerName}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm md:text-base text-muted-foreground space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                          <span>{formatDate(invoice.date)}</span>
                        </div>
                        <span>{invoice.items} items</span>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        {invoice.amount}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border/50">
                    <Button
                      onClick={() => onNavigate('invoice-detail', invoice)}
                      variant="outline"
                      className="flex-1 touch-friendly"
                    >
                      <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      View
                    </Button>
                    <Button
                      onClick={() => {
                        // Mock download functionality
                        console.log('Downloading invoice:', invoice.invoiceNumber);
                      }}
                      variant="outline"
                      className="flex-1 touch-friendly"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredInvoices.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">
                  No invoices found
                </h3>
                <p className="text-muted-foreground mb-4 md:mb-6 md:text-lg">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Create your first invoice to get started'
                  }
                </p>
                <Button
                  onClick={() => {
                    if (searchQuery || statusFilter !== 'all') {
                      setSearchQuery('');
                      setStatusFilter('all');
                    } else {
                      onNavigate('create-invoice');
                    }
                  }}
                  className="btn-primary touch-friendly"
                >
                  {searchQuery || statusFilter !== 'all' ? 'Clear Filters' : 'Create Invoice'}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Summary Stats (tablet+) */}
          <div className="md:w-80 lg:w-96">
            <div className="card-premium p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-4 md:mb-6 md:text-lg">Summary</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Invoices</span>
                  <span className="font-semibold text-foreground">{invoices.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-semibold text-success">
                    {invoices.filter(inv => inv.status === 'paid').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-semibold text-warning">
                    {invoices.filter(inv => inv.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Overdue</span>
                  <span className="font-semibold text-destructive">
                    {invoices.filter(inv => inv.status === 'overdue').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;