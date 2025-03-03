export const mockChallengeData = {
    user: {
      name: 'User Name',
      avatar: '/api/placeholder/50/50'
    },
    date: '12 April at 09:28',
    title: 'Challenge Title',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur, lacus at elementum mollis, metus quam mattis nisi, sit amet elementum elit massa at libero. Cras sem eros, egestas quis porttitor id, lobortis sit amet mi. Vivamus semper mi tortor, vitae finibus elit porttitor sed. Sed eget mattis arcu, sed tincidunt enim?',
    tags: ['Category', 'Lorem', 'ipsum', 'consectetur', 'adipiscing', 'elit'],
    media: {
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      video: {
        thumbnail: '/api/placeholder/400/320'
      },
      files: [
        { name: 'The fundamentals of economics by Vindick.pdf' },
        { name: 'The fundamentals of economics by Vindick.pdf' }
      ]
    },
    reviewers: {
      users: [
        { name: 'User 1', avatar: '/api/placeholder/50/50' },
        { name: 'User 2', avatar: '/api/placeholder/50/50' }
      ],
      count: 35
    },
    participants: {
      users: [
        { name: 'User 3', avatar: '/api/placeholder/50/50' },
        { name: 'User 4', avatar: '/api/placeholder/50/50' }
      ],
      count: 95
    },
    endDate: '15/02/2025 - 2PM',
    timing: '1 Hour',
    reward: '400'
  };