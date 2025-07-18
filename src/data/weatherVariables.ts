import { WeatherVariableConfig } from '../types/policy';
import { Zap, Wind, Droplets, Thermometer, Eye, Gauge, Snowflake, AlertTriangle } from 'lucide-react';

export interface WeatherVariableGroup {
  id: string;
  label: string;
  variables: WeatherVariableConfig[];
}

export const weatherVariables: WeatherVariableConfig[] = [
  // Lightning
  {
    id: 'lightning',
    label: 'Lightning',
    unit: 'miles',
    icon: Zap,
    minValue: 0,
    maxValue: 50,
    defaultThresholds: [
      { value: 10, riskLevel: 'low', alertMessage: 'Lightning detected within 10 miles', color: '#10B981' },
      { value: 5, riskLevel: 'medium', alertMessage: 'Lightning within 5 miles - move indoors', color: '#F59E0B' },
      { value: 2, riskLevel: 'high', alertMessage: 'Lightning within 2 miles - seek immediate shelter', color: '#EF4444' },
      { value: 1, riskLevel: 'extreme', alertMessage: 'Lightning strike imminent - take cover now', color: '#7C2D12' }
    ]
  },
  
  // Wind
  {
    id: 'wind_speed',
    label: 'Wind Speed',
    unit: 'mph',
    icon: Wind,
    minValue: 0,
    maxValue: 100,
    defaultThresholds: [
      { value: 15, riskLevel: 'low', alertMessage: 'Breezy conditions detected', color: '#10B981' },
      { value: 25, riskLevel: 'medium', alertMessage: 'Strong winds detected', color: '#F59E0B' },
      { value: 40, riskLevel: 'high', alertMessage: 'High winds - exercise caution', color: '#EF4444' },
      { value: 60, riskLevel: 'extreme', alertMessage: 'Dangerous winds - seek shelter', color: '#7C2D12' }
    ]
  },
  {
    id: 'wind_gust',
    label: 'Wind Gust',
    unit: 'mph',
    icon: Wind,
    minValue: 0,
    maxValue: 120,
    defaultThresholds: [
      { value: 20, riskLevel: 'low', alertMessage: 'Wind gusts detected', color: '#10B981' },
      { value: 35, riskLevel: 'medium', alertMessage: 'Strong wind gusts', color: '#F59E0B' },
      { value: 50, riskLevel: 'high', alertMessage: 'Dangerous wind gusts', color: '#EF4444' },
      { value: 75, riskLevel: 'extreme', alertMessage: 'Extreme wind gusts - seek shelter', color: '#7C2D12' }
    ]
  },

  // Heat Stress
  {
    id: 'heat_index',
    label: 'Heat Index',
    unit: '°F',
    icon: Thermometer,
    minValue: 60,
    maxValue: 130,
    defaultThresholds: [
      { value: 80, riskLevel: 'low', alertMessage: 'Caution: Heat index reaching 80°F', color: '#10B981' },
      { value: 90, riskLevel: 'medium', alertMessage: 'Warning: Heat index reaching 90°F', color: '#F59E0B' },
      { value: 100, riskLevel: 'high', alertMessage: 'Danger: Heat index reaching 100°F', color: '#EF4444' },
      { value: 110, riskLevel: 'extreme', alertMessage: 'Extreme Danger: Heat index reaching 110°F', color: '#7C2D12' }
    ]
  },
  {
    id: 'temperature',
    label: 'Temperature',
    unit: '°F',
    icon: Thermometer,
    minValue: -20,
    maxValue: 120,
    defaultThresholds: [
      { value: 85, riskLevel: 'low', alertMessage: 'High temperature alert', color: '#10B981' },
      { value: 95, riskLevel: 'medium', alertMessage: 'Very high temperature', color: '#F59E0B' },
      { value: 105, riskLevel: 'high', alertMessage: 'Dangerous heat', color: '#EF4444' },
      { value: 115, riskLevel: 'extreme', alertMessage: 'Extreme heat warning', color: '#7C2D12' }
    ]
  },

  // Cold Stress
  {
    id: 'wind_chill',
    label: 'Wind Chill',
    unit: '°F',
    icon: Snowflake,
    minValue: -50,
    maxValue: 50,
    defaultThresholds: [
      { value: 32, riskLevel: 'low', alertMessage: 'Freezing conditions', color: '#10B981' },
      { value: 15, riskLevel: 'medium', alertMessage: 'Cold weather advisory', color: '#F59E0B' },
      { value: -5, riskLevel: 'high', alertMessage: 'Dangerous cold conditions', color: '#EF4444' },
      { value: -20, riskLevel: 'extreme', alertMessage: 'Extreme cold warning', color: '#7C2D12' }
    ]
  },
  {
    id: 'feels_like_cold',
    label: 'Feels Like (Cold)',
    unit: '°F',
    icon: Snowflake,
    minValue: -50,
    maxValue: 50,
    defaultThresholds: [
      { value: 32, riskLevel: 'low', alertMessage: 'Feels like freezing', color: '#10B981' },
      { value: 20, riskLevel: 'medium', alertMessage: 'Feels dangerously cold', color: '#F59E0B' },
      { value: 0, riskLevel: 'high', alertMessage: 'Feels extremely cold', color: '#EF4444' },
      { value: -15, riskLevel: 'extreme', alertMessage: 'Life-threatening cold', color: '#7C2D12' }
    ]
  },

  // Air Quality
  {
    id: 'air_quality',
    label: 'Air Quality Index',
    unit: 'AQI',
    icon: Gauge,
    minValue: 0,
    maxValue: 500,
    defaultThresholds: [
      { value: 50, riskLevel: 'low', alertMessage: 'Air quality is moderate', color: '#10B981' },
      { value: 100, riskLevel: 'medium', alertMessage: 'Air quality is unhealthy for sensitive groups', color: '#F59E0B' },
      { value: 150, riskLevel: 'high', alertMessage: 'Air quality is unhealthy', color: '#EF4444' },
      { value: 200, riskLevel: 'extreme', alertMessage: 'Air quality is very unhealthy', color: '#7C2D12' }
    ]
  },
  {
    id: 'visibility',
    label: 'Visibility',
    unit: 'miles',
    icon: Eye,
    minValue: 0,
    maxValue: 10,
    defaultThresholds: [
      { value: 5, riskLevel: 'low', alertMessage: 'Reduced visibility', color: '#10B981' },
      { value: 2, riskLevel: 'medium', alertMessage: 'Poor visibility conditions', color: '#F59E0B' },
      { value: 1, riskLevel: 'high', alertMessage: 'Very poor visibility', color: '#EF4444' },
      { value: 0.5, riskLevel: 'extreme', alertMessage: 'Extremely poor visibility', color: '#7C2D12' }
    ]
  },

  // Humidity
  {
    id: 'humidity',
    label: 'Humidity',
    unit: '%',
    icon: Droplets,
    minValue: 0,
    maxValue: 100,
    defaultThresholds: [
      { value: 70, riskLevel: 'low', alertMessage: 'High humidity conditions', color: '#10B981' },
      { value: 80, riskLevel: 'medium', alertMessage: 'Very high humidity', color: '#F59E0B' },
      { value: 90, riskLevel: 'high', alertMessage: 'Dangerous humidity levels', color: '#EF4444' },
      { value: 95, riskLevel: 'extreme', alertMessage: 'Extreme humidity warning', color: '#7C2D12' }
    ]
  },

  // Precipitation
  {
    id: 'precipitation',
    label: 'Precipitation',
    unit: 'in/hr',
    icon: Droplets,
    minValue: 0,
    maxValue: 5,
    defaultThresholds: [
      { value: 0.1, riskLevel: 'low', alertMessage: 'Light rain detected', color: '#10B981' },
      { value: 0.5, riskLevel: 'medium', alertMessage: 'Moderate rain detected', color: '#F59E0B' },
      { value: 1.0, riskLevel: 'high', alertMessage: 'Heavy rain - flooding possible', color: '#EF4444' },
      { value: 2.0, riskLevel: 'extreme', alertMessage: 'Extreme rainfall - seek higher ground', color: '#7C2D12' }
    ]
  },
  {
    id: 'snow',
    label: 'Snow',
    unit: 'in/hr',
    icon: Snowflake,
    minValue: 0,
    maxValue: 10,
    defaultThresholds: [
      { value: 0.5, riskLevel: 'low', alertMessage: 'Light snow detected', color: '#10B981' },
      { value: 1.0, riskLevel: 'medium', alertMessage: 'Moderate snowfall', color: '#F59E0B' },
      { value: 2.0, riskLevel: 'high', alertMessage: 'Heavy snow conditions', color: '#EF4444' },
      { value: 4.0, riskLevel: 'extreme', alertMessage: 'Extreme snowfall warning', color: '#7C2D12' }
    ]
  },

  // National Weather Service Alerts
  {
    id: 'nws_alerts',
    label: 'NWS Alerts',
    unit: 'alert',
    icon: AlertTriangle,
    minValue: 0,
    maxValue: 1,
    defaultThresholds: [
      { value: 1, riskLevel: 'high', alertMessage: 'National Weather Service alert issued', color: '#EF4444' }
    ]
  }
];

