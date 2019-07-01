exports.getIndexPage = (req, res, next) => {

  res.render('index', {
    pageTitle: 'Searchflix',
    path: '/',
    results: null
  });
};
