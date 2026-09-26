function generateLearningPlan(totalDays = 30, hoursPerWeek = 5, goal = 'Data Scientist') {
  const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
  const weeklyHours = Math.max(2, hoursPerWeek);

  const weeklySchedule = [];

  const normGoal = goal.toLowerCase();
  let w1Focus = `Master core syntax, basic tools, and environment setup for ${goal}.`;
  let w1Tasks = [
    `Setup development environment & IDE for ${goal}`,
    `Complete core tutorial modules (3 Hours)`,
    `Practice 15 fundamental exercises`,
    `Push sample project repository`
  ];
  let w2Focus = `Intermediate skill application & domain problem solving.`;
  let w2Tasks = [
    `Master core libraries/tools for ${goal}`,
    `Solve 10 domain-specific practical problems`,
    `Build a basic automation or analysis script`
  ];

  if (normGoal.includes('embedded') || normGoal.includes('firmware') || normGoal.includes('iot')) {
    w1Focus = `Master C programming pointers, microcontroller registers, and Keil/Arduino IDE setup for ${goal}.`;
    w1Tasks = [
      "Setup Keil uVision / Arduino IDE / VS Code for Embedded C",
      "Complete C Pointers, Bitwise Operations & Structs module",
      "Write 5 GPIO LED blinking & button interrupt scripts",
      "Initialize GitHub repository with hardware pinout diagrams"
    ];
    w2Focus = `Microcontroller timers, ADC/DAC, and I2C/SPI hardware protocols.`;
    w2Tasks = [
      "Master I2C & SPI sensor communication (e.g. MPU6050 / OLED display)",
      "Configure hardware Timer Interrupts & Pulse Width Modulation (PWM)",
      "Build a serial UART telemetry logger script"
    ];
  } else if (normGoal.includes('vlsi') || normGoal.includes('verilog')) {
    w1Focus = `Digital electronics logic gates, Boolean algebra, and Icarus Verilog / ModelSim setup.`;
    w1Tasks = [
      "Setup Icarus Verilog & GTKWave simulation environment",
      "Design 5 combinational logic circuits (Mux, Decoder, Full Adder)",
      "Write Verilog HDL testbenches and verify waveforms",
      "Push Verilog RTL source files to GitHub"
    ];
    w2Focus = `Sequential logic, finite state machines (FSM), and RTL synthesis.`;
    w2Tasks = [
      "Design 8-bit registers, counters, and shift registers in Verilog",
      "Implement FSM controller for a traffic light or UART state machine",
      "Run static timing analysis and verify gate counts"
    ];
  } else if (normGoal.includes('cad') || normGoal.includes('mechanical') || normGoal.includes('robot')) {
    w1Focus = `Engineering drawing fundamentals, GD&T rules, and SolidWorks/AutoCAD setup.`;
    w1Tasks = [
      "Setup SolidWorks / AutoCAD 3D design workspace",
      "Complete 2D orthographic drafting & dimensioning exercises",
      "Master sketch constraints, extrude, revolve, and sweep features",
      "Document drafting standards in portfolio notes"
    ];
    w2Focus = `3D parametric parts, assembly modeling, and bill of materials (BOM).`;
    w2Tasks = [
      "Model 5 parametric mechanical components with mates & constraints",
      "Build a 3D assembly model (e.g. gearbox or robotic link)",
      "Perform basic ANSYS FEA stress & displacement verification"
    ];
  } else if (normGoal.includes('structur') || normGoal.includes('bim') || normGoal.includes('civil')) {
    w1Focus = `Structural mechanics, load distribution, and AutoCAD Civil 3D / ETABS setup.`;
    w1Tasks = [
      "Setup AutoCAD Civil 3D & ETABS / Revit structural workspace",
      "Calculate shear force & bending moment diagrams for 5 beam cases",
      "Draw 2D structural framing plans & grid layouts",
      "Document IS 456 / ACI structural code compliance"
    ];
    w2Focus = `3D building framing modeling, seismic analysis, and rebar detailing.`;
    w2Tasks = [
      "Model a 3D multi-story RC building frame in ETABS",
      "Apply dead, live, and wind/seismic load combinations",
      "Generate column & beam rebar detailing schedules"
    ];
  } else if (normGoal.includes('automation') || normGoal.includes('power') || normGoal.includes('eee')) {
    w1Focus = `Electric circuit analysis, ladder logic fundamentals, and MATLAB/Simulink setup.`;
    w1Tasks = [
      "Setup MATLAB / Simulink or Siemens LOGO! PLC simulator",
      "Complete AC/DC circuit analysis & motor speed control modules",
      "Write 5 basic Ladder Logic automation routines (timers, counters)",
      "Document relay control logic diagrams"
    ];
    w2Focus = `PLC HMI integration & power electronics Simulink simulation.`;
    w2Tasks = [
      "Simulate DC-DC buck/boost converter in MATLAB Simulink",
      "Build an automated industrial conveyor PLC control sequence",
      "Configure SCADA HMI telemetry dashboard"
    ];
  } else if (normGoal.includes('bio') || normGoal.includes('genom')) {
    w1Focus = `Python/R syntax, genomic FASTA/FASTQ data formats, and Jupyter setup.`;
    w1Tasks = [
      "Setup Jupyter Notebook & Biopython / Bioconductor packages",
      "Parse genomic sequence files (FASTA/FASTQ) using Python",
      "Calculate GC content, ORF translation, and codon usage bias",
      "Push computational biology scripts to GitHub"
    ];
    w2Focus = `Sequence alignment algorithms and biostatistical hypothesis testing.`;
    w2Tasks = [
      "Implement Needleman-Wunsch & Smith-Waterman pairwise alignment",
      "Perform R differential gene expression analysis on RNA-seq data",
      "Generate phylogenetic tree diagrams"
    ];
  }

  for (let week = 1; week <= totalWeeks; week++) {
    if (week === 1) {
      weeklySchedule.push({
        week: 1,
        title: `Week 1: Core Fundamentals & Setup (${weeklyHours} Hours)`,
        focus: w1Focus,
        tasks: w1Tasks
      });
    } else if (week === 2) {
      weeklySchedule.push({
        week: 2,
        title: `Week 2: Intermediate Concepts & Application (${weeklyHours} Hours)`,
        focus: w2Focus,
        tasks: w2Tasks
      });
    } else if (week === 3) {
      weeklySchedule.push({
        week: 3,
        title: `Week 3: Practical Hands-on Project (${weeklyHours} Hours)`,
        focus: `Combine core skills into a portfolio capstone project for ${goal}.`,
        tasks: [
          `Build a simple ${goal} baseline project component`,
          "Create a clean GitHub repository with documented README",
          "Write 3 key takeaways explaining technical implementation decisions"
        ]
      });
    } else {
      weeklySchedule.push({
        week: week,
        title: `Week ${week}: Portfolio Polish & Opportunity Applications (${weeklyHours} Hours)`,
        focus: `Refine resume tags and submit targeted internship/job applications for ${goal}.`,
        tasks: [
          "Format resume highlighting 2 concrete project links & core skills",
          "Apply to 5 verified internship/job roles matching your skill stack",
          "Review interview questions for domain technical assessments"
        ]
      });
    }
  }

  const skillsToSkipForNow = [
    "❌ Advanced Deep Learning & Multi-GPU Training (Defer until fundamentals are solid)",
    "❌ Complex Microservice Infrastructure & Kubernetes (Focus on core APIs first)",
    "❌ Collecting 5+ Beginner Certificates (Focus on building 1 solid portfolio project instead)"
  ];

  return {
    goal,
    totalDays,
    hoursPerWeek: weeklyHours,
    totalEstimatedHours: totalWeeks * weeklyHours,
    totalWeeks,
    weeklySchedule,
    skillsToSkipForNow,
    focusStatement: `You don't need to learn everything. Focus strictly on the 2 core skills required for ${goal} within your ${totalDays}-day timeframe.`
  };
}

module.exports = { generateLearningPlan };
