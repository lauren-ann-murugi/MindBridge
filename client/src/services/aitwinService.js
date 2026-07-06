// /**
//  * MindBridge AI Twin System State Management Engine
//  * Implements local persistence, state mutation, and metric derivation loops.
//  */

// const TWIN_STORAGE_KEY = 'mindbridge_twin_state';

// const INITIAL_TWIN_STATE = {
//   profile: {
//     focusDepth: 7, // Scale 1-10
//     retention: 82, // Percentage
//     learningStyle: 'Visual/Practical Sandbox',
//     bestFocusWindow: '19:00 - 21:00',
//     currentStreak: 5,
//     hoursStudiedThisWeek: 14.5,
//     weakTopics: ['Asymmetric Information Equilibrium', 'Python Async Decorators'],
//     strongTopics: ['Bounded Rationality Frameworks', 'Tailwind Layout Architectures']
//   },
//   retentionWave: {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       { label: 'Projected Decay', data: [90, 87, 84, 82, 79, 75, 71], color: 'rgba(255,255,255,0.2)' },
//       { label: 'Actual Active Retention', data: [92, 91, 89, 88, 87, 85, 82], color: '#fff' }
//     ]
//   },
//   masteryFlow: {
//     courseName: 'Masterclass: Behavioral Economic Modeling',
//     completionPercentage: 40,
//     knowledgeDepth: 'Skilled', // Beginner, Learner, Skilled, Advanced, Master
//     predictedDaysToMastery: 8,
//     velocityVector: '+14% progress / week'
//   },
//   neuralLogs: [
//     {
//       id: 'log-1',
//       title: 'Phase 1 Milestone Validated',
//       description: 'Completed framework tracking for Bounded Rationality benchmarks cleanly.',
//       timestamp: '2 hours ago',
//       importance: 'HIGH',
//       impactScore: '+12% Knowledge Depth'
//     },
//     {
//       id: 'log-2',
//       title: 'Study Battle Arena Engagement',
//       description: 'Participated in interactive predictive modeling session protocol with peer nodes.',
//       timestamp: 'Yesterday',
//       importance: 'MEDIUM',
//       impactScore: '+7% Retention Surge'
//     },
//     {
//       id: 'log-3',
//       title: 'System Profile Initialization',
//       description: 'Cognitive Mirror synced sequence architecture matrices successfully.',
//       timestamp: '3 days ago',
//       importance: 'LOW',
//       impactScore: 'System Reference Bound'
//     }
//   ],
//   trophies: [
//     { id: 't1', name: 'Knowledge Architect', description: 'Complete Phase 1 architecture frameworks fully.', achieved: true, icon: '🏆' },
//     { id: 't2', name: 'Focus Master', description: 'Maintain focus depth index above 8 for 3 consecutive hours.', achieved: true, icon: '⚡' },
//     { id: 't3', name: 'Retention Champion', description: 'Keep structural knowledge retention above 80% for a weekly horizon.', achieved: true, icon: '🛡️' },
//     { id: 't4', name: 'Quiz Conqueror', description: 'Secure absolute correct vector paths within real-time study battles.', achieved: false, icon: '⚔️' },
//   ]
// };

// // Helper to hydrate state from local database instance safely
// function getStoredState() {
//   if (typeof window === 'undefined') return INITIAL_TWIN_STATE;
//   const stored = localStorage.getItem(TWIN_STORAGE_KEY);
//   if (!stored) {
//     localStorage.setItem(TWIN_STORAGE_KEY, JSON.stringify(INITIAL_TWIN_STATE));
//     return INITIAL_TWIN_STATE;
//   }
//   return JSON.parse(stored);
// }

// function saveState(state) {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem(TWIN_STORAGE_KEY, JSON.stringify(state));
//   }
// }

// export async function getTwinProfile() {
//   const state = getStoredState();
//   return state.profile;
// }

// export async function getRetentionWave() {
//   const state = getStoredState();
//   return state.retentionWave;
// }

// export async function getMasteryFlow() {
//   const state = getStoredState();
//   return state.masteryFlow;
// }

