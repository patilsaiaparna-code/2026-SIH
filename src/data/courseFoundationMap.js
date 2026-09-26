/**
 * Course-Specific Recommended Prerequisite Courses and Foundation Mappings
 * Maps every selected course to its course-specific recommended next/prerequisite course
 * and its 3-4 course-specific foundational pillars.
 */

const courseFoundationMap = {
  // --- MECHANICAL COURSES ---
  'solidworks': {
    recommendedCourse: {
      title: 'Engineering Drawing & CAD Essentials',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Engineering Drawing', icon: '📐', desc: 'Drafting standards & projections' },
      { name: 'CAD Basics', icon: '💻', desc: '2D geometric sketching' },
      { name: 'GD&T Basics', icon: '📏', desc: 'Geometric dimensioning & tolerances' }
    ]
  },
  'autocad': {
    recommendedCourse: {
      title: 'Engineering Drawing & CAD Essentials',
      platform: 'Autodesk Academy',
      priceTag: 'FREE',
      url: 'https://autodesk.com'
    },
    foundation: [
      { name: 'Engineering Drawing', icon: '📐', desc: 'Technical sketching & views' },
      { name: '2D CAD Basics', icon: '💻', desc: 'Coordinate systems & layers' }
    ]
  },
  'catia': {
    recommendedCourse: {
      title: 'SolidWorks 3D Modeling & Assemblies',
      platform: 'Dassault Learning Hub',
      priceTag: '$49.99',
      url: 'https://3ds.com'
    },
    foundation: [
      { name: 'Engineering Drawing', icon: '📐', desc: 'Drafting standards & GD&T' },
      { name: '3D CAD Basics', icon: '💻', desc: 'Parametric wireframe modeling' },
      { name: 'Solid Modelling', icon: '🧊', desc: 'Part feature generation' }
    ]
  },
  'ansys': {
    recommendedCourse: {
      title: 'SolidWorks 3D Modeling & Assemblies',
      platform: 'ANSYS Innovation',
      priceTag: 'FREE',
      url: 'https://ansys.com'
    },
    foundation: [
      { name: 'Engineering Mechanics', icon: '⚙️', desc: 'Stress, strain & vector forces' },
      { name: 'Engineering Mathematics', icon: '🧮', desc: 'Differential equations & matrices' },
      { name: 'CAD/Model Geometry', icon: '📐', desc: 'Clean geometry preparation' }
    ]
  },
  'cnc': {
    recommendedCourse: {
      title: 'Engineering Drawing & CAD Essentials',
      platform: 'NPTEL',
      priceTag: 'FREE',
      url: 'https://nptel.ac.in'
    },
    foundation: [
      { name: 'Manufacturing Processes', icon: '🏭', desc: 'Machining, milling & turning' },
      { name: 'G-Code & M-Code Basics', icon: '💻', desc: 'CNC controller syntax' }
    ]
  },
  'plc': {
    recommendedCourse: {
      title: 'Industrial Automation & Mechatronics',
      platform: 'Udemy',
      priceTag: '$19.99',
      url: 'https://udemy.com'
    },
    foundation: [
      { name: 'Electrical Circuits', icon: '⚡', desc: 'AC/DC voltage & current laws' },
      { name: 'Digital Logic', icon: '🔢', desc: 'AND/OR/NOT logic gates' },
      { name: 'Control Systems Basics', icon: '🎛️', desc: 'Feedback loops & relays' }
    ]
  },
  'robotics': {
    recommendedCourse: {
      title: 'Industrial Automation & Mechatronics',
      platform: 'edX',
      priceTag: 'FREE',
      url: 'https://edx.org'
    },
    foundation: [
      { name: 'Programming Basics', icon: '💻', desc: 'Algorithms & logic flow' },
      { name: 'Electronics Basics', icon: '⚡', desc: 'Sensors, actuators & drivers' },
      { name: 'Control Systems', icon: '🤖', desc: 'Kinematics & feedback loops' }
    ]
  },
  'industrial automation': {
    recommendedCourse: {
      title: 'PLC & SCADA Industrial Automation',
      platform: 'Udemy',
      priceTag: '$14.99',
      url: 'https://udemy.com'
    },
    foundation: [
      { name: 'Electrical Circuits', icon: '⚡', desc: 'Relays & contactors' },
      { name: 'Sensors & Actuators', icon: '🔌', desc: 'Pneumatics & hydraulics' }
    ]
  },

  // --- CIVIL COURSES ---
  'etabs': {
    recommendedCourse: {
      title: 'Structural Analysis Fundamentals',
      platform: 'CSI America',
      priceTag: 'FREE',
      url: 'https://csiamerica.com'
    },
    foundation: [
      { name: 'Structural Analysis', icon: '🏗️', desc: 'Bending moment & shear diagrams' },
      { name: 'Engineering Mechanics', icon: '⚙️', desc: 'Statics & vector equilibrium' },
      { name: 'AutoCAD Civil', icon: '📐', desc: '2D structural framing plans' }
    ]
  },
  'staad': {
    recommendedCourse: {
      title: 'Structural Analysis Fundamentals',
      platform: 'Bentley Institute',
      priceTag: 'FREE',
      url: 'https://bentley.com'
    },
    foundation: [
      { name: 'Structural Analysis', icon: '🏗️', desc: 'Truss & beam loading' },
      { name: 'Strength of Materials', icon: '🧱', desc: 'Stress-strain behavior' }
    ]
  },
  'revit': {
    recommendedCourse: {
      title: 'AutoCAD Civil 3D Infrastructure Drafting',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Architectural Drafting', icon: '✏️', desc: 'Plan & section drawings' },
      { name: 'BIM Concepts', icon: '🏛️', desc: 'Parametric building elements' }
    ]
  },
  'gis': {
    recommendedCourse: {
      title: 'Total Station & Land Surveying',
      platform: 'QGIS Academy',
      priceTag: 'FREE',
      url: 'https://qgis.org'
    },
    foundation: [
      { name: 'Surveying Fundamentals', icon: '🗺️', desc: 'Coordinates & contouring' },
      { name: 'Geography/GIS Basics', icon: '🌍', desc: 'Raster & vector spatial layers' }
    ]
  },

  // --- ECE COURSES ---
  'embedded c': {
    recommendedCourse: {
      title: 'Digital Electronics & Logic Design',
      platform: 'Udemy',
      priceTag: '$19.99',
      url: 'https://udemy.com'
    },
    foundation: [
      { name: 'C Programming', icon: '💻', desc: 'Pointers, memory & data types' },
      { name: 'Digital Electronics', icon: '🔢', desc: 'Logic gates & registers' },
      { name: 'Microcontrollers', icon: '🔌', desc: 'GPIO pins & hardware timers' }
    ]
  },
  'digital electronics': {
    recommendedCourse: {
      title: 'Analog Electronics & Op-Amp Circuit Design',
      platform: 'NPTEL',
      priceTag: 'FREE',
      url: 'https://nptel.ac.in'
    },
    foundation: [
      { name: 'Boolean Algebra', icon: '🔢', desc: 'K-maps & logic minimization' },
      { name: 'Circuit Theory', icon: '⚡', desc: 'Voltage, current & Ohm\'s law' }
    ]
  },
  'vlsi': {
    recommendedCourse: {
      title: 'Digital Electronics & Logic Design',
      platform: 'NPTEL',
      priceTag: 'FREE',
      url: 'https://nptel.ac.in'
    },
    foundation: [
      { name: 'Digital Electronics', icon: '🔢', desc: 'Logic design & flip-flops' },
      { name: 'Semiconductor Basics', icon: '⚡', desc: 'CMOS operation & IV curves' },
      { name: 'Verilog Basics', icon: '💻', desc: 'RTL hardware modeling' }
    ]
  },
  'pcb design': {
    recommendedCourse: {
      title: 'Analog Electronics & Op-Amp Circuit Design',
      platform: 'KiCad Academy',
      priceTag: 'FREE',
      url: 'https://kicad.org'
    },
    foundation: [
      { name: 'Analog Electronics', icon: '⚡', desc: 'Amplifiers & passive components' },
      { name: 'Digital Electronics', icon: '🔢', desc: 'High speed signal traces' },
      { name: 'Circuit Design', icon: '🔌', desc: 'Schematic capture & netlists' }
    ]
  },
  'arduino': {
    recommendedCourse: {
      title: 'Digital Electronics & Logic Design',
      platform: 'Arduino Hub',
      priceTag: 'FREE',
      url: 'https://arduino.cc'
    },
    foundation: [
      { name: 'C Syntax Basics', icon: '💻', desc: 'Variables, loops & functions' },
      { name: 'Circuit Basics', icon: '⚡', desc: 'LEDs, resistors & breadboards' }
    ]
  },

  // --- EEE COURSES ---
  'circuit design': {
    recommendedCourse: {
      title: 'MATLAB/Simulink Power Systems Simulation',
      platform: 'NPTEL',
      priceTag: 'FREE',
      url: 'https://nptel.ac.in'
    },
    foundation: [
      { name: 'Ohm & Kirchhoff Laws', icon: '⚡', desc: 'Voltage & current node equations' },
      { name: 'Network Theorems', icon: '🧮', desc: 'Thevenin, Norton & superposition' }
    ]
  },
  'matlab/simulink': {
    recommendedCourse: {
      title: 'Electric Circuit Design & Network Theory',
      platform: 'MathWorks Academy',
      priceTag: 'FREE',
      url: 'https://mathworks.com'
    },
    foundation: [
      { name: 'Engineering Mathematics', icon: '🧮', desc: 'Differential equations & linear algebra' },
      { name: 'Basic Programming', icon: '💻', desc: 'Vectorization & scripts' },
      { name: 'Numerical Methods', icon: '🔢', desc: 'Iterative solvers & Simscape' }
    ]
  },
  'power systems': {
    recommendedCourse: {
      title: 'Electric Circuit Design & Network Theory',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Electrical Circuits', icon: '⚡', desc: 'AC 3-phase systems & power factor' },
      { name: 'Electrical Machines', icon: '⚙️', desc: 'Generators & power transformers' },
      { name: 'Power Engineering Basics', icon: '🔌', desc: 'Transmission lines & load flows' }
    ]
  },
  'ev technology': {
    recommendedCourse: {
      title: 'Power Electronics & Motor Inverters',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Electrical Machines', icon: '⚙️', desc: 'BLDC & PMSM motor speed control' },
      { name: 'Power Electronics', icon: '⚡', desc: 'Inverters & DC-DC converters' },
      { name: 'Battery Fundamentals', icon: '🔋', desc: 'Li-ion cells & pack cooling' }
    ]
  },
  'battery management': {
    recommendedCourse: {
      title: 'Electric Vehicle (EV) Technology & Powertrains',
      platform: 'Udemy',
      priceTag: '$24.99',
      url: 'https://udemy.com'
    },
    foundation: [
      { name: 'Li-ion Cell Electrochemistry', icon: '🔋', desc: 'Anode/cathode voltage curves' },
      { name: 'Power Electronics', icon: '⚡', desc: 'DC-DC converters & balancing' },
      { name: 'Control Algorithms', icon: '🎛️', desc: 'State of Charge (SoC) estimation' }
    ]
  },

  // --- BIOTECH COURSES ---
  'bioinformatics': {
    recommendedCourse: {
      title: 'Python for Biotechnology & Genomics',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Molecular Biology', icon: '🧬', desc: 'DNA, RNA & protein translation' },
      { name: 'Biology Fundamentals', icon: '🔬', desc: 'Cell structures & enzymes' },
      { name: 'Basic Programming', icon: '💻', desc: 'Data parsing & script logic' }
    ]
  },
  'computational biology': {
    recommendedCourse: {
      title: 'Bioinformatics Algorithms & Genomics',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Molecular Biology', icon: '🧬', desc: 'Genomics & proteomics' },
      { name: 'Statistics', icon: '📊', desc: 'Biostatistics & probability' },
      { name: 'Programming', icon: '💻', desc: 'Python / R algorithms' }
    ]
  },

  // --- AEROSPACE COURSES ---
  'python for aerospace': {
    recommendedCourse: {
      title: 'CATIA V5 Aerospace Structural Design',
      platform: 'Dassault Academy',
      priceTag: 'FREE',
      url: 'https://3ds.com'
    },
    foundation: [
      { name: 'Python Programming Basics', icon: '🐍', desc: 'NumPy & SciPy numerical arrays' },
      { name: 'Mathematics', icon: '🧮', desc: 'Flight dynamics equations' },
      { name: 'Aerospace Fundamentals', icon: '✈️', desc: 'Lift, drag & propulsion' }
    ]
  }
};

/**
 * Get Course-Specific Recommended Course and Course-Specific Foundation
 */
function getCourseSpecificDetails(courseName = '', branchName = '') {
  const norm = String(courseName).trim().toLowerCase();

  // Find exact or partial key match in courseFoundationMap
  for (const key of Object.keys(courseFoundationMap)) {
    if (norm.includes(key)) {
      return courseFoundationMap[key];
    }
  }

  // Fallback defaults for general software / CS courses
  if (norm.includes('python') || norm.includes('dsa') || norm.includes('data structure')) {
    return {
      recommendedCourse: {
        title: 'Data Structures & Algorithms (DSA)',
        platform: 'FreeCodeCamp',
        priceTag: 'FREE',
        url: 'https://freecodecamp.org'
      },
      foundation: [
        { name: 'Python Syntax', icon: '🐍', desc: 'Core syntax & logic' },
        { name: 'Programming Fundamentals', icon: '💻', desc: 'Control flow & functions' },
        { name: 'SQL Basics', icon: '📊', desc: 'Querying databases' },
        { name: 'Git & GitHub', icon: '🐙', desc: 'Version control' }
      ]
    };
  }

  // Default domain fallback based on branch
  if (branchName.toLowerCase().includes('mech')) {
    return courseFoundationMap['solidworks'];
  }
  if (branchName.toLowerCase().includes('civil')) {
    return courseFoundationMap['etabs'];
  }
  if (branchName.toLowerCase().includes('ece') || branchName.toLowerCase().includes('eee')) {
    return courseFoundationMap['embedded c'];
  }
  if (branchName.toLowerCase().includes('bio')) {
    return courseFoundationMap['bioinformatics'];
  }

  return {
    recommendedCourse: {
      title: 'Programming Fundamentals & Software Design',
      platform: 'Coursera',
      priceTag: 'FREE',
      url: 'https://coursera.org'
    },
    foundation: [
      { name: 'Core Syntax & Logic', icon: '💻', desc: 'Programming fundamentals' },
      { name: 'Problem Solving', icon: '🧠', desc: 'Algorithms & logic' },
      { name: 'Version Control', icon: '🐙', desc: 'Git & repository basics' }
    ]
  };
}

module.exports = {
  courseFoundationMap,
  getCourseSpecificDetails
};
