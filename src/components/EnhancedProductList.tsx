import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Minus, 
  ShoppingCart,
  Package,
  Clock,
  DollarSign,
  Edit3
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image?: string;
  inStock: boolean;
  recentlyUsed?: boolean;
}

interface SelectedProduct extends Product {
  quantity: number;
  unitPrice: number; // Editable unit price
}

interface EnhancedProductListProps {
  onBack: () => void;
  onContinue: (products: SelectedProduct[]) => void;
  customerName: string;
}

const EnhancedProductList = ({ onBack, onContinue, customerName }: EnhancedProductListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Mouse',
      description: 'Bluetooth, Black, 1600 DPI',
      price: 120.00,
      currency: 'SAR',
      category: 'Electronics',
      inStock: true,
      recentlyUsed: true
    },
    {
      id: '2',
      name: 'USB-C Cable',
      description: '2m Length, Fast Charging',
      price: 45.00,
      currency: 'SAR',
      category: 'Electronics',
      inStock: true,
      recentlyUsed: true
    },
    {
      id: '3',
      name: 'Office Chair',
      description: 'Ergonomic, Adjustable Height',
      price: 850.00,
      currency: 'SAR',
      category: 'Furniture',
      inStock: true,
      recentlyUsed: false
    },
    {
      id: '4',
      name: 'Desk Lamp',
      description: 'LED, Touch Control, White',
      price: 180.00,
      currency: 'SAR',
      category: 'Furniture',
      inStock: true,
      recentlyUsed: true
    },
    {
      id: '5',
      name: 'Notebook Set',
      description: 'A4 Size, 3 Pack, Lined',
      price: 35.00,
      currency: 'SAR',
      category: 'Stationery',
      inStock: true,
      recentlyUsed: false
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      description: 'Portable, Waterproof, 20W',
      price: 299.00,
      currency: 'SAR',
      category: 'Electronics',
      inStock: false,
      recentlyUsed: false
    },
    {
      id: '7',
      name: 'Monitor Stand',
      description: 'Adjustable, Wooden, Storage',
      price: 220.00,
      currency: 'SAR',
      category: 'Furniture',
      inStock: true,
      recentlyUsed: false
    },
    {
      id: '8',
      name: 'Pen Set',
      description: 'Blue Ink, 12 Pack, Premium',
      price: 25.00,
      currency: 'SAR',
      category: 'Stationery',
      inStock: true,
      recentlyUsed: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    const matchesPrice = (() => {
      switch (priceFilter) {
        case 'under-100':
          return product.price < 100;
        case '100-300':
          return product.price >= 100 && product.price <= 300;
        case 'over-300':
          return product.price > 300;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesCategory && matchesPrice && product.inStock;
  });

  const getProductQuantity = (productId: string): number => {
    const selected = selectedProducts.find(p => p.id === productId);
    return selected ? selected.quantity : 0;
  };

  const updateQuantity = (product: Product, newQuantity: number) => {
    setSelectedProducts(prev => {
      if (newQuantity === 0) {
        return prev.filter(p => p.id !== product.id);
      }
      
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => 
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        );
      } else {
        return [...prev, { ...product, quantity: newQuantity, unitPrice: product.price }];
      }
    });
  };

  const updateUnitPrice = (productId: string, newPrice: number) => {
    setSelectedProducts(prev => 
      prev.map(p => 
        p.id === productId ? { ...p, unitPrice: newPrice } : p
      )
    );
  };

  const subtotal = selectedProducts.reduce(
    (sum, product) => sum + (product.unitPrice * product.quantity), 
    0
  );

  const tax = subtotal * 0.15; // 15% VAT
  const totalAmount = subtotal + tax;

  const totalItems = selectedProducts.reduce(
    (sum, product) => sum + product.quantity, 
    0
  );

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

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
              <h1 className="text-xl font-semibold text-foreground">Select Products</h1>
              <p className="text-sm text-muted-foreground">Step 2 of 5 - Add products to invoice for {customerName}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-12"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="input-premium flex-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="input-premium flex-1">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under 100 SAR</SelectItem>
                <SelectItem value="100-300">100 - 300 SAR</SelectItem>
                <SelectItem value="over-300">Over 300 SAR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-6 pb-32">
          {/* Selected Products Summary */}
          {selectedProducts.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 text-primary mr-2" />
                Selected Products ({selectedProducts.length})
              </h3>
              <div className="space-y-3">
                {selectedProducts.map((product) => (
                  <SelectedProductCard
                    key={product.id}
                    product={product}
                    onQuantityChange={(qty) => updateQuantity(product, qty)}
                    onPriceChange={(price) => updateUnitPrice(product.id, price)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recently Used Section */}
          {searchQuery === '' && categoryFilter === 'all' && priceFilter === 'all' && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Recently Used</h3>
              </div>
              <div className="space-y-3">
                {products.filter(p => p.recentlyUsed && p.inStock).slice(0, 3).map((product) => (
                  <ProductCard
                    key={`recent-${product.id}`}
                    product={product}
                    quantity={getProductQuantity(product.id)}
                    onQuantityChange={(qty) => updateQuantity(product, qty)}
                    isCompact={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Products */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                All Products ({filteredProducts.length})
              </h3>
            </div>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={getProductQuantity(product.id)}
                  onQuantityChange={(qty) => updateQuantity(product, qty)}
                />
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-card/95 backdrop-blur-md border-t border-border/50 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">SAR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (15%):</span>
                  <span className="font-medium">SAR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-2">
                  <span>Total:</span>
                  <span>SAR {totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                onClick={() => onContinue(selectedProducts)}
                variant="premium"
                size="full"
                disabled={selectedProducts.length === 0}
              >
                Continue to Tax & Remarks
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  isCompact?: boolean;
}

const ProductCard = ({ product, quantity, onQuantityChange, isCompact = false }: ProductCardProps) => {
  return (
    <div className="card-premium p-4">
      <div className="flex items-start space-x-4">
        {/* Product Image Placeholder */}
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1 truncate">
            {product.name}
          </h4>
          {!isCompact && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-success" />
            <span className="text-lg font-bold text-foreground">
              {product.currency} {product.price.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={quantity === 0}
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <span className="w-8 text-center font-medium text-foreground">
            {quantity}
          </span>
          
          <Button
            onClick={() => onQuantityChange(quantity + 1)}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface SelectedProductCardProps {
  product: SelectedProduct;
  onQuantityChange: (quantity: number) => void;
  onPriceChange: (price: number) => void;
}

const SelectedProductCard = ({ product, onQuantityChange, onPriceChange }: SelectedProductCardProps) => {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState(product.unitPrice.toString());

  const handlePriceEdit = () => {
    const newPrice = parseFloat(tempPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      onPriceChange(newPrice);
    } else {
      setTempPrice(product.unitPrice.toString());
    }
    setIsEditingPrice(false);
  };

  return (
    <div className="card-premium p-4 border-primary/20">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{product.name}</h4>
            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
          </div>
          <Button
            onClick={() => onQuantityChange(0)}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            Remove
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Qty:</span>
            <div className="flex items-center space-x-1">
              <Button
                onClick={() => onQuantityChange(Math.max(1, product.quantity - 1))}
                variant="outline"
                size="icon"
                className="h-6 w-6"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-medium">{product.quantity}</span>
              <Button
                onClick={() => onQuantityChange(product.quantity + 1)}
                variant="outline"
                size="icon"
                className="h-6 w-6"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Unit Price:</span>
            {isEditingPrice ? (
              <div className="flex items-center space-x-1">
                <Input
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  onBlur={handlePriceEdit}
                  onKeyDown={(e) => e.key === 'Enter' && handlePriceEdit()}
                  className="w-20 h-6 px-2 text-sm"
                  type="number"
                  step="0.01"
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="font-semibold">SAR {product.unitPrice.toFixed(2)}</span>
                <Button
                  onClick={() => {
                    setIsEditingPrice(true);
                    setTempPrice(product.unitPrice.toString());
                  }}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <span className="text-sm text-muted-foreground">Line Total:</span>
          <span className="font-bold text-lg">SAR {(product.quantity * product.unitPrice).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductList;