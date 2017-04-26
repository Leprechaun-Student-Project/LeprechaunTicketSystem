module.exports = function (db) {

    function get(req, res) {
        console.log('here1');
    }

    function post(req, res) {
      console.log('here2');
      console.log(req.body)
      let ticket=req.body;
      for(let k in ticket){
          console.log(k)
          if(k.match(/([<>&])./gm)){
              console.log('bad')
          }
      }
        res.status(201)
            .json({
                result: {
                    status: 'success'
                }
            });
    }

    function put(req, res) {
       console.log('here3');
    }

    return {
        get: get,
        post: post,
        put: put
    };
};
