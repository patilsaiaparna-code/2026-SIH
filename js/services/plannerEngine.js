import { fallbackCourses } from '../data/courses.js';
import { fallbackOpportunities } from '../data/opportunities.js';

export function calculateLocalBackwardPlan(targetRole = 'Data Scientist', userSkills = ['Python', 'SQL']) {
  const normRole = targetRole.toLowerCase();
  
  let required = ['Python', 'SQL', 'Machine Learning', 'Data Visualization'];
  let defaultProject = 'Customer Churn Prediction Pipeline';
  let defaultInternship = 'Data Analyst Intern at Analytica';
  let defaultJob = 'Junior Data Scientist at Fractal';

  if (normRole.includes('embedded') || normRole.includes('firmware')) {
    required = ['Embedded C', 'Digital Electronics', 'Microcontrollers (ESP32/Arduino)', 'IoT Protocols'];
    defaultProject = 'Smart IoT Telemetry & Sensor Gateway';
    defaultInternship = 'Embedded Software Engineer Intern at Texas Instruments';
    defaultJob = 'Embedded Systems Engineer at TI / Bosch';
  } else if (normRole.includes('vlsi') || normRole.includes('verilog')) {
    required = ['Verilog', 'Digital Electronics', 'VLSI & Verilog', 'PCB Design'];
    defaultProject = 'RTL Design & Verilog ALU Accelerator';
    defaultInternship = 'VLSI Design Engineer Intern at Intel / Qualcomm';
    defaultJob = 'Silicon Design Engineer at Qualcomm';
  } else if (normRole.includes('mechanical') || normRole.includes('cad engineer')) {
    required = ['SolidWorks', 'AutoCAD', 'Engineering Drawing & GD&T', 'ANSYS FEA'];
    defaultProject = 'Parametric Automotive Gearbox 3D Assembly';
    defaultInternship = 'CAD / Mechanical Design Intern at Bosch';
    defaultJob = 'Mechanical Design Engineer at Bosch Mobility';
  } else if (normRole.includes('structural')) {
    required = ['ETABS', 'STAAD.Pro', 'Structural Mechanics', 'AutoCAD Civil 3D'];
    defaultProject = 'High-Rise Tower Seismic Analysis & Rebar Detailing';
    defaultInternship = 'Graduate Structural Engineer at L&T Construction';
    defaultJob = 'Structural Design Engineer at L&T Construction';
  } else if (normRole.includes('bim') || normRole.includes('civil design')) {
    required = ['Revit & BIM', 'AutoCAD Civil 3D', 'Structural Mechanics', 'Quantity Surveying'];
    defaultProject = '5D BIM Architectural & Infrastructure Model';
    defaultInternship = 'BIM Engineer Intern at Shapoorji Pallonji';
    defaultJob = 'BIM Architect at Shapoorji Pallonji';
  } else if (normRole.includes('automation') || normRole.includes('control')) {
    required = ['PLC & SCADA', 'Industrial Automation', 'Electric Machines', 'Power Electronics'];
    defaultProject = 'PLC Ladder Logic Industrial Conveyor Automation';
    defaultInternship = 'PLC & Industrial Automation Intern at Siemens';
    defaultJob = 'Automation & Controls Engineer at Siemens';
  } else if (normRole.includes('ev powertrain') || normRole.includes('bms engineer') || normRole.includes('battery management')) {
    required = ['Battery Management Systems (BMS)', 'Electric Vehicle Powertrain', 'MATLAB / Simulink Power Modelling', 'Power Electronics'];
    defaultProject = 'EV Battery Pack State-of-Charge & Thermal Simulation';
    defaultInternship = 'EV BMS Powertrain Engineer at Ather Energy / Tata Motors';
    defaultJob = 'Powertrain Engineer at Ather Energy';
  } else if (normRole.includes('bio') || normRole.includes('genom')) {
    required = ['Bioinformatics Algorithms', 'Python for Genomic Data Analysis', 'R Programming for Biostatistics', 'Statistics'];
    defaultProject = 'DNA Sequence Alignment & Cancer Biomarker Pipeline';
    defaultInternship = 'Bioinformatics Research Intern at BioGenomics Labs';
    defaultJob = 'Bioinformatics Data Scientist at BioGenomics';
  } else if (normRole.includes('cyber') || normRole.includes('security')) {
    required = ['Cybersecurity Fundamentals', 'Network Security', 'Linux', 'Git & GitHub'];
    defaultProject = 'Automated Network Threat & Vulnerability Scanner';
    defaultInternship = 'SOC Analyst Intern at Cloud Security Labs';
    defaultJob = 'Cybersecurity Analyst at Palo Alto Networks';
  } else if (normRole.includes('robot') || normRole.includes('mechatronic')) {
    required = ['Robotics Kinematics', 'SolidWorks', 'Embedded Systems & C', 'PLC & SCADA'];
    defaultProject = '6-DOF Robotic Arm Trajectory & Kinematics Control';
    defaultInternship = 'Robotics Systems Intern at KUKA Robotics';
    defaultJob = 'Mechatronics Engineer at ABB Robotics';
  } else if (normRole.includes('software') || normRole.includes('sde') || normRole.includes('backend') || normRole.includes('frontend') || normRole.includes('full stack')) {
    required = ['Data Structures & Algorithms (DSA)', 'Git & GitHub', 'SQL', 'Python'];
    defaultProject = 'Scalable Microservices REST API Backend';
    defaultInternship = 'Software Development Engineering Intern at TechScale';
    defaultJob = 'Software Engineer at TechScale Innovations';
  }

  const userSkillsNorm = userSkills.map(s => s.toLowerCase());
  const matched = required.filter(r => userSkillsNorm.includes(r.toLowerCase()));
  const missing = required.filter(r => !userSkillsNorm.includes(r.toLowerCase()));

  const breadcrumbs = [
    `1. TARGET ROLE: ${targetRole}`,
    `2. JOB REQUIREMENTS: ${required.join(', ')}`,
    `3. YOUR SKILLS: ${matched.join(', ') || 'None yet'}`,
    `4. SKILLS TO BUILD: ${missing.join(', ') || 'All prerequisites met!'}`,
    `5. LEARNING RESOURCES: Core Domain Certification & Docs`,
    `6. PROJECT: ${defaultProject}`,
    `7. INTERNSHIP: ${defaultInternship}`,
    `8. JOB: ${defaultJob}`
  ];

  return {
    targetRole,
    requiredSkills: required,
    matchedSkills: matched,
    skillsToBuild: missing,
    matchPercentage: Math.round((matched.length / required.length) * 100),
    breadcrumbs,
    prioritizeFirst: missing.slice(0, 2).length > 0 ? missing.slice(0, 2) : [required[0]],
    deferForNow: [
      "Advanced theoretical specialization without building hands-on projects",
      "Collecting 5+ certificates without building domain portfolio projects",
      "Over-complicating tools before mastering foundational skills"
    ],
    nextSteps: [
      `01. Master ${missing[0] || required[0]} through interactive tutorials`,
      `02. Build a baseline ${defaultProject} portfolio project`,
      `03. Apply to verified ${targetRole} internship opportunities`,
      `04. Prepare for domain-specific technical interview assessment`
    ],
    recommendedCourse: fallbackCourses[0],
    matchedInternships: fallbackOpportunities.internships,
    matchedJobs: fallbackOpportunities.jobs
  };
}

