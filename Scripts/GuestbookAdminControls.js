// File: GuestbookAdminControls.js
// Date: 2023-12-19
// Authors: Gunnar Lidén

// Content
// =======
//
// Functions creating the controls of the application
//
// All labels and tooltips are defined in this file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Admin guest number
var g_admin_number_text_box = null;

// Admin file name
var g_admin_filename_text_box = null;

// Admin status
var g_admin_status_text_box = null;

// Admin band
var g_admin_band_text_box = null;

// Admin musicians
var g_admin_musicians_text_box = null;

// Admin header
var g_admin_header_text_box = null;

// Admin text
var g_admin_text_text_box = null;

// Admin names
var g_admin_names_text_box = null;

// Admin email
var g_admin_email_text_box = null;

// The guest records dropdown control
var g_guest_drop_down = null;

// The admin concert dropdown control
var g_concert_drop_down = null;

// The admin records to be added check box
var g_new_records_check_box = null;

// The admin publish check box
var g_admin_publish_check_box = null;

// The admin upload button
var g_admin_upload_button = null;

// The admin download button
var g_admin_download_button = null;

// The admin delete button
var g_admin_delete_button = null;

// The admin save button
var g_admin_save_button = null;

// The text box for the record date picker
var g_record_date_text_box = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the web page
function createAdminControls()
{
    createRecordDatePickerControl();

    createAdminUploadButton();

    createAdminDownloadButton();

    createAdminDeleteButton();

    createAdminSaveButton();

    createAdminGuestDropdown();

    createAdminConcertDropdown();

    createCheckBoxNewRecords();

    createCheckBoxAdminPublish();

    // createTextBoxAdminNumber();

    createTextBoxFileName();

    createTextBoxAdminStatus();

    createTextBoxAdminBand();

    createTextBoxAdminMusicians();

    createTextBoxAdminHeader();

    createTextBoxAdminText();

    createTextBoxAdminNames();

    createTextBoxAdminEmail();

} // createAdminControls

// Create the record date control
function createRecordDatePickerControl()
{
    g_record_date_text_box = new JazzDatePicker('id_admin_date', 'id_div_admin_date');

    g_record_date_text_box.setLabelText("Datum");

    g_record_date_text_box.setSize("7");

    g_record_date_text_box.setLabelTextPositionAbove();

    g_record_date_text_box.setTitle("TODO Beschreibung Datum");

    g_record_date_text_box.setOnchangeFunctionName("eventUserSelectedRecordDate");

    g_record_date_text_box.startDatePicker();
  
} // createRecordDatePickerControl

// Creates the admin upload button
function createAdminUploadButton()
{
    g_admin_upload_button = new JazzButton('id_admin_upload', 'id_div_admin_upload');

    g_admin_upload_button.setOnclickFunctionName("onClickOfAdminUploadButton");

    g_admin_upload_button.setCaption("Upload");

    g_admin_upload_button.setLabelText("");

    g_admin_upload_button.setTitle("Bild zum Server aufladen");

} // createAdminUploadButton

// Creates the admin download button
function createAdminDownloadButton()
{
    g_admin_download_button = new JazzButton('id_admin_download', 'id_div_admin_download');

    g_admin_download_button.setOnclickFunctionName("onClickOfAdminDownloadButton");

    g_admin_download_button.setCaption("Download");

    g_admin_download_button.setLabelText("");

    g_admin_download_button.setTitle("Bild vom Server herunterladen");

} // createAdminDownloadButton

// Creates the admin delete button
function createAdminDeleteButton()
{
    g_admin_delete_button = new JazzButton('id_admin_delete', 'id_div_admin_delete');

    g_admin_delete_button.setOnclickFunctionName("onClickOfAdminDeleteButton");

    g_admin_delete_button.setCaption("Löschen");

    g_admin_delete_button.setLabelText("");

    g_admin_delete_button.setTitle("Eintrag löschen");

} // createAdminDeleteButton

// Creates the admin save button
function createAdminSaveButton()
{
    g_admin_save_button = new JazzButton('id_admin_save', 'id_div_admin_save');

    g_admin_save_button.setOnclickFunctionName("onClickOfAdminSaveButton");

    g_admin_save_button.setCaption("Speichern");

    g_admin_save_button.setLabelText("");

    g_admin_save_button.setTitle("Eintrag speichern");

} // createAdminSaveButton

// Creates the admin guest records dropdown control
function createAdminGuestDropdown()
{
    g_guest_drop_down = new JazzDropdown('id_admin_dropdown', 'id_div_admin_dropdown');

    var guest_array = [];
	guest_array[0] = 'Record 1';
	guest_array[1] = 'Record 2';
	guest_array[2] = 'Record 3';
	guest_array[3] = 'Record 4';

    g_guest_drop_down.setNameArray(guest_array);

    g_guest_drop_down.setOnchangeFunctionName("eventSelectAdminGuestDropDown");

    g_guest_drop_down.setLabelText("Eintrag wählen");

    g_guest_drop_down.setLabelTextPositionAbove();

    g_guest_drop_down.setTitle("Eintrag zum Editieren wählen");

    g_guest_drop_down.setAppendString("Neues Bild zufügen");

} // createAdminGuestDropdown

// Creates the admin concert dropdown control
function createAdminConcertDropdown()
{
    g_concert_drop_down = new JazzDropdown('id_admin_dropdown_concert', 'id_div_admin_dropdown_concert');

    var concert_array = g_season_xml.getBandNameArray();

    g_concert_drop_down.setAppendString('Kein Konzert');

    g_concert_drop_down.setNameArray(concert_array);

    g_concert_drop_down.setOnchangeFunctionName("eventSelectAdminConcertDropDown");

    g_concert_drop_down.setLabelText("Konzert oder kein Konzert wählen");

    g_concert_drop_down.setLabelTextPositionAbove();

    g_concert_drop_down.setTitle("Konzert wählen oder kein Konzert wähle. Ein gewähltes Konzert bestimmt das Datum.");

    g_concert_drop_down.setSelectOptionNumber(concert_array.length + 1);


} // createAdminConcertDropdown

// Creates the check box admin records to be added
function createCheckBoxNewRecords()
{
    g_new_records_check_box = new JazzCheckBox('id_admin_checkbox_new', 'id_div_admin_checkbox_new');

    g_new_records_check_box.setOninputFunctionName("eventClickCheckBoxNewRecords");

    g_new_records_check_box.setLabelText("Aufgeladene");
	
	g_new_records_check_box.setLabelTextPositionRight();

     g_new_records_check_box.setTitle("Alle existierende oder neue vom Publikum aufgeladene");

     g_new_records_check_box.setCheck("TRUE");

} // createCheckBoxNewRecords

// Creates the check box publish
function createCheckBoxAdminPublish()
{
    g_admin_publish_check_box = new JazzCheckBox('id_admin_publish', 'id_div_admin_publish');

    g_admin_publish_check_box.setOninputFunctionName("eventClickCheckBoxAdminPublish");

    g_admin_publish_check_box.setLabelText("Publiziere ");
	
	g_admin_publish_check_box.setLabelTextPositionLeft();

     g_admin_publish_check_box.setTitle("Wähle ob Eintrag publiziert werden soll");

     g_admin_publish_check_box.setCheck("TRUE");

} // createCheckBoxAdminPublish

// Create the admin number text box
function createTextBoxAdminNumber()
{
    g_admin_number_text_box = new JazzTextBox("id_admin_number", 'id_div_admin_number');

    g_admin_number_text_box.setLabelText("");

    g_admin_number_text_box.setLabelTextPositionLeft();

    g_admin_number_text_box.setSize("5");

    g_admin_number_text_box.setReadOnlyFlag(true);

    g_admin_number_text_box.setTitle("Nummer. Diese Nummer kann nicht direkt geändert werden.");

} // createTextBoxAdminNumber

