import { Policy } from '../types/policy';

export const samplePolicies: Policy[] = [
  {
    id: '1',
    name: 'Campus Heat Safety',
    weatherVariable: 'heat_index',
    isActive: true,
    locations: ['Main Campus', 'Athletic Fields', 'Outdoor Events'],
    userGroups: ['Students', 'Faculty', 'Maintenance Staff'],
    thresholds: [
      {
        id: 't1',
        value: 85,
        riskLevel: 'low',
        alertMessage: 'Heat advisory: Stay hydrated and take breaks in shade',
        color: '#10B981'
      },
      {
        id: 't2',
        value: 95,
        riskLevel: 'medium',
        alertMessage: 'Heat warning: Limit outdoor activities and increase water breaks',
        color: '#F59E0B'
      },
      {
        id: 't3',
        value: 105,
        riskLevel: 'high',
        alertMessage: 'Extreme heat: Cancel outdoor activities and move indoors',
        color: '#EF4444'
      }
    ],
    allClearMessage: 'Heat conditions have returned to safe levels. Normal activities may resume.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Lightning Safety Protocol',
    weatherVariable: 'lightning',
    isActive: true,
    locations: ['Sports Fields', 'Outdoor Events', 'Construction Sites'],
    userGroups: ['Athletes', 'Event Staff', 'Construction Workers'],
    thresholds: [
      {
        id: 't4',
        value: 10,
        riskLevel: 'medium',
        alertMessage: 'Lightning detected within 10 miles - prepare to move indoors',
        color: '#F59E0B'
      },
      {
        id: 't5',
        value: 5,
        riskLevel: 'high',
        alertMessage: 'Lightning within 5 miles - evacuate to safe indoor locations immediately',
        color: '#EF4444'
      }
    ],
    allClearMessage: 'Lightning threat has passed. Wait 30 minutes after last strike before resuming outdoor activities.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Air Quality Monitoring',
    weatherVariable: 'air_quality',
    isActive: false,
    locations: ['Downtown Office', 'Warehouse District'],
    userGroups: ['Office Workers', 'Delivery Staff'],
    thresholds: [
      {
        id: 't6',
        value: 100,
        riskLevel: 'medium',
        alertMessage: 'Air quality unhealthy for sensitive groups - limit outdoor exposure',
        color: '#F59E0B'
      },
      {
        id: 't7',
        value: 150,
        riskLevel: 'high',
        alertMessage: 'Unhealthy air quality - avoid outdoor activities',
        color: '#EF4444'
      }
    ],
    allClearMessage: 'Air quality has improved to acceptable levels.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '4',
    name: 'High Wind Operations',
    weatherVariable: 'wind_speed',
    isActive: true,
    locations: ['Construction Sites', 'Loading Docks', 'Outdoor Events'],
    userGroups: ['Construction Workers', 'Event Staff', 'Logistics Team'],
    thresholds: [
      {
        id: 't8',
        value: 25,
        riskLevel: 'medium',
        alertMessage: 'Strong winds detected - secure loose materials and equipment',
        color: '#F59E0B'
      },
      {
        id: 't9',
        value: 40,
        riskLevel: 'high',
        alertMessage: 'High winds - halt crane operations and outdoor work',
        color: '#EF4444'
      }
    ],
    allClearMessage: 'Wind conditions have calmed. Normal operations may resume with caution.',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16')
  }
];