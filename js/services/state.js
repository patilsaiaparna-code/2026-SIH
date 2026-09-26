const STORAGE_KEY = 'studenthub_profile_v1';

const defaultProfile = {
  branch: "Computer Science & Engineering (CSE)",
  year: "2nd Year",
  interest: "Data Science",
  targetRole: "Data Scientist",
  currentSkills: ["Python", "SQL"],
  availableHoursPerWeek: 5,
  availablePeriod: "30 Days"
};

class StateManager {
  constructor() {
    this.listeners = [];
    this.profile = this.loadProfile();
  }

  loadProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultProfile, ...JSON.parse(stored) };
    } catch (e) {
      console.warn("Failed to load profile from localStorage:", e);
    }
    return defaultProfile;
  }

  saveProfile(updatedProfile) {
    this.profile = { ...this.profile, ...updatedProfile };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      console.warn("Failed to save profile to localStorage:", e);
    }
    this.notify();
  }

  getProfile() {
    return { ...this.profile };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.profile));
  }
}

export const stateManager = new StateManager();
