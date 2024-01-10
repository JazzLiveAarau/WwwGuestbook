// File: GuestbookUploadControls.js
// Date: 2024-01-10
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

// The back two button
var g_upload_back_two_button = null;

// The forward two button
var g_upload_forward_two_button = null;

// The back three button
var g_upload_back_three_button = null;

// The forward three button (Send/Save)
var g_upload_forward_three_button = null;

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

    createBackTwoButton();

    createForwardTwoButton();

    createBackThreeButton();

    createForwardThreeButton();

} // createUpdateControls

// Create the admin names text box
function createTextBoxUpdateNames()
{
    g_upload_names_text_box = new JazzTextBox("id_upload_names", 'id_div_upload_names');

    g_upload_names_text_box.setLabelText(GuestStr.labelTextBoxNames());

    g_upload_names_text_box.setLabelTextPositionAbove();

    g_upload_names_text_box.setSize("39");

    g_upload_names_text_box.setValue("");

    g_upload_names_text_box.setReadOnlyFlag(false);

    g_upload_names_text_box.setTitle(GuestStr.titleTextBoxNames());

} // createTextBoxUpdateNames

// Create the admin email text box
function createTextBoxUpdateEmail()
{
    g_upload_email_text_box = new JazzTextBox("id_upload_email", 'id_div_upload_email');

    g_upload_email_text_box.setLabelText(GuestStr.labelTextBoxEmail());

    g_upload_email_text_box.setLabelTextPositionAbove();

    g_upload_email_text_box.setSize("39");

    g_upload_email_text_box.setValue(""); 

    g_upload_email_text_box.setReadOnlyFlag(false);

    g_upload_email_text_box.setTitle(GuestStr.titleTextBoxEmail());

} // createTextBoxUpdateEmail

// Creates the request code button
function createRequestCodeButton()
{
    g_request_code_button = new JazzButton('id_upload_button_code', 'id_div_upload_button_code');

    g_request_code_button.setOnclickFunctionName("onClickRequestCodeButton");

    g_request_code_button.setCaption(GuestStr.captionButtonRequestCode());

    g_request_code_button.setLabelText("");

    g_request_code_button.setTitle(GuestStr.titleButtonRequestCode());

} // createRequestCodeButton

// Create the figure one code text box
function createTextBoxCodeOne()
{
    g_code_one_text_box = new JazzTextBox("id_upload_code_one", 'id_div_upload_code_one');

    g_code_one_text_box.setLabelText(GuestStr.labelTextBoxCodeOne());

    g_code_one_text_box.setLabelTextPositionLeft();

    g_code_one_text_box.setSize("1");

    g_code_one_text_box.setValue("");

    g_code_one_text_box.setOninputFunctionName("onInputCodeOne");

    g_code_one_text_box.setReadOnlyFlag(false);

    g_code_one_text_box.setTitle(GuestStr.titleTextBoxCodeOne());

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

    g_code_two_text_box.setTitle(GuestStr.titleTextBoxCodeTwo());

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

    g_code_three_text_box.setTitle(GuestStr.titleTextBoxCodeThree());

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

    g_code_four_text_box.setTitle(GuestStr.titleTextBoxCodeFour());

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

    g_code_five_text_box.setTitle(GuestStr.titleTextBoxCodeFive());

} // createTextBoxCodeFive

// Creates the send code button
function createSendCodeButton()
{
    g_send_code_button = new JazzButton('id_upload_button_send', 'id_div_upload_button_send');

    g_send_code_button.setOnclickFunctionName("onClickSendCodeButton");

    g_send_code_button.setCaption(GuestStr.captionButtonSendCode());

    g_send_code_button.setLabelText("");

    g_send_code_button.setTitle(GuestStr.titleButtonSendCode());

} // createSendCodeButton

// Creates the back two button
function createBackTwoButton()
{
    g_upload_back_two_button = new JazzButton('id_upload_button_back_part_two', 'id_div_upload_button_back_part_two');

    g_upload_back_two_button.setOnclickFunctionName("onClickBackTwoButton");

    g_upload_back_two_button.setCaption(GuestStr.captionButtonBack());

    g_upload_back_two_button.setLabelText("");

    g_upload_back_two_button.setTitle(GuestStr.titleButtonBack());

} // createBackTwoButton

// Creates the forward two button
function createForwardTwoButton()
{
    g_upload_forward_two_button = new JazzButton('id_upload_button_forward_part_two', 'id_div_upload_button_forward_part_two');

    g_upload_forward_two_button.setOnclickFunctionName("onClickForwardTwoButton");

    g_upload_forward_two_button.setCaption(GuestStr.captionButtonForward());

    g_upload_forward_two_button.setLabelText("");

    g_upload_forward_two_button.setTitle(GuestStr.titleButtonForward());

} // createForwardTwoButton

// Creates the back three button (Send/Save)
function createBackThreeButton()
{
    g_upload_back_three_button = new JazzButton('id_upload_button_back_part_three', 'id_div_upload_button_back_part_three');

    g_upload_back_three_button.setOnclickFunctionName("onClickBackThreeButton");

    g_upload_back_three_button.setCaption(GuestStr.captionButtonBack());

    g_upload_back_three_button.setLabelText("");

    g_upload_back_three_button.setTitle(GuestStr.titleButtonBack());

} // createBackThreeButton

// Creates the forward three button (Send/Save)
function createForwardThreeButton()
{
    g_upload_forward_three_button = new JazzButton('id_upload_button_forward_part_three', 'id_div_upload_button_forward_part_three');

    g_upload_forward_three_button.setOnclickFunctionName("onClickForwardThreeButton");

    g_upload_forward_three_button.setCaption(GuestStr.captionButtonSave());

    g_upload_forward_three_button.setLabelText("");

    g_upload_forward_three_button.setTitle(GuestStr.titleButtonSave());

} // createForwardThreeButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////