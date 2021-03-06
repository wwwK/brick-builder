module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/page', controller.builder.index);
  router.post('/page', controller.builder.createPage);
};
