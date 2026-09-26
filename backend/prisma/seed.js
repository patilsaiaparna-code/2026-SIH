let PrismaClient;
try {
  PrismaClient = require('@prisma/client').PrismaClient;
} catch (e) {
  PrismaClient = null;
}
const prisma = PrismaClient ? new PrismaClient() : null;


const seedData = {
  careerRoles: [
    { name: "Data Scientist", title: "Data Scientist", category: "Data & AI", description: "Extract insights from structured & unstructured data using ML & statistics", averageSalary: "₹12 - ₹24 LPA", demandLevel: "HIGH", growthRate: "28%" },
    { name: "Data Analyst", title: "Data Analyst", category: "Data & AI", description: "Transform data into actionable business insights with SQL, Python, & BI tools", averageSalary: "₹6 - ₹12 LPA", demandLevel: "HIGH", growthRate: "22%" },
    { name: "Software Development Engineer (SDE)", title: "Software Development Engineer (SDE)", category: "Software Development", description: "Design, build, and deploy high-performance software applications", averageSalary: "₹10 - ₹22 LPA", demandLevel: "VERY HIGH", growthRate: "25%" },
    { name: "Cloud Engineer", title: "Cloud Engineer", category: "Cloud & Infrastructure", description: "Architect and manage secure cloud infrastructure on AWS/Azure/GCP", averageSalary: "₹8 - ₹18 LPA", demandLevel: "HIGH", growthRate: "30%" },
    { name: "DevOps Engineer", title: "DevOps Engineer", category: "Cloud & Infrastructure", description: "Automate CI/CD pipelines, container orchestration, and system reliability", averageSalary: "₹9 - ₹20 LPA", demandLevel: "HIGH", growthRate: "27%" },
    { name: "Frontend Developer", title: "Frontend Developer", category: "Web Development", description: "Build interactive, accessible, and responsive user interfaces", averageSalary: "₹6 - ₹14 LPA", demandLevel: "HIGH", growthRate: "20%" },
    { name: "Machine Learning Engineer", title: "Machine Learning Engineer", category: "Data & AI", description: "Develop and deploy scalable ML models and GenAI workflows into production", averageSalary: "₹14 - ₹28 LPA", demandLevel: "HIGH", growthRate: "35%" },
    { name: "Cybersecurity Analyst", title: "Cybersecurity Analyst", category: "Security", description: "Protect networks, systems, and applications from cyber threats and vulnerabilities", averageSalary: "₹7 - ₹16 LPA", demandLevel: "HIGH", growthRate: "26%" },
    { name: "Backend Developer", title: "Backend Developer", category: "Web Development", description: "Develop scalable server-side APIs, database schemas, and service architectures", averageSalary: "₹7 - ₹16 LPA", demandLevel: "HIGH", growthRate: "24%" },
    { name: "Full Stack Developer", title: "Full Stack Developer", category: "Web Development", description: "End-to-end development of web interfaces, backend servers, and databases", averageSalary: "₹8 - ₹18 LPA", demandLevel: "HIGH", growthRate: "25%" }
  ],

  skills: [
    { name: "Python", category: "Programming", description: "Core programming language for Data Science, Automation, & Backend", importance: "CRITICAL", demandBadge: "HIGH DEMAND", whyItMatters: "Python is the foundational language for Data Science, Machine Learning, and backend scripting across 80%+ of tech enterprises." },
    { name: "SQL", category: "Data", description: "Relational database querying, optimization, and data extraction", importance: "CRITICAL", demandBadge: "HIGH DEMAND", whyItMatters: "Every software and data job requires SQL to query production databases efficiently." },
    { name: "Machine Learning", category: "Data & AI", description: "Supervised & unsupervised algorithms, regression, classification, and neural nets", importance: "HIGH", demandBadge: "HIGH DEMAND", whyItMatters: "Powers intelligent decision-making, recommendation systems, and predictive modeling." },
    { name: "Data Visualization", category: "Data", description: "Communicating analytics via Tableau, PowerBI, Matplotlib, & Seaborn", importance: "HIGH", demandBadge: "STEADY", whyItMatters: "Translates complex datasets into clear executive dashboards and decision metrics." },
    { name: "Git & GitHub", category: "Engineering Fundamentals", description: "Version control, branching strategies, and open-source collaboration", importance: "CRITICAL", demandBadge: "HIGH DEMAND", whyItMatters: "Universal prerequisite for all engineering roles to manage codebase history and team pull requests." },
    { name: "Data Structures & Algorithms (DSA)", category: "Engineering Fundamentals", description: "Problem solving, time complexity, trees, graphs, and dynamic programming", importance: "CRITICAL", demandBadge: "HIGH DEMAND", whyItMatters: "Core benchmark evaluated in standard tech hiring assessments and system architecture interviews." },
    { name: "React", category: "Web Development", description: "Declarative, component-based UI library for web applications", importance: "HIGH", demandBadge: "HIGH DEMAND", whyItMatters: "Dominant frontend framework powering modern interactive web applications." },
    { name: "Node.js", category: "Web Development", description: "Event-driven JavaScript runtime for scalable backend services", importance: "HIGH", demandBadge: "HIGH DEMAND", whyItMatters: "Enables full-stack JavaScript development and rapid asynchronous microservice APIs." },
    { name: "AWS", category: "Cloud", description: "Amazon Web Services cloud infrastructure, EC2, S3, Lambda, & IAM", importance: "HIGH", demandBadge: "GROWING", whyItMatters: "Market leader in cloud provider services for hosting scalable modern applications." },
    { name: "Docker & Kubernetes", category: "DevOps", description: "Application containerization and microservice orchestration", importance: "HIGH", demandBadge: "GROWING", whyItMatters: "Industry standard for packaging microservices and automating cloud deployment." },
    { name: "Generative AI & LLMs", category: "Data & AI", description: "Prompt engineering, LangChain, RAG architecture, and fine-tuning", importance: "MEDIUM", demandBadge: "GROWING", whyItMatters: "Accelerates modern application capabilities with natural language AI interfaces." },
    { name: "Cybersecurity Fundamentals", category: "Security", description: "Network security, OWASP Top 10, encryption, and threat modeling", importance: "HIGH", demandBadge: "HIGH DEMAND", whyItMatters: "Essential for safeguarding enterprise assets against unauthorized access." }
  ],

  courses: [
    { title: "Python for Everybody Specialization", platform: "Coursera", isFree: true, hasCertificate: true, price: "Free Audit", url: "https://www.coursera.org/specializations/python", level: "Beginner", duration: "4 Weeks", skillName: "Python", learnerCount: 1500000, learnerCountLabel: "learners enrolled", learnerCountSource: "Coursera", learnerCountSourceUrl: "https://www.coursera.org/specializations/python", learnerCountVerifiedAt: "2026-09-26" },
    { title: "Kaggle Python Course", platform: "Kaggle Learn", isFree: true, hasCertificate: true, price: "Free", url: "https://www.kaggle.com/learn/python", level: "Beginner", duration: "5 Hours", skillName: "Python", learnerCount: 1200000, learnerCountLabel: "learners enrolled", learnerCountSource: "Kaggle", learnerCountSourceUrl: "https://www.kaggle.com/learn/python", learnerCountVerifiedAt: "2026-09-26" },
    { title: "Kaggle SQL Intro & Advanced", platform: "Kaggle Learn", isFree: true, hasCertificate: true, price: "Free", url: "https://www.kaggle.com/learn/intro-to-sql", level: "Beginner", duration: "6 Hours", skillName: "SQL", learnerCount: 950000, learnerCountLabel: "learners enrolled", learnerCountSource: "Kaggle", learnerCountSourceUrl: "https://www.kaggle.com/learn/intro-to-sql", learnerCountVerifiedAt: "2026-09-26" },
    { title: "NPTEL Data Science for Engineers", platform: "NPTEL", isFree: true, hasCertificate: true, price: "Free", url: "https://nptel.ac.in/courses/106106212", level: "Intermediate", duration: "8 Weeks", skillName: "Machine Learning", learnerCount: 73491, learnerCountLabel: "learners enrolled", learnerCountSource: "NPTEL", learnerCountSourceUrl: "https://nptel.ac.in/courses/106106212", learnerCountVerifiedAt: "2026-09-26" },
    { title: "Machine Learning Specialization by Andrew Ng", platform: "Coursera", isFree: true, hasCertificate: true, price: "Free Audit", url: "https://www.coursera.org/specializations/machine-learning-introduction", level: "Intermediate", duration: "6 Weeks", skillName: "Machine Learning", learnerCount: 5000000, learnerCountLabel: "learners enrolled", learnerCountSource: "Coursera", learnerCountSourceUrl: "https://www.coursera.org/specializations/machine-learning-introduction", learnerCountVerifiedAt: "2026-09-26" },
    { title: "freeCodeCamp Relational Database & SQL", platform: "freeCodeCamp", isFree: true, hasCertificate: true, price: "Free", url: "https://www.freecodecamp.org/learn/relational-database/", level: "Beginner", duration: "30 Hours", skillName: "SQL", learnerCount: 300000, learnerCountLabel: "learners completed", learnerCountSource: "freeCodeCamp", learnerCountSourceUrl: "https://www.freecodecamp.org/learn/relational-database/", learnerCountVerifiedAt: "2026-09-26" },
    { title: "AWS Cloud Practitioner Essentials", platform: "AWS Training", isFree: true, hasCertificate: true, price: "Free", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", level: "Beginner", duration: "6 Hours", skillName: "AWS", learnerCount: 500000, learnerCountLabel: "learners enrolled", learnerCountSource: "AWS Skill Builder", learnerCountSourceUrl: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", learnerCountVerifiedAt: "2026-09-26" },
    { title: "freeCodeCamp React Course for Beginners", platform: "freeCodeCamp", isFree: true, hasCertificate: true, price: "Free", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/", level: "Intermediate", duration: "12 Hours", skillName: "React", learnerCount: 450000, learnerCountLabel: "learners completed", learnerCountSource: "freeCodeCamp", learnerCountSourceUrl: "https://www.freecodecamp.org/learn/front-end-development-libraries/", learnerCountVerifiedAt: "2026-09-26" }
  ],

  projects: [
    { title: "Customer Churn Prediction Model", description: "Build an end-to-end ML pipeline in Python using scikit-learn & pandas to predict customer attrition.", difficulty: "Intermediate", estimatedHours: 20, skillsUsed: ["Python", "Machine Learning", "SQL", "Data Visualization"], repoUrl: "https://github.com/topics/customer-churn-prediction" },
    { title: "E-Commerce Analytics Dashboard", description: "Extract SQL transactional data and build interactive Tableau/PowerBI visual dashboards.", difficulty: "Beginner", estimatedHours: 12, skillsUsed: ["SQL", "Data Visualization", "Python"], repoUrl: "https://github.com/topics/ecommerce-analytics" },
    { title: "Full-Stack Task Management API & UI", description: "Build a responsive React interface with Node.js Express REST API and MongoDB/PostgreSQL.", difficulty: "Intermediate", estimatedHours: 25, skillsUsed: ["React", "Node.js", "Git & GitHub", "SQL"], repoUrl: "https://github.com/topics/task-management-app" },
    { title: "AWS Automated Serverless Data Pipeline", description: "Set up AWS Lambda, S3, and DynamoDB using Terraform for event-driven data processing.", difficulty: "Advanced", estimatedHours: 30, skillsUsed: ["AWS", "Python", "Git & GitHub"], repoUrl: "https://github.com/topics/serverless-pipeline" }
  ],

  internships: [
    { title: "Data Analyst Intern", company: "Analytica Insights", location: "Bengaluru, India", isRemote: true, stipend: "₹20,000 / month", requiredSkills: ["Python", "SQL", "Data Visualization"], eligibility: "2nd & 3rd Year B.Tech / BE", applyUrl: "https://careers.google.com", source: "Company Portal" },
    { title: "Software Engineering Intern", company: "TechScale Innovations", location: "Hyderabad, India", isRemote: false, stipend: "₹35,000 / month", requiredSkills: ["Python", "Data Structures & Algorithms (DSA)", "Git & GitHub"], eligibility: "3rd & 4th Year B.Tech", applyUrl: "https://microsoft.com/careers", source: "Verified Portal" },
    { title: "Frontend Developer Intern", company: "WebStudio Labs", location: "Remote", isRemote: true, stipend: "₹18,000 / month", requiredSkills: ["React", "Git & GitHub", "JavaScript"], eligibility: "Open to All Engineering Years", applyUrl: "https://joinrise.co", source: "JoinRise Portal" },
    { title: "Cloud & DevOps Intern", company: "CloudSphere Systems", location: "Pune, India", isRemote: false, stipend: "₹25,000 / month", requiredSkills: ["AWS", "Git & GitHub", "Python"], eligibility: "3rd & 4th Year Engineering Students", applyUrl: "https://arbeitnow.com", source: "Arbeitnow Portal" }
  ],

  jobs: [
    { title: "Junior Data Scientist", company: "Fractal Analytics", location: "Bengaluru, India", isRemote: false, salary: "₹10 - ₹14 LPA", requiredSkills: ["Python", "SQL", "Machine Learning", "Data Visualization"], eligibility: "Fresh Graduates (0-1 YOE)", applyUrl: "https://fractal.ai/careers", source: "Company Portal" },
    { title: "Associate Software Engineer", company: "TCS Digital", location: "PAN India", isRemote: false, salary: "₹7 - ₹9 LPA", requiredSkills: ["Python", "SQL", "Data Structures & Algorithms (DSA)", "Git & GitHub"], eligibility: "2025/2026 Batch Graduates", applyUrl: "https://tcs.com/careers", source: "TCS NextStep" },
    { title: "Graduate Data Analyst", company: "Mu Sigma", location: "Bengaluru, India", isRemote: false, salary: "₹6.5 - ₹8 LPA", requiredSkills: ["SQL", "Data Visualization", "Python"], eligibility: "Fresh Graduates", applyUrl: "https://mu-sigma.com", source: "Campus Direct" },
    { title: "Cloud Operations Engineer", company: "Wipro Cloud", location: "Hyderabad, India", isRemote: true, salary: "₹8 - ₹11 LPA", requiredSkills: ["AWS", "Python", "Git & GitHub"], eligibility: "0-2 YOE Freshers", applyUrl: "https://wipro.com/careers", source: "Verified Portal" }
  ],

  trends: [
    { topic: "Generative AI", trendLevel: "VERY HIGH HYPE", entryJobRelevance: "MODERATE", internshipRelevance: "EMERGING", takeaway: "Focus on Python & Machine Learning fundamentals first before specializing in LLMs.", why: ["Entry-level jobs require strong Python, SQL, and data structure roots.", "Generative AI wrapper apps are easy to build, but enterprise ML models demand rigorous math.", "Combining Python + SQL + basic LLM API knowledge gives you a competitive edge."] },
    { topic: "Cloud Computing", trendLevel: "HIGH DEMAND", entryJobRelevance: "HIGH", internshipRelevance: "HIGH", takeaway: "Highly relevant and practical. AWS or Azure foundations paired with Linux skills boost hiring odds.", why: ["Cloud deployment is mandatory for modern backend & data platforms.", "Certifications like AWS Cloud Practitioner add clear value to resumes.", "High volume of entry-level Cloud & DevOps junior roles."] },
    { topic: "Cybersecurity", trendLevel: "STEADY DEMAND", entryJobRelevance: "HIGH", internshipRelevance: "HIGH", takeaway: "Solid career path with persistent enterprise demand for security fundamentals.", why: ["Enterprise security compliance is non-negotiable.", "Strong foundation in networking & Linux required.", "Requires hands-on lab practice (TryHackMe / HackTheBox)."] },
    { topic: "Data Analytics", trendLevel: "HIGH DEMAND", entryJobRelevance: "VERY HIGH", internshipRelevance: "VERY HIGH", takeaway: "The most accessible entry point into tech and data careers for engineering students.", why: ["High volume of graduate and entry-level positions.", "Immediate practical value using Python, SQL, and PowerBI.", "Clear path for progression into Data Engineering or Data Science."] }
  ]
};

async function main() {
  console.log("Seeding StudentHub database...");

  // Seed Career Roles
  for (const roleData of seedData.careerRoles) {
    await prisma.careerRole.upsert({
      where: { name: roleData.name },
      update: roleData,
      create: roleData
    });
  }

  // Seed Skills
  for (const skillData of seedData.skills) {
    await prisma.skill.upsert({
      where: { name: skillData.name },
      update: skillData,
      create: skillData
    });
  }

  // Connect RoleSkills
  const dataScientist = await prisma.careerRole.findUnique({ where: { name: "Data Scientist" } });
  const dataAnalyst = await prisma.careerRole.findUnique({ where: { name: "Data Analyst" } });
  const sde = await prisma.careerRole.findUnique({ where: { name: "Software Development Engineer (SDE)" } });

  const pythonSkill = await prisma.skill.findUnique({ where: { name: "Python" } });
  const sqlSkill = await prisma.skill.findUnique({ where: { name: "SQL" } });
  const mlSkill = await prisma.skill.findUnique({ where: { name: "Machine Learning" } });
  const dsaSkill = await prisma.skill.findUnique({ where: { name: "Data Structures & Algorithms (DSA)" } });

  if (dataScientist && pythonSkill && sqlSkill && mlSkill) {
    await prisma.roleSkill.upsert({
      where: { roleId_skillId: { roleId: dataScientist.id, skillId: pythonSkill.id } },
      update: { importance: "CRITICAL", priority: 1 },
      create: { roleId: dataScientist.id, skillId: pythonSkill.id, importance: "CRITICAL", priority: 1 }
    });
    await prisma.roleSkill.upsert({
      where: { roleId_skillId: { roleId: dataScientist.id, skillId: sqlSkill.id } },
      update: { importance: "CRITICAL", priority: 2 },
      create: { roleId: dataScientist.id, skillId: sqlSkill.id, importance: "CRITICAL", priority: 2 }
    });
    await prisma.roleSkill.upsert({
      where: { roleId_skillId: { roleId: dataScientist.id, skillId: mlSkill.id } },
      update: { importance: "HIGH", priority: 3 },
      create: { roleId: dataScientist.id, skillId: mlSkill.id, importance: "HIGH", priority: 3 }
    });
  }

  // Seed Courses
  for (const courseData of seedData.courses) {
    let skillId = null;
    if (courseData.skillName) {
      const foundSkill = await prisma.skill.findUnique({ where: { name: courseData.skillName } });
      if (foundSkill) skillId = foundSkill.id;
    }
    const { skillName, ...coursePayload } = courseData;
    await prisma.course.create({ data: { ...coursePayload, skillId } });
  }

  // Seed Projects
  for (const projectData of seedData.projects) {
    await prisma.project.create({ data: projectData });
  }

  // Seed Internships
  for (const internData of seedData.internships) {
    await prisma.internship.create({ data: internData });
  }

  // Seed Jobs
  for (const jobData of seedData.jobs) {
    await prisma.job.create({ data: jobData });
  }

  // Seed Trends
  for (const trendData of seedData.trends) {
    await prisma.trend.upsert({
      where: { topic: trendData.topic },
      update: trendData,
      create: trendData
    });
  }

  console.log("Database seeding completed successfully!");
}

if (require.main === module && prisma) {
  main()
    .catch((e) => {
      console.error("Seeding error:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}


module.exports = seedData;