export const weatherVariableGroups: WeatherVariableGroup[] = [
  {
    id: 'lightning',
    label: 'Lightning',
    variables: weatherVariables.filter(v => v.id === 'lightning')
  },
  {
    id: 'wind',
    label: 'Wind',
    variables: weatherVariables.filter(v => ['wind_speed', 'wind_gust'].includes(v.id))
  },
  {
    id: 'heat_stress',
    label: 'Heat Stress',
    variables: weatherVariables.filter(v => ['heat_index', 'temperature'].includes(v.id))
  },
  {
    id: 'cold_stress',
    label: 'Cold Stress',
    variables: weatherVariables.filter(v => ['wind_chill', 'feels_like_cold'].includes(v.id))
  },
  {
    id: 'air_quality',
    label: 'Air Quality',
    variables: weatherVariables.filter(v => ['air_quality', 'visibility'].includes(v.id))
  },
  {
    id: 'humidity',
    label: 'Humidity',
    variables: weatherVariables.filter(v => v.id === 'humidity')
  },
  {
    id: 'precipitation',
    label: 'Precipitation',
    variables: weatherVariables.filter(v => ['precipitation', 'snow'].includes(v.id))
  },
  {
    id: 'nws_alerts',
    label: 'National Weather Service Alerts',
    variables: weatherVariables.filter(v => v.id === 'nws_alerts')
  }
];