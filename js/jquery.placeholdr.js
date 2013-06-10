/*************************************************!
 *
 *   project:   placeholder replacement for older browsers
 *   author:    Marco Senkpiel
 *   url:
 *   demo:
 *   download:
 *
 *   Version:   0.1
 *   Copyright: (c) 2013 Marco Senkpiel
 *   Licence:   MIT
 *
 **************************************************/

;(function ( $, window, document, undefined ) {

    var pluginName = 'placeholdr';
    var defaults = {
        inactiveClass: ''
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        var scope = this;
        var field = $(this.element);
        var placeholderText = field.data('placeholder');

        if(placeholderText){

            field.val(placeholderText);

            if(this.options.inactiveClass != ''){
                field.addClass(this.options.inactiveClass);
            }

            field.on('focus', function(){
                var v = $.trim(field.val());
                if(v == placeholderText){
                    field.val('');
                    field.removeClass(scope.options.inactiveClass);
                }
            });

            field.on('blur', function(){
                var v = $.trim(field.val());
                if(v == placeholderText || v == ''){
                    field.val(placeholderText);
                    if(scope.options.inactiveClass != ''){
                        field.addClass(scope.options.inactiveClass);
                    }
                }
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );
