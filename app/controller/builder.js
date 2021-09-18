
const { Controller } = require('egg');

class BuilderController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('index');
    ctx.body = 'hi, builder';
  }
  async createPage() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      data: null
    };
  }
}

module.exports = BuilderController;
