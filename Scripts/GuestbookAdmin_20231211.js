// File: GuestbookAdmin.js
// Date: 2023-12-27
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

// Object corresponding to JazzGuestsUploaded.xml
var g_guests_uploaded_xml = null;

// Active XML object
var g_active_xml = null;

// Active guest record number for g_guests_xml
var g_record_active_number = -12345;

// Active guest record number for g_guests_uploaded_xml
var g_record_active_uploaded_number = -12345;

// Active record jazz guest that is displayed for the user
var g_record_active_guest = null;

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function initGuestbookAdmin()
{
    var n_level_xml = 1;

    var update_xml = false;

    g_guests_xml = new JazzGuestsXml(callbackGuestbookUploadedXml, n_level_xml, update_xml);

} // initGuestbookAdmin

function callbackGuestbookUploadedXml()
{
    // TODO Load update
    var n_level_xml = 1;

    var update_xml = true;

    g_guests_uploaded_xml = new JazzGuestsXml(callbackSeasonXml, n_level_xml, update_xml);

} // callbackGuestbookUploadedXml

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
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// All XML objects have been created
function callbackAllXmlObjectsCreated()
{
    initLoginLogout();

    g_record_active_number = g_guests_xml.getNumberOfGuestRecords();

    g_record_active_uploaded_number = 1;
    
    if (g_guests_xml.getNumberOfGuestRecords() == 0)
    {
        g_record_active_uploaded_number = 0;
    }

    addEventListenerForInputFileElement();

    createAdminControls();

    initAdminControls();

    setAdminControls();

} // callbackAllXmlObjectsCreated

// Adds an event listener for the inout file element
function addEventListenerForInputFileElement()
{
    var input_file_el = getElementInputFile();

    input_file_el.addEventListener("change", userSelectedFiles);

} // addEventListenerForInputFileElement


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Intialize admin controls at startup and when user
// selects uploaded or existent guest records
function initAdminControls()
{
    setActiveXmlObject();

    setAdminGuestDropdown();

    setActiveGuestRecord();

} // initAdminControls

// Sets the admin controls
// 1. Set active XML object g_active_xml. Call of setActiveXmlObject.
// 2. Set the admin guest dropdown g_guest_drop_down. Call of setAdminGuestDropdown
// 3. Set the active guest record g_record_active_guest. Call of 
function setAdminControls()
{
    setAdminGuestImage();

    setAdminTextBoxes();
    
    setAdminCheckBox();

    setAdminGuestDate();

} // setAdminControls()

// Set active XML object
function setActiveXmlObject()
{
    if (g_new_records_check_box.getCheck() == 'TRUE')
    {
        g_active_xml = g_guests_uploaded_xml;
    }
    else
    {
        g_active_xml = g_guests_xml;
    }

} // setActiveXmlObject

// Set the admin guest dropdown g_guest_drop_down
function setAdminGuestDropdown()
{
    var active_select_option_number = -12345;

    var active_append_str;

    if (g_new_records_check_box.getCheck() == 'TRUE')
    {

        active_append_str = '';

        active_select_option_number = g_record_active_uploaded_number;
    }
    else
    {
        active_append_str = 'Bild zufügen';

        active_select_option_number = g_record_active_number;
    }
    
    var guest_array = null;

    guest_array = g_active_xml.getHeaderArray();

    g_guest_drop_down.setAppendString(active_append_str);

    g_guest_drop_down.setNameArray(guest_array);

    g_guest_drop_down.setSelectOptionNumber(active_select_option_number);

} // setAdminGuestDropdown

// Set the active guest record g_record_active_guest
function setActiveGuestRecord()
{
    var active_select_option_number = -12345;

    if (g_new_records_check_box.getCheck() == 'TRUE')
    {
        active_select_option_number = g_record_active_uploaded_number;
    }
    else
    {
        active_select_option_number = g_record_active_number;
    }

    g_record_active_guest = new JazzGuest();

    var record_number = active_select_option_number;

    g_record_active_guest.setJazzGuestRecord(g_active_xml, record_number);


} // setActiveGuestRecord

// Set the guest image
function setAdminGuestImage()
{
    var file_name = 'https://jazzliveaarau.ch/' + g_record_active_guest.getFileName();
    UtilImage.replaceImageInDivContainer(file_name, getElementDivImageContainer());

} // setAdminGuestImage