// Create the admin file name text box
function createTextBoxFileName()
{
    g_admin_filename_text_box = new JazzTextBox("id_admin_filename", 'id_div_admin_filename');

    g_admin_filename_text_box.setLabelText("Datei ");

    g_admin_filename_text_box.setLabelTextPositionLeft();

    g_admin_filename_text_box.setSize("25");

    g_admin_filename_text_box.setReadOnlyFlag(true);

    g_admin_filename_text_box.setTitle("Dateiname. Dieser Text kann nicht direkt geändert werden.");

} // createTextBoxFileName

// Create the admin status text box
function createTextBoxAdminStatus()
{
    g_admin_status_text_box = new JazzTextBox("id_admin_status", 'id_div_admin_status');

    g_admin_status_text_box.setLabelText("Status");

    g_admin_status_text_box.setLabelTextPositionAbove();

    g_admin_status_text_box.setSize("20");

    g_admin_status_text_box.setReadOnlyFlag(true);

    g_admin_status_text_box.setTitle("Status. Dieser Text kann nicht direkt geändert werden.");

} // createTextBoxAdminStatus

// Create the admin band text box
function createTextBoxAdminBand()
{
    g_admin_band_text_box = new JazzTextBox("id_admin_band", 'id_div_admin_band');

    g_admin_band_text_box.setLabelText("Band");

    g_admin_band_text_box.setLabelTextPositionAbove();

    g_admin_band_text_box.setSize("65");

    g_admin_band_text_box.setReadOnlyFlag(false);

    g_admin_band_text_box.setTitle("Name des Konzerts");

} // createTextBoxAdminBand

// Create the admin musicians text box
function createTextBoxAdminMusicians()
{
    g_admin_musicians_text_box = new JazzTextBox("id_admin_musicians", 'id_div_admin_musicians');

    g_admin_musicians_text_box.setLabelText("Musiker");

    g_admin_musicians_text_box.setLabelTextPositionAbove();

    g_admin_musicians_text_box.setSize("65");

    g_admin_musicians_text_box.setReadOnlyFlag(false);

    g_admin_musicians_text_box.setTitle("Musiker des Konzerts");

} // createTextBoxAdminMusicians

// Create the admin header text box
function createTextBoxAdminHeader()
{
    g_admin_header_text_box = new JazzTextBox("id_admin_header", 'id_div_admin_header');

    g_admin_header_text_box.setLabelText("Titel");

    g_admin_header_text_box.setLabelTextPositionAbove();

    g_admin_header_text_box.setSize("65");

    g_admin_header_text_box.setReadOnlyFlag(false);

    g_admin_header_text_box.setTitle("Musiker des Bildes");

} // createTextBoxAdminHeader

// Create the admin text text box
function createTextBoxAdminText()
{
    g_admin_text_text_box = new JazzTextBox("id_admin_text", 'id_div_admin_text');

    g_admin_text_text_box.setLabelText("Text");

    g_admin_text_text_box.setLabelTextPositionAbove();

    g_admin_text_text_box.setSize("65");

    g_admin_text_text_box.setReadOnlyFlag(false);

    g_admin_text_text_box.setTitle("Text");

} // createTextBoxAdminText

// Create the admin names text box
function createTextBoxAdminNames()
{
    g_admin_names_text_box = new JazzTextBox("id_admin_names", 'id_div_admin_names');

    g_admin_names_text_box.setLabelText("Namen");

    g_admin_names_text_box.setLabelTextPositionAbove();

    g_admin_names_text_box.setSize("28");

    g_admin_names_text_box.setReadOnlyFlag(false);

    g_admin_names_text_box.setTitle("Namen");

} // createTextBoxAdminNames

// Create the admin email text box
function createTextBoxAdminEmail()
{
    g_admin_email_text_box = new JazzTextBox("id_admin_email", 'id_div_admin_email');

    g_admin_email_text_box.setLabelText("E-Mail");

    g_admin_email_text_box.setLabelTextPositionAbove();

    g_admin_email_text_box.setSize("28");

    g_admin_email_text_box.setReadOnlyFlag(false);

    g_admin_email_text_box.setTitle("E-Mail-Adresse");

} // createTextBoxAdminEmail

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////