// export async function getNeuralLogs() {
//   const state = getStoredState();
//   return state.neuralLogs;
// }

// export async function getTrophies() {
//   const state = getStoredState();
//   return state.trophies;
// }

// export async function syncTwinNow() {
//   const state = getStoredState();
  
//   // Real arithmetic mutation updates over time to verify framework dynamics
//   state.profile.focusDepth = Math.min(10, state.profile.focusDepth + 1);
//   state.profile.hoursStudiedThisWeek = +(state.profile.hoursStudiedThisWeek + 1.2).toFixed(1);
  
//   // Append a fresh verification block entry to tracking logs
//   const newLog = {
//     id: `log-${Date.now()}`,
//     title: 'Twin Pipeline Re-alignment Sync',
//     description: 'Manual verification triggers executed. Context data nodes aggregated clean.',
//     timestamp: 'Just now',
//     importance: 'MEDIUM',
//     impactScore: 'Metrics Recalibrated'
//   };
  
//   state.neuralLogs.unshift(newLog);
//   saveState(state);
  
//   return { success: true, timestamp: new Date().toISOString(), updatedProfile: state.profile };
// }








// /**
//  * MindBridge AI Twin Core Data Aggregation Service
//  * Pulls real data from platform endpoints for courses, battles, and library uploads.
//  */

// // Aggregates real platform data to compute your live cognitive twin profile
// export async function getTwinProfile() {
//   try {
//     // Fetch live courses, history, and profile metrics in parallel
//     const [coursesRes, profileRes] = await Promise.all([
//       fetch('/api/student/courses'),
//       fetch('/api/student/profile-stats')
//     ]);

//     if (!coursesRes.ok || !profileRes.ok) throw new Error("Telemetry sync failed");

//     const courses = await coursesRes.json();
//     const stats = await profileRes.json();

//     // Dynamically calculate strengths and weaknesses from real data
//     const strongTopics = courses.filter(c => c.quizAverage >= 80).map(c => c.topic);
//     const weakTopics = courses.filter(c => c.quizAverage < 65).map(c => c.topic);

//     return {
//       learningStyle: stats.preferredStyle || "Visual/Practical Sandbox",
//       bestFocusWindow: stats.peakFocusHours || "19:00 - 21:00",
//       strongTopics: strongTopics.slice(0, 2),
//       weakTopics: weakTopics.slice(0, 2),
//       focusDepth: stats.currentFocusDepth || 7,
//       retention: stats.aggregateRetentionRate || 80,
//       currentStreak: stats.loginStreak || 1,
//       hoursStudiedThisWeek: stats.weeklyStudyHours || 0
//     };
//   } catch (error) {
//     console.error("Failed to compile profile metrics:", error);
//     return null;
//   }
// }

// // Generates live weekly metrics based on actual retention calculations
// export async function getRetentionWave() {
//   try {
//     const res = await fetch('/api/student/retention-logs');
//     if (!res.ok) throw new Error("Retention analytics unavailable");
    
//     const logs = await res.json(); // Expected format: { days: [...], projected: [...], active: [...] }
//     return {
//       labels: logs.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       datasets: [
//         { label: "Projected Decay", data: logs.projected || [100, 90, 85, 80, 75, 70, 65] },
//         { label: "Actual Active Retention", data: logs.active || [100, 95, 92, 89, 88, 86, 82] }
//       ]
//     };
//   } catch (error) {
//     console.error("Retention matrix gather failed:", error);
//     return null;
//   }
// }

// // Queries the course currently being tracked to display your true progress trajectory
// export async function getMasteryFlow() {
//   try {
//     const res = await fetch('/api/student/courses/active');
//     if (!res.ok) throw new Error("Active horizon route failed");
    
//     const activeTrack = await res.json();
    
//     let depthClassification = "Beginner";
//     if (activeTrack.progress >= 80) depthClassification = "Master";
//     else if (activeTrack.progress >= 60) depthClassification = "Advanced";
//     else if (activeTrack.progress >= 35) depthClassification = "Skilled";
//     else if (activeTrack.progress >= 15) depthClassification = "Learner";

