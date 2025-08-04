import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LoginScreen from '@/components/LoginScreen';
import OTPScreen from '@/components/OTPScreen';
import HomeDashboard from '@/components/HomeDashboard';
import CustomerList from '@/components/CustomerList';
import AddCustomerForm from '@/components/AddCustomerForm';
import InvoiceHistory from '@/components/InvoiceHistory';
import ProductList from '@/components/ProductList';
import ProfileSettings from '@/components/ProfileSettings';
import BottomNavigation from '@/components/BottomNavigation';
import StartVisitScreen from '@/components/StartVisitScreen';
import InvoiceReportScreen from '@/components/InvoiceReportScreen';
import VisitHistoryScreen from '@/components/VisitHistoryScreen';
import ReportsScreen from '@/components/ReportsScreen';
import InvoiceDetailsScreen from '@/components/InvoiceDetailsScreen';

type AppScreen = 
  | 'splash' 
  | 'login' 
  | 'otp' 
  | 'home' 
  | 'customers' 
  | 'add-customer' 
  | 'invoices' 
  | 'invoice-details'
  | 'profile'
  | 'reports'
  | 'start-visit'
  | 'create-invoice'
  | 'product-list'
  | 'invoice-report'
  | 'visit-history';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [currentVisit, setCurrentVisit] = useState<any>(null);
  const [invoiceReportData, setInvoiceReportData] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const navigateToScreen = (screen: AppScreen, data?: any) => {
    if (data) {
      if (screen === 'invoice-report') {
        setInvoiceReportData(data);
      } else if (screen === 'invoice-details') {
        setSelectedInvoice(data);
      } else {
        setSelectedCustomer(data);
      }
    }
    setCurrentScreen(screen);
    if (screen === 'home' || screen === 'customers' || screen === 'invoices' || screen === 'reports' || screen === 'profile') {
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
      case 'reports':
        setCurrentScreen('reports');
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

  const handleCreateInvoice = () => {
    // For demo purposes, we'll use a default customer if none selected
    if (!selectedCustomer) {
      setSelectedCustomer({
        id: '1',
        name: 'Al Rashid Trading Co.',
        phone: '+971 50 123 4567'
      });
    }
    setCurrentScreen('product-list');
  };

  const handleProductsSelected = (products: any[]) => {
    console.log('Products selected for invoice:', products);
    
    // Generate mock invoice data with current visit info
    const currentVisitData = JSON.parse(localStorage.getItem('currentVisit') || 'null');
    const mockInvoiceData = {
      id: crypto.randomUUID(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
      customerName: selectedCustomer?.name || 'Selected Customer',
      customerAddress: selectedCustomer?.address || 'Customer Address',
      salesRep: 'Ahmed Al-Mohammed',
      items: products.map((product: any) => ({
        name: product.name,
        quantity: product.quantity,
        unitPrice: product.price,
        total: product.price * product.quantity
      })),
      subtotal: products.reduce((sum: number, p: any) => sum + (p.price * p.quantity), 0),
      tax: products.reduce((sum: number, p: any) => sum + (p.price * p.quantity), 0) * 0.15,
      total: products.reduce((sum: number, p: any) => sum + (p.price * p.quantity), 0) * 1.15,
      visitData: currentVisitData
    };
    
    setInvoiceReportData(mockInvoiceData);
    setCurrentScreen('invoice-report');
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
      
      case 'reports':
        return <ReportsScreen />;
      
      case 'profile':
        return <ProfileSettings onLogout={handleLogout} />;
      
      case 'product-list':
        return (
          <ProductList
            onBack={() => setCurrentScreen('home')}
            onAddToInvoice={handleProductsSelected}
            customerName={selectedCustomer?.name}
          />
        );
      
      case 'start-visit':
        return (
          <StartVisitScreen
            onBack={() => setCurrentScreen('home')}
            onVisitStarted={(visitData) => {
              setCurrentVisit(visitData);
              setCurrentScreen('home');
            }}
          />
        );
      
      case 'create-invoice':
        return (
          <div className="mobile-container bg-background flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-xl font-semibold mb-4">Create Invoice Feature</h2>
              <p className="text-muted-foreground mb-6">Click below to select products for invoice</p>
              <button 
                onClick={handleCreateInvoice}
                className="btn-primary mb-4"
              >
                Select Products
              </button>
              <br />
              <button 
                onClick={() => setCurrentScreen('home')}
                className="btn-secondary"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      case 'invoice-report':
        return (
          <InvoiceReportScreen
            invoiceData={invoiceReportData}
            onBack={() => setCurrentScreen('invoices')}
          />
        );

      case 'visit-history':
        return (
          <VisitHistoryScreen
            onBack={() => setCurrentScreen('home')}
            onNavigate={navigateToScreen}
          />
        );

      case 'invoice-details':
        return (
          <InvoiceDetailsScreen
            invoiceData={selectedInvoice}
            onBack={() => setCurrentScreen('invoices')}
          />
        );
      
      default:
        return <HomeDashboard onNavigate={navigateToScreen} />;
    }
  };

  const showBottomNav = ['home', 'customers', 'invoices', 'reports', 'profile'].includes(currentScreen);

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
