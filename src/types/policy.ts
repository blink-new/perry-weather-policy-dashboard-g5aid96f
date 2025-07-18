export type WeatherVariable = 
  | 'heat_index'
  | 'air_quality'
  | 'wind_speed'
  | 'wind_gust'
  | 'precipitation'
  | 'snow'
  | 'lightning'
  | 'temperature'
  | 'wind_chill'
  | 'feels_like_cold'
  | 'humidity'
  | 'visibility'
  | 'nws_alerts';

export type RiskLevel = 'low' | 'medium' | 'high' | 'extreme';

export interface PolicyThreshold {
  id: string;
  value: number;
  riskLevel: RiskLevel;
  alertMessage: string;
  color: string;
  allClearTime?: number; // minutes
  allClearMessage?: string;
}

export interface Policy {
  id: string;
  name: string;
  weatherVariable: WeatherVariable;
  isActive: boolean;
  locations: string[];
  userGroups: string[];
  thresholds: PolicyThreshold[];
  allClearMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeatherVariableConfig {
  id: WeatherVariable;
  label: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  minValue: number;
  maxValue: number;
  defaultThresholds: Omit<PolicyThreshold, 'id'>[];
}