export const mockChallengeData = {
    user: {
      username: 'User Name',
      profile_picture: '/images/Avatar.png'
    },
    date: '12 April at 09:28',
    title: 'Challenge Title',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur, lacus at elementum mollis, metus quam mattis nisi, sit amet elementum elit massa at libero. Cras sem eros, egestas quis porttitor id, lobortis sit amet mi. Vivamus semper mi tortor, vitae finibus elit porttitor sed. Sed eget mattis arcu, sed tincidunt enim?',
    tags: ['Category', 'Lorem', 'ipsum', 'consectetur', 'adipiscing', 'elit'],
    media: {
      images: ['/images/image.png', '/images/image2.png'],
      video: {
        thumbnail: '/images/thumbnail.png'
      },
      files: [
        { name: 'The fundamentals of economics by Vindick.pdf' },
        { name: 'The fundamentals of economics by Vindick.pdf' }
      ]
    },
    reviewers: {
      users: [
        { username: 'User 1', profile_picture: '/images/Avatar1.png' },
        { username: 'User 2', profile_picture: '/images/Avatar2.png' }
      ],
      count: 35
    },
    participants: {
      users: [
        { username: 'User 3', profile_picture: '/images/Avatar1.png' },
        { username: 'User 4', profile_picture: '/images/Avatar2.png' }
      ],
      count: 95
    },
    endDate: '15/02/2025 - 2PM',
    timing: '1 Hour',
    reward: '400'
  };