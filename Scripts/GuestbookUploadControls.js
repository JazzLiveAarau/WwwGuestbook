// File: GuestbookUploadControls.js
// Date: 2024-01-14
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

// The upload concert dropdown control
var g_upload_concert_drop_down = null;

// Textbox upload title
var g_upload_title_text_box = null;

// Textarea for text
var g_text_textarea = null;

// Textbox upload remark
var g_upload_remark_text_box = null;

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

    createUploadConcertDropdown();

    createTextBoxUpdateTitle();

    createTextTextArea();
    
    createTextBoxUpdateRemark();

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

    g_upload_email_text_box.setOninputFunctionName("onInputTextUpdateEmail");

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

// Creates the upload concert dropdown control
function createUploadConcertDropdown()
{
    g_upload_concert_drop_down = new JazzDropdown('id_upload_texts_concert', 'id_div_upload_texts_concert');

    var concert_array = g_season_xml.getBandNameArray();

    var max_n_chars = 40;
    concert_array = limitStringLengthOfArray(concert_array, max_n_chars);

    g_upload_concert_drop_down.setAppendString(GuestStr.appendDropdownConcert());

    g_upload_concert_drop_down.setNameArray(concert_array);

    g_upload_concert_drop_down.setOnchangeFunctionName("eventSelectUploadConcertDropDown");

    g_upload_concert_drop_down.setLabelText(GuestStr.labelDropdownConcert());

    g_upload_concert_drop_down.setLabelTextPositionAbove();

    g_upload_concert_drop_down.setTitle(GuestStr.titleDropdownConcert());

    g_upload_concert_drop_down.setSelectOptionNumber(concert_array.length + 1);

} // createUploadConcertDropdown

// Limit the string length in an array
function limitStringLengthOfArray(i_array, i_max_n_chars)
{
    if (i_max_n_chars < 10 || i_max_n_chars > 100 || null == i_array || i_array.length == 0)
    {
        alert("limitStringLengthOfArray Invalid input: Array not defined or i_max_n_chars= " + i_max_n_chars.toString());

        return i_array;
    }

    var out_array = [];

    for (var index_str=0; index_str < i_array.length; index_str++)
    {
        var current_str = i_array[index_str];

        if (current_str.length <= i_max_n_chars)
        {
            out_array[index_str] = current_str;
        }
        else
        {
            current_str = current_str.substring(0, i_max_n_chars - 4) + ' ...';

            out_array[index_str] = current_str;
        }

    }// index_str

    return out_array;

} // limitStringLengthOfArray

// Create the upload title text box
function createTextBoxUpdateTitle()
{
    g_upload_title_text_box = new JazzTextBox("id_upload_texts_title", 'id_div_upload_texts_title');

    g_upload_title_text_box.setLabelText(GuestStr.labelTextBoxTitle());

    g_upload_title_text_box.setLabelTextPositionAbove();

    g_upload_title_text_box.setSize("39");

    g_upload_title_text_box.setValue("");

    g_upload_title_text_box.setOninputFunctionName("onInputTextBoxUpdateTitle")

    g_upload_title_text_box.setReadOnlyFlag(false);

    g_upload_title_text_box.setTitle(GuestStr.titleTextBoxTitle());

} // createTextBoxUpdateTitle

// Creates the textarea for theguest text
function createTextTextArea()
{
    g_text_textarea = new JazzTextArea("id_upload_texts_text", "id_div_upload_texts_text", "3", "39");

    g_text_textarea.setLabelText(GuestStr.labelTextAreaText());

    g_text_textarea.setLabelTextPositionAbove();

    g_text_textarea.setValue("");

    g_text_textarea.setReadOnlyFlag(false);

    g_text_textarea.setTitle(GuestStr.titleTextAreaText());

} // createTextTextArea

// Create the upload remark text box
function createTextBoxUpdateRemark()
{
    g_upload_remark_text_box = new JazzTextBox("id_upload_texts_remark", 'id_div_upload_texts_remark');

    g_upload_remark_text_box.setLabelText(GuestStr.labelTextBoxRemark());

    g_upload_remark_text_box.setLabelTextPositionAbove();

    g_upload_remark_text_box.setSize("39");

    g_upload_remark_text_box.setValue("");

    g_upload_remark_text_box.setReadOnlyFlag(false);

    g_upload_remark_text_box.setTitle(GuestStr.titleTextBoxRemark());

} // createTextBoxUpdateRemark

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////