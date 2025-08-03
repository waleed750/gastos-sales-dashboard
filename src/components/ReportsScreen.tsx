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
      <div className="p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Track your sales performance
            </p>
          </div>
          <Button variant="outline" size="default" className="touch-friendly">
            <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Export
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              size="default"
              onClick={() => setSelectedPeriod(period.id)}
              className="whitespace-nowrap touch-friendly"
            >
              {period.label}
            </Button>
          ))}
        </div>

        <div className="tablet-two-column">
          {/* Left Column - Performance & Charts */}
          <div className="flex-1 space-y-6 md:space-y-8">
            {/* Performance Cards */}
            <div className="responsive-grid-2">
              {performanceData.map((metric, index) => (
                <Card key={index} className="p-4 md:p-6 touch-friendly">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <metric.icon className={`w-5 h-5 md:w-6 md:h-6 ${metric.color}`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                      )}
                      <span className={`text-xs md:text-sm font-medium ${
                        metric.trend === 'up' ? 'text-success' : 'text-destructive'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {metric.title}
                  </p>
                </Card>
              ))}
            </div>

            {/* Charts Placeholder */}
            <Card className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-foreground">Sales Trend</h3>
                <Button variant="ghost" size="sm" className="touch-friendly">
                  <Filter className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
              <div className="h-48 md:h-64 lg:h-80 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-2 md:mb-4" />
                  <p className="text-muted-foreground md:text-lg">Chart visualization coming soon</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Top Products & Recent Visits */}
          <div className="md:w-80 lg:w-96 space-y-6 md:space-y-8">
            {/* Top Products */}
            <Card className="p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Top Products</h3>
              <div className="space-y-3 md:space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between py-2 md:py-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground md:text-lg">{product.name}</p>
                      <p className="text-sm md:text-base text-muted-foreground">{product.sales} units sold</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-foreground md:text-lg">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Visits */}
            <Card className="p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Recent Visits</h3>
              <div className="space-y-3 md:space-y-4">
                {recentVisits.map((visit, index) => (
                  <div key={index} className="flex items-center justify-between py-2 md:py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground md:text-lg">{visit.customer}</p>
                        <p className="text-sm md:text-base text-muted-foreground">{visit.date}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-foreground md:text-lg">{visit.amount}</p>
                      <div className={`inline-flex px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium ${
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
      </div>
    </div>
  );
};

export default ReportsScreen;