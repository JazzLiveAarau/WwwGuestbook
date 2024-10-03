// File: GuestbookUploadControls.js
// Date: 2024-10-03
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

// Object DisplayImageText for the display of image text
var g_display_image_text = null;

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

// The contact button
var g_contact_button = null;

// The contact cancel button
var g_contact_cancel_button = null;

// The contact send button
var g_contact_send_button = null;

// Textbox contact from
var g_contact_from_text_box = null;

// Textbox contact email
var g_contact_email_text_box = null;

// Textbox last uploaded record
var g_last_record_text_box = null;

// Textarea for the contact message
var g_contact_msg_textarea = null;

// The contact case dropdown control
var g_contact_case_drop_down = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the web page
function createUpdateControls()
{
    createTextImageContainer();

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

    createContactButton();

    createContactCancelButton();

    createContactSendButton();

    createTextBoxContactFrom();

    createTextBoxContactEmail();

    createTextBoxLastRecord();

    createContactMessageTextArea();

    createContactCaseDropdown();

    modifyGuiForMobile();

} // createUpdateControls

// Modify GUI for a smartphone
function modifyGuiForMobile()
{
    if (!UtilDevice.isMobile())
    {
        return;
    }

    var el_guestbook_page = getElementDivGuestbookPage();

    if (null == el_guestbook_page)
    {
        alert("modifyGuiForMobile Programming error Element guestbook page is null");

        return;
    }

    el_guestbook_page.style.border = 'none';

    el_guestbook_page.style.marginLeft = '0px';

    setTextBoxUpdateNamesSizeMobile();

    setTextBoxUpdateEmailSizeMobile();

    setTextBoxUpdateTitleMobile();

    setTextBoxUpdateRemarkMobile();

    setTextBoxContactFromSizeMobile();

    setTextBoxContactEmailSizeMobile();

    setTextBoxLastRecordSizeMobile();

} // modifyGuiForMobile

// Returns the textbox maximum number of chars (width) as strin for mobiles
function getTextBoxMaxCharsMobile()
{
    var ret_number_chars_str = '36';

    if (!UtilDevice.isMobile())
    {
        alert("getTextBoxMaxCharsMobile Not mobile. Returned value 39px")

        return ret_number_chars_str;
    }

    var screen_width = UtilDevice.screenWidth();

    var screen_height = UtilDevice.screenHeight();

    // alert("getTextBoxMaxCharsMobile width= " + screen_width.toString() + " height= " + screen_height.toString());

    if (screen_width >= 355 && screen_width < 365)
    {
        ret_number_chars_str = '34';
    }
    
    return ret_number_chars_str;

} // getTextBoxMaxCharsMobile

// Create and set text image container
function createTextImageContainer()
{
    g_display_image_text = new DisplayImageText('upload', 'id_div_upload_image_text');

    g_display_image_text.setLabelText(GuestStr.labelUploadedAllTexts());

    g_display_image_text.setTitle(GuestStr.titleUploadedAllTexts());

    var font_size = '; font-size: 10px';

    var style_label_all_text = 'clear: both; padding-left: 5px;';
    g_display_image_text.setStyleLabelAllTextString(style_label_all_text);

    var style_text_group_all = 'clear: both; overflow: hidden; background-color: black; color: white';
    g_display_image_text.setStyleTextGroupAll(style_text_group_all);

    var style_text_group_one = 'clear: both; overflow: hidden';
    g_display_image_text.setStyleTextGroupOne(style_text_group_one);

    var style_text_group_two = 'clear: both; overflow: hidden';
    g_display_image_text.setStyleTextGroupTwo(style_text_group_two);

    var style_text_one = 'float: left; padding: 5px; font-weight: bold' + font_size;
    g_display_image_text.setStylTextOneString(style_text_one);

    var style_text_two = 'float: right; padding: 5px; font-weight: bold' + font_size;;
    g_display_image_text.setStylTextTwoString(style_text_two);

    var style_text_three = 'clear:both; padding: 5px; text-align: center; font-style: italic; font-weight: bold' + font_size;;
    g_display_image_text.setStylTextThreeString(style_text_three);

    var style_text_four = 'clear:both; padding: 5px; font-style: italic; font-weight: bold' + font_size;;
    g_display_image_text.setStylTextFourString(style_text_four);

    g_display_image_text.display();

} // createTextImageContainer

