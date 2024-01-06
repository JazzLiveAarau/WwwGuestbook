// File: GuestbookUploadControls.js
// Date: 2024-01-05
// Authors: Gunnar Lidén

// Content
// =======
//
// Functions creating the controls of the application guestbook image upload
//
// All labels and tooltips are defined in this file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Upload names
var g_upload_names_text_box = null;

// Upload email
var g_upload_email_text_box = null;

// The request code button
var g_request_code_button = null;

// Code figure one
var g_code_one_text_box = null;

// Code figure two
var g_code_two_text_box = null;

// Code figure three
var g_code_three_text_box = null;

// Code figure four
var g_code_four_text_box = null;

// Code figure five
var g_code_five_text_box = null;

// The send code button
var g_send_code_button = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the web page
function createUpdateControls()
{
    createTextBoxUpdateNames();

    createTextBoxUpdateEmail();

    createRequestCodeButton();

    createTextBoxCodeOne();

    createTextBoxCodeTwo();

    createTextBoxCodeThree();

    createTextBoxCodeFour();

    createTextBoxCodeFive();

    createSendCodeButton();

} // createUpdateControls

// Create the admin names text box
function createTextBoxUpdateNames()
{
    g_upload_names_text_box = new JazzTextBox("id_upload_names", 'id_div_upload_names');

    g_upload_names_text_box.setLabelText("Vorname(n) und Nachname(n)");

    g_upload_names_text_box.setLabelTextPositionAbove();

    g_upload_names_text_box.setSize("42");

    g_upload_names_text_box.setValue("Gunnar Lidén"); // Temporary QQQQQQQQ

    g_upload_names_text_box.setReadOnlyFlag(false);

    g_upload_names_text_box.setTitle("Name oder Namen eingeben. Mehrere personen mit Komma trennen");

} // createTextBoxUpdateNames

// Create the admin email text box
function createTextBoxUpdateEmail()
{
    g_upload_email_text_box = new JazzTextBox("id_upload_email", 'id_div_upload_email');

    g_upload_email_text_box.setLabelText("E-Mail");

    g_upload_email_text_box.setLabelTextPositionAbove();

    g_upload_email_text_box.setSize("42");

    g_upload_email_text_box.setValue("gunnar.liden@viewsoncad.ch"); // Temporary QQQQQQQQ

    g_upload_email_text_box.setReadOnlyFlag(false);

    g_upload_email_text_box.setTitle("E-Mail-Adresse");

} // createTextBoxUpdateEmail

// Creates the request code button
function createRequestCodeButton()
{
    g_request_code_button = new JazzButton('id_upload_button_code', 'id_div_upload_button_code');

    g_request_code_button.setOnclickFunctionName("onClickRequestCodeButton");

    g_request_code_button.setCaption("Code verlangen");

    g_request_code_button.setLabelText("");

    g_request_code_button.setTitle("Ein E-Mail mit dem Code wird gesendet");

} // createRequestCodeButton

// Create the figure one code text box
function createTextBoxCodeOne()
{
    g_code_one_text_box = new JazzTextBox("id_upload_code_one", 'id_div_upload_code_one');

    g_code_one_text_box.setLabelText("Code ");

    g_code_one_text_box.setLabelTextPositionLeft();

    g_code_one_text_box.setSize("1");

    g_code_one_text_box.setValue("");

    g_code_one_text_box.setOninputFunctionName("onInputCodeOne");

    g_code_one_text_box.setReadOnlyFlag(false);

    g_code_one_text_box.setTitle("Erste Zahl des Codes");

} // createTextBoxCodeOne

// Create the figure two code text box
function createTextBoxCodeTwo()
{
    g_code_two_text_box = new JazzTextBox("id_upload_code_two", 'id_div_upload_code_two');

    g_code_two_text_box.setLabelText("");

    g_code_two_text_box.setLabelTextPositionLeft();

    g_code_two_text_box.setSize("1");

    g_code_two_text_box.setValue("");

    g_code_two_text_box.setOninputFunctionName("onInputCodeTwo");

    g_code_two_text_box.setReadOnlyFlag(false);

    g_code_two_text_box.setTitle("Zweite Zahl des Codes");

} // createTextBoxCodeTwo

// Create the figure three code text box
function createTextBoxCodeThree()
{
    g_code_three_text_box = new JazzTextBox("id_upload_code_three", 'id_div_upload_code_three');

    g_code_three_text_box.setLabelText("");

    g_code_three_text_box.setLabelTextPositionLeft();

    g_code_three_text_box.setSize("1");

    g_code_three_text_box.setValue("");

    g_code_three_text_box.setOninputFunctionName("onInputCodeThree");

    g_code_three_text_box.setReadOnlyFlag(false);

    g_code_three_text_box.setTitle("Dritte Zahl des Codes");

} // createTextBoxCodeThree

// Create the figure four code text box
function createTextBoxCodeFour()
{
    g_code_four_text_box = new JazzTextBox("id_upload_code_four", 'id_div_upload_code_four');

    g_code_four_text_box.setLabelText("");

    g_code_four_text_box.setLabelTextPositionLeft();

    g_code_four_text_box.setSize("1");

    g_code_four_text_box.setValue("");

    g_code_four_text_box.setOninputFunctionName("onInputCodeFour");

    g_code_four_text_box.setReadOnlyFlag(false);

    g_code_four_text_box.setTitle("Vierte Zahl des Codes");

} // createTextBoxCodeFour

// Create the figure five code text box
function createTextBoxCodeFive()
{
    g_code_five_text_box = new JazzTextBox("id_upload_code_five", 'id_div_upload_code_five');

    g_code_five_text_box.setLabelText("");

    g_code_five_text_box.setLabelTextPositionLeft();

    g_code_five_text_box.setSize("1");

    g_code_five_text_box.setValue("");

    g_code_five_text_box.setOninputFunctionName("onInputCodeFive");

    g_code_five_text_box.setReadOnlyFlag(false);

    g_code_five_text_box.setTitle("Fünfte Zahl des Codes");

} // createTextBoxCodeFive

// Creates the send code button
function createSendCodeButton()
{
    g_send_code_button = new JazzButton('id_upload_button_send', 'id_div_upload_button_send');

    g_send_code_button.setOnclickFunctionName("onClickSendCodeButton");

    g_send_code_button.setCaption("Code senden");

    g_send_code_button.setLabelText("");

    g_send_code_button.setTitle("Nach dem Senden kann ein Bild aufgeladen werden");

} // createSendCodeButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////