// Set admin text boxes
function setAdminTextBoxes()
{
    // g_admin_number_text_box.setValue(g_record_active_guest.getRegNumber());

    g_admin_filename_text_box.setValue(g_record_active_guest.getFileName());

    // TODO g_admin_status_text_box.setValue(g_record_active_guest.getStatus());

    g_admin_band_text_box.setValue(g_record_active_guest.getBand());

    g_admin_musicians_text_box.setValue(g_record_active_guest.getMusicians());

    g_admin_header_text_box.setValue(g_record_active_guest.getHeader());

    g_admin_text_text_box.setValue(g_record_active_guest.getText());

    g_admin_names_text_box.setValue(g_record_active_guest.getNames());

    g_admin_email_text_box.setValue(g_record_active_guest.getEmail());

} // setAdminTextBoxes

// Set admin check box
function setAdminCheckBox()
{
    g_admin_publish_check_box.setCheck(g_record_active_guest.getPublish());

} // setAdminCheckBox

// Set date
function setAdminGuestDate()
{
    var band_name = g_record_active_guest.getBand();

    var band_name_array = g_season_xml.getBandNameArray();

    var guest_year = 'Undefined';
    var guest_month = 'Undefined';
    var guest_day = 'Undefined';

    var concert_select_option_number = -12345;

    for (var index_band=0; index_band < band_name_array.length; index_band++)
    {
        if (band_name == band_name_array[index_band])
        {
            guest_year = g_season_xml.getYear(index_band + 1);

            guest_month = g_season_xml.getMonth(index_band + 1);

            guest_day = g_season_xml.getDay(index_band + 1);

            g_record_active_guest.setYear(guest_year);

            g_record_active_guest.setMonth(guest_month);

            g_record_active_guest.setDay(guest_day);

            concert_select_option_number = index_band + 1;

            break;
        }

    } // index_band

    var iso_date_str = UtilDate.getIsoDateString(g_record_active_guest.getYear(), 
            g_record_active_guest.getMonth(), g_record_active_guest.getDay());

    g_record_date_text_box.setValue(iso_date_str);

    if (concert_select_option_number > 0)
    {
        g_concert_drop_down.setSelectOptionNumber(concert_select_option_number);
    }
    else
    {
        g_concert_drop_down.setSelectOptionNumber(band_name_array.length + 1);
    }

} // setAdminGuestDate

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Functions ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User selected a guest record
function eventSelectAdminGuestDropDown()
{
    var selected_option_number = g_guest_drop_down.getSelectOptionNumber();

    var b_append = g_guest_drop_down.selectedOptionNumberIsAppendItem(selected_option_number);

    if (g_new_records_check_box.getCheck() == 'TRUE')
    {
        g_record_active_uploaded_number = selected_option_number;
        
    }
    else
    {
        g_record_uploaded_number = selected_option_number; // TODO ???????????????

        g_record_active_number = selected_option_number; 

        if (b_append)
        {
        
            alert("eventSelectAdminGuestDropDown Adding guest record not yet implemented");

            g_record_uploaded_number = 1; // QQQQQQ Temporary
        }
    }
    
    initAdminControls();

    setAdminControls();

} // eventSelectAdminGuestDropDown

// User selected a concert
function eventSelectAdminConcertDropDown()
{
    var selected_concert_option_number = g_concert_drop_down.getSelectOptionNumber();

    var b_append = g_concert_drop_down.selectedOptionNumberIsAppendItem(selected_concert_option_number);

    if (b_append)
    {
        g_record_active_guest.setBand("");
    }
    else
    {
        var band_name_array = g_season_xml.getBandNameArray();

        var index_band = parseInt(selected_concert_option_number) - 1;

        g_record_active_guest.setBand(band_name_array[index_band]);
    }

    setAdminControls();

} // eventSelectAdminConcertDropDown

// User clicked the check box for new records only
function eventClickCheckBoxNewRecords()
{
    initAdminControls();

    setAdminControls();

} // eventClickCheckBoxNewRecords

// User clicked the date control
function eventUserSelectedRecordDate()
{
    alert("User clicked g_record_date_text_box");

} // eventUserSelectedRecordDate

// User clicked the upload button // TODO Not used at the moment
function onClickOfAdminUploadButton()
{
    // alert("User clicked the upload button");

    uploadImageToServer();

} // onClickOfAdminUploadButton

// User clicked the download button
function onClickOfAdminDownloadButton() // TODO Not used at the moment
{
    alert("User clicked the download button");

} // onClickOfAdminDownloadButton

// User clicked the delete button
function onClickOfAdminDeleteButton()
{
    alert("User clicked the delete button");

} // onClickOfAdminDeleteButton

// User clicked the save button
function onClickOfAdminSaveButton()
{
    alert("User clicked the save button");

} // onClickOfAdminSaveButton

// User clicked the publish check box
function eventClickCheckBoxAdminPublish()
{
    alert("User clicked the publish check box");

} // eventClickCheckBoxAdminPublish

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
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