// Create the update names text box
function createTextBoxUpdateNames()
{
    g_upload_names_text_box = new JazzTextBox("id_upload_names", 'id_div_upload_names');

    g_upload_names_text_box.setLabelText(GuestStr.labelTextBoxNames());

    g_upload_names_text_box.setLabelTextPositionAbove();

    g_upload_names_text_box.setSize("39");

    g_upload_names_text_box.setValue("");

    g_upload_names_text_box.setOninputFunctionName("onInputTextUpdateNames");

    g_upload_names_text_box.setReadOnlyFlag(false);

    g_upload_names_text_box.setTitle(GuestStr.titleTextBoxNames());

} // createTextBoxUpdateNames

// Sets the size for the update names text box
function setTextBoxUpdateNamesSizeMobile()
{
    g_upload_names_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxUpdateNamesSizeMobile

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

// Sets the size for the update email text box
function setTextBoxUpdateEmailSizeMobile()
{
    g_upload_email_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxUpdateEmailSizeMobile

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

    g_code_one_text_box.setLabelTextPositionAbove();

    // Not working for number g_code_one_text_box.setSize("1");

    g_code_one_text_box.setValue("");

    g_code_one_text_box.setInputTypeToNumber();

    g_code_one_text_box.setNumberMin("0");

    g_code_one_text_box.setNumberMax("9");

    g_code_one_text_box.setOninputFunctionName("onInputCodeOne");

    g_code_one_text_box.setReadOnlyFlag(false);

    g_code_one_text_box.setTitle(GuestStr.titleTextBoxCodeOne());

} // createTextBoxCodeOne

// Create the figure two code text box
function createTextBoxCodeTwo()
{
    g_code_two_text_box = new JazzTextBox("id_upload_code_two", 'id_div_upload_code_two');

    g_code_two_text_box.setLabelText("");

    g_code_two_text_box.setLabelTextPositionAbove();

    // Not working for number g_code_two_text_box.setSize("1");

    g_code_two_text_box.setValue("");

    g_code_two_text_box.setInputTypeToNumber();

    g_code_two_text_box.setNumberMin("0");

    g_code_two_text_box.setNumberMax("9");

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

    // Not working for number g_code_three_text_box.setSize("1");

    g_code_three_text_box.setValue("");

    g_code_three_text_box.setInputTypeToNumber();

    g_code_three_text_box.setNumberMin("0");

    g_code_three_text_box.setNumberMax("9");

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

    // Not working for number g_code_four_text_box.setSize("1");

    g_code_four_text_box.setValue("");

    g_code_four_text_box.setInputTypeToNumber();

    g_code_four_text_box.setNumberMin("0");

    g_code_four_text_box.setNumberMax("9");

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

    // Not working for number g_code_five_text_box.setSize("1");

    g_code_five_text_box.setValue("");

    g_code_five_text_box.setInputTypeToNumber();

    g_code_five_text_box.setNumberMin("0");

    g_code_five_text_box.setNumberMax("9");

    g_code_five_text_box.setOninputFunctionName("onInputCodeFive");

    g_code_five_text_box.setReadOnlyFlag(false);

    g_code_five_text_box.setTitle(GuestStr.titleTextBoxCodeFive());

} // createTextBoxCodeFive

// Creates the send code button
function createSendCodeButton()
{
    g_send_code_button = new JazzButton('id_upload_button_send', 'id_div_upload_button_send');

    g_send_code_button.setOnclickFunctionName("onClickForwardOneButton");

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

// Creates the upload concert dropdown control.
// The control lets the user select a concert for the image that shall be uploaded.
// This means that the concert must have been played, i.e. the date is passed
// Before a new season has started, i.e. from april to the first concert in october,
// there will be no concerts to select. For this case the control will not be created.
function createUploadConcertDropdown()
{
    // The day of the concert the concert will be in the array
    var n_days = 0; 

    var concert_array = g_season_xml.bandNamePassedDateArray(n_days);

    if (concert_array.length == 0)
    {
        // The first concert of the season has not yet taken place
        // This control will not be created and the div will be hidden
        hideElementDivUploadTextsConcert()

        return;
    }

    g_upload_concert_drop_down = new JazzDropdown('id_upload_texts_concert', getIdDivUploadTextsConcert());

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
    if (null == i_array || i_array.length == 0)
    {
        alert("limitStringLengthOfArray Invalid input: Array not defined or has no elements");

        return i_array;
    }

    if (i_max_n_chars < 10 || i_max_n_chars > 100)
    {
        alert("limitStringLengthOfArray Invalid input: Number of chars must be 10 - 100. i_max_n_chars= " + i_max_n_chars.toString());

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

    g_upload_title_text_box.setPlaceholderText(GuestStr.placeholderTitleImageUpload());

    g_upload_title_text_box.setOninputFunctionName("onInputTextBoxUpdateTitle")

    g_upload_title_text_box.setReadOnlyFlag(false);

    g_upload_title_text_box.setTitle(GuestStr.titleTextBoxTitle());

} // createTextBoxUpdateTitle

// Sets the size for the upload title text box
function setTextBoxUpdateTitleMobile()
{
    g_upload_title_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxUpdateTitleMobile

// Creates the textarea for the guest text
function createTextTextArea()
{
    g_text_textarea = new JazzTextArea("id_upload_texts_text", "id_div_upload_texts_text", "5", "39");

    g_text_textarea.setLabelText(GuestStr.labelTextAreaText());

    g_text_textarea.setLabelTextPositionAbove();

    g_text_textarea.setPlaceholderText(GuestStr.placeholderTextareaUpload());

    g_text_textarea.setValue("");

    g_text_textarea.setOninputFunctionName("onInputTextTextArea")

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

// Sets the size for the upload remark text box
function setTextBoxUpdateRemarkMobile()
{
    g_upload_remark_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxUpdateRemarkMobile

// Create button contact
function createContactButton()
{
    g_contact_button = new JazzButton('id_button_contact', 'id_div_button_contact');

    g_contact_button.setOnclickFunctionName("onClickContactButton");

    g_contact_button.setCaption(GuestStr.captionButtonContactAdministrator());

    g_contact_button.setLabelText("");

    g_contact_button.setTitle(GuestStr.titleButtonContactAdministrator());

} // createContactButton

// Create button contact cancel
function createContactCancelButton()
{
    g_contact_cancel_button = new JazzButton('id_contact_button_cancel', 'id_div_contact_button_cancel');

    g_contact_cancel_button.setOnclickFunctionName("onClickContactCancelButton");

    g_contact_cancel_button.setCaption(GuestStr.captionButtonContactAdministratorCancel());

    g_contact_cancel_button.setLabelText("");

    g_contact_cancel_button.setTitle(GuestStr.titleButtonContactAdministratorCancel());

} // createContactCancelButton

// Create button contact send
function createContactSendButton()
{
    g_contact_send_button = new JazzButton('id_contact_button_send', 'id_div_contact_button_send');

    g_contact_send_button.setOnclickFunctionName("onClickContactSendButton");

    g_contact_send_button.setCaption(GuestStr.captionButtonContactAdministratorSend());

    g_contact_send_button.setLabelText("");

    g_contact_send_button.setTitle(GuestStr.titleButtonContactAdministratorSend());

} // createContactSendButton

// Create the contact from text box
function createTextBoxContactFrom()
{
    g_contact_from_text_box = new JazzTextBox("id_contact_textbox_from", 'id_div_contact_textbox_from');

    g_contact_from_text_box.setLabelText(GuestStr.labelTextBoxContactName());

    g_contact_from_text_box.setLabelTextPositionAbove();

    g_contact_from_text_box.setSize("39");

    g_contact_from_text_box.setValue("");

    //g_contact_from_text_box.setPlaceholderText("");

    //g_contact_from_text_box.setOninputFunctionName("")

    g_contact_from_text_box.setReadOnlyFlag(false);

    g_contact_from_text_box.setTitle(GuestStr.titleTextBoxContactName());

} // createTextBoxContactFrom

// Sets the size for the contact from text box
function setTextBoxContactFromSizeMobile()
{
    g_contact_from_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxContactFromSizeMobile

// Create the contact email text box
function createTextBoxContactEmail()
{
    g_contact_email_text_box = new JazzTextBox("id_contact_textbox_mail", 'id_div_contact_textbox_mail');

    g_contact_email_text_box.setLabelText(GuestStr.labelTextBoxContactEmail());

    g_contact_email_text_box.setLabelTextPositionAbove();

    g_contact_email_text_box.setSize("39");

    g_contact_email_text_box.setValue("");

    //g_contact_email_text_box.setPlaceholderText("");

    //g_contact_email_text_box.setOninputFunctionName("")

    g_contact_email_text_box.setReadOnlyFlag(true);

    g_contact_email_text_box.setTitle(GuestStr.titleTextBoxContactEmail());

} // createTextBoxContactEmail

// Sets the size for the contact email text box
function setTextBoxContactEmailSizeMobile()
{
    g_contact_email_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxContactEmailSizeMobile

// Create the last uploaded record text box
function createTextBoxLastRecord()
{
    g_last_record_text_box = new JazzTextBox("id_contact_textbox_last_rec", 'id_div_contact_textbox_last_rec');

    g_last_record_text_box.setLabelText(GuestStr.labelTextBoxLastRecord());

    g_last_record_text_box.setLabelTextPositionAbove();

    g_last_record_text_box.setSize("39");

    g_last_record_text_box.setValue("");

    g_last_record_text_box.setReadOnlyFlag(true);

    g_last_record_text_box.setTitle(GuestStr.titleTextBoxLastRecord());

} // createTextBoxLastRecord

// Sets the size for the last uploaded record text box
function setTextBoxLastRecordSizeMobile()
{
    g_last_record_text_box.setSize(getTextBoxMaxCharsMobile());

} // setTextBoxLastRecordSizeMobile

// Creates the textarea for the contact message
function createContactMessageTextArea()
{
    g_contact_msg_textarea = new JazzTextArea("id_contact_textarea_message", "id_div_contact_textarea_message", "5", "39");

    g_contact_msg_textarea.setLabelText(GuestStr.labelTextAreaContactText());

    g_contact_msg_textarea.setLabelTextPositionAbove();

    g_contact_msg_textarea.setPlaceholderText(GuestStr.placeholderTextAreaContactText());

    g_contact_msg_textarea.setValue("");

    g_contact_msg_textarea.setOninputFunctionName("onInputContactMessageTextArea")

    g_contact_msg_textarea.setReadOnlyFlag(false);

    g_contact_msg_textarea.setTitle(GuestStr.titleTextAreaContactText());

} // createContactMessageTextArea

// Creates the contact case dropdown control
function createContactCaseDropdown()
{
    g_contact_case_drop_down = new JazzDropdown('id_contact_dropdown_case', 'id_div_contact_dropdown_case');

    g_contact_case_drop_down.setNameArray(GuestStr.getContactDropdownArray());

    g_contact_case_drop_down.setOnchangeFunctionName("eventSelectContactCaseDropdown");

    g_contact_case_drop_down.setLabelText(GuestStr.labelDropdownContactCase());

    g_contact_case_drop_down.setLabelTextPositionAbove();

    g_contact_case_drop_down.setTitle(GuestStr.titleDropdownContactCase());

    g_contact_case_drop_down.setSelectOptionNumber(1);

} // createContactCaseDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////