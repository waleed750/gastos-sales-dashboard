import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  LogOut, 
  Camera,
  Edit3,
  Save,
  Shield,
  Info
} from 'lucide-react';

interface ProfileSettingsProps {
  onLogout: () => void;
}

const ProfileSettings = ({ onLogout }: ProfileSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ahmed Khalil',
    email: 'ahmed.khalil@gastossales.com',
    phone: '+971 50 123 4567',
    employeeId: 'GS-2024-001',
    territory: 'Dubai & Northern Emirates',
    joinDate: 'January 2024'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      items: [
        { label: 'Full Name', value: profile.name, key: 'name', editable: true },
        { label: 'Email', value: profile.email, key: 'email', editable: true },
        { label: 'Phone', value: profile.phone, key: 'phone', editable: true },
      ]
    },
    {
      title: 'Work Information',
      icon: Shield,
      items: [
        { label: 'Employee ID', value: profile.employeeId, key: 'employeeId', editable: false },
        { label: 'Territory', value: profile.territory, key: 'territory', editable: false },
        { label: 'Join Date', value: profile.joinDate, key: 'joinDate', editable: false },
      ]
    }
  ];

  const actionItems = [
    {
      title: 'Change Password',
      subtitle: 'Update your account password',
      icon: Lock,
      action: () => console.log('Change password'),
      color: 'text-primary'
    },
    {
      title: 'App Information',
      subtitle: 'Version 1.2.0 - Build 245',
      icon: Info,
      action: () => console.log('App info'),
      color: 'text-muted-foreground'
    },
    {
      title: 'Sign Out',
      subtitle: 'Sign out of your account',
      icon: LogOut,
      action: onLogout,
      color: 'text-destructive'
    }
  ];

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="icon"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="premium"
                size="sm"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="card-premium p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                {profile.name}
              </h3>
              <p className="text-muted-foreground">Sales Representative</p>
              <p className="text-sm text-primary font-medium">
                {profile.employeeId}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="card-premium p-4 mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <section.icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{section.title}</h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {item.label}
                  </label>
                  {isEditing && item.editable ? (
                    <Input
                      value={editedProfile[item.key as keyof typeof editedProfile]}
                      onChange={(e) => 
                        setEditedProfile(prev => ({ 
                          ...prev, 
                          [item.key]: e.target.value 
                        }))
                      }
                      className="input-premium"
                    />
                  ) : (
                    <p className="text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Action Items */}
        <div className="space-y-3">
          {actionItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full card-premium p-4 text-left hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${item.color}`}>
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;