//     return {
//       courseName: activeTrack.title || "No Active Course Selected",
//       knowledgeDepth: depthClassification,
//       velocityVector: `+${activeTrack.weeklyDelta || 0}% progress / week`,
//       predictedDaysToMastery: activeTrack.daysRemainingEstimation || "---",
//       completionPercentage: activeTrack.progress || 0
//     };
//   } catch (error) {
//     console.error("Mastery mapping tracking failure:", error);
//     return null;
//   }
// }

// // Aggregates real system actions (Library additions, Battles, or Course signups) into the timeline
// export async function getNeuralLogs() {
//   try {
//     const [battlesRes, libraryRes, systemRes] = await Promise.all([
//       fetch('/api/student/study-battles/recent'),
//       fetch('/api/student/library/recent'),
//       fetch('/api/student/system-logs')
//     ]);

//     const logs = [];

//     if (battlesRes.ok) {
//       const battles = await battlesRes.json();
//       battles.forEach(battle => {
//         logs.push({
//           id: `battle-${battle.id}`,
//           icon: "⚔️",
//           title: "Study Battle Arena Engagement",
//           importance: battle.score > 75 ? "HIGH" : "MEDIUM",
//           timestamp: battle.timeRelative || "Recently",
//           description: `Participated in interactive session against peer nodes for ${battle.subject}.`,
//           impactScore: `+${battle.retentionGain || 5}% Retention Surge`
//         });
//       });
//     }

//     if (libraryRes.ok) {
//       const uploads = await libraryRes.json();
//       uploads.forEach(file => {
//         logs.push({
//           id: `file-${file.id}`,
//           icon: "📁",
//           title: "Library Resource Ingestion",
//           importance: "LOW",
//           timestamp: file.uploadedAtRelative || "Recently",
//           description: `Successfully uploaded context reference manifest: "${file.name}".`,
//           impactScore: "Context Reference Bound"
//         });
//       });
//     }

//     // Fallback order compilation by date
//     return logs.sort((a, b) => b.id.localeCompare(a.id));
//   } catch (error) {
//     console.error("Failed compiling stream logs:", error);
//     return [];
//   }
// }

// // Loads verified achievements directly from your student rewards profile
// export async function getTrophies() {
//   try {
//     const res = await fetch('/api/student/achievements');
//     if (!res.ok) throw new Error("Vault fetch failed");
//     return await res.json(); 
//     // Expecting array: [{ id: 1, icon: "🏆", name: "Focus Master", description: "...", achieved: true }]
//   } catch (error) {
//     console.error("Trophy mapping retrieval aborted:", error);
//     return [];
//   }
// }

// // Calls your telemetry synchronization execution controller on the backend
// export async function syncTwinNow() {
//   const syncResponse = await fetch('/api/student/twin/sync', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//   });
//   return syncResponse.ok;
// }





/**
 * MindBridge AI Twin Core Data Aggregation Service
 * Pulls real authenticated data directly from your Flask backend.
 */

// Targeted port matches your backend run.py configuration exactly
const BASE_URL = 'http://127.0.0.1:5000';

/**
 * Resolves authentication tokens directly from local storage context.
 * Patched to read the verified 'mb_token' namespace.
 */
