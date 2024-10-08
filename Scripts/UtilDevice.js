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

    /////////////////////////////////////////////////////////////////////////
    //////// Start Fullscreen Functions /////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    // Open fullscreen for an element
    // Input: Element that shall be displayed in fullscreen
    // Get the documentElement (<html>) to display the page in fullscreen
    // var elem = document.documentElement;
    static openFullScreen(i_element)
    {
        // https://www.w3schools.com/howto/howto_js_fullscreen.asp
        // 
        if (i_element == null)
        {
            alert("openFullScreenForElement Input element is null");
    
            return;
        }
    
        if (i_element.requestFullscreen) 
        {
            i_element.requestFullscreen();
        } 
        else if (i_element.webkitRequestFullscreen) 
        { // Safari 
        i_element.webkitRequestFullscreen();
        } 
        else if (elem.msRequestFullscreen) 
        { // IE11 
            i_element.msRequestFullscreen();
        }
    
    } // openFullScreenForElement

    static closeFullscreen() 
    {
        if (document.exitFullscreen) 
        {
          document.exitFullscreen();
        } 
        else if (document.webkitExitFullscreen) 
        { // Safari 
          document.webkitExitFullscreen();
        } 
        else if (document.msExitFullscreen) 
        { // IE11 
          document.msExitFullscreen();
        }
        
    } // closeFullscreen

    /*
    static isFullScreenEnabled()
    {
        // https://pretagteam.com/question/how-to-detect-if-user-has-enabled-full-screen-in-browser
        
        //console.log("isFullScreenEnabled Width diff = "  + (screen.width - window.innerWidth).toString() + 
        //" Height diff = "  + (screen.height - window.innerHeight).toString());
        
        if (screen.width == window.innerWidth && screen.height == window.innerHeight)
        {
            return true;
        }
        else if (browserWindowHasDesktopWidth() && screen.height == window.innerHeight)
        {
            // For the case debug (F12) mode where screen.width != window.innerWidth for full screen
            return true;
        }
        else
        {
            return false;
        }
    
    } // isFullScreenEnabled
    */

    /////////////////////////////////////////////////////////////////////////
    //////// End Fullscreen Functions ///////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////


/*
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Fullscreen Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////




// Returns true if full screen has been enabled in the browser
function isFullScreenEnabled()
{
// https://pretagteam.com/question/how-to-detect-if-user-has-enabled-full-screen-in-browser

//console.log("isFullScreenEnabled Width diff = "  + (screen.width - window.innerWidth).toString() + 
//" Height diff = "  + (screen.height - window.innerHeight).toString());

if (screen.width == window.innerWidth && screen.height == window.innerHeight)
{
    return true;
}
else if (browserWindowHasDesktopWidth() && screen.height == window.innerHeight)
{
    // For the case debug (F12) mode where screen.width != window.innerWidth for full screen
    return true;
}
else
{
    return false;
}

} // isFullScreenEnabled

// Returns true if full screen has been enabled in the browser and the device is a 
// smartphone (and browser for example is the app Fully Kiosk Browser)
function isFullScreenEnabledForSmartphone()
{
var b_full_screen = isFullScreenEnabled();

var b_smartphone = false;

if (browserWindowHasDesktopWidth())
{    
    b_smartphone = false;
}
else
{
    b_smartphone = true;
}

if (b_full_screen && b_smartphone)
{
    return true;
}
else
{
    return false;
}

} // isFullScreenEnabledForSmartphone

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Fullsctreen Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


*/

} // UtilDevice