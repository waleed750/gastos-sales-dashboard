import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, User, Phone, MapPin, Check } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  lastVisit: string;
  status: 'visited' | 'pending' | 'overdue';
  totalSales: string;
}

interface CustomerSelectionScreenProps {
  onBack: () => void;
  onCustomerSelected: (customer: Customer) => void;
}

const CustomerSelectionScreen = ({ onBack, onCustomerSelected }: CustomerSelectionScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleContinue = () => {
    if (selectedCustomer) {
      onCustomerSelected(selectedCustomer);
    }
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
              <h1 className="text-xl font-semibold text-foreground">Select Customer</h1>
              <p className="text-sm text-muted-foreground">Step 1 of 5 - Choose a customer for this invoice</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-12"
            />
          </div>
        </div>

        {/* Customer List */}
        <div className="flex-1 overflow-y-auto p-6 pb-32">
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => handleCustomerSelect(customer)}
                className={`card-premium p-4 cursor-pointer transition-all duration-300 touch-friendly ${
                  selectedCustomer?.id === customer.id 
                    ? 'border-primary shadow-md bg-primary/5' 
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        {customer.name}
                      </h3>
                      {selectedCustomer?.id === customer.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-2">{customer.address}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium text-foreground">
                      {customer.totalSales}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total Sales
                    </p>
                  </div>
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
              <p className="text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        {selectedCustomer && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-card/95 backdrop-blur-md border-t border-border/50 p-6">
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Selected Customer:</p>
                <p className="font-semibold text-foreground">{selectedCustomer.name}</p>
              </div>
              <Button
                onClick={handleContinue}
                variant="premium"
                size="full"
              >
                Continue to Products
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSelectionScreen;