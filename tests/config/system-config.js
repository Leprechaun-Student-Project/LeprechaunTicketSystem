SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'json-requester': '../js/json-requester.js',
        'data': '../js/data.js',
        'json-requester': '../js/json-requester.js'
    }
});
