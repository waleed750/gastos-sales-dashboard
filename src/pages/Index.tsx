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
import CustomerSelectionScreen from '@/components/CustomerSelectionScreen';
import EnhancedProductList from '@/components/EnhancedProductList';
import InvoiceRemarksScreen from '@/components/InvoiceRemarksScreen';
import InvoiceReviewScreen from '@/components/InvoiceReviewScreen';

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
  | 'visit-history'
  | 'customer-selection'
  | 'enhanced-product-list'
  | 'invoice-remarks'
  | 'invoice-review';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [currentVisit, setCurrentVisit] = useState<any>(null);
  const [invoiceReportData, setInvoiceReportData] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [invoiceProducts, setInvoiceProducts] = useState<any[]>([]);
  const [invoiceRemarks, setInvoiceRemarks] = useState<string>('');

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
    // Start the enhanced invoice creation flow
    setSelectedCustomer(null);
    setInvoiceProducts([]);
    setInvoiceRemarks('');
    setCurrentScreen('customer-selection');
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

  // Enhanced invoice flow handlers
  const handleCustomerSelected = (customer: any) => {
    setSelectedCustomer(customer);
    setCurrentScreen('enhanced-product-list');
  };

  const handleEnhancedProductsSelected = (products: any[]) => {
    setInvoiceProducts(products);
    setCurrentScreen('invoice-remarks');
  };

  const handleRemarksAdded = (remarks: string) => {
    setInvoiceRemarks(remarks);
    setCurrentScreen('invoice-review');
  };

  const handleInvoiceSaved = () => {
    // Generate final invoice data
    const currentVisitData = JSON.parse(localStorage.getItem('currentVisit') || 'null');
    const subtotal = invoiceProducts.reduce((sum: number, p: any) => sum + (p.unitPrice * p.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const finalInvoiceData = {
      id: crypto.randomUUID(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
      customerName: selectedCustomer?.name || 'Selected Customer',
      customerAddress: selectedCustomer?.address || 'Customer Address',
      customerPhone: selectedCustomer?.phone || '',
      salesRep: 'Ahmed Al-Mohammed',
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      items: invoiceProducts.map((product: any) => ({
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        total: product.unitPrice * product.quantity
      })),
      subtotal,
      tax,
      total,
      remarks: invoiceRemarks,
      visitData: currentVisitData,
      location: 'Current Location', // TODO: Get actual GPS location
      timestamp: new Date().toISOString()
    };

    // Save to localStorage (or send to backend)
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    existingInvoices.unshift(finalInvoiceData);
    localStorage.setItem('invoices', JSON.stringify(existingInvoices));

    // Navigate to invoice report
    setInvoiceReportData(finalInvoiceData);
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

      case 'customer-selection':
        return (
          <CustomerSelectionScreen
            onBack={() => setCurrentScreen('home')}
            onCustomerSelected={handleCustomerSelected}
          />
        );

      case 'enhanced-product-list':
        return (
          <EnhancedProductList
            onBack={() => setCurrentScreen('customer-selection')}
            onContinue={handleEnhancedProductsSelected}
            customerName={selectedCustomer?.name || ''}
          />
        );

      case 'invoice-remarks':
        return (
          <InvoiceRemarksScreen
            onBack={() => setCurrentScreen('enhanced-product-list')}
            onContinue={handleRemarksAdded}
            selectedProducts={invoiceProducts}
            customerName={selectedCustomer?.name || ''}
          />
        );

      case 'invoice-review':
        return (
          <InvoiceReviewScreen
            onBack={() => setCurrentScreen('invoice-remarks')}
            onSaveInvoice={handleInvoiceSaved}
            selectedProducts={invoiceProducts}
            customer={selectedCustomer}
            remarks={invoiceRemarks}
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
