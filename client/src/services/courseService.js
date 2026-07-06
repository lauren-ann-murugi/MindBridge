// services/courseService.js

// Mock data - Replace with real API calls
const MOCK_COURSES = [
  {
    id: 1,
    title: 'Neural Architectures & Cognition',
    module: 'MODULE 4: TRANSFORMER',
    tag: 'ADVANCED AI',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=140&fit=crop',
    progress: 68,
    lastAccessed: '2 hours ago',
    status: 'in-progress',
    description: 'Deep dive into neural network architectures and cognitive science',
    instructor: 'Dr. Elena Vance',
    modules: 12,
    completedModules: 8,
    xpReward: 450,
    category: 'AI & Machine Learning',
  },
  {
    id: 2,
    title: 'Quantum Cryptography Fundamentals',
    module: 'MODULE 2: LATTICE-BASED SECURITY',
    tag: 'CYBERSECURITY',
    image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8e49e?w=400&h=140&fit=crop',
    progress: 12,
    lastAccessed: 'Yesterday',
    status: 'in-progress',
    description: 'Explore quantum encryption and post-quantum cryptography',
    instructor: 'Prof. Marcus Chen',
    modules: 8,
    completedModules: 1,
    xpReward: 320,
    category: 'Cybersecurity',
  },
  {
    id: 3,
    title: 'Applied Astrophysics & Chaos Theory',
    module: 'MODULE 7: EVENT HORIZON METRICS',
    tag: 'PHYSICS',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=140&fit=crop',
    progress: 89,
    lastAccessed: '3 days ago',
    status: 'in-progress',
    description: 'Understanding chaotic systems in astrophysical phenomena',
    instructor: 'Dr. Sarah Al-Fayed',
    modules: 10,
    completedModules: 9,
    xpReward: 580,
    category: 'Physics',
  },
  {
    id: 4,
    title: 'Advanced Web Development',
    module: 'MODULE 5: REACT PATTERNS',
    tag: 'WEB DEVELOPMENT',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=140&fit=crop',
    progress: 100,
    lastAccessed: '1 week ago',
    status: 'completed',
    description: 'Master modern web development with React and Next.js',
    instructor: 'James Mitchell',
    modules: 15,
    completedModules: 15,
    xpReward: 750,
    category: 'Web Development',
  },
  {
    id: 5,
    title: 'Behavioral Economics Masterclass',
    module: 'MODULE 3: DECISION THEORY',
    tag: 'ECONOMICS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=140&fit=crop',
    progress: 0,
    lastAccessed: 'Never',
    status: 'wishlist',
    description: 'Understand human decision-making and economic behavior',
    instructor: 'Dr. Richard Thaler',
    modules: 12,
    completedModules: 0,
    xpReward: 600,
    category: 'Economics',
  },
  {
    id: 6,
    title: 'Data Science Foundations',
    module: 'MODULE 1: PROBABILITY',
    tag: 'DATA SCIENCE',
    image: 'https://images.unsplash.com/photo-1518611505868-48510c2e2b3d?w=400&h=140&fit=crop',
    progress: 45,
    lastAccessed: '5 days ago',
    status: 'in-progress',
    description: 'Build a solid foundation in statistics and data analysis',
    instructor: 'Prof. Lisa Wong',
    modules: 14,
    completedModules: 6,
    xpReward: 520,
    category: 'Data Science',
  },
  {
    id: 7,
    title: 'Organic Chemistry Deep Dive',
    module: 'MODULE 8: SYNTHESIS',
    tag: 'CHEMISTRY',
    image: 'https://images.unsplash.com/photo-1581092905807-f2a6ba78f84b?w=400&h=140&fit=crop',
    progress: 100,
    lastAccessed: '2 weeks ago',
    status: 'completed',
    description: 'Advanced organic synthesis and reaction mechanisms',
    instructor: 'Dr. James Park',
    modules: 11,
    completedModules: 11,
    xpReward: 680,
    category: 'Chemistry',
  },
  {
    id: 8,
    title: 'Philosophy of Mind',
    module: 'MODULE 6: CONSCIOUSNESS',
    tag: 'PHILOSOPHY',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=140&fit=crop',
    progress: 0,
    lastAccessed: 'Never',
    status: 'wishlist',
    description: 'Explore consciousness, identity, and mental states',
    instructor: 'Prof. David Chalmers',
    modules: 9,
    completedModules: 0,
    xpReward: 400,
    category: 'Philosophy',
  },
];

const RECOMMENDED_MASTERCLASS = {
  id: 99,
  title: 'Masterclass: Behavioral Economic Modeling',
  description: 'You\'ve reached 40% in your prerequisites. Join the current "Study Battle" session to accelerate your module mastery with real-time collaborative feedback.',
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop',
  instructor: 'Dr. Richard Thaler',
  sessionTime: 'Join Session Now',
  participants: 24,
};

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all courses
 * @returns {Promise<Array>}
 */
export async function fetchCourses() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_COURSES), 300);
  });
}

/**
 * Fetch courses by status
 * @param {string} status - 'in-progress', 'completed', 'wishlist'
 * @returns {Promise<Array>}
 */
export async function fetchCoursesByStatus(status) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = MOCK_COURSES.filter((c) => c.status === status);
      resolve(filtered);
    }, 200);
  });
}

/**
 * Search courses
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchCourses(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = query.toLowerCase();
      const results = MOCK_COURSES.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
      resolve(results);
    }, 150);
  });
}

/**
 * Sort courses
 * @param {Array} courses
 * @param {string} sortBy - 'recent', 'progress', 'xp'
 * @returns {Array}
 */
export function sortCourses(courses, sortBy) {
  const sorted = [...courses];
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => {
        const timeA = getTimeScore(a.lastAccessed);
        const timeB = getTimeScore(b.lastAccessed);
        return timeB - timeA;
      });
    case 'progress':
      return sorted.sort((a, b) => b.progress - a.progress);
    case 'xp':
      return sorted.sort((a, b) => b.xpReward - a.xpReward);
    default:
      return sorted;
  }
}

/**
 * Helper: convert "X hours ago" to numeric score
 */
function getTimeScore(timeStr) {
  if (timeStr === 'Never') return 0;
  const match = timeStr.match(/(\d+)/);
  if (!match) return 100;
  const num = parseInt(match[1]);
  if (timeStr.includes('hour')) return 100 - num;
  if (timeStr.includes('day')) return 100 - num * 10;
  if (timeStr.includes('week')) return 100 - num * 70;
  return 0;
}

/**
 * Get course by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function getCourseById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = MOCK_COURSES.find((c) => c.id === id);
      resolve(course || null);
    }, 100);
  });
}

/**
 * Start a course
 * @param {number} courseId
 * @returns {Promise<Object>}
 */
export async function startCourse(courseId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = MOCK_COURSES.find((c) => c.id === courseId);
      if (course) {
        resolve({
          success: true,
          message: `Started: ${course.title}`,
          redirectUrl: `/courses/${courseId}`,
        });
      } else {
        resolve({ success: false, message: 'Course not found' });
      }
    }, 300);
  });
}

/**
 * Get recommended masterclass
 * @returns {Promise<Object>}
 */
export async function getRecommendedMasterclass() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(RECOMMENDED_MASTERCLASS), 200);
  });
}

/**
 * Join masterclass session
 * @param {number} masterclassId
 * @returns {Promise<Object>}
 */
export async function joinMasterclass(masterclassId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Joined masterclass session',
        sessionId: `session_${Date.now()}`,
      });
    }, 400);
  });
}

/**
 * Get user stats
 * @returns {Promise<Object>}
 */
export async function getUserCourseStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const inProgress = MOCK_COURSES.filter((c) => c.status === 'in-progress');
      const completed = MOCK_COURSES.filter((c) => c.status === 'completed');
      const wishlist = MOCK_COURSES.filter((c) => c.status === 'wishlist');
      const totalXP = MOCK_COURSES.reduce((sum, c) => sum + (c.status === 'completed' ? c.xpReward : 0), 0);

      resolve({
        totalEnrolled: inProgress.length,
        completed: completed.length,
        wishlisted: wishlist.length,
        totalXpEarned: totalXP,
        averageProgress: Math.round(
          inProgress.reduce((sum, c) => sum + c.progress, 0) / inProgress.length || 0
        ),
      });
    }, 250);
  });
}