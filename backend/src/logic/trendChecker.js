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
  } else if (cleanTopic.includes('embedded') || cleanTopic.includes('iot')) {
    result = {
      topic: "Embedded Systems & IoT",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "VERY HIGH",
      internshipRelevance: "HIGH",
      relevanceToGoal: "VERY HIGH",
      takeaway: "Essential hardware-software bridge for ECE, Mechanical, and EEE engineers.",
      why: [
        "High volume of openings across automotive ECU, consumer electronics, and medical devices.",
        "Requires mastery of Embedded C, microcontroller registers, and hardware protocols (I2C/SPI).",
        "Direct progression into Firmware Engineering, IoT Architecture, and Automotive Tech."
      ]
    };
  } else if (cleanTopic.includes('vlsi') || cleanTopic.includes('semiconductor')) {
    result = {
      topic: "Semiconductors & VLSI",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "HIGH",
      internshipRelevance: "VERY HIGH",
      relevanceToGoal: "VERY HIGH",
      takeaway: "Critical domain for ECE & Microelectronics students with massive global investment.",
      why: [
        "Silicon fabs require digital logic design, Verilog HDL, and static timing analysis.",
        "Edge AI acceleration and chiplet architectures drive high starting stipends.",
        "Requires solid grounding in Digital Electronics and Verilog simulation."
      ]
    };
  } else if (cleanTopic.includes('ev') || cleanTopic.includes('powertrain') || cleanTopic.includes('renewable')) {
    result = {
      topic: "EV Powertrains & Renewable Energy",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "VERY HIGH",
      internshipRelevance: "HIGH",
      relevanceToGoal: "VERY HIGH",
      takeaway: "Rapidly expanding market for EEE & Mechanical engineers in automotive electrification.",
      why: [
        "Battery Management Systems (BMS) and DC-DC converter modeling in Simulink are core requirements.",
        "High volume of openings in electric vehicle OEMs and green energy grids.",
        "Direct application of power electronics, motors, and control theory."
      ]
    };
  } else if (cleanTopic.includes('robot') || cleanTopic.includes('automation') || cleanTopic.includes('cad')) {
    result = {
      topic: "Robotics & Industrial Automation",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "HIGH",
      internshipRelevance: "HIGH",
      relevanceToGoal: "HIGH",
      takeaway: "Core Industry 4.0 discipline combining CAD modeling, PLC/SCADA, and kinematics control.",
      why: [
        "Factories mandate automated assembly lines powered by PLCs, ROS, and industrial robots.",
        "Requires hands-on CAD drafting (SolidWorks), pneumatic actuators, and ladder logic.",
        "High demand across automotive manufacturing and smart logistics."
      ]
    };
  } else if (cleanTopic.includes('bim') || cleanTopic.includes('structure') || cleanTopic.includes('civil')) {
    result = {
      topic: "Smart Infrastructure & BIM",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "HIGH",
      internshipRelevance: "VERY HIGH",
      relevanceToGoal: "VERY HIGH",
      takeaway: "Digital transformation standard for Civil Engineering structural design.",
      why: [
        "3D building modeling in Revit and structural verification in ETABS are mandatory.",
        "Government infrastructure projects mandate 5D BIM compliance.",
        "High demand for structural design engineers and quantity estimation specialists."
      ]
    };
  } else if (cleanTopic.includes('bio') || cleanTopic.includes('genom')) {
    result = {
      topic: "Bioinformatics & Genomic Data",
      trendLevel: "HIGH DEMAND",
      entryJobRelevance: "HIGH",
      internshipRelevance: "HIGH",
      relevanceToGoal: "HIGH",
      takeaway: "Drives computational drug discovery, gene sequencing, and personalized healthcare.",
      why: [
        "High demand for Python/R scripts analyzing genomic sequence alignment algorithms.",
        "Bridges molecular biology research with scalable cloud data pipelines.",
        "Persistent hiring in pharmaceutical R&D and genomic diagnostic labs."
      ]
    };
  }

  return result;
}

module.exports = { evaluateTrendReality };
