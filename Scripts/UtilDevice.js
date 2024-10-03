// File: UtilDevice.js
// Date: 2024-10-03
// Author: Gunnar Lidén

// File content
// =============
//
// Class with device functions

class UtilDevice
{
    // Returns true for a device of type mobile
    // https://www.tutorialspoint.com/how-to-detect-a-mobile-device-with-javascript
    static isMobile()
    {
        var is_mobile = null;

        //QQ alert("UtilDevice.isMobile navigator.userAgent= " + navigator.userAgent)

        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) 
        {
            is_mobile = true ;
        } 
        else 
        {
            is_mobile= false ;
        }

        return is_mobile;

    } // isMobile

    // Returns the screen width
    // https://www.sencha.com/blog/js-frameworks-javascript-for-device-characteristic-detection/
    static screenWidth()
    {
        const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        return screen_width;

    } // screenWidth

    // Returns the screen height
    static screenHeight()
    {
        const screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        return screen_height;
        
    } // screenHeight

    // Returns true if the orientation is portrait
    // https://www.capscode.in/blog/how-to-detect-screen-orientation-using-javascript
    static isPortrait()
    {
        if (window.matchMedia("(orientation: portrait)").matches) 
        {
           return true;
        }
        else
        {
            return false;
        }
          
    } // isPortrait

    // Returns true if the orientation is landscape
    // https://www.capscode.in/blog/how-to-detect-screen-orientation-using-javascript
    static isLandscape()
    {
        if (window.matchMedia("(orientation: landscape)").matches) 
        {
           return true;
        }
        else
        {
            return false;
        }
          
    } // isLandscape

} // UtilDevice