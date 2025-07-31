import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface VisitHistoryScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Visit {
  id: string;
  startTime: string;
  endTime?: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  customerName?: string;
  invoiceGenerated?: boolean;
  status: 'completed' | 'in-progress' | 'cancelled';
}

const VisitHistoryScreen: React.FC<VisitHistoryScreenProps> = ({ onBack, onNavigate }) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    // Load visit history from localStorage
    const savedVisits = localStorage.getItem('visitHistory');
    if (savedVisits) {
      const parsedVisits = JSON.parse(savedVisits);
      // Add mock data for demo
      const mockVisits: Visit[] = [
        {
          id: '1',
          startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          endTime: new Date(Date.now() - 86400000 + 3600000).toISOString(),
          location: {
            latitude: 24.7136,
            longitude: 46.6753,
            address: 'Riyadh, Saudi Arabia'
          },
          customerName: 'Al Rashid Trading Co.',
          invoiceGenerated: true,
          status: 'completed'
        },
        {
          id: '2',
          startTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          endTime: new Date(Date.now() - 172800000 + 2400000).toISOString(),
          location: {
            latitude: 24.7489,
            longitude: 46.6353,
            address: 'King Fahd Road, Riyadh'
          },
          customerName: 'Modern Electronics LLC',
          invoiceGenerated: true,
          status: 'completed'
        },
        {
          id: '3',
          startTime: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          location: {
            latitude: 24.7221,
            longitude: 46.6889,
            address: 'Olaya District, Riyadh'
          },
          customerName: 'Tech Solutions Inc.',
          invoiceGenerated: false,
          status: 'cancelled'
        }
      ];
      setVisits([...parsedVisits, ...mockVisits]);
    }
  }, []);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-warning text-warning-foreground">In Progress</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const calculateDuration = (start: string, end?: string) => {
    if (!end) return 'Ongoing';
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.location.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || visit.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mobile-container bg-background min-h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="text-lg font-semibold">Visit History</h1>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search visits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {['all', 'completed', 'in-progress', 'cancelled'].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="whitespace-nowrap"
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        {/* Visit List */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {filteredVisits.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No visits found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery || filterStatus !== 'all' ? 'Try adjusting your search or filters' : 'Start your first visit to see it here'}
              </p>
            </div>
          ) : (
            filteredVisits.map(visit => (
              <Card key={visit.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">
                        {visit.customerName || 'Unknown Customer'}
                      </h3>
                      {getStatusBadge(visit.status)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{visit.location.address || `${visit.location.latitude.toFixed(4)}, ${visit.location.longitude.toFixed(4)}`}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDateTime(visit.startTime)}</span>
                      <span className="mx-1">•</span>
                      <span>{calculateDuration(visit.startTime, visit.endTime)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <span className={`flex items-center gap-1 ${visit.invoiceGenerated ? 'text-success' : 'text-muted-foreground'}`}>
                      <div className={`w-2 h-2 rounded-full ${visit.invoiceGenerated ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                      Invoice {visit.invoiceGenerated ? 'Generated' : 'Not Generated'}
                    </span>
                  </div>
                  {visit.invoiceGenerated && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Navigate to invoice report with mock data
                        const mockInvoiceData = {
                          id: `INV-${visit.id}`,
                          invoiceNumber: `INV-${new Date(visit.startTime).getFullYear()}-${String(parseInt(visit.id)).padStart(4, '0')}`,
                          customerName: visit.customerName || 'Unknown Customer',
                          customerAddress: visit.location.address || 'Unknown Address',
                          salesRep: 'Ahmed Al-Mohammed',
                          items: [
                            { name: 'Wireless Mouse', quantity: 2, unitPrice: 120, total: 240 },
                            { name: 'USB Cable', quantity: 1, unitPrice: 45, total: 45 }
                          ],
                          subtotal: 285,
                          tax: 42.75,
                          total: 327.75,
                          visitData: visit
                        };
                        onNavigate('invoice-report', mockInvoiceData);
                      }}
                    >
                      View Report
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitHistoryScreen;