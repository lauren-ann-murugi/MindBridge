/**
 * Battle Service
 * Handles data fetching and interaction logic for Study Battles
 */

// 1. Fetch questions for the battle
export const fetchBattleQuestions = async (topic) => {
  // In a real app, this would be an API call: await api.get(`/battle/questions/${topic}`)
  return [
    { id: 1, text: "What is the primary architectural purpose of a reverse proxy?", options: { A: "Load balancing", B: "Database storage", C: "CSS styling", D: "Hardware cooling" }, correct: "A" },
    { id: 2, text: "Which hook is used to manage side effects in React?", options: { A: "useState", B: "useEffect", C: "useContext", D: "useMemo" }, correct: "B" },
    { id: 3, text: "What does 'DOM' stand for?", options: { A: "Data Object Model", B: "Document Object Model", C: "Digital Object Method", D: "Document Oriented Management" }, correct: "B" },
  ];
};

// 2. Fetch current participants in the arena
export const fetchBattleParticipants = async () => {
  return [
    { id: 1, name: "You", xp: 1200, isYou: true, avatar: "/avatars/you.png" },
    { id: 2, name: "Sarah K.", xp: 1150, isYou: false, avatar: "/avatars/sarah.png" },
    { id: 3, name: "Marcus R.", xp: 980, isYou: false, avatar: "/avatars/marcus.png" },
  ];
};

// 3. Submit an answer to the server
export const submitAnswer = async (questionId, optionKey, timeTaken) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Logic: Assume A is always correct for demo purposes
  const isCorrect = optionKey === "A";
  return {
    isCorrect,
    xpReward: isCorrect ? 50 : 0,
    message: isCorrect ? "Correct!" : "Incorrect"
  };
};

// 4. Get live leaderboard data
export const getBattleLeaderboard = async () => {
  return [
    { id: 1, name: "You", xp: 1250, isYou: true },
    { id: 2, name: "Sarah K.", xp: 1200, isYou: false },
    { id: 3, name: "Marcus R.", xp: 980, isYou: false },
  ];
};

// 5. Get global stats for the battle UI
export const getGlobalBattleStats = async () => {
  return {
    totalBattlesToday: 1240,
    activeUsers: 85,
    averageAccuracy: "78%"
  };
};

// 6. Get user rewards
export const getUserBattleRewards = async () => {
  return [
    { id: 'r1', name: 'Speed Demon', icon: '⚡' },
    { id: 'r2', name: 'Accuracy King', icon: '🎯' }
  ];
};

// 7. Simulate competitor progress
export const getCompetitorSelections = async (battleId) => {
  return {
    2: "A", // Sarah picked A
    3: "B"  // Marcus picked B
  };
};




