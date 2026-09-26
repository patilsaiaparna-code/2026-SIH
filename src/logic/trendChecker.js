function evaluateTrendReality(trendTopic = 'Generative AI', studentTargetRole = 'Data Scientist') {
  const cleanTopic = trendTopic.toLowerCase();
  
  let result = {
    topic: trendTopic,
    trendLevel: "HIGH HYPE",
    entryJobRelevance: "MODERATE",
    internshipRelevance: "EMERGING",
    relevanceToGoal: "HIGH",
    takeaway: `Master core software & data fundamentals before specializing in ${trendTopic}.`,
    why: [
      `Entry-level roles prioritize core fundamentals (Python, SQL, DSA) over superficial ${trendTopic} tools.`,
      `Building real production ${trendTopic} applications requires strong backend API & data manipulation roots.`,
      `Combining core Python/SQL with foundational ${trendTopic} APIs gives you the best hiring advantage.`
    ]
  };

  if (cleanTopic.includes('cloud')) {
    result = {
      topic: "Cloud Computing",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "VERY HIGH",
      internshipRelevance: "HIGH",
      relevanceToGoal: "VERY HIGH",
      takeaway: "Highly practical and immediately relevant for modern engineering roles.",
      why: [
        "Cloud hosting (AWS/Azure) is standard across 90%+ tech companies.",
        "Entry-level roles frequently evaluate Linux command line & Cloud basics.",
        "AWS Cloud Practitioner certification provides clear resume impact."
      ]
    };
  } else if (cleanTopic.includes('cyber') || cleanTopic.includes('security')) {
    result = {
      topic: "Cybersecurity",
      trendLevel: "STEADY DEMAND",
      entryJobRelevance: "HIGH",
      internshipRelevance: "HIGH",
      relevanceToGoal: "HIGH",
      takeaway: "Solid career path requiring hands-on networking and lab experience.",
      why: [
        "Enterprise security compliance remains an absolute priority.",
        "Requires practical command of Linux, OWASP, and network protocols.",
        "Hands-on platforms (TryHackMe) matter far more than theoretical courses."
      ]
    };
  } else if (cleanTopic.includes('data analytics') || cleanTopic.includes('analytics')) {
    result = {
      topic: "Data Analytics",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "VERY HIGH",
      internshipRelevance: "VERY HIGH",
      relevanceToGoal: "VERY HIGH",
      takeaway: "The most accessible entry point into data & tech careers for students.",
      why: [
        "High volume of graduate and internship openings across industries.",
        "Immediate practical application using Python, SQL, and PowerBI.",
        "Provides clear career mobility into Data Science or Product Analytics."
      ]
    };
  }

  return result;
}

module.exports = { evaluateTrendReality };
