// File: GuestbookCommon..js
// Date: 2025-04-13
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Common functions for the application guestbook admin and upload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Object corresponding to JazzGuests.xml
var g_guests_xml = null;

// Object corresponding to JazzGuestsUploaded.xml
var g_guests_uploaded_xml = null;

// Object corresponding to JazzSeasonProgram_yyyy_yyyy.xml
var g_season_xml = null;

// Object with get functions for the XML file JazzApplication.xml
var g_application_xml = null;

// Flag telling if loading is for Guestbook Upload or Admin
var g_load_for_guestbook_admin = null;

// Instance of the class UtilLock. Please note that it is not allowed to change this 
// global variable name. 
var g_util_lock_object = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start InitLock Functions ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialzation of the lock/unlock functionality
function initJazzGuestsLockUnlock()
{
    var lock_dir = 'https://jazzliveaarau.ch/JazzGuests/LockUnlock/';

    g_util_lock_object = new UtilLock(lock_dir);

} // initJazzGuestsLockUnlock

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End InitLock Functions //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Case: Append guestbook record to JazzGuests.xml that have been uploaded by the user to JazzGuestsUploaded.xml
//
// This function may be called by admin (GuestbookAdmin.htm) or the by the guest 
// (GuestbookUpload.htm). People are used to and probably expect that their contribution
// comes to the homepage directly. When it works, i.e. most contributions can be accepted
// without big changes, then this is also a good solution. If not then it is easy to change
// so that the administror checks the contribution before it is published on the homepage.
// 
// In a second step should the adminstrator check and perhaps adjust the record. Therereafter 
// shall the flag in the JazzGuests.xml be changed to AddedOrCheckedRecordByAdmin and the record
// in JazzGuestsUploaded.xml be deleted.
//
function appendUserUploadedRecordMakeBackups(i_record_uploaded_number, i_b_case_admin)
{
    debugGuestbookCommon('Enter appendUserUploadedRecordMakeBackups');

    if (!backupJazzGuestsXml())
    {
        return false;
    }

    if (!backupJazzGuestsUploadedXml())
    {
        return false;
    }

    var next_reg_number_int = g_guests_xml.getNextRegNumberInt();

    var file_name = copyImageFromUploadToGuestbookDir(next_reg_number_int, i_record_uploaded_number);

    appendSetSaveGuestbookData(next_reg_number_int, i_record_uploaded_number, file_name, i_b_case_admin);F

    if (!saveJazzGuestsXmlOnServer())
    {
        return false;
    }

    // Change flag status is one alternative
    // Temporary for test g_guests_uploaded_xml.setGuestStatusAddedOrCheckedByAdmin(i_record_uploaded_number);
    g_guests_uploaded_xml.setGuestStatusTestAddedOrCheckedByAdmin(i_record_uploaded_number);


    // Delete the record is the other alternative
    g_guests_uploaded_xml.deleteGuestNode(i_record_uploaded_number);

    if (!saveJazzGuestsUploadedXmlOnServer())
    {
        return false;
    }

    return true;

} // appendUserUploadedRecordMakeBackups

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load XML //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function reload the XML object JazzGuests.xml.
// Prior to adding, deleting or changing XML records the object must be reloaded while
// other users may have made changes to the JazzGuests.xml file. (Prior to the 
// reload must also the XML files be locked. Please refer to class UtilLock).
function reloadJazzGuestXmlObject(i_callback_reload_xml_object)
{
    var n_level_xml = 2;

    var update_xml = false;

    g_guests_xml = new JazzGuestsXml(i_callback_reload_xml_object, n_level_xml, update_xml);

} // reloadJazzGuestXmlObjects

// Function reload the XML object JazzGuestsUploaded.xml.
// Prior to adding, deleting or changing XML records the object must be reloaded while
// other users may have made changes to the JazzGuestsUploaded.xml file. (Prior to the 
// reloa must also the XML files be locked. Please refer to class UtilLock).
function reloadJazzGuestUploadedXmlObject(i_callback_reload_xml_uploaded_object)
{
    var n_level_xml = 2;

    var update_xml = true;

    g_guests_uploaded_xml = new JazzGuestsXml(i_callback_reload_xml_uploaded_object, n_level_xml, update_xml);

} // reloadJazzGuestUploadedXmlObject

// Loads all XML objects for Guestbook Admin and Upload
// Start XML is the object corresponding to JazzGuests.xml
function loadAllXmlObjectsForAdminAndUpload()
{
    var n_level_xml = 2;

    var update_xml = false;

    g_guests_xml = new JazzGuestsXml(callbackGuestbookUploadedXml, n_level_xml, update_xml);

} // loadAllXmlObjectsForAdminAndUpload

// Load of XML object corresponding to JazzGuestsUploaded.xml
function callbackGuestbookUploadedXml()
{
    var n_level_xml = 2;

    var update_xml = true;

    g_guests_uploaded_xml = new JazzGuestsXml(callbackSeasonXml, n_level_xml, update_xml);

} // callbackGuestbookUploadedXml

// Load of XML object corresponding to JazzSeasonProgram_yyyy_yyyy.xml
// The "new" season shall not start as it is defined by SeasonXml.getCurrentSeasonStartYear()
// For this application the user should be able to add guestbook records referring to a
// concert of the "previous" season until october.
function callbackSeasonXml()
{
    var current_date = new Date();

    var current_year = current_date.getFullYear();

    var current_month = current_date.getMonth() + 1;

    var month_change_season = 10; // October

    var season_start_year = -12345;

    if (current_month < month_change_season)
    {
        season_start_year = current_year - 1;
    }
    else
    {
        season_start_year = current_year;
    }

    var n_level_xml = 2;

    g_season_xml = new SeasonXml(callbackApplicationXml, n_level_xml, season_start_year);

} // callbackSeasonXml

// Load of XML object corresponding to JazzApplication.xml
function callbackApplicationXml()
{
   // Number of directory levels to top directory for directory /www/XML/
   var n_level_xml = 2;

   if (null == g_load_for_guestbook_admin)
   {
        alert("callbackApplicationXml g_load_for_guestbook_admin is null");

        return;
   }

   if (g_load_for_guestbook_admin)
   {
        g_application_xml = new JazzApplicationXml(callbackAllXmlObjectsCreatedForAdmin, n_level_xml);
   }
   else
   {
        g_application_xml = new JazzApplicationXml(callbackAllXmlObjectsCreatedForUpload, n_level_xml);
   }


} // initApplicationXmlAfterLoadOfJazzTasksXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Load XML ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Notication Email //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


    // Sends a notification email to the administrator
    // Input data:
    // i_case: last_deleted, last_edited or new_uploaded
    // i_guestbook_data: Instance of the class GuestbookData
    // i_callback_function: Callback function
    //
    // 1. Set title depending on the case
    //    Call of GuestStr.emailGuestbookRecordDeletedSubject, 
    //    emailGuestbookRecordEditedSubject or emailGuestbookSubject
    // 2. Set emailsender and receiver
    //    Call of GuestStr.emailCodeFrom and GuestStr.emailCodeFrom
    // 3. Set the content
    //    Get the data from the input GuestbookData object
    // 2. Send the email. When finished call the input callback function
    //    Call of UtilEmail.sendSecureCallback
    function sendNoticationEmailToAdministrator(i_case, i_guestbook_data, i_callback_function)
    {
        var email_subject = '';

        if (i_case == 'last_deleted')
        {
            email_subject = GuestStr.emailGuestbookRecordDeletedSubject() + i_guestbook_data.getImageNames();
        }
        else if (i_case == 'last_edited')
        {
            email_subject = GuestStr.emailGuestbookRecordEditedSubject() + i_guestbook_data.getImageNames();
        }
        else if (i_case == 'new_uploaded')
        {
            email_subject = GuestStr.emailGuestbookSubject() + i_guestbook_data.getImageNames();
        }
        else
        {
            alert("sendNoticationEmailToAdministrator Unknown case= " + i_case);

            i_callback_function();
        }


        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
    
        var email_bcc = '';
    
        var textarea_str = i_guestbook_data.getImageText();
    
        textarea_str = UtilString.stringWindowsToHtml(textarea_str);
    
        var email_message = '';
    
        var record_date = UtilDate.getIsoDateString(i_guestbook_data.getYear(), 
                                                    i_guestbook_data.getMonth(), 
                                                    i_guestbook_data.getDay());
    
        email_message = email_message + 'Datum:      ' + record_date                       + '<br>';
        email_message = email_message + 'Email:      ' + i_guestbook_data.getImageEmail()  + '<br>';
        email_message = email_message + 'Names:      ' + i_guestbook_data.getImageNames()  + '<br>';
        email_message = email_message + 'Title:      ' + i_guestbook_data.getImageTitle()  + '<br>';
        email_message = email_message + 'Band:       ' + i_guestbook_data.getBand()        + '<br>';
        email_message = email_message + 'Musicians:  ' + i_guestbook_data.getMusicians()   + '<br>';
        email_message = email_message + 'Remark:     ' + i_guestbook_data.getImageRemark() + '<br>';
        email_message = email_message + 'Uploadfile: ' + i_guestbook_data.getImageFile()   + '<br>';
        email_message = email_message + 'Regfile:    ' + i_guestbook_data.getFileName()    + '<br>';
        email_message = email_message + 'Regnumber:  ' + i_guestbook_data.getRegNumber()   + '<br>';
        email_message = email_message + 'Text: <br>'   + textarea_str + '<br>';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, i_callback_function);

    } // sendNoticationEmail

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Notication Email ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugGuestbookCommon(i_msg_str)
{
    console.log('GuestbookCommon: ' + i_msg_str);

    UtilServer.appendDebugFile('GuestbookCommon : ' + i_msg_str, 'GuestbookAdminSave');

} // debugGuestbookCommon

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

