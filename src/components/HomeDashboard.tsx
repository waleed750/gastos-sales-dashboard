import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  User, 
  DollarSign, 
  Users, 
  Target, 
  UserPlus, 
  FileText, 
  MapPin,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (screen: string) => void;
}

const HomeDashboard = ({ onNavigate }: HomeDashboardProps) => {
  const [userName] = useState('Ahmed Khalil');

  const kpiData = [
    {
      title: "Today's Visits",
      value: '8',
      target: '12',
      icon: MapPin,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Sales',
      value: '$15,240',
      change: '+12%',
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Active Customers',
      value: '142',
      change: '+5',
      icon: Users,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Monthly Target',
      value: '68%',
      target: '$22K',
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const quickActions = [
    {
      title: 'Start Visit',
      subtitle: 'Begin customer visit',
      icon: MapPin,
      color: 'primary',
      action: () => onNavigate('start-visit'),
    },
    {
      title: 'Add Customer',
      subtitle: 'Register new client',
      icon: UserPlus,
      color: 'secondary',
      action: () => onNavigate('add-customer'),
    },
    {
      title: 'Create Invoice',
      subtitle: 'Generate new invoice',
      icon: FileText,
      color: 'success',
      action: () => onNavigate('create-invoice'),
    },
    {
      title: 'Visit History',
      subtitle: 'View past visits',
      icon: Clock,
      color: 'warning',
      action: () => onNavigate('visit-history'),
    },
  ];

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Hi, {userName} 👋
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Ready to boost your sales today?
            </p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
        </div>

        <div className="tablet-two-column">
          {/* Left Column - KPIs and Quick Actions */}
          <div className="flex-1 space-y-8">
            {/* KPI Cards */}
            <div className="responsive-grid-2">
              {kpiData.map((kpi, index) => (
                <div key={index} className="card-kpi touch-friendly">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                      <kpi.icon className={`w-5 h-5 md:w-6 md:h-6 ${kpi.color}`} />
                    </div>
                    {kpi.change && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-success" />
                        <span className="text-xs md:text-sm font-medium text-success">
                          {kpi.change}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {kpi.value}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {kpi.title}
                  </p>
                  {kpi.target && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Target: {kpi.target}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                Quick Actions
              </h2>
              <div className="responsive-grid">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    variant="outline"
                    className="h-16 md:h-20 lg:h-24 justify-start p-4 md:p-6 border-border/50 hover:border-primary/50 touch-friendly"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-${action.color}/10 rounded-xl flex items-center justify-center mr-4`}>
                      <action.icon className={`w-6 h-6 md:w-7 md:h-7 text-${action.color}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground md:text-lg">
                        {action.title}
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {action.subtitle}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity (tablet+) */}
          <div className="md:w-80 lg:w-96">
            <div className="card-premium p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-semibold text-foreground md:text-lg">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="touch-friendly">
                  View All
                </Button>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-medium text-foreground">
                      Invoice #1247 completed
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Al Rashid Trading Co. - $2,450
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm text-muted-foreground">2h ago</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-medium text-foreground">
                      New customer added
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Khalid Motors LLC
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm text-muted-foreground">4h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;