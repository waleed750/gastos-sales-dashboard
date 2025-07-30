import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Save, Camera } from 'lucide-react';

interface AddCustomerFormProps {
  onBack: () => void;
  onSave: (customer: any) => void;
}

const AddCustomerForm = ({ onBack, onSave }: AddCustomerFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    location: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        id: Date.now().toString(),
        status: 'pending',
        lastVisit: 'Never',
        totalSales: '$0'
      });
    }
  };

  return (
    <div className="mobile-container bg-background">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Add Customer</h1>
            <p className="text-sm text-muted-foreground">Create new customer profile</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="card-premium p-4">
            <h3 className="font-semibold text-foreground mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Customer Name *
                </label>
                <Input
                  placeholder="e.g., Al Rashid Trading Co."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`input-premium ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`input-premium ${errors.phone ? 'border-destructive' : ''}`}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="customer@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-premium"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="card-premium p-4">
            <h3 className="font-semibold text-foreground mb-4">Location</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Address *
                </label>
                <Textarea
                  placeholder="Street, City, Emirate"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`input-premium min-h-[80px] ${errors.address ? 'border-destructive' : ''}`}
                />
                {errors.address && (
                  <p className="text-xs text-destructive mt-1">{errors.address}</p>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Mock location selection
                  handleInputChange('location', '25.2048° N, 55.2708° E');
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {formData.location ? 'Update Location' : 'Select Location on Map'}
              </Button>
              
              {formData.location && (
                <p className="text-xs text-success">
                  📍 Location saved: {formData.location}
                </p>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="card-premium p-4">
            <h3 className="font-semibold text-foreground mb-4">Additional Information</h3>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Notes
              </label>
              <Textarea
                placeholder="Any additional notes about this customer..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="input-premium min-h-[100px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleSave}
              variant="premium"
              size="full"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Customer
            </Button>
            
            <Button
              onClick={onBack}
              variant="outline"
              size="full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerForm;