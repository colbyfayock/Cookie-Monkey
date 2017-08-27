// Cookie Monkey
// --
// Get and set cookies
// monkey.set( name, value, days)
// monkey.get( name )
// monkey.remove( name )
// --
// via http://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie

(function(){

    var cookie_handler = {};

    function get_future_time(current_time, days) {
        return current_time + ( days * 24 * 60 * 60 * 1000 );
    }

    function get_expiration(days) {

        if ( !days ) return '';
        
        var date = new Date();
        
        date.setTime( get_future_time(date.getTime(), days) );
        
        return '; expires=' + date.toGMTString();

    }

    function get_domain() {
        return location.host.replace('www.', '');
    }

    cookie_handler.set = function( name, c_value, c_days ) {
        document.cookie = name + '=' + c_value + get_expiration(c_days) + '; path=/; domain=.' + get_domain();
    }

    cookie_handler.get = function( name ) {

        var cookie_length = document.cookie.length,
            start,
            end;

        if ( cookie_length === 0 ) return null;

        start = document.cookie.indexOf( name + '=' );

        if ( start === -1 ) return null;

        start = start + name.length + 1;
        end = document.cookie.indexOf(";", start);

        if ( end === -1 ) {
            end = cookie_length;
        }

        return unescape(document.cookie.substring(start, end));

    }

    cookie_handler.remove = function( name ) {
        this.set( name, '', -1 );
    }

    window.monkey = cookie_handler;

});