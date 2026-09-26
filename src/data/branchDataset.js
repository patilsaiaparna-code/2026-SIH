/**
 * Branch-wise Structured Data Layer for StudentHub
 * Contains all 10 required relational entities across 12 Engineering Branches:
 * 1. branches
 * 2. categories
 * 3. courses
 * 4. skills
 * 5. course_skills
 * 6. career_roles
 * 7. course_careers
 * 8. career_skills
 * 9. internships_jobs
 * 10. learning_roadmaps
 */

const branches = [
  { id: 'branch-cse', branch_name: 'Computer Science & Engineering (CSE)' },
  { id: 'branch-aiml', branch_name: 'Artificial Intelligence & Machine Learning (AI/ML)' },
  { id: 'branch-ds', branch_name: 'Data Science' },
  { id: 'branch-ise', branch_name: 'Information Science & Engineering (ISE)' },
  { id: 'branch-it', branch_name: 'Information Technology (IT)' },
  { id: 'branch-ece', branch_name: 'Electronics & Communication Engineering (ECE)' },
  { id: 'branch-eee', branch_name: 'Electrical & Electronics Engineering (EEE)' },
  { id: 'branch-mech', branch_name: 'Mechanical Engineering' },
  { id: 'branch-civil', branch_name: 'Civil Engineering' },
  { id: 'branch-aero', branch_name: 'Aerospace/Aeronautical Engineering' },
  { id: 'branch-biotech', branch_name: 'Biotechnology' },
  { id: 'branch-other', branch_name: 'Other Engineering Branch' }
];

const categories = [
  // Mechanical Categories
  { id: 'cat-mech-cad', branch_id: 'branch-mech', category_name: 'CAD & 3D Design' },
  { id: 'cat-mech-cae', branch_id: 'branch-mech', category_name: 'CAE & Simulation' },
  { id: 'cat-mech-mfg', branch_id: 'branch-mech', category_name: 'Manufacturing & Automation' },
  { id: 'cat-mech-robotics', branch_id: 'branch-mech', category_name: 'Robotics & Control' },
  { id: 'cat-mech-programming', branch_id: 'branch-mech', category_name: 'Computational Mechanics & AI' },

  // Civil Categories
  { id: 'cat-civil-cad', branch_id: 'branch-civil', category_name: 'Drafting & 3D Modeling' },
  { id: 'cat-civil-struct', branch_id: 'branch-civil', category_name: 'Structural Analysis & Design' },
  { id: 'cat-civil-bim', branch_id: 'branch-civil', category_name: 'BIM & Construction Management' },
  { id: 'cat-civil-gis', branch_id: 'branch-civil', category_name: 'Geospatial & Smart Infrastructure' },

  // ECE Categories
  { id: 'cat-ece-embedded', branch_id: 'branch-ece', category_name: 'Embedded Systems & Microcontrollers' },
  { id: 'cat-ece-vlsi', branch_id: 'branch-ece', category_name: 'VLSI & Circuit Design' },
  { id: 'cat-ece-iot', branch_id: 'branch-ece', category_name: 'IoT & Wireless Communications' },
  { id: 'cat-ece-dsp', branch_id: 'branch-ece', category_name: 'Signal Processing & ML for ECE' },

  // EEE Categories
  { id: 'cat-eee-power', branch_id: 'branch-eee', category_name: 'Power Systems & Machines' },
  { id: 'cat-eee-auto', branch_id: 'branch-eee', category_name: 'Industrial Automation & PLC' },
  { id: 'cat-eee-ev', branch_id: 'branch-eee', category_name: 'Electric Vehicles & Renewable Energy' },

  // Aerospace Categories
  { id: 'cat-aero-cad', branch_id: 'branch-aero', category_name: 'Aircraft Design & CAD' },
  { id: 'cat-aero-cfd', branch_id: 'branch-aero', category_name: 'CFD & Aerodynamics' },
  { id: 'cat-aero-drones', branch_id: 'branch-aero', category_name: 'Drone & UAV Tech' },

  // Biotech Categories
  { id: 'cat-biotech-bioinfo', branch_id: 'branch-biotech', category_name: 'Bioinformatics & Data Analysis' },
  { id: 'cat-biotech-molbio', branch_id: 'branch-biotech', category_name: 'Molecular & Computational Biology' },
  { id: 'cat-biotech-ai', branch_id: 'branch-biotech', category_name: 'AI & Drug Discovery' },

  // CS / ISE / AI-ML / IT Categories
  { id: 'cat-cs-core', branch_id: 'branch-cse', category_name: 'Computer Science Fundamentals' },
  { id: 'cat-cs-web', branch_id: 'branch-cse', category_name: 'Web & Full Stack Development' },
  { id: 'cat-cs-ai', branch_id: 'branch-aiml', category_name: 'Artificial Intelligence & Machine Learning' },
  { id: 'cat-cs-data', branch_id: 'branch-ds', category_name: 'Data Science & Analytics' },
  { id: 'cat-cs-cloud', branch_id: 'branch-it', category_name: 'Cloud & DevOps' }
];

const skills = [
  // Mechanical & CAD Skills
  { id: 'skill-eng-drawing', skill_name: 'Engineering Drawing & GD&T' },
  { id: 'skill-autocad', skill_name: 'AutoCAD' },
  { id: 'skill-solidworks', skill_name: 'SolidWorks' },
  { id: 'skill-catia', skill_name: 'CATIA' },
  { id: 'skill-ansys', skill_name: 'ANSYS FEA' },
  { id: 'skill-cnc', skill_name: 'CNC Programming & Manufacturing' },
  { id: 'skill-3d-print', skill_name: '3D Printing & Additive Manufacturing' },
  { id: 'skill-robotics', skill_name: 'Robotics Kinematics' },
  { id: 'skill-industrial-auto', skill_name: 'Industrial Automation' },
  { id: 'skill-matlab-mech', skill_name: 'MATLAB for Mechanical' },
  { id: 'skill-py-mech', skill_name: 'Python for Engineers' },
  { id: 'skill-iot-mfg', skill_name: 'IoT for Manufacturing (IIoT)' },
  { id: 'skill-plc-scada', skill_name: 'PLC & SCADA Programming' },
  { id: 'skill-aiml-mech', skill_name: 'AI/ML for Predictive Maintenance' },

  // Civil Skills
  { id: 'skill-autocad-civil', skill_name: 'AutoCAD Civil 3D' },
  { id: 'skill-staad', skill_name: 'STAAD.Pro' },
  { id: 'skill-etabs', skill_name: 'ETABS' },
  { id: 'skill-revit', skill_name: 'Revit Architecture & Structure' },
  { id: 'skill-bim', skill_name: 'BIM (Building Information Modeling)' },
  { id: 'skill-struct-analysis', skill_name: 'Structural Mechanics & Analysis' },
  { id: 'skill-quantity-surv', skill_name: 'Quantity Surveying & Estimation' },
  { id: 'skill-const-mgmt', skill_name: 'Construction Project Management' },
  { id: 'skill-gis', skill_name: 'GIS & Remote Sensing' },
  { id: 'skill-total-station', skill_name: 'Total Station Surveying' },
  { id: 'skill-primavera', skill_name: 'Primavera P6' },
  { id: 'skill-sustainable-const', skill_name: 'Sustainable & Green Construction' },
  { id: 'skill-smart-cities', skill_name: 'Smart Infrastructure' },
  { id: 'skill-py-civil', skill_name: 'Python for Civil Engineers' },

  // ECE Skills
  { id: 'skill-digital-elec', skill_name: 'Digital Electronics Logic Design' },
  { id: 'skill-analog-elec', skill_name: 'Analog Circuits' },
  { id: 'skill-embedded-c', skill_name: 'Embedded C Programming' },
  { id: 'skill-embedded-sys', skill_name: 'Embedded Systems Architecture' },
  { id: 'skill-arduino', skill_name: 'Arduino Microcontrollers' },
  { id: 'skill-esp32', skill_name: 'ESP32 & Wi-Fi Microcontrollers' },
  { id: 'skill-raspberry-pi', skill_name: 'Raspberry Pi Single Board Computer' },
  { id: 'skill-iot-ece', skill_name: 'Internet of Things (IoT) Protocols' },
  { id: 'skill-pcb-design', skill_name: 'PCB Design & Schematic Capture' },
  { id: 'skill-vlsi', skill_name: 'VLSI Design & CMOS' },
  { id: 'skill-verilog', skill_name: 'Verilog HDL' },
  { id: 'skill-matlab-ece', skill_name: 'MATLAB & Signal Processing' },
  { id: 'skill-signals-sys', skill_name: 'Signals & Systems' },
  { id: 'skill-comm-sys', skill_name: 'Wireless Communication Systems' },
  { id: 'skill-py-ece', skill_name: 'Python for Signal Analysis' },
  { id: 'skill-ml-ece', skill_name: 'Machine Learning for Edge Hardware' },

  // EEE Skills
  { id: 'skill-circuit-design', skill_name: 'Electric Circuit Analysis' },
  { id: 'skill-simulink', skill_name: 'MATLAB / Simulink Power Modelling' },
  { id: 'skill-power-sys', skill_name: 'Power Grid Systems' },
  { id: 'skill-power-elec', skill_name: 'Power Electronics & Inverters' },
  { id: 'skill-elec-machines', skill_name: 'Electrical Machines & Drives' },
  { id: 'skill-renewable', skill_name: 'Renewable Energy Integration' },
  { id: 'skill-solar-pv', skill_name: 'Solar PV Systems' },
  { id: 'skill-ev-tech', skill_name: 'Electric Vehicle Powertrain' },
  { id: 'skill-bms', skill_name: 'Battery Management Systems (BMS)' },
  { id: 'skill-py-eee', skill_name: 'Python for Electrical Power Optimization' },

  // Aerospace Skills
  { id: 'skill-cfd', skill_name: 'Computational Fluid Dynamics (CFD)' },
  { id: 'skill-aircraft-design', skill_name: 'Aircraft Structural Design' },
  { id: 'skill-aero-materials', skill_name: 'Aerospace Composite Materials' },
  { id: 'skill-flight-mech', skill_name: 'Flight Mechanics & Aerodynamics' },
  { id: 'skill-py-aero', skill_name: 'Python for Flight Simulation' },
  { id: 'skill-drone-tech', skill_name: 'Drone Avionics & Flight Control' },
  { id: 'skill-uav-design', skill_name: 'UAV Mechanical & Electronics Design' },

  // Biotech Skills
  { id: 'skill-bioinformatics', skill_name: 'Bioinformatics Algorithms' },
  { id: 'skill-py-biotech', skill_name: 'Python for Genomic Data Analysis' },
  { id: 'skill-r-prog', skill_name: 'R Programming for Biostatistics' },
  { id: 'skill-mol-bio', skill_name: 'Molecular Biology Techniques' },
  { id: 'skill-genetic-eng', skill_name: 'Genetic Engineering' },
  { id: 'skill-biostats', skill_name: 'Biostatistics & Experimental Design' },
  { id: 'skill-drug-discovery', skill_name: 'Drug Discovery & Molecular Docking' },
  { id: 'skill-ai-biotech', skill_name: 'AI in Genomics & Drug Screening' },

  // CS / Data / AI Core Skills
  { id: 'skill-python', skill_name: 'Python' },
  { id: 'skill-dsa', skill_name: 'Data Structures & Algorithms (DSA)' },
  { id: 'skill-sql', skill_name: 'SQL & Database Management' },
  { id: 'skill-ml', skill_name: 'Machine Learning' },
  { id: 'skill-webdev', skill_name: 'Full Stack Web Development' },
  { id: 'skill-cloud', skill_name: 'Cloud Computing & AWS' }
];

const courses = [
  // --- MECHANICAL COURSES ---
  {
    id: 'course-mech-01',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-cad',
    course_name: 'Engineering Drawing & CAD Essentials',
    title: 'Engineering Drawing & CAD Essentials',
    description: 'Master technical sketching, orthographic projections, isometric views, and 2D CAD drafting standards.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Engineering CAD Essentials', url: 'https://coursera.org', isFree: true },
      { name: 'YouTube - NPTEL Engineering Graphics', url: 'https://youtube.com', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Engineering Drawing & GD&T', 'AutoCAD']
  },
  {
    id: 'course-mech-02',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-cad',
    course_name: 'AutoCAD Mechanical Masterclass',
    title: 'AutoCAD Mechanical Masterclass',
    description: 'Comprehensive 2D and 3D mechanical component drafting, dimensioning, and manufacturing drawing production.',
    difficulty: 'Beginner',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Autodesk Design Academy - AutoCAD Mechanical', url: 'https://autodesk.com', isFree: true },
      { name: 'Udemy - AutoCAD Mechanical Certification', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Autodesk Academy',
    price: 'Free',
    isFree: true,
    skills: ['AutoCAD', 'Engineering Drawing & GD&T']
  },
  {
    id: 'course-mech-03',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-cad',
    course_name: 'SolidWorks 3D Modeling & Assemblies',
    title: 'SolidWorks 3D Modeling & Assemblies',
    description: 'Learn parametric 3D part modeling, complex assemblies, motion study, and CSWA/CSWP exam prep.',
    difficulty: 'Intermediate',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'SolidWorks Official Tutorials', url: 'https://solidworks.com', isFree: true },
      { name: 'Udemy - SolidWorks Complete Course', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$19.99',
    isFree: false,
    skills: ['SolidWorks', 'Engineering Drawing & GD&T']
  },
  {
    id: 'course-mech-04',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-cad',
    course_name: 'CATIA V5 Automotive & Aerospace Surface Modeling',
    title: 'CATIA V5 Automotive & Aerospace Surface Modeling',
    description: 'Advanced generative shape design, surface modeling, and sheet metal design for industrial applications.',
    difficulty: 'Advanced',
    estimated_learning_time: '50 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Dassault Systèmes Learning Hub', url: 'https://3ds.com', isFree: false }
    ],
    platform: 'Dassault Learning Hub',
    price: '$49.99',
    isFree: false,
    skills: ['CATIA', 'Engineering Drawing & GD&T']
  },
  {
    id: 'course-mech-05',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-cae',
    course_name: 'ANSYS Structural & Thermal Finite Element Analysis',
    title: 'ANSYS Structural & Thermal Finite Element Analysis',
    description: 'Perform static structural analysis, modal analysis, thermal stress evaluation, and fatigue life prediction.',
    difficulty: 'Intermediate',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'ANSYS Innovation Courses', url: 'https://ansys.com', isFree: true },
      { name: 'edX - FEA with ANSYS', url: 'https://edx.org', isFree: true }
    ],
    platform: 'ANSYS Innovation',
    price: 'Free',
    isFree: true,
    skills: ['ANSYS FEA', 'SolidWorks']
  },
  {
    id: 'course-mech-06',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-mfg',
    course_name: 'CNC & Precision Manufacturing Technology',
    title: 'CNC & Precision Manufacturing Technology',
    description: 'Learn G-Code/M-Code programming, CNC milling/turning center setup, and CAM toolpath generation.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - Manufacturing Processes', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['CNC Programming & Manufacturing', 'Engineering Drawing & GD&T']
  },
  {
    id: 'course-mech-07',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-mfg',
    course_name: '3D Printing & Additive Manufacturing',
    title: '3D Printing & Additive Manufacturing',
    description: 'Explore FDM, SLA, SLS 3D printers, slicer software setup, DfAM principles, and materials selection.',
    difficulty: 'Beginner',
    estimated_learning_time: '20 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Additive Manufacturing', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['3D Printing & Additive Manufacturing', 'SolidWorks']
  },
  {
    id: 'course-mech-08',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-robotics',
    course_name: 'Robotics Mechanics & Forward/Inverse Kinematics',
    title: 'Robotics Mechanics & Forward/Inverse Kinematics',
    description: 'Mathematical foundation of robotic arm manipulator kinematics, trajectory planning, and DH parameters.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'edX - Autonomous Mobile Robots', url: 'https://edx.org', isFree: true }
    ],
    platform: 'edX',
    price: 'Free',
    isFree: true,
    skills: ['Robotics Kinematics', 'MATLAB for Mechanical']
  },
  {
    id: 'course-mech-09',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-mfg',
    course_name: 'Industrial Automation & Mechatronics',
    title: 'Industrial Automation & Mechatronics',
    description: 'Pneumatics, hydraulics, sensors, actuators, and integration with programmable microcontrollers.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - Industrial Automation Basics', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$14.99',
    isFree: false,
    skills: ['Industrial Automation', 'PLC & SCADA Programming']
  },
  {
    id: 'course-mech-10',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-programming',
    course_name: 'MATLAB for Mechanical Engineers',
    title: 'MATLAB for Mechanical Engineers',
    description: 'Numerical methods, solving differential equations of motion, vibration analysis, and mechanical data plotting.',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'MathWorks Onramp - MATLAB for Mechanical', url: 'https://mathworks.com', isFree: true }
    ],
    platform: 'MathWorks Academy',
    price: 'Free',
    isFree: true,
    skills: ['MATLAB for Mechanical']
  },
  {
    id: 'course-mech-11',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-programming',
    course_name: 'Python for Mechanical Engineers',
    title: 'Python for Mechanical Engineers',
    description: 'Automate CAD tasks, analyze thermodynamic cycles, and process sensor data using NumPy and SciPy.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'FreeCodeCamp - Scientific Python', url: 'https://freecodecamp.org', isFree: true }
    ],
    platform: 'FreeCodeCamp',
    price: 'Free',
    isFree: true,
    skills: ['Python for Engineers']
  },
  {
    id: 'course-mech-12',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-mfg',
    course_name: 'IoT for Smart Manufacturing & Industry 4.0',
    title: 'IoT for Smart Manufacturing & Industry 4.0',
    description: 'Deploy IIoT sensors, MQTT telemetry protocols, and cloud dashboards for factory automation monitoring.',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Industry 4.0 & IIoT', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['IoT for Manufacturing (IIoT)', 'Industrial Automation']
  },
  {
    id: 'course-mech-13',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-mfg',
    course_name: 'PLC & SCADA Industrial Automation',
    title: 'PLC & SCADA Industrial Automation',
    description: 'Master Ladder Logic programming for Siemens S7-1200 / Allen-Bradley PLCs and SCADA HMI screen design.',
    difficulty: 'Intermediate',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - PLC Programming From Scratch', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$19.99',
    isFree: false,
    skills: ['PLC & SCADA Programming', 'Industrial Automation']
  },
  {
    id: 'course-mech-14',
    branch_id: 'branch-mech',
    category_id: 'cat-mech-programming',
    course_name: 'AI/ML for Mechanical Engineers & Maintenance',
    title: 'AI/ML for Mechanical Engineers & Maintenance',
    description: 'Build predictive maintenance machine learning algorithms to forecast machine breakdowns using vibration and acoustic data.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Predictive Maintenance with ML', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['AI/ML for Predictive Maintenance', 'Python for Engineers']
  },

  // --- CIVIL COURSES ---
  {
    id: 'course-civil-01',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-cad',
    course_name: 'AutoCAD Civil 3D Infrastructure Drafting',
    title: 'AutoCAD Civil 3D Infrastructure Drafting',
    description: 'Learn 2D architectural plans, land surveying contour maps, road alignment, and pipe network designs.',
    difficulty: 'Beginner',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Autodesk Design Academy - Civil 3D', url: 'https://autodesk.com', isFree: true }
    ],
    platform: 'Autodesk Academy',
    price: 'Free',
    isFree: true,
    skills: ['AutoCAD Civil 3D']
  },
  {
    id: 'course-civil-02',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-struct',
    course_name: 'STAAD.Pro Structural Analysis & Design',
    title: 'STAAD.Pro Structural Analysis & Design',
    description: 'Model concrete and steel buildings, analyze wind/seismic load combinations, and perform IS code reinforcement design.',
    difficulty: 'Intermediate',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Bentley Institute - STAAD.Pro Fundamentals', url: 'https://bentley.com', isFree: true }
    ],
    platform: 'Bentley Institute',
    price: 'Free',
    isFree: true,
    skills: ['STAAD.Pro', 'Structural Mechanics & Analysis']
  },
  {
    id: 'course-civil-03',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-struct',
    course_name: 'ETABS High-Rise Building Analysis',
    title: 'ETABS High-Rise Building Analysis',
    description: 'Advanced 3D seismic analysis, shear wall design, and structural framing optimization for multi-story residential towers.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'CSI America - ETABS Official Tutorials', url: 'https://csiamerica.com', isFree: true }
    ],
    platform: 'CSI America',
    price: 'Free',
    isFree: true,
    skills: ['ETABS', 'Structural Mechanics & Analysis']
  },
  {
    id: 'course-civil-04',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-bim',
    course_name: 'Revit Architecture & Structure BIM',
    title: 'Revit Architecture & Structure BIM',
    description: 'Create 3D parametric BIM building models, generate schedules, sections, and structural detailing automatically.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - BIM with Revit', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Revit Architecture & Structure', 'BIM (Building Information Modeling)']
  },
  {
    id: 'course-civil-05',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-bim',
    course_name: 'BIM Management & Navisworks Clash Detection',
    title: 'BIM Management & Navisworks Clash Detection',
    description: 'Combine MEP, architectural, and structural 3D models to resolve interdisciplinary construction clashes before building.',
    difficulty: 'Advanced',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - Navisworks Clash Detection', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$18.99',
    isFree: false,
    skills: ['BIM (Building Information Modeling)', 'Construction Project Management']
  },
  {
    id: 'course-civil-06',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-struct',
    course_name: 'Structural Analysis Fundamentals',
    title: 'Structural Analysis Fundamentals',
    description: 'Calculate shear force diagrams, bending moments, truss deflections, and indeterminate frame reactions.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - Structural Analysis I', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['Structural Mechanics & Analysis']
  },
  {
    id: 'course-civil-07',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-bim',
    course_name: 'Quantity Surveying & Cost Estimation',
    title: 'Quantity Surveying & Cost Estimation',
    description: 'Calculate Bill of Quantities (BOQ), rate analysis for RCC, steel, masonry, and total site budget estimation.',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - Quantity Surveying Masterclass', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$14.99',
    isFree: false,
    skills: ['Quantity Surveying & Estimation']
  },
  {
    id: 'course-civil-08',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-bim',
    course_name: 'Construction Management & Site Execution',
    title: 'Construction Management & Site Execution',
    description: 'Learn site safety protocols, quality control testing (slump, cube test), contract management, and site supervision.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Construction Management', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Construction Project Management']
  },
  {
    id: 'course-civil-09',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-gis',
    course_name: 'GIS & Remote Sensing with QGIS',
    title: 'GIS & Remote Sensing with QGIS',
    description: 'Analyze satellite imagery, create watershed spatial maps, and design urban transport planning layers.',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'QGIS Official Training Manual', url: 'https://qgis.org', isFree: true }
    ],
    platform: 'QGIS Academy',
    price: 'Free',
    isFree: true,
    skills: ['GIS & Remote Sensing']
  },
  {
    id: 'course-civil-10',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-cad',
    course_name: 'Total Station & Land Surveying',
    title: 'Total Station & Land Surveying',
    description: 'Hands-on electronic distance measurement (EDM), topographic surveying, boundary mapping, and leveling techniques.',
    difficulty: 'Intermediate',
    estimated_learning_time: '20 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - Surveying', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['Total Station Surveying']
  },
  {
    id: 'course-civil-11',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-bim',
    course_name: 'Primavera P6 Construction Scheduling',
    title: 'Primavera P6 Construction Scheduling',
    description: 'Create Work Breakdown Structures (WBS), Gantt charts, critical path method (CPM) schedules, and resource leveling.',
    difficulty: 'Advanced',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Oracle University - Primavera P6 Essentials', url: 'https://oracle.com', isFree: false }
    ],
    platform: 'Oracle University',
    price: '$29.99',
    isFree: false,
    skills: ['Primavera P6', 'Construction Project Management']
  },
  {
    id: 'course-civil-12',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-gis',
    course_name: 'Sustainable & Green Building Design (LEED)',
    title: 'Sustainable & Green Building Design (LEED)',
    description: 'Principles of net-zero carbon buildings, energy modeling, rainwater harvesting, and LEED green certification prep.',
    difficulty: 'Intermediate',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'USGBC - LEED Green Associate Prep', url: 'https://usgbc.org', isFree: true }
    ],
    platform: 'USGBC',
    price: 'Free',
    isFree: true,
    skills: ['Sustainable & Green Construction']
  },
  {
    id: 'course-civil-13',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-gis',
    course_name: 'Smart Cities & Intelligent Transport Infrastructure',
    title: 'Smart Cities & Intelligent Transport Infrastructure',
    description: 'Design smart traffic signals, sensor-integrated roadways, and IoT-enabled municipal waste & water networks.',
    difficulty: 'Advanced',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'edX - Smart Cities Infrastructure', url: 'https://edx.org', isFree: true }
    ],
    platform: 'edX',
    price: 'Free',
    isFree: true,
    skills: ['Smart Infrastructure', 'GIS & Remote Sensing']
  },
  {
    id: 'course-civil-14',
    branch_id: 'branch-civil',
    category_id: 'cat-civil-gis',
    course_name: 'Python for Civil Engineers & Data Analysis',
    title: 'Python for Civil Engineers & Data Analysis',
    description: 'Automate rainfall-runoff hydrology calculations, soil shear strength statistical regressions, and GIS shapefile scripts.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Python for Data Science', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Python for Civil Engineers', 'GIS & Remote Sensing']
  },

  // --- ECE COURSES ---
  {
    id: 'course-ece-01',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-vlsi',
    course_name: 'Digital Electronics & Logic Design',
    title: 'Digital Electronics & Logic Design',
    description: 'Combinational and sequential logic circuits, K-maps, flip-flops, registers, counters, and FSM design.',
    difficulty: 'Beginner',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - Digital Circuits', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['Digital Electronics Logic Design']
  },
  {
    id: 'course-ece-02',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-vlsi',
    course_name: 'Analog Electronics & Op-Amp Circuit Design',
    title: 'Analog Electronics & Op-Amp Circuit Design',
    description: 'BJT & MOSFET amplifiers, operational amplifier active filters, oscillators, and voltage regulators.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'edX - Circuits & Electronics', url: 'https://edx.org', isFree: true }
    ],
    platform: 'edX',
    price: 'Free',
    isFree: true,
    skills: ['Analog Circuits']
  },
  {
    id: 'course-ece-03',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-embedded',
    course_name: 'Embedded C Systems Programming',
    title: 'Embedded C Systems Programming',
    description: 'Direct register manipulation, bitwise operations, interrupt handling, timers, and bare-metal ARM Cortex-M C coding.',
    difficulty: 'Intermediate',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - Embedded C Programming Masterclass', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$19.99',
    isFree: false,
    skills: ['Embedded C Programming', 'Embedded Systems Architecture']
  },
  {
    id: 'course-ece-04',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-embedded',
    course_name: 'Embedded Systems Architecture & Microcontrollers',
    title: 'Embedded Systems Architecture & Microcontrollers',
    description: 'Explore 8051, PIC, and STM32 microcontroller hardware architectures, memory mapping, and RTOS fundamentals.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Embedded Systems Software', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Embedded Systems Architecture', 'Embedded C Programming']
  },
  {
    id: 'course-ece-05',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-embedded',
    course_name: 'Arduino Interfacing & Sensor Projects',
    title: 'Arduino Interfacing & Sensor Projects',
    description: 'Build practical hardware prototypes using ultrasonic sensors, LCD displays, DC motors, and I2C/SPI modules.',
    difficulty: 'Beginner',
    estimated_learning_time: '20 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Arduino Project Hub', url: 'https://arduino.cc', isFree: true }
    ],
    platform: 'Arduino Hub',
    price: 'Free',
    isFree: true,
    skills: ['Arduino Microcontrollers']
  },
  {
    id: 'course-ece-06',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-iot',
    course_name: 'ESP32 Wi-Fi & Bluetooth IoT Development',
    title: 'ESP32 Wi-Fi & Bluetooth IoT Development',
    description: 'Program dual-core ESP32 microcontrollers, send sensor telemetry over MQTT, HTTP REST, and WebSockets.',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'RandomNerdTutorials - ESP32', url: 'https://randomnerdtutorials.com', isFree: true }
    ],
    platform: 'RandomNerdTutorials',
    price: 'Free',
    isFree: true,
    skills: ['ESP32 & Wi-Fi Microcontrollers', 'Internet of Things (IoT) Protocols']
  },
  {
    id: 'course-ece-07',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-embedded',
    course_name: 'Raspberry Pi Linux & Edge Computing',
    title: 'Raspberry Pi Linux & Edge Computing',
    description: 'Configure Raspberry Pi OS, GPIO pin control using Python, camera module computer vision, and local web servers.',
    difficulty: 'Intermediate',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Raspberry Pi Foundation Courses', url: 'https://raspberrypi.org', isFree: true }
    ],
    platform: 'Raspberry Pi Org',
    price: 'Free',
    isFree: true,
    skills: ['Raspberry Pi Single Board Computer', 'Python for Signal Analysis']
  },
  {
    id: 'course-ece-08',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-iot',
    course_name: 'IoT Architecture & Wireless Protocols',
    title: 'IoT Architecture & Wireless Protocols',
    description: 'Detailed study of LoRaWAN, Zigbee, BLE, Cellular IoT (NB-IoT), and cloud platforms (AWS IoT Core, ThingsBoard).',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - An Introduction to Programming the IoT', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Internet of Things (IoT) Protocols']
  },
  {
    id: 'course-ece-09',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-vlsi',
    course_name: 'PCB Design & Schematic Capture with KiCad',
    title: 'PCB Design & Schematic Capture with KiCad',
    description: 'Design multi-layer printed circuit boards, component placement, trace routing, design rule checks (DRC), and Gerber file generation.',
    difficulty: 'Intermediate',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'KiCad Official Tutorials', url: 'https://kicad.org', isFree: true }
    ],
    platform: 'KiCad Academy',
    price: 'Free',
    isFree: true,
    skills: ['PCB Design & Schematic Capture']
  },
  {
    id: 'course-ece-10',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-vlsi',
    course_name: 'VLSI Design & CMOS Technology',
    title: 'VLSI Design & CMOS Technology',
    description: 'CMOS inverter layout, static and dynamic logic gates, propagation delay, power dissipation, and physical design flow.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - VLSI Design', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['VLSI Design & CMOS']
  },
  {
    id: 'course-ece-11',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-vlsi',
    course_name: 'Verilog HDL & FPGA System Synthesis',
    title: 'Verilog HDL & FPGA System Synthesis',
    description: 'RTL hardware modeling using Verilog, testbench verification, Xilinx Vivado synthesis, and implementation on FPGA boards.',
    difficulty: 'Advanced',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - Verilog HDL & FPGA Architecture', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$21.99',
    isFree: false,
    skills: ['Verilog HDL', 'VLSI Design & CMOS']
  },
  {
    id: 'course-ece-12',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-dsp',
    course_name: 'MATLAB for Signal Processing & Communications',
    title: 'MATLAB for Signal Processing & Communications',
    description: 'Design FIR/IIR digital filters, Fourier transform (FFT) spectral analysis, and modulate QAM/PSK communications signals.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'MathWorks - Signal Processing Onramp', url: 'https://mathworks.com', isFree: true }
    ],
    platform: 'MathWorks Academy',
    price: 'Free',
    isFree: true,
    skills: ['MATLAB & Signal Processing', 'Signals & Systems']
  },
  {
    id: 'course-ece-13',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-dsp',
    course_name: 'Signals & Systems Fundamentals',
    title: 'Signals & Systems Fundamentals',
    description: 'Continuous and discrete time LTI systems, convolution, Laplace transform, Z-transform, and system stability criteria.',
    difficulty: 'Beginner',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'MIT OpenCourseWare - Signals & Systems', url: 'https://ocw.mit.edu', isFree: true }
    ],
    platform: 'MIT OCW',
    price: 'Free',
    isFree: true,
    skills: ['Signals & Systems']
  },
  {
    id: 'course-ece-14',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-dsp',
    course_name: 'Wireless & 5G Communication Systems',
    title: 'Wireless & 5G Communication Systems',
    description: 'Cellular architecture, multipath fading channels, OFDM, MIMO antenna beamforming, and 5G NR physical layer specs.',
    difficulty: 'Advanced',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - 5G Wireless Networking', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Wireless Communication Systems']
  },
  {
    id: 'course-ece-15',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-dsp',
    course_name: 'Python for Signal Processing & Telecom',
    title: 'Python for Signal Processing & Telecom',
    description: 'Use SciPy.signal and NumPy to filter audio/radio frequency data and build software-defined radio (SDR) scripts.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'FreeCodeCamp - DSP in Python', url: 'https://freecodecamp.org', isFree: true }
    ],
    platform: 'FreeCodeCamp',
    price: 'Free',
    isFree: true,
    skills: ['Python for Signal Analysis']
  },
  {
    id: 'course-ece-16',
    branch_id: 'branch-ece',
    category_id: 'cat-ece-dsp',
    course_name: 'ML for ECE & TinyML Edge Hardware',
    title: 'ML for ECE & TinyML Edge Hardware',
    description: 'Quantize neural networks with TensorFlow Lite for Microcontrollers and deploy keyword spotting models directly on Cortex-M MCUs.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'edX - TinyML Applications', url: 'https://edx.org', isFree: true }
    ],
    platform: 'edX',
    price: 'Free',
    isFree: true,
    skills: ['Machine Learning for Edge Hardware', 'Embedded C Programming']
  },

  // --- EEE COURSES ---
  {
    id: 'course-eee-01',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-power',
    course_name: 'Electric Circuit Design & Network Theory',
    title: 'Electric Circuit Design & Network Theory',
    description: 'Kirchhoff laws, Thevenin/Norton theorems, AC sinusoidal steady-state analysis, 3-phase systems, and transient response.',
    difficulty: 'Beginner',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - Basic Electrical Circuits', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['Electric Circuit Analysis']
  },
  {
    id: 'course-eee-02',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-power',
    course_name: 'MATLAB/Simulink Power Systems Simulation',
    title: 'MATLAB/Simulink Power Systems Simulation',
    description: 'Model electrical grids, power transformers, transmission line faults, and power quality harmonics in Simscape Power Systems.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'MathWorks - Simscape Power Systems Onramp', url: 'https://mathworks.com', isFree: true }
    ],
    platform: 'MathWorks Academy',
    price: 'Free',
    isFree: true,
    skills: ['MATLAB / Simulink Power Modelling', 'Power Grid Systems']
  },
  {
    id: 'course-eee-03',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-power',
    course_name: 'Power Systems Analysis & Smart Grids',
    title: 'Power Systems Analysis & Smart Grids',
    description: 'Load flow analysis, symmetrical components, power system stability, relay protection, and smart grid SCADA monitoring.',
    difficulty: 'Advanced',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Electric Power Systems', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Power Grid Systems']
  },
  {
    id: 'course-eee-04',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-ev',
    course_name: 'Power Electronics & Motor Inverters',
    title: 'Power Electronics & Motor Inverters',
    description: 'Buck/Boost DC-DC converters, PWM single/three-phase inverters, MOSFET/IGBT gate drivers, and AC motor speed control.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'edX - Power Electronics', url: 'https://edx.org', isFree: true }
    ],
    platform: 'edX',
    price: 'Free',
    isFree: true,
    skills: ['Power Electronics & Inverters', 'Electrical Machines & Drives']
  },
  {
    id: 'course-eee-05',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-power',
    course_name: 'Electrical Machines & Industrial Drives',
    title: 'Electrical Machines & Industrial Drives',
    description: 'Transformers, DC motors, 3-phase induction motors, synchronous generators, and Variable Frequency Drives (VFD).',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'NPTEL - Electrical Machines', url: 'https://nptel.ac.in', isFree: true }
    ],
    platform: 'NPTEL',
    price: 'Free',
    isFree: true,
    skills: ['Electrical Machines & Drives']
  },
  {
    id: 'course-eee-06',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-ev',
    course_name: 'Renewable Energy Integration & Solar PV Systems',
    title: 'Renewable Energy Integration & Solar PV Systems',
    description: 'Design grid-tied & off-grid solar photovoltaic systems, MPPT charge controllers, wind turbine generators, and energy storage.',
    difficulty: 'Intermediate',
    estimated_learning_time: '30 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Solar Energy Basics', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Renewable Energy Integration', 'Solar PV Systems']
  },
  {
    id: 'course-eee-07',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-ev',
    course_name: 'Electric Vehicle (EV) Technology & Powertrains',
    title: 'Electric Vehicle (EV) Technology & Powertrains',
    description: 'EV motor architectures (BLDC, PMSM), regenerative braking, traction inverter control, and fast charging infrastructure.',
    difficulty: 'Advanced',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Electric Vehicles Technology', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Electric Vehicle Powertrain', 'Battery Management Systems (BMS)']
  },
  {
    id: 'course-eee-08',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-ev',
    course_name: 'Battery Management Systems (BMS) Design',
    title: 'Battery Management Systems (BMS) Design',
    description: 'Lithium-ion cell chemistry, State of Charge (SoC) / State of Health (SoH) estimation algorithms, cell balancing, and CAN bus telemetry.',
    difficulty: 'Advanced',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - Battery Management Systems for EVs', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$24.99',
    isFree: false,
    skills: ['Battery Management Systems (BMS)', 'Electric Vehicle Powertrain']
  },
  {
    id: 'course-eee-09',
    branch_id: 'branch-eee',
    category_id: 'cat-eee-auto',
    course_name: 'Python for Electrical Engineers & Energy Analytics',
    title: 'Python for Electrical Engineers & Energy Analytics',
    description: 'Analyze hourly electricity smart meter consumption time series, load forecasting with ARIMA, and OPF grid optimization.',
    difficulty: 'Beginner',
    estimated_learning_time: '25 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Energy Data Analytics', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Python for Electrical Power Optimization']
  },

  // --- AEROSPACE COURSES ---
  {
    id: 'course-aero-01',
    branch_id: 'branch-aero',
    category_id: 'cat-aero-cad',
    course_name: 'CATIA V5 Aerospace Structural Design',
    title: 'CATIA V5 Aerospace Structural Design',
    description: 'Model wing spars, ribs, fuselage bulkheads, skin panels, and nacelles to aviation manufacturing tolerances.',
    difficulty: 'Intermediate',
    estimated_learning_time: '40 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Dassault Systèmes - Aerospace CAD Guide', url: 'https://3ds.com', isFree: true }
    ],
    platform: 'Dassault Academy',
    price: 'Free',
    isFree: true,
    skills: ['CATIA', 'Aircraft Structural Design']
  },
  {
    id: 'course-aero-02',
    branch_id: 'branch-aero',
    category_id: 'cat-aero-cfd',
    course_name: 'ANSYS Fluent Computational Fluid Dynamics (CFD)',
    title: 'ANSYS Fluent Computational Fluid Dynamics (CFD)',
    description: 'Simulate subsonic & supersonic airflow over NACA airfoils, calculate lift/drag coefficients, and shock wave locations.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'ANSYS Innovation - Aerodynamics CFD', url: 'https://ansys.com', isFree: true }
    ],
    platform: 'ANSYS Innovation',
    price: 'Free',
    isFree: true,
    skills: ['Computational Fluid Dynamics (CFD)', 'Flight Mechanics & Aerodynamics']
  },
  {
    id: 'course-aero-03',
    branch_id: 'branch-aero',
    category_id: 'cat-aero-drones',
    course_name: 'Drone Technology & UAV Flight Avionics',
    title: 'Drone Technology & UAV Flight Avionics',
    description: 'Design quadcopter frames, select brushless motors/ESCs, configure Pixhawk flight controllers, and program ArduPilot/PX4 autonomy.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Udemy - UAV Drone Design & Autopilot', url: 'https://udemy.com', isFree: false }
    ],
    platform: 'Udemy',
    price: '$19.99',
    isFree: false,
    skills: ['Drone Avionics & Flight Control', 'UAV Mechanical & Electronics Design']
  },

  // --- BIOTECHNOLOGY COURSES ---
  {
    id: 'course-biotech-01',
    branch_id: 'branch-biotech',
    category_id: 'cat-biotech-bioinfo',
    course_name: 'Bioinformatics Algorithms & Genomics',
    title: 'Bioinformatics Algorithms & Genomics',
    description: 'DNA sequence alignment (BLAST), gene expression analysis, phylogenetic tree construction, and genome assembly algorithms.',
    difficulty: 'Intermediate',
    estimated_learning_time: '35 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'Coursera - Bioinformatics Specialization', url: 'https://coursera.org', isFree: true }
    ],
    platform: 'Coursera',
    price: 'Free',
    isFree: true,
    skills: ['Bioinformatics Algorithms', 'Python for Genomic Data Analysis']
  },
  {
    id: 'course-biotech-02',
    branch_id: 'branch-biotech',
    category_id: 'cat-biotech-ai',
    course_name: 'AI in Biotechnology & Drug Discovery',
    title: 'AI in Biotechnology & Drug Discovery',
    description: 'Predict 3D protein folding structures with AlphaFold, virtual high-throughput screening of small molecule drug candidates.',
    difficulty: 'Advanced',
    estimated_learning_time: '45 Hours',
    certification_available: true,
    learning_resources: [
      { name: 'edX - AI in Healthcare & Biotechnology', url: 'https://edx.org', isFree: true }
    ],
    platform: 'edX',
    price: 'Free',
    isFree: true,
    skills: ['AI in Genomics & Drug Screening', 'Drug Discovery & Molecular Docking']
  }
];

const career_roles = [
  // Mechanical Roles
  { id: 'role-cad-engineer', role_name: 'CAD / Design Engineer', title: 'CAD / Design Engineer', branch_id: 'branch-mech', category: 'Design', averageSalary: '$65,000 /yr', demandLevel: 'High Demand', growthRate: '+8% Annual' },
  { id: 'role-cae-analyst', role_name: 'CAE / FEA Structural Analyst', title: 'CAE / FEA Structural Analyst', branch_id: 'branch-mech', category: 'Analysis', averageSalary: '$72,000 /yr', demandLevel: 'High Demand', growthRate: '+10% Annual' },
  { id: 'role-automation-engineer', role_name: 'Automation & Controls Engineer', title: 'Automation & Controls Engineer', branch_id: 'branch-mech', category: 'Automation', averageSalary: '$78,000 /yr', demandLevel: 'Very High Demand', growthRate: '+15% Annual' },

  // Civil Roles
  { id: 'role-struct-engineer', role_name: 'Structural Design Engineer', title: 'Structural Design Engineer', branch_id: 'branch-civil', category: 'Structures', averageSalary: '$68,000 /yr', demandLevel: 'High Demand', growthRate: '+7% Annual' },
  { id: 'role-bim-coordinator', role_name: 'BIM Coordinator / Manager', title: 'BIM Coordinator / Manager', branch_id: 'branch-civil', category: 'BIM', averageSalary: '$75,000 /yr', demandLevel: 'Very High Demand', growthRate: '+18% Annual' },
  { id: 'role-site-manager', role_name: 'Construction Project Engineer', title: 'Construction Project Engineer', branch_id: 'branch-civil', category: 'Management', averageSalary: '$70,000 /yr', demandLevel: 'High Demand', growthRate: '+9% Annual' },

  // ECE Roles
  { id: 'role-embedded-engineer', role_name: 'Embedded Systems Engineer', title: 'Embedded Systems Engineer', branch_id: 'branch-ece', category: 'Embedded Systems', averageSalary: '$82,000 /yr', demandLevel: 'Very High Demand', growthRate: '+14% Annual' },
  { id: 'role-vlsi-engineer', role_name: 'VLSI Design / RTL Verification Engineer', title: 'VLSI Design / RTL Verification Engineer', branch_id: 'branch-ece', category: 'Semiconductors', averageSalary: '$90,000 /yr', demandLevel: 'High Demand', growthRate: '+12% Annual' },

  // EEE Roles
  { id: 'role-power-engineer', role_name: 'Power Systems & Smart Grid Engineer', title: 'Power Systems & Smart Grid Engineer', branch_id: 'branch-eee', category: 'Power', averageSalary: '$76,000 /yr', demandLevel: 'High Demand', growthRate: '+10% Annual' },
  { id: 'role-ev-engineer', role_name: 'EV Powertrain & BMS Engineer', title: 'EV Powertrain & BMS Engineer', branch_id: 'branch-eee', category: 'Electric Vehicles', averageSalary: '$85,000 /yr', demandLevel: 'Very High Demand', growthRate: '+22% Annual' },

  // Aerospace Roles
  { id: 'role-aero-engineer', role_name: 'Aerospace Structural Engineer', title: 'Aerospace Structural Engineer', branch_id: 'branch-aero', category: 'Aerospace', averageSalary: '$88,000 /yr', demandLevel: 'High Demand', growthRate: '+11% Annual' },
  { id: 'role-uav-engineer', role_name: 'UAV / Drone Systems Engineer', title: 'UAV / Drone Systems Engineer', branch_id: 'branch-aero', category: 'Drones', averageSalary: '$80,000 /yr', demandLevel: 'Very High Demand', growthRate: '+25% Annual' },

  // Biotech Roles
  { id: 'role-bioinfo-scientist', role_name: 'Bioinformatics Data Scientist', title: 'Bioinformatics Data Scientist', branch_id: 'branch-biotech', category: 'Genomics', averageSalary: '$85,000 /yr', demandLevel: 'High Demand', growthRate: '+16% Annual' }
];

