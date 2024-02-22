// File: GuestbookCommon..js
// Date: 2024-02-22
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

var g_guestbook_image_dir = g_guestbook_homepage_url + 'JazzGuests/';

var g_guestbook_upload_xml_dir = g_guestbook_homepage_url + 'JazzGuests/Uploaded/';

var g_guestbook_backups_xml_dir = g_guestbook_homepage_url + 'JazzGuests/Backups/';

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
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

/*QQQQQQ
// Move the image file from the Upload directory to the Backups directory
function moveImageFromUploadedToBackupDir(i_record_uploaded_number)
{
    var b_execute_server = UtilServer.execApplicationOnServer();

    var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(i_record_uploaded_number);

    var name_no_path = UtilServer.getFileName(uploaded_file_name);

    var input_move_file = g_guestbook_upload_xml_dir + name_no_path;

    var output_move_file = g_guestbook_backups_xml_dir + name_no_path;

    debugGuestbookCommon('moveImageFromUploadedToBackupDir Move image input name =  ' + input_move_file);

    debugGuestbookCommon('moveImageFromUploadedToBackupDir Move image output name = ' + output_move_file);
	 
    if (!b_execute_server)
    {
        debugGuestbookCommon('moveImageFromUploadedToBackupDir Do not move image by testing with Live Server');

        return true;
    }

    if (!moveAnyGuestbookFile(input_move_file, output_move_file))
    {
        debugGuestbookCommon('moveImageFromUploadedToBackupDir Failure. File ' + name_no_path + ' was NOT moved'); 

        return false;
    }

    debugGuestbookCommon('moveImageFromUploadedToBackupDir File ' + name_no_path + ' was moved');

    return true;

} // moveImageFromUploadedToBackupDir

// Move the image file from the Homepage directory to the Backups directory
function moveImageFromJazzGuestDirToBackupDir(i_record_uploaded_number)
{
    var b_execute_server = UtilServer.execApplicationOnServer();

    var admin_file_name = g_guests_xml.getGuestFileName(i_record_uploaded_number);

    var name_no_path = UtilServer.getFileName(admin_file_name);

    var input_move_file = g_guestbook_image_dir + name_no_path;

    var output_move_file = g_guestbook_backups_xml_dir + name_no_path;

    debugGuestbookCommon('Move image input name =  ' + input_move_file);

    debugGuestbookCommon('Move image output name = ' + output_move_file);
	 
    if (!b_execute_server)
    {
        debugGuestbookCommon('moveImageFromJazzGuestDirToBackupDir Do not move image by testing with Live Server');

        return true;
    }

    if (!moveAnyGuestbookFile(input_move_file, output_move_file))
    {
        debugGuestbookCommon('moveImageFromJazzGuestDirToBackupDir Failure. File ' + name_no_path + ' was NOT moved'); 

        return false;
    }

    debugGuestbookCommon('moveImageFromJazzGuestDirToBackupDir File ' + name_no_path + ' was moved');

    return true;

} // moveImageFromJazzGuestDirToBackupDir

// Make a backup of JazzGuests.xml. Returns false for failure
function backupJazzGuestsXml()
{
    var time_stamp = UtilDate.getTimeStamp();

    var file_name = 'JazzGuests'

    var file_ext = '.xml';

    var backup_input_url = g_guestbook_xml_dir + file_name + file_ext;

    var backup_output_url = g_guestbook_backups_xml_dir + file_name + '_' + time_stamp + file_ext;

    debugGuestbookCommon('backupJazzGuestsXml backup_input_url= ' + backup_input_url);
    debugGuestbookCommon('backupJazzGuestsXml backup_output_url= ' + backup_output_url);

    if (copyAnyGuestbookFile(backup_input_url, backup_output_url))
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

    debugGuestbookCommon('backupJazzGuestsUploadedXml backup_input_url= ' + backup_input_url);
    debugGuestbookCommon('backupJazzGuestsUploadedXml backup_output_url= ' + backup_output_url);

    if (copyAnyGuestbookFile(backup_input_url, backup_output_url))
    {
        return true;
    }
    else
    {
        return false;
    }

} // backupJazzGuestsUploadedXml

// Executes the creation of a copied file for any file
function copyAnyGuestbookFile(i_input_url, i_output_url)
{
    if (!UtilServer.execApplicationOnServer())
    {
        debugGuestbookCommon('copyAnyGuestbookFile No copied file created. Application is not executed on the server.');

        return true;
    }

    var b_backup = UtilServer.copyFile(i_input_url, i_output_url);

    if (b_backup)
    {
        debugGuestbookCommon('copyAnyGuestbookFile Copy file created: ' + i_output_url);

        return true;
    }
    else
    {
        var error_msg = 'copyAnyGuestbookFile Failed creating copy for file= ' + i_input_url;

        debugGuestbookCommon(error_msg);

        alert(error_msg);

        return false;
    }

} // copyAnyGuestbookFile

// Moves any guestbook file
function moveAnyGuestbookFile(i_input_url, i_output_url)
{
    if (!UtilServer.execApplicationOnServer())
    {
        debugGuestbookCommon('File was not moved. Application is not executed on the server.');

        return true;
    }

    var b_move = UtilServer.moveFile(i_input_url, i_output_url);

    if (b_move)
    {
        debugGuestbookCommon('moveAnyGuestbookFile Moved file: ' + i_output_url);

        return true;
    }
    else
    {
        var error_msg = 'moveAnyGuestbookFile Failed moving file= ' + i_input_url;

        debugGuestbookCommon(error_msg);

        alert(error_msg);

        return false;
    }

} // moveAnyGuestbookFile

QQQQ*/

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Upload XML ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/*QQQQQ
// Saves the XML as a (an updated) file JazzGuestsUploaded.xml on the server.
function saveJazzGuestsXmlOnServer()
{
    var pretty_print = new PrettyPrintXml(g_guests_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    // TODO
    var url_relative = '../'  +  g_guests_xml.getXmlJazzGuestsFileName();

    var b_execute_server = UtilServer.execApplicationOnServer();
	 
    if (!b_execute_server)
    {
        debugGuestbookCommon('JazzGuests.xlm object not saved. Applictation is not running on the server');

        return true;
    }

    var b_save = UtilServer.saveFile(url_relative, xml_content_str);

    if (b_save)
    {
        debugGuestbookCommon('saveJazzGuestsXmlOnServer JazzGuests.xlm is saved on the server');

        return true;
    }
    else
    {
        alert("saveJazzGuestsXmlOnServer Save JazzGuests.xml failed");

        debugGuestbookCommon('saveJazzGuestsXmlOnServer Failure saving JazzGuests.xlm on the server');

        return false;
    }

} //saveJazzGuestsXmlOnServer

// Saves the XML as a (an updated) file JazzGuestsUploaded.xml on the server.
function saveJazzGuestsUploadedXmlOnServer()
{
    var pretty_print = new PrettyPrintXml(g_guests_uploaded_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    // TODO
    var url_relative = '../'  +  g_guests_uploaded_xml.getXmlJazzGuestsFileName();

    var b_execute_server = UtilServer.execApplicationOnServer();
	 
    if (!b_execute_server)
    {
        debugGuestbookCommon('JazzGuestsUploaded.xlm object not saved. Application is not running on the server');

        return true;
    }

    var b_save = UtilServer.saveFile(url_relative, xml_content_str);

    if (b_save)
    {
        debugGuestbookCommon('saveJazzGuestsUploadedXmlOnServer JazzGuestsUploaded.xlm is saved on the server');

        return true;
    }
    else
    {
        alert("saveJazzGuestUploadedXmlOnServer Save JazzGuestsUploaded.xml failed");

        debugGuestbookCommon('saveJazzGuestsUploadedXmlOnServer Failure saving JazzGuestsUploaded.xlm on the server');

        return false;
    }

} //saveJazzGuestsUploadedXmlOnServer
QQQQ*/

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Upload XML //////////////////////////////////////////////////
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
    console.log('GuestbookCommon: ' + i_msg_str);

    UtilServer.appendDebugFile('GuestbookCommon : ' + i_msg_str, 'GuestbookAdminSave');

} // debugGuestbookCommon

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

