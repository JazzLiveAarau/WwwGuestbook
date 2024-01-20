// File: GuestbookCommon..js
// Date: 2024-01-19
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


var g_guestbook_homepage_url = 'https://jazzliveaarau.ch/';

var g_guestbook_xml_dir = g_guestbook_homepage_url + 'XML/';

var g_guestbook_upload_xml_dir = g_guestbook_homepage_url + 'JazzGuests/Uploaded/';

var g_guestbook_backups_xml_dir = g_guestbook_homepage_url + 'JazzGuests/Backups/';

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Case: Append guestbook record to JazzGuests.xml that have been uploaded by the user to JazzGuestsUploaded.xml
function appendUserUploadedRecordChangeBothStatus()
{
    debugGuestbookCommon('Enter appendUserUploadedRecordChangeBothStatus');

    if (!backupJazzGuestsXml())
    {
        return false;
    }

    if (!backupJazzGuestsUploadedXml())
    {
        return false;
    }


    return true;

} // appendUserUploadedRecordChangeBothStatus

// Make a backup of JazzGuests.xml. Returns false for failure
function backupJazzGuestsXml()
{
    var time_stamp = UtilDate.getTimeStamp();

    var file_name = 'JazzGuests'

    var file_ext = '.xml';

    var backup_input_url = g_guestbook_xml_dir + file_name + file_ext;

    var backup_output_url = g_guestbook_backups_xml_dir + file_name + '_' + time_stamp + file_ext;

    debugGuestbookCommon('backup_input_url= ' + backup_input_url);
    debugGuestbookCommon('backup_output_url= ' + backup_output_url);

    if (backupAnyGuestbookFile(backup_input_url, backup_output_url))
    {
        return true;
    }
    else
    {
        return false;
    }

} // backupJazzGuestsXml

// Make a backup of JazzGuests.xml. Returns false for failure
function backupJazzGuestsUploadedXml()
{
    var time_stamp = UtilDate.getTimeStamp();

    var file_name = 'JazzGuestsUploaded'

    var file_ext = '.xml';

    var backup_input_url = g_guestbook_upload_xml_dir + file_name + file_ext;

    var backup_output_url = g_guestbook_backups_xml_dir + file_name + '_' + time_stamp + file_ext;

    debugGuestbookCommon('backup_input_url= ' + backup_input_url);
    debugGuestbookCommon('backup_output_url= ' + backup_output_url);

    if (backupAnyGuestbookFile(backup_input_url, backup_output_url))
    {
        return true;
    }
    else
    {
        return false;
    }

} // backupJazzGuestsUploadedXml

// Executes the creation of a backup file for any file
function backupAnyGuestbookFile(i_backup_input_url, i_backup_output_url)
{
    if (!UtilServer.execApplicationOnServer())
    {
        debugGuestbookCommon('No backup. Application is not executed on the server.');

        return true;
    }

    var b_backup = UtilServer.copyFile(i_backup_input_url, i_backup_output_url);

    if (b_backup)
    {
        debugGuestbookCommon('Backup file created: ' + i_backup_output_url);

        return true;
    }
    else
    {
        var error_msg = 'Failed creating backup for file= ' + i_backup_input_url;

        debugGuestbookCommon(error_msg);

        alert(error_msg);

        return false;
    }

} // backupAnyGuestbookFile



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load XML //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Loads all XML objects for Guestbook Admin and Upload
// Start XML is the object corresponding to JazzGuests.xml
function loadAllXmlObjectsForAdminAndUpload()
{
    var n_level_xml = 1;

    var update_xml = false;

    g_guests_xml = new JazzGuestsXml(callbackGuestbookUploadedXml, n_level_xml, update_xml);

} // loadAllXmlObjectsForAdminAndUpload

// Load of XML object corresponding to JazzGuestsUploaded.xml
function callbackGuestbookUploadedXml()
{
    var n_level_xml = 1;

    var update_xml = true;

    g_guests_uploaded_xml = new JazzGuestsXml(callbackSeasonXml, n_level_xml, update_xml);

} // callbackGuestbookUploadedXml

// Load of XML object corresponding to JazzSeasonProgram_yyyy_yyyy.xml
function callbackSeasonXml()
{
    var n_level_xml = 1;

    var season_start_year = SeasonXml.getCurrentSeasonStartYear();

    g_season_xml = new SeasonXml(callbackApplicationXml, n_level_xml, season_start_year);

} // callbackSeasonXml

// Load of XML object corresponding to JazzApplication.xml
function callbackApplicationXml()
{
   // Number of directory levels to top directory for directory /www/XML/
   var n_level_xml = 1;

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
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugGuestbookCommon(i_msg_str)
{
    console.log('GuestbookCommon:' + i_msg_str);

} // debugGuestbookCommon

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

