import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MapPin, Phone, Clock } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  lastVisit: string;
  status: 'visited' | 'pending' | 'overdue';
  totalSales: string;
}

interface CustomerListProps {
  onNavigate: (screen: string, data?: any) => void;
}

const CustomerList = ({ onNavigate }: CustomerListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Al Rashid Trading Co.',
      phone: '+971 50 123 4567',
      address: 'Dubai Marina, UAE',
      lastVisit: '2 days ago',
      status: 'visited',
      totalSales: '$12,450'
    },
    {
      id: '2',
      name: 'Khalid Motors LLC',
      phone: '+971 55 987 6543',
      address: 'Sharjah Industrial, UAE',
      lastVisit: '1 week ago',
      status: 'pending',
      totalSales: '$8,720'
    },
    {
      id: '3',
      name: 'Emirates Electronics',
      phone: '+971 52 456 7890',
      address: 'Abu Dhabi Mall, UAE',
      lastVisit: '3 weeks ago',
      status: 'overdue',
      totalSales: '$15,300'
    },
    {
      id: '4',
      name: 'Gulf Construction Ltd',
      phone: '+971 56 234 5678',
      address: 'Ajman Free Zone, UAE',
      lastVisit: 'Today',
      status: 'visited',
      totalSales: '$22,100'
    },
    {
      id: '5',
      name: 'Desert Tech Solutions',
      phone: '+971 58 345 6789',
      address: 'Dubai Silicon Oasis, UAE',
      lastVisit: '5 days ago',
      status: 'pending',
      totalSales: '$5,680'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'visited':
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
      case 'visited':
        return 'Visited';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground">
              {filteredCustomers.length} customers found
            </p>
          </div>
          <Button
            onClick={() => onNavigate('add-customer')}
            variant="premium"
            size="icon"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-premium pl-12"
          />
        </div>

        {/* Customer List */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => onNavigate('customer-detail', customer)}
              className="card-premium p-4 cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {customer.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`${getStatusBadge(customer.status)} mb-2`}>
                    {getStatusText(customer.status)}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {customer.totalSales}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Last visit: {customer.lastVisit}</span>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('start-visit', customer);
                  }}
                  variant="outline"
                  size="sm"
                >
                  Start Visit
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No customers found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              variant="outline"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;