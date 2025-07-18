import { Policy } from '../types/policy';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Edit, MapPin, Users } from 'lucide-react';
import { weatherVariables } from '../data/weatherVariables';

interface PolicyCardProps {
  policy: Policy;
  onEdit: (policy: Policy) => void;
  onToggleActive: (policyId: string, isActive: boolean) => void;
}

export function PolicyCard({ policy, onEdit, onToggleActive }: PolicyCardProps) {
  const weatherConfig = weatherVariables.find(w => w.id === policy.weatherVariable);
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-blue-600';
      case 'high': return 'bg-blue-700';
      case 'extreme': return 'bg-blue-800';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/20 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
              {weatherConfig?.icon && <weatherConfig.icon className="h-6 w-6 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-xl text-foreground">{policy.name}</h3>
              <p className="text-sm text-muted-foreground">
                {weatherConfig?.label} • {policy.thresholds.length} risk levels
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={policy.isActive ? "default" : "secondary"}
              className={`cursor-pointer transition-colors ${
                policy.isActive 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "hover:bg-muted-foreground/20"
              }`}
              onClick={() => onToggleActive(policy.id, !policy.isActive)}
            >
              {policy.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(policy)}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Risk Levels */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">RISK LEVELS</div>
          
          {/* Level Indicators */}
          <div className="space-y-2">
            {policy.thresholds.map((threshold, index) => {
              return (
                <div key={threshold.id} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${getRiskColor(threshold.riskLevel)}`} />
                  <div className="font-medium text-foreground">
                    {weatherConfig?.label} ≥ {threshold.value}{weatherConfig?.unit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Locations and Groups */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Locations</span>
            </div>
            <div className="text-foreground font-medium">
              {policy.locations.length > 2 ? 
                `${policy.locations.slice(0, 2).join(', ')} +${policy.locations.length - 2} more` :
                policy.locations.join(', ')
              }
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Groups</span>
            </div>
            <div className="text-foreground font-medium">
              {policy.userGroups.length > 2 ? 
                `${policy.userGroups.slice(0, 2).join(', ')} +${policy.userGroups.length - 2} more` :
                policy.userGroups.join(', ')
              }
            </div>
          </div>
        </div>

        {/* Updated Date */}
        <div className="flex justify-end pt-2">
          <div className="text-xs text-muted-foreground">
            Updated {policy.updatedAt.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}