const internships_jobs = [
  // Mechanical Opportunities
  {
    id: 'opp-mech-01',
    branch_id: 'branch-mech',
    course_id: 'course-mech-03',
    role: 'CAD / Mechanical Design Intern',
    title: 'CAD / Mechanical Design Intern',
    company: 'Bosch Mobility Engineering',
    location: 'Bangalore, IN',
    isRemote: false,
    stipend: '₹25,000 /month',
    salary: '₹6.5 LPA',
    requirements: ['SolidWorks', 'Engineering Drawing & GD&T', 'AutoCAD'],
    applyUrl: 'https://bosch.com/careers',
    source: 'Bosch Careers Portal'
  },
  {
    id: 'opp-mech-02',
    branch_id: 'branch-mech',
    course_id: 'course-mech-13',
    role: 'PLC & Automation Engineer',
    title: 'PLC & Industrial Automation Engineer',
    company: 'Siemens Factory Automation',
    location: 'Pune, IN',
    isRemote: false,
    stipend: '₹30,000 /month',
    salary: '₹7.8 LPA',
    requirements: ['PLC & SCADA Programming', 'Industrial Automation', 'Python for Engineers'],
    applyUrl: 'https://siemens.com/careers',
    source: 'Siemens Jobs Portal'
  },

  // Civil Opportunities
  {
    id: 'opp-civil-01',
    branch_id: 'branch-civil',
    course_id: 'course-civil-03',
    role: 'Graduate Structural Engineer',
    title: 'Graduate Structural Design Engineer',
    company: 'L&T Construction',
    location: 'Chennai, IN',
    isRemote: false,
    stipend: '₹22,000 /month',
    salary: '₹6.2 LPA',
    requirements: ['ETABS', 'STAAD.Pro', 'Structural Mechanics & Analysis'],
    applyUrl: 'https://larsentoubro.com/careers',
    source: 'L&T Verified Portal'
  },

  // ECE Opportunities
  {
    id: 'opp-ece-01',
    branch_id: 'branch-ece',
    course_id: 'course-ece-03',
    role: 'Embedded Software Engineer Intern',
    title: 'Embedded Firmware Developer',
    company: 'Texas Instruments',
    location: 'Bangalore, IN',
    isRemote: false,
    stipend: '₹40,000 /month',
    salary: '₹12.0 LPA',
    requirements: ['Embedded C Programming', 'Embedded Systems Architecture', 'ARM Cortex-M'],
    applyUrl: 'https://ti.com/careers',
    source: 'TI Campus Portal'
  },

  // EEE Opportunities
  {
    id: 'opp-eee-01',
    branch_id: 'branch-eee',
    course_id: 'course-eee-08',
    role: 'EV Battery Management Systems Engineer',
    title: 'BMS Powertrain Engineer',
    company: 'Ather Energy / Tata Motors EV',
    location: 'Bangalore, IN',
    isRemote: false,
    stipend: '₹35,000 /month',
    salary: '₹9.5 LPA',
    requirements: ['Battery Management Systems (BMS)', 'Electric Vehicle Powertrain', 'MATLAB / Simulink Power Modelling'],
    applyUrl: 'https://atherenergy.com/careers',
    source: 'Ather Careers'
  },

  // CSE Opportunities
  {
    id: 'opp-cse-01',
    branch_id: 'branch-cse',
    course_id: 'course-cse-01',
    role: 'Software Engineering Intern',
    title: 'Software Development Engineering Intern',
    company: 'TechScale Innovations',
    location: 'Bangalore, IN',
    isRemote: true,
    stipend: '₹30,000 /month',
    salary: '₹10.5 LPA',
    requirements: ['Data Structures & Algorithms (DSA)', 'Git & GitHub', 'Python'],
    applyUrl: 'https://linkedin.com',
    source: 'Verified Portal'
  },

  // Data Science Opportunities
  {
    id: 'opp-ds-01',
    branch_id: 'branch-ds',
    course_id: 'course-ds-01',
    role: 'Data Analyst Intern',
    title: 'Junior Data Analyst Intern',
    company: 'Analytica Insights',
    location: 'Hyderabad, IN',
    isRemote: true,
    stipend: '₹28,000 /month',
    salary: '₹9.0 LPA',
    requirements: ['SQL', 'Python', 'Data Visualization'],
    applyUrl: 'https://linkedin.com',
    source: 'Verified Portal'
  },

  // AI & ML Opportunities
  {
    id: 'opp-aiml-01',
    branch_id: 'branch-aiml',
    course_id: 'course-aiml-01',
    role: 'Machine Learning Intern',
    title: 'AI & ML Engineer Trainee',
    company: 'NeuralTech AI Labs',
    location: 'Bangalore, IN',
    isRemote: true,
    stipend: '₹35,000 /month',
    salary: '₹14.0 LPA',
    requirements: ['Machine Learning', 'Python', 'PyTorch / TensorFlow'],
    applyUrl: 'https://linkedin.com',
    source: 'NeuralTech Careers'
  },

  // Aerospace Opportunities
  {
    id: 'opp-aero-01',
    branch_id: 'branch-aero',
    course_id: 'course-aero-01',
    role: 'UAV Flight Systems Intern',
    title: 'Drone Avionics & Flight Control Intern',
    company: 'SkyDynamics Aerospace',
    location: 'Hyderabad, IN',
    isRemote: false,
    stipend: '₹25,000 /month',
    salary: '₹8.0 LPA',
    requirements: ['Drone Avionics & Flight Control', 'Computational Fluid Dynamics (CFD)', 'Aircraft Structural Design'],
    applyUrl: 'https://skydynamics.aero/careers',
    source: 'SkyDynamics Portal'
  },

  // Biotech Opportunities
  {
    id: 'opp-biotech-01',
    branch_id: 'branch-biotech',
    course_id: 'course-biotech-01',
    role: 'Genomic Data Analyst Intern',
    title: 'Bioinformatics Research Intern',
    company: 'BioGenomics Labs',
    location: 'Pune, IN',
    isRemote: true,
    stipend: '₹24,000 /month',
    salary: '₹7.5 LPA',
    requirements: ['Bioinformatics Algorithms', 'Python for Genomic Data Analysis', 'R Programming for Biostatistics'],
    applyUrl: 'https://biogenomics.com/careers',
    source: 'BioGenomics Portal'
  }
];

