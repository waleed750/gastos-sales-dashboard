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
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
            <p className="text-muted-foreground">
              {filteredInvoices.length} invoices found
            </p>
          </div>
          <Button
            onClick={() => onNavigate('create-invoice')}
            variant="premium"
            size="sm"
          >
            New Invoice
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by invoice # or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-12"
            />
          </div>

          {/* Filter Row */}
          <div className="flex space-x-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="input-premium flex-1">
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
              <SelectTrigger className="input-premium flex-1">
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

        {/* Invoice List */}
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="card-premium p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {invoice.invoiceNumber}
                    </h3>
                    <div className={getStatusBadge(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {invoice.customerName}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(invoice.date)}</span>
                    </div>
                    <span>{invoice.items} items</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground mb-2">
                    {invoice.amount}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-3 border-t border-border/50">
                <Button
                  onClick={() => onNavigate('invoice-detail', invoice)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  onClick={() => {
                    // Mock download functionality
                    console.log('Downloading invoice:', invoice.invoiceNumber);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No invoices found
            </h3>
            <p className="text-muted-foreground mb-4">
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
              variant="premium"
            >
              {searchQuery || statusFilter !== 'all' ? 'Clear Filters' : 'Create Invoice'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceHistory;