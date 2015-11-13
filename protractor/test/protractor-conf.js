exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'], //any file that ends in spec.js will be called
    rootElement: 'body' //where your ng-app is. defaults to body, so need to specify
};
