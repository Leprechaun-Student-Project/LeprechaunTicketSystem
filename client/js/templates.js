  const handlebars = window.handlebars || window.Handlebars,
      cache = {};

  function get(name) {
      const promise = new Promise(function(resolve, reject) {
          if (cache[name]) {
              resolve(cache[name]);
              return;
          }
          const url = `templates/${name}.handlebars`;
          $.get(url, function(html) {
              const template = handlebars.compile(html);
              cache[name] = template;
              resolve(template);
          });
      });
      return promise;
  }

  export {
      get
  };
