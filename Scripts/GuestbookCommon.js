// File: GuestbookCommon..js
// Date: 2024-01-22
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

    var file_name = copyImageFromUploadToHomepageDir(next_reg_number_int, i_record_uploaded_number);

    appendSetUserUploadedRecord(next_reg_number_int, i_record_uploaded_number, file_name, i_b_case_admin);

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


    // TODO if (!moveImageFromUploadedToBackupDir(i_record_uploaded_number))
    // TODO {
    // TODO    return false;
    // TODO}

    return true;

} // appendUserUploadedRecordMakeBackups

// Move the image file from the Upload directory to the Backups directory
function moveImageFromUploadedToBackupDir(i_record_uploaded_number)
{
    var b_execute_server = UtilServer.execApplicationOnServer();

    var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(i_record_uploaded_number);

    var name_no_path = UtilServer.getFileName(uploaded_file_name);

    var input_move_file = g_guestbook_upload_xml_dir + name_no_path;

    var output_move_file = g_guestbook_backups_xml_dir + name_no_path;

    debugGuestbookCommon('Move image input name =  ' + input_move_file);

    debugGuestbookCommon('Move image output name = ' + output_move_file);
	 
    if (!b_execute_server)
    {
        debugGuestbookCommon('moveImageFromUploadedToBackupDir Do not move image by testing with Live Server');

        return true;
    }

    if (!moveAnyGuestbookFile(input_move_file, output_move_file))
    {
        return false;
    }

    return true;

} // moveImageFromUploadedToBackupDir

// Append record to JazzGuests.xml object with data from the  JazzGuestsUploaded.xml object
function appendSetUserUploadedRecord(i_next_reg_number_int, i_record_uploaded_number, i_file_name, i_b_case_admin)
{
    g_guests_xml.appendGuestNode();

    var n_records = g_guests_xml.getNumberOfGuestRecords();

    g_guests_xml.setGuestYear(n_records, g_guests_uploaded_xml.getGuestYear(i_record_uploaded_number));

    g_guests_xml.setGuestMonth(n_records, g_guests_uploaded_xml.getGuestMonth(i_record_uploaded_number));

    g_guests_xml.setGuestDay(n_records, g_guests_uploaded_xml.getGuestDay(i_record_uploaded_number));

    g_guests_xml.setGuestBand(n_records, g_guests_uploaded_xml.getGuestBand(i_record_uploaded_number));

    g_guests_xml.setGuestMusicians(n_records, g_guests_uploaded_xml.getGuestMusicians(i_record_uploaded_number));

    g_guests_xml.setGuestHeader(n_records, g_guests_uploaded_xml.getGuestHeader(i_record_uploaded_number));

    g_guests_xml.setGuestText(n_records, g_guests_uploaded_xml.getGuestText(i_record_uploaded_number));

    g_guests_xml.setGuestNames(n_records, g_guests_uploaded_xml.getGuestNames(i_record_uploaded_number));

    g_guests_xml.setGuestRemark(n_records, g_guests_uploaded_xml.getGuestRemark(i_record_uploaded_number));

    g_guests_xml.setGuestFileName(n_records, i_file_name);

    g_guests_xml.setGuestFileType(n_records, g_guests_uploaded_xml.getGuestFileType(i_record_uploaded_number));

    g_guests_xml.setGuestAvatar(n_records, g_guests_uploaded_xml.getGuestAvatar(i_record_uploaded_number));

    g_guests_xml.setGuestEmail(n_records, g_guests_uploaded_xml.getGuestEmail(i_record_uploaded_number));

    g_guests_xml.setGuestTelephone(n_records, g_guests_uploaded_xml.getGuestTelephone(i_record_uploaded_number));

    if (i_b_case_admin)
    {
        // Temporary for test g_guests_xml.setGuestStatusAddedOrCheckedByAdmin(n_records);
        g_guests_xml.setGuestStatusTestAddedOrCheckedByAdmin(n_records);
    }
    else
    {
        g_guests_xml.setGuestStatusUploadedByGuestToHomepage(n_records);
    }

    g_guests_xml.setGuestPublishBool(n_records, true);

    g_guests_xml.setGuestRegNumberInt(n_records, i_next_reg_number_int);

    debugGuestbookCommon('Record appended to JazzGuests.xlm object. Record ' + i_next_reg_number_int.toString());

} // appendSetUserUploadedRecord

