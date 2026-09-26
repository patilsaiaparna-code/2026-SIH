const repository = require('../db/repository');

const roleService = {
  async getAllRoles() {
    return await repository.getCareerRoles();
  },

  async getRoleByName(name) {
    return await repository.getCareerRoleByName(name);
  }
};

module.exports = roleService;
