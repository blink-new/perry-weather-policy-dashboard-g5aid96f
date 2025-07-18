import { useState } from 'react';
import { WeatherVariable } from '../types/policy';
import { weatherVariableGroups } from '../data/weatherVariables';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface WeatherVariableSelectorProps {
  selectedVariable: WeatherVariable | '';
  onVariableChange: (variable: WeatherVariable) => void;
}

export function WeatherVariableSelector({ selectedVariable, onVariableChange }: WeatherVariableSelectorProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const getSelectedVariableInfo = () => {
    for (const group of weatherVariableGroups) {
      const variable = group.variables.find(v => v.id === selectedVariable);
      if (variable) {
        return { group, variable };
      }
    }
    return null;
  };

  const selectedInfo = getSelectedVariableInfo();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Weather Variable</h3>
        <p className="text-sm text-slate-400 mb-4">
          Select the weather variable you'd like your policy to be based on.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {weatherVariableGroups.map((group) => {
          // For single-variable groups, show as simple chip
          if (group.variables.length === 1) {
            const variable = group.variables[0];
            const isSelected = selectedVariable === variable.id;
            
            return (
              <Button
                key={group.id}
                variant={isSelected ? "default" : "outline"}
                className={`h-12 px-4 rounded-lg border transition-all ${
                  isSelected 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                }`}
                onClick={() => onVariableChange(variable.id)}
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = variable.icon;
                    return <IconComponent className="h-4 w-4" />;
                  })()}
                  <span>{group.label}</span>
                </div>
              </Button>
            );
          }

          // For multi-variable groups, show as dropdown chip
          const hasSelectedVariable = group.variables.some(v => v.id === selectedVariable);
          
          return (
            <Popover 
              key={group.id} 
              open={openGroup === group.id} 
              onOpenChange={(open) => setOpenGroup(open ? group.id : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant={hasSelectedVariable ? "default" : "outline"}
                  className={`h-12 px-4 rounded-lg border transition-all ${
                    hasSelectedVariable 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {hasSelectedVariable && selectedInfo ? (
                      <>
                        {(() => {
                          const IconComponent = selectedInfo.variable.icon;
                          return <IconComponent className="h-4 w-4" />;
                        })()}
                        <span>{selectedInfo.variable.label}</span>
                      </>
                    ) : (
                      <>
                        {(() => {
                          const IconComponent = group.variables[0].icon;
                          return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
                        })()}
                        <span>{group.label}</span>
                      </>
                    )}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-slate-800 border-slate-600 p-2" align="start">
                <div className="space-y-1">
                  {group.variables.map((variable) => {
                    const isSelected = selectedVariable === variable.id;
                    
                    return (
                      <Button
                        key={variable.id}
                        variant="ghost"
                        className={`w-full justify-start h-10 px-3 ${
                          isSelected 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                        onClick={() => {
                          onVariableChange(variable.id);
                          setOpenGroup(null);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {(() => {
                            const IconComponent = variable.icon;
                            return <IconComponent className="h-4 w-4" />;
                          })()}
                          <span>{variable.label}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>

      {selectedInfo && (
        <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 text-white">
            {(() => {
              const IconComponent = selectedInfo.variable.icon;
              return <IconComponent className="h-4 w-4" />;
            })()}
            <span className="font-medium">{selectedInfo.variable.label}</span>
            <span className="text-slate-400">({selectedInfo.variable.unit})</span>
          </div>
        </div>
      )}
    </div>
  );
}