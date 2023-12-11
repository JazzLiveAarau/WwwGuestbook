// File: GuestbookAdmin.js
// Date: 2023-12-11
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application guestbook admin

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Object corresponding to JazzGuests.xml
var g_guests_xml = null;

// Object corresponding to JazzGuestsUpdate.xml
var g_guests_update_xml = null;

// Object corresponding to JazzSeasonProgram_yyyy_yyyy.xml
var g_season_xml = null;

// Object with get functions for the XML file JazzApplication.xml
var g_application_xml = null;

// Object that handles the user name
var g_user_name_object = null;

// Object that have functions handling login and logout
var g_login_logout = null;

// Flag telling if the user has logged in.
// Initial value is false. After succesful login it will be set to true
// After logout it will be set to false.
var g_user_has_logged_in = false;

// Returns the flag telling if the user has logged in
function userHasLoggedIn()
{
    if (g_login_logout != null)
    {
        var b_user_is_logged_in = g_login_logout.userIsLoggedIn();

        if (b_user_is_logged_in != g_user_has_logged_in)
        {
            alert("Error userHasLoggedIn Flag LogoutLogin = " + b_user_is_logged_in.toString() 
                    + " not equal to g_user_has_logged_in");
        }
    }

    return g_user_has_logged_in;
    
} // userHasLoggedIn

// Returns true if the user hasn't logged in and tells him to try to login	
// Reset of values also for this case
function userIsNotLoggedIn()
{
    if (!userHasLoggedIn())
    {
		setControlValues();
		
		alert(LoginLogout.changeNotPossibleOtherIsloggedIn());
		
        return true;
    }
	
	return false;

} // userIsNotLoggedIn

// Sets the flag telling if the user has logged in
function setUserHasLoggedIn(i_b_has_logged_in)
{
    g_user_has_logged_in = i_b_has_logged_in;

    g_login_logout.setUserIsLoggedIn(i_b_has_logged_in);

} // setUserHasLoggedIn

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function initGuestbookAdmin()
{
    var n_level_xml = 1;

    g_guests_xml = new JazzGuestsXml(callbackGuestbookUpdateXml, n_level_xml);

} // initGuestbookAdmin

function callbackGuestbookUpdateXml()
{
    // TODO Load update

    callbackSeasonXml();

} // callbackGuestbookUpdateXml

function callbackSeasonXml()
{
    var n_level_xml = 1;

    var season_start_year = SeasonXml.getCurrentSeasonStartYear();

    g_season_xml = new SeasonXml(callbackApplicationXml, n_level_xml, season_start_year);

} // callbackSeasonXml

// Load of JazzApplication.xml
function callbackApplicationXml()
{
   // Number of directory levels to top directory for directory /www/XML/
   var n_level_xml = 1;

    g_application_xml = new JazzApplicationXml(callbackAllXmlObjectsCreated, n_level_xml);

} // initApplicationXmlAfterLoadOfJazzTasksXml

// All XML objects have been created
function callbackAllXmlObjectsCreated()
{
    initLoginLogout();

} // callbackAllXmlObjectsCreated

// Initialization for login and logout
function initLoginLogout()
{
    debugGuestbookAdmin('initLoginLogout Enter');

    g_user_name_object = new JazzUserName(g_application_xml);

    var user_name = g_user_name_object.getUserName();

    if (user_name == JazzUserName.getUserNameNotYetSet())
    {
        user_name = LoginLogout.UserNameIsUndefined();
    }

    var b_only_read_data = false;

    g_login_logout = new LoginLogout( getIdLoginLogoutTextBox(), getIdLoginLogoutButton(), 
                                      getIdDivLoginLogout(), "onClickLoginLogoutButton",
                                      user_name, b_only_read_data);

    if (user_name != LoginLogout.UserNameIsUndefined())
    {
        g_login_logout.loginIfPossible(callbackLoginIfPossible);
    }

} // initLoginLogout

// Callback function for LoginLogout.loginIfPossible
function callbackLoginIfPossible(i_logged_in_name, i_b_user_has_logged_in)
{
    setUserHasLoggedIn(i_b_user_has_logged_in);

    g_login_logout.createSetControls(i_logged_in_name);

    hideDisplayDivElementAdminContent(i_b_user_has_logged_in);

} // callbackLoginIfPossible

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide Display Functions ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hides or display the admin content <div> 
function hideDisplayDivElementAdminContent(i_b_logged_in)
{
    var el_record = getDivElementAdminContent();

    if (i_b_logged_in)
    {
        el_record.style.display = 'block';
    }
    else
    {
        el_record.style.display = 'none';
    }

} // hideDisplayDivElementAdminContent

// Returns the element admin content <div> element
function getDivElementAdminContent()
{
    return document.getElementById(getIdDivElementAdminContent());

} // getDivElementAdminContent

//Returns the identity of the admin content <div> element
function getIdDivElementAdminContent()
{
    return 'id_admin_content';

} // getIdDivElementAdminContent

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide Display Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Login Logout Functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the login-logout button. 
// The name of this function is defined at the creation of the JazzLogin object
// This function calls (must call) JazzLogin.clickLoginLogoutButton
// 1. Get the user name. Call of JazzUserName.getUserName
//    This call is for the case that the user name not yet is saved
// 2. Case: User name is not saved
// 2.a Request name and password from user and set user name. 
//     Call of JazzUserName.requestSetUserName
// 2.b Set user name. Call of LoginLogout.setUserName
// 2.c Login if possible. Call of LoginLogout.loginIfPossible
// 3. Case: User name is saved
// 3.a Call member function LoginLogout.clickLoginLogoutButton
function onClickLoginLogoutButton()
{
    var user_name = g_user_name_object.getUserName();

    debugGuestbookAdmin('onClickLoginLogoutButton user_name= ' + user_name);

    if (user_name == JazzUserName.getUserNameNotYetSet())
    {
        var request_name =  g_user_name_object.requestSetUserName();

        if (request_name != JazzUserName.getUserNameNotYetSet())
        {
            g_login_logout.setUserName(request_name);

           g_login_logout.loginIfPossible(callbackLoginIfPossible);
        }
    }
    else
    {
        g_login_logout.clickLoginLogoutButton(callbackOnClickLoginLogoutButton);
    }

} // onClickLoginLogoutButton

// Callback function for LoginLogout.clickLoginLogoutButton
function callbackOnClickLoginLogoutButton(i_logged_in_name, i_b_user_has_logged_in, i_warning_msg)
{
    if (i_warning_msg.length > 0)
    {
        alert(i_warning_msg);
    }
    
    setUserHasLoggedIn(i_b_user_has_logged_in);

    g_login_logout.createSetControls(i_logged_in_name);

    hideDisplayDivElementAdminContent(i_b_user_has_logged_in);

} // callbackOnClickLoginLogoutButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Login Logout Functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugGuestbookAdmin(i_msg_str)
{
    console.log('GuestbookAdmin:' + i_msg_str);

} // debugGuestbookAdmin

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