export function calculateLocalLearningPlan(days = 30, hoursPerWeek = 5, goal = 'Data Scientist') {
  const totalWeeks = Math.max(1, Math.ceil(days / 7));
  const weeklySchedule = [];

  for (let week = 1; week <= totalWeeks; week++) {
    weeklySchedule.push({
      week,
      title: `Week ${week}: ${week === 1 ? 'Foundational Syntax & Tools' : week === 2 ? 'Core Skill Application' : week === 3 ? 'Capstone Portfolio Project' : 'Interview & Application Prep'}`,
      focus: `Focus on ${goal} essential skills (${hoursPerWeek} hours/week).`,
      tasks: [
        `Complete 3 hands-on practical modules for ${goal}`,
        `Build 1 mini-project component`,
        `Push source code & documentation to portfolio repository`
      ]
    });
  }

  return {
    goal,
    totalDays: days,
    hoursPerWeek,
    totalWeeks,
    weeklySchedule,
    skillsToSkipForNow: [
      "❌ Highly specialized advanced theory without practical foundations",
      "❌ Tool hopping before completing core project milestones",
      "❌ Collecting multiple certificates without building hands-on projects"
    ],
    focusStatement: `You don't need to learn everything. Focus strictly on the core skills required for ${goal}.`
  };
}
