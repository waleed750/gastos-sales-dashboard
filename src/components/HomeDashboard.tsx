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
  ];

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Hi, {userName} 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to boost your sales today?
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="card-kpi">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                {kpi.change && (
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs font-medium text-success">
                      {kpi.change}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {kpi.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {kpi.title}
              </p>
              {kpi.target && (
                <p className="text-xs text-muted-foreground mt-1">
                  Target: {kpi.target}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                variant="outline"
                className="w-full h-16 justify-start p-4 border-border/50 hover:border-primary/50"
              >
                <div className={`w-12 h-12 bg-${action.color}/10 rounded-xl flex items-center justify-center mr-4`}>
                  <action.icon className={`w-6 h-6 text-${action.color}`} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {action.subtitle}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-premium p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Invoice #1247 completed
                </p>
                <p className="text-xs text-muted-foreground">
                  Al Rashid Trading Co. - $2,450
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  New customer added
                </p>
                <p className="text-xs text-muted-foreground">
                  Khalid Motors LLC
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;