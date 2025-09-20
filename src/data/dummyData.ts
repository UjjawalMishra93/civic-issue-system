// Dummy data for the civic issue reporting system
export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  category: string;
  photo_url?: string;
  created_at: string;
  citizen_name: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High';
}

export const dummyIssues: Issue[] = [
  {
    id: '1',
    title: 'Broken Street Light on Main Street',
    description: 'The street light near the intersection of Main St and Oak Ave has been out for three days, creating a safety hazard.',
    status: 'Pending',
    category: 'Infrastructure',
    photo_url: '/api/placeholder/300/200',
    created_at: '2024-01-15T10:30:00Z',
    citizen_name: 'John Smith',
    location: 'Main St & Oak Ave',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Pothole on Elm Street',
    description: 'Large pothole causing damage to vehicles. Approximately 2 feet wide and 6 inches deep.',
    status: 'In Progress',
    category: 'Roads',
    photo_url: '/api/placeholder/300/200',
    created_at: '2024-01-14T14:22:00Z',
    citizen_name: 'Sarah Johnson',
    location: 'Elm Street, Block 400',
    priority: 'Medium'
  },
  {
    id: '3',
    title: 'Graffiti on Public Building',
    description: 'Vandalism on the side wall of the community center needs to be cleaned.',
    status: 'Resolved',
    category: 'Vandalism',
    photo_url: '/api/placeholder/300/200',
    created_at: '2024-01-12T09:15:00Z',
    citizen_name: 'Mike Davis',
    location: 'Community Center, 123 Park Ave',
    priority: 'Low'
  },
  {
    id: '4',
    title: 'Overflowing Garbage Bin',
    description: 'Public garbage bin at the bus stop is overflowing and attracting pests.',
    status: 'Pending',
    category: 'Sanitation',
    photo_url: '/api/placeholder/300/200',
    created_at: '2024-01-16T16:45:00Z',
    citizen_name: 'Lisa Wilson',
    location: 'Bus Stop - Pine Street',
    priority: 'Medium'
  },
  {
    id: '5',
    title: 'Damaged Park Bench',
    description: 'Park bench in Central Park has broken slats and is unsafe for use.',
    status: 'In Progress',
    category: 'Parks & Recreation',
    photo_url: '/api/placeholder/300/200',
    created_at: '2024-01-13T11:20:00Z',
    citizen_name: 'Robert Brown',
    location: 'Central Park, Section B',
    priority: 'Low'
  }
];

export const categories = [
  'Infrastructure',
  'Roads',
  'Vandalism', 
  'Sanitation',
  'Parks & Recreation',
  'Public Safety',
  'Water & Sewer',
  'Traffic & Parking'
];