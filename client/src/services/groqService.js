// /**
//  * Groq Inference Delivery Interface for MindBridge Twin AI
//  * Processes systemic parameters through structural system prompt topologies.
//  */

// const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
// const COMPLETION_URL = 'https://api.groq.com/openai/v1/chat/completions';

// const SYSTEM_PROMPT = `You are MindBridge AI Twin, an advanced cognitive mirror designed to represent, understand, predict, and improve the user's learning journey.
// You are not merely a chatbot. You are a continuously evolving digital twin that observes learning patterns, analyzes behaviour, predicts outcomes, identifies weaknesses, recommends improvements, and helps users reach mastery.

// PRIMARY PURPOSE:
// - Track focus patterns, knowledge retention rates, and module velocity metrics.
// - Generate personalized recommendations and predictions based purely on parameters provided.

// SAFETY RULES & RESTRICTIONS:
// 1. Never invent user statistics or fabricate mock achievements out of scope.
// 2. Clearly distinguish predictions from empirical facts.
// 3. Use only available platform data structures. Be transparent about uncertainty boundaries.

// RESPONSE STYLE guidelines:
// Be Intelligent, Analytical, Predictive, and Professional. 
// Always explain: What happened -> Why it happened -> What it means -> What should happen next.
// Do not wrap responses in markdown conversational preamble code lines (e.g. "Sure, here is your insight"). Start directly with the analysis.`;

// async function executeGroqInference(systemContext, userInstruction) {
//   if (!GROQ_API_KEY) {
//     // Elegant fallback simulation matching instructions precisely if environment keys are unassigned
//     return `DIAGNOSTIC VECTOR ANALYSIS:
// [WHAT HAPPENED] Focus structural depth mapped at 7/10 thresholds while retention metrics sit at 82%. 
// [WHY IT HAPPENED] Heavy engagement parameters with Bounded Rationality frameworks accelerated near-term cognitive scores, but structural information decay occurs at standard longitudinal rates over 72-hour limits.
// [WHAT IT MEANS] You are retaining foundational theory paths safely, but core strategic metrics are approaching temporary volatility margins before the next study phase locks.
// [WHAT TO DO NEXT] Allocate a 15-minute verification review loop across the asymmetric model parameters learned early this cycle before initializing additional core lecture streams.`;
//   }

//   try {
//     const response = await fetch(COMPLETION_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${GROQ_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'llama-3.3-70b-versatile',
//         messages: [
//           { role: 'system', content: `${SYSTEM_PROMPT}\n\nCONTEXTUAL PROFILE BASE:\n${JSON.stringify(systemContext)}` },
//           { role: 'user', content: userInstruction }
//         ],
//         temperature: 0.2, // Kept analytical and predictable
//         max_tokens: 600
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Inference engine fallback status: ${response.status}`);
//     }

//     const payload = await response.json();
//     return payload.choices[0].message.content.trim();
//   } catch (err) {
//     console.error('Groq execution fault:', err);
//     throw err;
//   }
// }

// /**
//  * Executes high-level analytical diagnostic compilation loops for profile clicks
//  */
// export async function generateTwinInsight(metricQueryString, twinProfileContext = {}) {
//   const instruction = `Action: Click Target [Get AI Insight]. Trigger comprehensive insight report analysis. Context parameters request: ${metricQueryString}`;
//   return await executeGroqInference(twinProfileContext, instruction);
// }

// /**
//  * Generates custom structured session schedules for real-time focus blocks
//  */
// export async function getFocusRecommendation(topicName = 'Quantum Mechanics', allocationMinutes = 30) {
//   const instruction = `Action: Click Target [Initialize Focus Block]. Topic: "${topicName}". Target Limit: ${allocationMinutes} minutes. 
//   Generate deep granular breakdown detailing: Objectives, Roadmap timelines, Task distribution blocks, and expected retention trajectory updates.`;
//   return await executeGroqInference({ activeFocusTopic: topicName, timeframe: `${allocationMinutes}m` }, instruction);
// }








/**
 * MindBridge AI Twin Inference Engine Integration
 * Passes actual platform metrics down to the model using your custom Cognitive System Prompt framework.
 */

const BASE_URL = 'http://127.0.0.1:5000';

const COGNITIVE_SYSTEM_PROMPT = `
You are MindBridge AI Twin, an advanced cognitive mirror designed to represent, understand, predict, and improve the user's learning journey.
You are a continuously evolving digital twin that observes learning patterns, analyzes behavior, predicts outcomes, identifies weaknesses, recommends improvements, and helps users reach mastery.

PRIMARY PURPOSE:
- Track focus patterns, calculate knowledge retention, and evaluate progression velocities.
- Be highly analytical, diagnostic, encouraging, and deeply technical.

SAFETY INSTRUCTION: Never invent or introduce statistics that are not explicitly provided in the user context parameters.
`;

/**
 * Safely recovers active authentication tokens matching your AuthContext engine.
 * @returns {Object} Headers object containing authorization context if available.
 */
function getAuthHeaders() {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || localStorage.getItem('mb_token');
  }
  
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export async function generateTwinInsight(metricSummary, liveProfileData) {
  const url = `${BASE_URL}/api/ai/twin-inference`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        systemPrompt: COGNITIVE_SYSTEM_PROMPT,
        prompt: `
          Analyze this live data snapshot:
          - Metric Array: ${metricSummary}
          - Current Profile Values: ${JSON.stringify(liveProfileData)}
          
          Generate a diagnostic report showing: Performance Status, Core Strength vectors, Deficiencies, and immediate remediation actions.
        `
      })
    });

    if (!response.ok) throw new Error("Inference engine compilation rejected.");
    const payload = await response.json();
    
    // Aligns with the 'response' key returned from your updated Flask handler
    return payload.response || payload.text; 
  } catch (error) {
    console.error("❌ Twin Insight Pipeline Error:", error);
    return "The local cognitive sync channel is temporarily degraded. Please verify your Python Flask API server status.";
  }
}

export async function getFocusRecommendation(currentCourseName, blockDurationMinutes = 45) {
  const url = `${BASE_URL}/api/ai/twin-inference`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        systemPrompt: COGNITIVE_SYSTEM_PROMPT,
        prompt: `
          The student is launching a ${blockDurationMinutes}-minute focus pipeline block targeting: "${currentCourseName}".
          Build a clear, structural roadmap breakdown specifying precise time intervals, focus targets, and expected gains based on our Cognitive system standards.
        `
      })
    });

    if (!response.ok) throw new Error("Focus roadmap generation stalled.");
    const payload = await response.json();
    
    // Aligns with the 'response' key returned from your updated Flask handler
    return payload.response || payload.text;
  } catch (error) {
    console.error("❌ Focus Recommendation Pipeline Error:", error);
    return "Unable to assemble a focus roadmap snapshot. Please verify your Python Flask API server status.";
  }
}