// Copy the image file from uploaded directory to JazzGuests directory.
// Return name of the uploaded image
function copyImageFromUploadToHomepageDir(i_next_reg_number_int, i_record_uploaded_number)
{
    var output_image_file_name= getAppendImageName(i_next_reg_number_int, i_record_uploaded_number);

    var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(i_record_uploaded_number);

    var name_no_path = UtilServer.getFileName(uploaded_file_name);

    var input_image_file_name = g_guestbook_upload_xml_dir + name_no_path;

    var length_homepage = g_guestbook_homepage_url.length;

    var ret_output_file_name= output_image_file_name.substring(length_homepage);

    debugGuestbookCommon('Image input name =    ' + input_image_file_name);

    debugGuestbookCommon('Image output name =   ' + output_image_file_name);

    debugGuestbookCommon('Image returned name = ' + ret_output_file_name);

    if (copyAnyGuestbookFile(input_image_file_name, output_image_file_name))
    {
        return ret_output_file_name;
    }
    else
    {
        return '';
    }

} // copyImageFromUploadToHomepageDir

// Get the append image name
function getAppendImageName(i_next_reg_number_int, i_record_uploaded_number)
{
    var next_reg_number_str = 'REG' + UtilDate.getFormattedThousandNumber(i_next_reg_number_int);

    var guest_year = g_guests_uploaded_xml.getGuestYear(i_record_uploaded_number);

    var guest_month = g_guests_uploaded_xml.getGuestMonth(i_record_uploaded_number);

    var guest_day = g_guests_uploaded_xml.getGuestDay(i_record_uploaded_number);

    var date_str = 'd' + UtilDate.getYyyyMmDdDateString(guest_year, guest_month, guest_day);

    var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(i_record_uploaded_number);

    var file_ext = UtilServer.getFileExtension(uploaded_file_name);

    var ret_file_name = g_guestbook_image_dir + date_str + '_' + next_reg_number_str + file_ext;

    return ret_file_name;

} // getAppendImageName

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

    debugGuestbookCommon('backup_input_url= ' + backup_input_url);
    debugGuestbookCommon('backup_output_url= ' + backup_output_url);

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
        debugGuestbookCommon('No copied file created. Application is not executed on the server.');

        return true;
    }

    var b_backup = UtilServer.copyFile(i_input_url, i_output_url);

    if (b_backup)
    {
        debugGuestbookCommon('Copy file created: ' + i_output_url);

        return true;
    }
    else
    {
        var error_msg = 'Failed creating copy for file= ' + i_input_url;

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
        debugGuestbookCommon('Moved file: ' + i_output_url);

        return true;
    }
    else
    {
        var error_msg = 'Failed moving file= ' + i_input_url;

        debugGuestbookCommon(error_msg);

        alert(error_msg);

        return false;
    }

} // moveAnyGuestbookFile




///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Upload XML ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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
        debugGuestbookCommon('JazzGuests.xlm is saved on the server');

        return true;
    }
    else
    {
        alert("saveJazzGuestsXmlOnServer Save JazzGuests.xml failed");

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
        debugGuestbookCommon('JazzGuestsUploaded.xlm object not saved. Applictation is not running on the server');

        return true;
    }

    var b_save = UtilServer.saveFile(url_relative, xml_content_str);

    if (b_save)
    {
        debugGuestbookCommon('JazzGuestsUploaded.xlm is saved on the server');

        return true;
    }
    else
    {
        alert("saveJazzGuestUploadedXmlOnServer Save JazzGuestsUploaded.xml failed");

        return false;
    }

} //saveJazzGuestsUploadedXmlOnServer

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
    console.log('GuestbookCommon:' + i_msg_str);

} // debugGuestbookCommon

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

