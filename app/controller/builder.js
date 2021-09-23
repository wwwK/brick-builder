'use strict';

const { Controller } = require('egg');
const { updateResFile } = require('../services/builder');

class BuilderController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, builder';
  }
  async createPage() {
    const { ctx } = this;
    const { modules } = ctx.request.body;
    try {
      await updateResFile(JSON.stringify(modules));
      ctx.body = {
        success: true,
        data: null,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        success: false,
        data: null,
      };
    }
  }
}

module.exports = BuilderController;