const learning_roadmaps = [
  {
    id: 'roadmap-cad-engineer',
    branch_id: 'branch-mech',
    career_id: 'role-cad-engineer',
    career_name: 'CAD / Design Engineer',
    ordered_steps: [
      { step: 1, name: 'Engineering Drawing & GD&T', focus: 'Drafting standards & tolerance stack-up' },
      { step: 2, name: 'AutoCAD', focus: '2D orthographic drafting' },
      { step: 3, name: 'SolidWorks', focus: '3D parametric parts & assembly modeling' },
      { step: 4, name: 'CATIA V5', focus: 'Advanced surface modeling for automotive' },
      { step: 5, name: 'ANSYS FEA', focus: 'Structural stress & deformation verification' },
      { step: 6, name: 'CNC & Manufacturing Basics', focus: 'Design for Manufacturability (DFM)' }
    ]
  },
  {
    id: 'roadmap-automation-engineer',
    branch_id: 'branch-mech',
    career_id: 'role-automation-engineer',
    career_name: 'Automation & Controls Engineer',
    ordered_steps: [
      { step: 1, name: 'Industrial Automation Fundamentals', focus: 'Sensors, pneumatic actuators & relays' },
      { step: 2, name: 'PLC & SCADA Programming', focus: 'Ladder Logic programming on Siemens S7' },
      { step: 3, name: 'IoT for Manufacturing (IIoT)', focus: 'Factory telemetry protocols (MQTT/OPC-UA)' },
      { step: 4, name: 'Robotics Kinematics', focus: 'Robotic arm positioning & trajectory' },
      { step: 5, name: 'AI/ML for Predictive Maintenance', focus: 'Machine failure forecasting' }
    ]
  },
  {
    id: 'roadmap-struct-engineer',
    branch_id: 'branch-civil',
    career_id: 'role-struct-engineer',
    career_name: 'Structural Design Engineer',
    ordered_steps: [
      { step: 1, name: 'Structural Mechanics & Analysis', focus: 'Bending moment & shear force diagrams' },
      { step: 2, name: 'AutoCAD Civil 3D', focus: 'Structural framing 2D drawings' },
      { step: 3, name: 'STAAD.Pro', focus: '3D steel & concrete building modeling' },
      { step: 4, name: 'ETABS', focus: 'High-rise seismic tower analysis' },
      { step: 5, name: 'Revit Architecture & Structure', focus: 'BIM integration & rebar detailing' }
    ]
  },
  {
    id: 'roadmap-embedded-engineer',
    branch_id: 'branch-ece',
    career_id: 'role-embedded-engineer',
    career_name: 'Embedded Systems Engineer',
    ordered_steps: [
      { step: 1, name: 'Digital Electronics Logic Design', focus: 'Logic gates, registers & timers' },
      { step: 2, name: 'Embedded C Programming', focus: 'Pointer register manipulation & interrupts' },
      { step: 3, name: 'Arduino Microcontrollers', focus: 'Hardware sensor prototyping' },
      { step: 4, name: 'ESP32 & Wi-Fi Microcontrollers', focus: 'Wireless IoT telemetry' },
      { step: 5, name: 'PCB Design & Schematic Capture', focus: 'KiCad multi-layer PCB layout' },
      { step: 6, name: 'Verilog HDL / FPGA', focus: 'Hardware acceleration & RTL synthesis' }
    ]
  },
  {
    id: 'roadmap-ev-engineer',
    branch_id: 'branch-eee',
    career_id: 'role-ev-engineer',
    career_name: 'EV Powertrain & BMS Engineer',
    ordered_steps: [
      { step: 1, name: 'Electric Circuit Analysis', focus: 'AC/DC circuit fundamentals' },
      { step: 2, name: 'Power Electronics & Inverters', focus: 'DC-DC converters & motor drives' },
      { step: 3, name: 'MATLAB / Simulink Power Modelling', focus: 'Vehicle dynamics & battery simulation' },
      { step: 4, name: 'Electric Vehicle Powertrain', focus: 'BLDC/PMSM motor speed control' },
      { step: 5, name: 'Battery Management Systems (BMS)', focus: 'State of Charge (SoC) & thermal safety' }
    ]
  }
];

module.exports = {
  branches,
  categories,
  skills,
  courses,
  career_roles,
  internships_jobs,
  learning_roadmaps
};
