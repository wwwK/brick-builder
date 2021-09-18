
const { Controller } = require('egg');

class BuilderController extends Controller {
  async createPage() {
    const { ctx } = this;
    console.log(ctx);
  }
}

module.exports = BuilderController;
