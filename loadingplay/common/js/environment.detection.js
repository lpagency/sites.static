(function($){

    const local = 1;
    const ondev = 2;
    const prod = 3;

    var environment = prod;  // by default

    var isLocalHost = function() 
    {
        return document.location.href.indexOf('localhost') != -1;
    };

    var isDevelopment = function() 
    {
        return document.location.href.indexOf('ondev.today') != -1;
    };

    var detectEnvironment = function()
    {
        if (isLocalHost())
        {
            return local;
        }
        else if (isDevelopment())
        {
            return ondev;
        }

        return prod;
    };

    // detect environment once on the pages lifecycle
    environment = detectEnvironment();

    /**
     * return the corresponding variable for the current environment
     * @param  {Object} local_var variable for "localhost"
     * @param  {Object} ondev_var variable for "ondev"
     * @param  {Object} prod_var  variable for "Production"
     * @return {Object}           any of the given variables
     * @example
     * var api_url = $.environment('localhost:8521',
     *                             'apibodegas.ondev.today',
     *                             'apibodegas.loadingplay.com');
     */
    $.environmentVar = function(local_var, ondev_var, prod_var)
    {
        if (environment === local)
        {
            return local_var;
        }

        if (environment === ondev)
        {
            return ondev_var;
        }

        if (environment === prod)
        {
            return prod_var;
        }
    };

})(jQuery);
