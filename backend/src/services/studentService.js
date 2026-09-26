const repository = require('../db/repository');

const memoryStudents = new Map();

const studentService = {
  async saveStudentProfile(data) {
    const student = {
      id: data.id || `student-${Date.now()}`,
      branch: data.branch || 'CSE',
      year: data.year || '2nd Year',
      interest: data.interest || 'Data Science',
      targetRole: data.targetRole || 'Data Scientist',
      currentSkills: Array.isArray(data.currentSkills) ? data.currentSkills : ['Python', 'SQL'],
      availableHoursPerWeek: Number(data.availableHoursPerWeek) || 5,
      availablePeriod: data.availablePeriod || '30 Days',
      updatedAt: new Date().toISOString()
    };

    memoryStudents.set(student.id, student);
    return student;
  },

  async getStudentProfile(id) {
    if (memoryStudents.has(id)) {
      return memoryStudents.get(id);
    }
    return {
      id: id || 'default-student',
      branch: 'CSE',
      year: '2nd Year',
      interest: 'Data Science',
      targetRole: 'Data Scientist',
      currentSkills: ['Python', 'SQL'],
      availableHoursPerWeek: 5,
      availablePeriod: '30 Days'
    };
  }
};

module.exports = studentService;