function getAuthHeaders() {
  if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
  
  // Reading key identifier mapped out from browser context
  let token = localStorage.getItem('mb_token'); 
  
  // Telemetry logger outputs directly to your browser inspector tab
  console.log("🔍 AI Twin Sync Token State:", token ? "Token Found & Injected" : "Token Missing (Triggers 401)");

  if (!token) {
    return { 'Content-Type': 'application/json' };
  }

  // Strip unintended wrapped double-quotes if strings are stringified during registration
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Aggregates real platform data to compute your live cognitive twin profile
export async function getTwinProfile() {
  try {
    const headers = getAuthHeaders();
    
    const [coursesRes, profileRes] = await Promise.all([
      fetch(`${BASE_URL}/api/student/courses`, { headers }),
      fetch(`${BASE_URL}/api/student/profile-stats`, { headers })
    ]);

    if (!coursesRes.ok || !profileRes.ok) {
      throw new Error(`Telemetry sync failed. Status: Courses(${coursesRes.status}), Profile(${profileRes.status})`);
    }

    const courses = await coursesRes.json();
    const stats = await profileRes.json();

    const strongTopics = Array.isArray(courses) ? courses.filter(c => c.quizAverage >= 80).map(c => c.topic) : [];
    const weakTopics = Array.isArray(courses) ? courses.filter(c => c.quizAverage < 65).map(c => c.topic) : [];

    return {
      learningStyle: stats.preferredStyle || "Visual/Practical Sandbox",
      bestFocusWindow: stats.peakFocusHours || "19:00 - 21:00",
      strongTopics: strongTopics.slice(0, 2),
      weakTopics: weakTopics.slice(0, 2),
      focusDepth: stats.currentFocusDepth || 7,
      retention: stats.aggregateRetentionRate || 80,
      currentStreak: stats.loginStreak || 1,
      hoursStudiedThisWeek: stats.weeklyStudyHours || 0
    };
  } catch (error) {
    console.error("Failed to compile profile metrics:", error);
    return null;
  }
}

// Generates live weekly metrics based on actual retention calculations
export async function getRetentionWave() {
  try {
    const res = await fetch(`${BASE_URL}/api/student/retention-logs`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Retention analytics unavailable. Status: ${res.status}`);
    
    const logs = await res.json();
    return {
      labels: logs.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        { label: "Projected Decay", data: logs.projected || [100, 90, 85, 80, 75, 70, 65] },
        { label: "Actual Active Retention", data: logs.active || [100, 95, 92, 89, 88, 86, 82] }
      ]
    };
  } catch (error) {
    console.error("Retention matrix gather failed:", error);
    return null;
  }
}

// Queries the course currently being tracked to display your true progress trajectory
export async function getMasteryFlow() {
  try {
    const res = await fetch(`${BASE_URL}/api/student/courses/active`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Active horizon route failed. Status: ${res.status}`);
    
    const activeTrack = await res.json();
    
    let depthClassification = "Beginner";
    if (activeTrack.completionPercentage >= 80) depthClassification = "Master";
    else if (activeTrack.completionPercentage >= 60) depthClassification = "Advanced";
    else if (activeTrack.completionPercentage >= 35) depthClassification = "Skilled";
    else if (activeTrack.completionPercentage >= 15) depthClassification = "Learner";

    return {
      courseName: activeTrack.courseName || "No Active Course Selected",
      knowledgeDepth: activeTrack.knowledgeDepth || depthClassification,
      velocityVector: activeTrack.velocityVector || `+0% progress / week`,
      predictedDaysToMastery: activeTrack.predictedDaysToMastery || "---",
      completionPercentage: activeTrack.completionPercentage || 0
    };
  } catch (error) {
    console.error("Mastery mapping tracking failure:", error);
    return null;
  }
}

// Aggregates real system actions into the timeline
export async function getNeuralLogs() {
  try {
    const res = await fetch(`${BASE_URL}/api/student/system-logs`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`System log timeline sync failed. Status: ${res.status}`);
    
    const logs = await res.json();
    if (!Array.isArray(logs)) return [];

    return logs.sort((a, b) => b.id.localeCompare(a.id));
  } catch (error) {
    console.error("Failed compiling stream logs:", error);
    return [];
  }
}

// Loads verified achievements directly from your student rewards profile
export async function getTrophies() {
  try {
    const res = await fetch(`${BASE_URL}/api/student/achievements`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Vault fetch failed. Status: ${res.status}`);
    return await res.json(); 
  } catch (error) {
    console.error("Trophy mapping retrieval aborted:", error);
    return [];
  }
}

// Calls your telemetry synchronization execution controller on the backend
export async function syncTwinNow() {
  try {
    const syncResponse = await fetch(`${BASE_URL}/api/student/twin/sync`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return syncResponse.ok;
  } catch (error) {
    console.error("Sync telemetry sequence structural crash:", error);
    return false;
  }
}