import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  FileText, 
  MapPin,
  Calendar,
  Target,
  Download,
  Filter
} from 'lucide-react';

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const performanceData = [
    {
      title: 'Total Revenue',
      value: 'SAR 45,230',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Invoices Created',
      value: '127',
      change: '+8.1%',
      trend: 'up',
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Customers Visited',
      value: '89',
      change: '-2.3%',
      trend: 'down',
      icon: Users,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Average Sale',
      value: 'SAR 356',
      change: '+12.5%',
      trend: 'up',
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const topProducts = [
    { name: 'Wireless Mouse', sales: 45, revenue: 'SAR 5,400' },
    { name: 'USB Cable', sales: 32, revenue: 'SAR 960' },
    { name: 'Bluetooth Headphones', sales: 28, revenue: 'SAR 8,400' },
    { name: 'Power Bank', sales: 24, revenue: 'SAR 3,600' },
    { name: 'Phone Case', sales: 18, revenue: 'SAR 900' },
  ];

  const recentVisits = [
    { customer: 'Al Rashid Trading Co.', date: '2024-01-15', status: 'Completed', amount: 'SAR 2,450' },
    { customer: 'Khalid Motors LLC', date: '2024-01-14', status: 'Completed', amount: 'SAR 1,890' },
    { customer: 'Dubai Electronics', date: '2024-01-14', status: 'Pending', amount: 'SAR 3,200' },
    { customer: 'Tech Solutions Hub', date: '2024-01-13', status: 'Completed', amount: 'SAR 875' },
  ];

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
  ];

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Track your sales performance
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className="whitespace-nowrap"
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {performanceData.map((metric, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {metric.title}
              </p>
            </Card>
          ))}
        </div>

        {/* Charts Placeholder */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Sales Trend</h3>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Visits */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Visits</h3>
          <div className="space-y-3">
            {recentVisits.map((visit, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{visit.customer}</p>
                    <p className="text-sm text-muted-foreground">{visit.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{visit.amount}</p>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    visit.status === 'Completed' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {visit.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsScreen;