import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LoginScreen from '@/components/LoginScreen';
import OTPScreen from '@/components/OTPScreen';
import HomeDashboard from '@/components/HomeDashboard';
import CustomerList from '@/components/CustomerList';
import AddCustomerForm from '@/components/AddCustomerForm';
import InvoiceHistory from '@/components/InvoiceHistory';
import ProfileSettings from '@/components/ProfileSettings';
import BottomNavigation from '@/components/BottomNavigation';

type AppScreen = 
  | 'splash' 
  | 'login' 
  | 'otp' 
  | 'home' 
  | 'customers' 
  | 'add-customer' 
  | 'invoices' 
  | 'profile'
  | 'start-visit'
  | 'create-invoice';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigateToScreen = (screen: AppScreen, data?: any) => {
    setCurrentScreen(screen);
    if (screen === 'home' || screen === 'customers' || screen === 'invoices' || screen === 'profile') {
      setActiveTab(screen);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'customers':
        setCurrentScreen('customers');
        break;
      case 'invoices':
        setCurrentScreen('invoices');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const handleLogin = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen('otp');
  };

  const handleOTPVerify = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setActiveTab('home');
  };

  const handleAddCustomer = (customer: any) => {
    console.log('Customer added:', customer);
    setCurrentScreen('customers');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
      
      case 'login':
        return <LoginScreen onNext={handleLogin} />;
      
      case 'otp':
        return (
          <OTPScreen
            phoneNumber={phoneNumber}
            onVerify={handleOTPVerify}
            onBack={() => setCurrentScreen('login')}
          />
        );
      
      case 'home':
        return <HomeDashboard onNavigate={navigateToScreen} />;
      
      case 'customers':
        return <CustomerList onNavigate={navigateToScreen} />;
      
      case 'add-customer':
        return (
          <AddCustomerForm
            onBack={() => setCurrentScreen('customers')}
            onSave={handleAddCustomer}
          />
        );
      
      case 'invoices':
        return <InvoiceHistory onNavigate={navigateToScreen} />;
      
      case 'profile':
        return <ProfileSettings onLogout={handleLogout} />;
      
      case 'start-visit':
        return (
          <div className="mobile-container bg-background flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-xl font-semibold mb-4">Start Visit Feature</h2>
              <p className="text-muted-foreground mb-6">This feature will be implemented with map integration</p>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="btn-primary"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      case 'create-invoice':
        return (
          <div className="mobile-container bg-background flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-xl font-semibold mb-4">Create Invoice Feature</h2>
              <p className="text-muted-foreground mb-6">Invoice creation form will be implemented here</p>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="btn-primary"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      default:
        return <HomeDashboard onNavigate={navigateToScreen} />;
    }
  };

  const showBottomNav = ['home', 'customers', 'invoices', 'profile'].includes(currentScreen);

  return (
    <div className="relative">
      {renderScreen()}
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      )}
    </div>
  );
};

export default Index;
