import { useState, useEffect } from 'react';
import { Policy, WeatherVariable, PolicyThreshold } from '../types/policy';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Switch } from './ui/switch';
import { Settings, Save, X } from 'lucide-react';
import { weatherVariables } from '../data/weatherVariables';
import { WeatherVariableSelector } from './WeatherVariableSelector';

interface PolicyEditorProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (policy: Policy) => void;
}

export function PolicyEditor({ policy, isOpen, onClose, onSave }: PolicyEditorProps) {
  const [formData, setFormData] = useState<Partial<Policy>>({});
  const [selectedVariable, setSelectedVariable] = useState<WeatherVariable | ''>('');
  const [enabledLevels, setEnabledLevels] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (policy) {
      setFormData(policy);
      setSelectedVariable(policy.weatherVariable);
      // Set enabled levels based on existing thresholds
      const enabled: { [key: string]: boolean } = {};
      policy.thresholds.forEach((threshold, index) => {
        enabled[`level_${index + 1}`] = true;
      });
      setEnabledLevels(enabled);
    } else {
      // New policy defaults
      setFormData({
        name: '',
        weatherVariable: 'lightning',
        isActive: true,
        locations: [],
        userGroups: [],
        thresholds: [],
        allClearMessage: ''
      });
      setSelectedVariable('lightning');
      setEnabledLevels({});
    }
  }, [policy]);

  const weatherConfig = weatherVariables.find(w => w.id === selectedVariable);

  const handleVariableChange = (variable: WeatherVariable) => {
    setSelectedVariable(variable);
    const config = weatherVariables.find(w => w.id === variable);
    if (config) {
      setFormData(prev => ({
        ...prev,
        weatherVariable: variable,
        thresholds: []
      }));
      setEnabledLevels({});
    }
  };

  const toggleLevel = (levelKey: string, enabled: boolean) => {
    setEnabledLevels(prev => ({ ...prev, [levelKey]: enabled }));
    
    if (enabled) {
      // Add new threshold
      const levelNumber = parseInt(levelKey.split('_')[1]);
      const colors = ['#FACC15', '#10B981', '#3B82F6', '#EF4444']; // Yellow, Green, Blue, Red
      const riskLevels = ['low', 'medium', 'high', 'extreme'];
      
      const newThreshold: PolicyThreshold = {
        id: `threshold_${Date.now()}_${levelNumber}`,
        value: weatherConfig?.minValue || 0,
        riskLevel: riskLevels[levelNumber - 1] as any,
        alertMessage: `Level ${levelNumber} alert`,
        color: colors[levelNumber - 1]
      };
      
      setFormData(prev => ({
        ...prev,
        thresholds: [...(prev.thresholds || []), newThreshold].sort((a, b) => a.value - b.value)
      }));
    } else {
      // Remove threshold
      const levelNumber = parseInt(levelKey.split('_')[1]);
      setFormData(prev => ({
        ...prev,
        thresholds: prev.thresholds?.filter((_, index) => index !== levelNumber - 1) || []
      }));
    }
  };

  const updateThreshold = (index: number, field: keyof PolicyThreshold, value: any) => {
    setFormData(prev => ({
      ...prev,
      thresholds: prev.thresholds?.map((t, i) => 
        i === index ? { ...t, [field]: value } : t
      ) || []
    }));
  };

  const handleSave = () => {
    if (!formData.name || !selectedVariable) {
      return;
    }

    const policyToSave: Policy = {
      id: policy?.id || `policy_${Date.now()}`,
      name: formData.name,
      weatherVariable: selectedVariable,
      isActive: formData.isActive ?? true,
      locations: formData.locations || [],
      userGroups: formData.userGroups || [],
      thresholds: formData.thresholds || [],
      allClearMessage: formData.allClearMessage || '',
      createdAt: policy?.createdAt || new Date(),
      updatedAt: new Date()
    };

    onSave(policyToSave);
    onClose();
  };

  const getLevelColor = (levelNumber: number) => {
    const colors = ['#FACC15', '#10B981', '#3B82F6', '#EF4444']; // Yellow, Green, Blue, Red
    return colors[levelNumber - 1] || '#6B7280';
  };

  const getEnabledThresholds = () => {
    return formData.thresholds?.filter((_, index) => enabledLevels[`level_${index + 1}`]) || [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
              {weatherConfig?.icon && <weatherConfig.icon className="h-4 w-4 text-white" />}
            </div>
            {policy ? 'Edit Policy' : 'Create New Policy'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Policy Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Campus Lightning Safety"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Policy Status</Label>
                <div className="flex items-center gap-3 h-10">
                  <Switch
                    checked={formData.isActive ?? true}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className="text-white">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Variable Selector */}
            <WeatherVariableSelector
              selectedVariable={selectedVariable}
              onVariableChange={handleVariableChange}
            />
          </div>

          {/* Risk Levels Configuration */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-white">Risk Levels</Label>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((levelNumber) => {
                const levelKey = `level_${levelNumber}`;
                const isEnabled = enabledLevels[levelKey];
                const threshold = formData.thresholds?.[levelNumber - 1];
                const levelColor = getLevelColor(levelNumber);
                
                return (
                  <div key={levelKey} className="space-y-3">
                    {/* Level Header with Checkbox */}
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isEnabled}
                        onCheckedChange={(checked) => toggleLevel(levelKey, !!checked)}
                        className="border-slate-600"
                      />
                      <Label className="text-white text-lg font-medium">
                        Level {levelNumber}
                      </Label>
                    </div>

                    {/* Level Configuration (only show if enabled) */}
                    {isEnabled && threshold && (
                      <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {/* Distance/Value Input */}
                            <div className="flex items-center gap-2 text-white">
                              <span className="text-sm">within</span>
                              <Input
                                type="number"
                                value={threshold.value}
                                onChange={(e) => updateThreshold(levelNumber - 1, 'value', Number(e.target.value))}
                                className="w-16 h-8 bg-slate-700 border-slate-600 text-white text-center"
                                min={weatherConfig?.minValue || 0}
                                max={weatherConfig?.maxValue || 100}
                              />
                              <Select
                                value={weatherConfig?.unit || 'miles'}
                                onValueChange={() => {}} // Read-only for now
                              >
                                <SelectTrigger className="w-20 h-8 bg-slate-700 border-slate-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  <SelectItem value="miles" className="text-white">miles</SelectItem>
                                  <SelectItem value="km" className="text-white">km</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* Settings Button */}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 bg-slate-800 border-slate-600" align="end">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-white">Alert Details</h4>
                                  
                                  <div className="space-y-2">
                                    <Label className="text-sm text-slate-300">Alert Message</Label>
                                    <Textarea
                                      value={threshold.alertMessage}
                                      onChange={(e) => updateThreshold(levelNumber - 1, 'alertMessage', e.target.value)}
                                      placeholder="Enter custom alert message..."
                                      className="bg-slate-700 border-slate-600 text-white"
                                      rows={3}
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-sm text-slate-300">All Clear Time (minutes)</Label>
                                    <Input
                                      type="number"
                                      value={threshold.allClearTime || ''}
                                      onChange={(e) => updateThreshold(levelNumber - 1, 'allClearTime', e.target.value ? Number(e.target.value) : undefined)}
                                      placeholder="e.g., 30"
                                      className="bg-slate-700 border-slate-600 text-white"
                                      min={0}
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-sm text-slate-300">All Clear Message</Label>
                                    <Textarea
                                      value={threshold.allClearMessage || ''}
                                      onChange={(e) => updateThreshold(levelNumber - 1, 'allClearMessage', e.target.value)}
                                      placeholder="Conditions have returned to normal..."
                                      className="bg-slate-700 border-slate-600 text-white"
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Slider */}
                          <div className="mt-4">
                            <Slider
                              value={[threshold.value]}
                              onValueChange={([value]) => updateThreshold(levelNumber - 1, 'value', value)}
                              min={weatherConfig?.minValue || 0}
                              max={weatherConfig?.maxValue || 100}
                              step={1}
                              className={`w-full level-slider-${levelNumber}`}
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                              <span>{weatherConfig?.minValue}{weatherConfig?.unit}</span>
                              <span>{weatherConfig?.maxValue}{weatherConfig?.unit}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location and Group Assignment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locations" className="text-white">Locations (comma-separated)</Label>
              <Input
                id="locations"
                value={formData.locations?.join(', ') || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  locations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }))}
                placeholder="Main Campus, Athletic Fields, Outdoor Events"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userGroups" className="text-white">User Groups (comma-separated)</Label>
              <Input
                id="userGroups"
                value={formData.userGroups?.join(', ') || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  userGroups: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }))}
                placeholder="Students, Faculty, Staff"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button onClick={onClose} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              {policy ? 'Update Policy' : 'Create Policy'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}