import { useState } from 'react';
import { Policy } from '../types/policy';
import { PolicyCard } from './PolicyCard';
import { PolicyEditor } from './PolicyEditor';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Search, Filter, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { samplePolicies } from '../data/samplePolicies';

export function PolicyDashboard() {
  const [policies, setPolicies] = useState<Policy[]>(samplePolicies);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.weatherVariable.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && policy.isActive) ||
                         (filterStatus === 'inactive' && !policy.isActive);
    return matchesSearch && matchesFilter;
  });

  const activePolicies = policies.filter(p => p.isActive).length;
  const totalPolicies = policies.length;

  const handleCreatePolicy = () => {
    setSelectedPolicy(null);
    setIsEditorOpen(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsEditorOpen(true);
  };

  const handleSavePolicy = (policy: Policy) => {
    if (selectedPolicy) {
      // Update existing policy
      setPolicies(prev => prev.map(p => p.id === policy.id ? policy : p));
    } else {
      // Add new policy
      setPolicies(prev => [...prev, policy]);
    }
  };

  const handleToggleActive = (policyId: string, isActive: boolean) => {
    setPolicies(prev => prev.map(p => 
      p.id === policyId ? { ...p, isActive, updatedAt: new Date() } : p
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Weather Policies</h1>
              <p className="text-muted-foreground mt-1">
                Manage IF-THEN weather safety policies for your organization
              </p>
            </div>
            <Button onClick={handleCreatePolicy} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Policy
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{totalPolicies}</div>
                  <div className="text-sm text-muted-foreground">Total Policies</div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{activePolicies}</div>
                  <div className="text-sm text-muted-foreground">Active Policies</div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{totalPolicies - activePolicies}</div>
                  <div className="text-sm text-muted-foreground">Inactive Policies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Policies</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredPolicies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌤️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No policies found' : 'No policies yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first weather policy to get started'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button onClick={handleCreatePolicy} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Policy
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {filteredPolicies.length} {filteredPolicies.length === 1 ? 'Policy' : 'Policies'}
                </h2>
                {(searchTerm || filterStatus !== 'all') && (
                  <div className="flex items-center gap-2">
                    {searchTerm && (
                      <Badge variant="outline">
                        Search: "{searchTerm}"
                      </Badge>
                    )}
                    {filterStatus !== 'all' && (
                      <Badge variant="outline">
                        Status: {filterStatus}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Policy Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPolicies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  policy={policy}
                  onEdit={handleEditPolicy}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Policy Editor Modal */}
      <PolicyEditor
        policy={selectedPolicy}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSavePolicy}
      />
    </div>
  );
}