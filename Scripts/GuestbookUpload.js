// File: GuestbookUpload.js
// Date: 2025-04-14
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application guestbook image upload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of GuestbookData that holds all the user input data
var g_guestbook_data = null;

// Instance of GuestbookData that holds data from the last uploaded record
var g_guestbook_data_last_record = null;

// Object JazzUploadImage control defined in WwwControls
var g_upload_image_object = null;

var g_email_secure = 'guestbook@jazzliveaarau.ch';

// Flag telling if guestbook app is a test version for the JAZZ live AARAU mobile telephon
// Querystring shall be ?TestVersion&MobileTelephone for this case
var g_upload_test_version_mobile_telephone = false;

// Instance of class UploadWindow handling the title and infor for the active window
var g_upload_window = null;  

// Flag telling if one image has been uploaded
var g_one_image_is_uploaded = false;

// Flag telling if the user or administrator edits record
var g_edit_record_mode = false;

// Set flag telling if the user or administrator edits record to true
function setEditRecordModeToTrue(){ g_edit_record_mode = true; }

// Set flag telling if the user or administrator edits record to false
function setEditRecordModeToFalse(){ g_edit_record_mode = false; }

// Returns true if the mode is 'Edit of a record'
function getEditRecordMode(){ return g_edit_record_mode; }

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization for Guestbook Upload
// 1. Load objects JazzGuests.xml and JazzGuestsUploaded.xml. 
//    Call of loadAllXmlObjectsForAdminAndUpload
// 2. Get guestbook data from local storage from the last record
//    Call of GuestStorage.getGuestbookData
// 3. Create the UtilLock object. The functions of this call is used to lock and unlock
//    the files JazzGuests.xml and JazzGuestsUploaded.xml.
// 4. Set the edit recor mode to false
//    Call of setEditRecordModeToFalse
function initGuestbookUpload()
{
    g_load_for_guestbook_admin = false;

    loadAllXmlObjectsForAdminAndUpload();

    g_guestbook_data_last_record = GuestStorage.getGuestbookData();

    initJazzGuestsLockUnlock();

    setEditRecordModeToFalse();

    if (UtilQuery.isParamCurrentUrl('TestVersion') && UtilQuery.isParamCurrentUrl('MobileTelephone'))
    {
        g_upload_test_version_mobile_telephone = true;

    }

} // initGuestbookUpload

// All XML objects have been created
function callbackAllXmlObjectsCreatedForUpload()
{
    g_guestbook_data = new GuestbookData();

    createUpdateControls();

    setGuestbookNamesAndEmailFromLocalStorage();

    setGuestbookNamesAndEmailForTestVersionMobile();

    hideElementDivUploadContainerTwo();

    setUploadTestInstructions();

    // Alternative to instructions with text
    hideElementDivImageUploadIcon();

    hideElementDivUploadTexts();

    hideElementDivUploadButtonForwardTwo();

    hideElementDivUploadButtonForwardThree();

    hideElementDivInputCode();

    hideElementDivButtonSendCode();

    hideElementDivContactButton();

    hideElementDivContactContainer();

    hideDivUploadTextsRemark();

    var upload_path = 'https://jazzliveaarau.ch/JazzGuests/Uploaded/';

    var upload_file_name = 'Image_' + UtilDate.getTimeStamp();

    // The extension will be defined by the image file that the user selected
    var upload_file_extension = ''; 

    var image_max_size_mb = 1.5;

    // 20241111 var default_img = 'https://jazzliveaarau.ch/Guestbook/Icons/default_upload_image.jpg';

    var default_img = 'Icons/default_upload_image.jpg';

    var caption_select_img = 'Bild wählen';

    var input_data = new JazzUploadImageInput(upload_file_name, upload_file_extension, upload_path, 
            image_max_size_mb, default_img, caption_select_img, eventImageIsUploaded);

    g_upload_image_object = new JazzUploadImage(getIdDivUploadFileImage(), input_data);

    g_upload_window = new UploadWindow(getElementDivUploadGuestbookTitle());

    JazzUploadImage.initDebugFile();

} // callbackAllXmlObjectsCreatedForUpload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Code ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Event default image is uploaded
// i_b_hide: true or false
// There is (or was) a default image in the class JazzUploadImageInput. The object
// will call this function for every image that has been uploaded. If it is the 
// default image that was loaded this function will do nothing.
// TODO callback functions should be added for the handling of the 
// forward an back buttons. Both should be hidden when an image is being loaded
// otherwise the app may fail. Parameter g_one_image_is_uploaded should also be
// deleted
function eventImageIsUploaded(i_b_hide)
{
    if (i_b_hide)
    {
        hideElementDivUploadButtonForwardTwo();
    }
    else
    {
        displayElementDivUploadButtonForwardTwo();
    }

} // eventSelectedImageIsUploaded

function initAllInputCodes()
{
    g_guestbook_data.initAllInputCodes();

    g_guestbook_data.setRandomCode();

    g_code_one_text_box.setValue("");

    g_code_two_text_box.setValue("");

    g_code_three_text_box.setValue("");

    g_code_four_text_box.setValue("");

    g_code_five_text_box.setValue("");

} // initAllInputCodes

// Set focus on textbox forthe input of the code
function inputCheckSetCodeFocus(i_code_number)
{
    var current_text_box = null;

    var next_text_box = null;

    if (1 == i_code_number)
    {
        current_text_box = g_code_one_text_box;

        next_text_box = g_code_two_text_box;
    }
    else if (2 == i_code_number)
    {
        current_text_box = g_code_two_text_box;

        next_text_box = g_code_three_text_box;
    }
    else if (3 == i_code_number)
    {
        current_text_box = g_code_three_text_box;

        next_text_box = g_code_four_text_box;
    }
    else if (4 == i_code_number)
    {
        current_text_box = g_code_four_text_box;

        next_text_box = g_code_five_text_box;
    }
    else if (5 == i_code_number)
    {
        current_text_box = g_code_five_text_box;

        next_text_box = null;
    }
    else
    {
        alert("inputCheckSetCode Programming error");

        return;
    }

    var code_current = current_text_box.getValue();

    if (code_current.length == 0)
    {
        setCurrentMemberValue(i_code_number, code_current);

        return;
    }

    if (!GuestbookData.validCodeNumber(code_current))
    {
        current_text_box.setValue("");

        setCurrentMemberValue(i_code_number, "");

        alert("Code musst 0, 1, 2, 3, .... oder 9 sein")

        return;
    }

    setCurrentMemberValue(i_code_number, code_current);

    current_text_box.loseFocus();

    if (null != next_text_box)
    {
        next_text_box.setFocus();
    }


} // inputCheckSetCodeFocus

function setCurrentMemberValue(i_code_number, i_value)
{

    if (1 == i_code_number)
    {
        g_guestbook_data.m_input_one = i_value;
    }
    else if (2 == i_code_number)
    {
        g_guestbook_data.m_input_two = i_value;
    }
    else if (3 == i_code_number)
    {
        g_guestbook_data.m_input_three = i_value;
    }
    else if (4 == i_code_number)
    {
        g_guestbook_data.m_input_four = i_value;
    }
    else if (5 == i_code_number)
    {
        g_guestbook_data.m_input_five = i_value;
    }
    else
    {
        alert("setCurrentMemberValue Programming error");

        return;
    }

} // setCurrentMemberValue

// Actions when input code is equal to random code
function inputCodeIsEqualToRandomCode()
{
    if (g_guestbook_data.inputCodeEqualToRandomCode())
    {
        displayElementDivButtonSendCode();
        setBackgroundColorValidElementDivInputCode();
        displayElementDivContactButton();
    }
    else if (g_guestbook_data.allInputCodeAreSet() && !g_guestbook_data.inputCodeEqualToRandomCode())
    {
        // alert("Code ist falsch");
        setBackgroundColorInvalidElementDivInputCode();

        hideElementDivButtonSendCode();

        hideElementDivContactButton();
    }

} // inputCodeIsEqualToRandomCode

// Input of code figure one
function onInputCodeOne()
{
    // alert("onInputCodeOne Input code= " + g_code_one_text_box.getValue());

    inputCheckSetCodeFocus(1);

    inputCodeIsEqualToRandomCode();

} // onInputCodeOne

// Input of code figure two
function onInputCodeTwo()
{
    // alert("onInputCodeTwo Input code= " + g_code_two_text_box.getValue());

    inputCheckSetCodeFocus(2);

    inputCodeIsEqualToRandomCode();

} // onInputCodeTwo

// Input of code figure three
function onInputCodeThree()
{
    // alert("onInputCodeThree Input code= " + g_code_three_text_box.getValue());

    inputCheckSetCodeFocus(3);

    inputCodeIsEqualToRandomCode();

} // onInputCodeThree

// Input of code figure four
function onInputCodeFour()
{
    // alert("onInputCodeFour Input code= " + g_code_four_text_box.getValue());

    inputCheckSetCodeFocus(4);

    inputCodeIsEqualToRandomCode();

} // onInputCodeFour

// Input of code figure five
function onInputCodeFive()
{
    // alert("onInputCodeFive Input code= " + g_code_five_text_box.getValue());

    inputCheckSetCodeFocus(5);

    inputCodeIsEqualToRandomCode();

} // onInputCodeFive

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Code //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start GUI Event Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User input of names character
function onInputTextUpdateNames()
{
    var guestbook_names = g_upload_names_text_box.getValue();

    g_guestbook_data.setImageNames(guestbook_names);

} // onInputTextUpdateNames

// User input of email character
function onInputTextUpdateEmail()
{
    var guestbook_email = g_upload_email_text_box.getValue();

    if (!g_guestbook_data.inputCodeEqualToRandomCode())
    {
        g_guestbook_data.m_email = guestbook_email;
    }
    else
    {
        if (g_guestbook_data.m_email != guestbook_email)
        {
            if (!continueChangingEmailAddress())
            {
                return;
            }

            hideElementDivButtonSendCode();

            hideElementDivInputCode();
    
            initAllInputCodes();
    
            alert(GuestStr.emailChangedNewCodeRequired());
        }
    }

} // onInputTextUdateEmail

// Returns true if the user will change the email address
// Resets the email control and returns false if not
function continueChangingEmailAddress()
{

    var prompt_str = GuestStr.changedEmailRequiresNewCode();

    var b_confirm = confirm(prompt_str);

    if (b_confirm == true)
    {
        return true;
    }
    g_upload_email_text_box.setValue(g_guestbook_data.m_email);

    return false;
    
} // continueChangingEmailAddress

// User selected a concert
function eventSelectUploadConcertDropDown()
{
    var selected_concert_option_number = g_upload_concert_drop_down.getSelectOptionNumber();

    // Append is 'No concert' here
    var b_append = g_upload_concert_drop_down.selectedOptionNumberIsAppendItem(selected_concert_option_number);

    if (b_append)
    {
        g_guestbook_data.setCurrentDate();

        g_guestbook_data.setBand('');

        g_guestbook_data.setMusicians('');

        return;
    }

    var concert_number = parseInt(selected_concert_option_number);

    var band_name = g_season_xml.getBandName(concert_number);

    var concert_year = g_season_xml.getYear(concert_number);

    var concert_month = g_season_xml.getMonth(concert_number);

    var concert_day = g_season_xml.getDay(concert_number);

    var n_musicians = g_season_xml.getNumberOfMusicians(concert_number);

    var musicians_str = '';

    for (var musician_number=1; musician_number <= n_musicians; musician_number++)
    {
        var musician_name = g_season_xml.getMusicianName(concert_number, musician_number);

        musicians_str = musicians_str + musician_name;

        if (musician_number < n_musicians)
        {
            musicians_str = musicians_str + ', ';
        }

    }

    g_guestbook_data.setBand(band_name);

    g_guestbook_data.setMusicians(musicians_str);

    g_guestbook_data.setYear(concert_year);

    g_guestbook_data.setMonth(concert_month);

    g_guestbook_data.setDay(concert_day);

} // eventSelectUploadConcertDropDown

// User input of text in the title textbox
function onInputTextBoxUpdateTitle()
{
    var titel_text = g_upload_title_text_box.getValue();

    titel_text = titel_text.trim();

    if (titel_text.length > 0)
    {
        displayElementDivUploadButtonForwardThree()
    }
    else
    {
        hideElementDivUploadButtonForwardThree();
    }

    g_guestbook_data.setImageTitle(titel_text);

    setImageTextContainer();

} // onInputTextBoxUpdateTitle

function onInputTextTextArea()
{
    var image_text = g_text_textarea.getValue();

    g_guestbook_data.setImageText(image_text);

    setImageTextContainer();

} // onInputTextTextArea

// User clicked the information icon
function clickGuestbookInfo()
{
    var file_name = 'https://jazzliveaarau.ch/Guestbook/Info/InfoGuestbookUpload.htm';

    var file_name = g_upload_window.getInfoUrl();

    window.open(file_name, '_blank');

} // clickGuestbookInfo

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End GUI Event Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Contact Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the contact button
function onClickContactButton()
{
    setContactDropdownTexts();
    
    hideElementDivNamesEmailCode();

    displayElementDivContactContainer();

    g_upload_window.toContact();

} // onClickContactButton

// User clicked the contact cancel button
function onClickContactCancelButton()
{
    hideElementDivContactContainer();

    displayElementDivNamesEmailCode();

    g_upload_window.cancelContact();

} // onClickContactCancelButton

// User clicked the contact send button
function onClickContactSendButton()
{
    debugGuestbookUpload('onClickContactSendButton User clicked the contact execution button');

    executeContactRequest();

} // onClickContactSendButton

// User input of character for the contact message
function onInputContactMessageTextArea()
{
    console.log("onInputContactMessageTextArea");

} // onInputContactMessageTextArea

// User selected a contact case
function eventSelectContactCaseDropdown()
{
    setContactDropdownTexts();

} // eventSelectContactCaseDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Contact Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Process Event Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the request code button
function onClickRequestCodeButton()
{
    initAllInputCodes();

    if (!getGuestbookNames())
    {
        return;
    }

    if (!getGuestbookEmail())
    {
        return;
    }

    hideElementDivUploadStartInstructions();

    sendGuestbookCodeEmailToUser();

    displayElementDivInputCode();

    g_code_one_text_box.setFocus();

} // onClickReqireCodeButton

// User clicked the forward part one button, i.e. the code input is valid
// and the user can in part two upload an image if the code is correct
// The names are checked when the user requires the code, but has to be
// checked here again for the case that the user returned to part one
// and changed the names
function onClickForwardOneButton()
{
    if (g_guestbook_data.inputCodeEqualToRandomCode())
    {
        if (!getGuestbookNames())
        {
            return;
        }

        hideElementDivNamesEmailCode();

        displayElementDivUploadContainerTwo();

        if (getEditRecordMode())
        {
            displayElementDivUploadButtonForwardTwo();
        }
        else if (!g_one_image_is_uploaded)
        {
            hideElementDivUploadButtonForwardTwo();

            g_one_image_is_uploaded = true;
        }
    }
    else
    {
        alert(GuestStr.inputCodeError());
    }
    g_upload_window.forward();

} // onClickForwardOneButton

// User clicked the back part two (upload of image) button, i.e.
// the user comes bac to the start part with email address and names
function onClickBackTwoButton()
{
    displayElementDivNamesEmailCode();

    hideElementDivUploadContainerTwo();

    g_upload_window.backward();

} // onClickReqireCodeButton

// User clicked the forward part two (upload of image) button, i.e. the user 
// can in part three input the image title and other texts
function onClickForwardTwoButton()
{
    var image_file_url = g_upload_image_object.getImageFileFullName();

    if (image_file_url.length == 0)
    {
        alert(GuestStr.imageNotUploaded());

        return;
    }

    var b_edit_mode = getEditRecordMode();

    if (!b_edit_mode)
    {
        g_guestbook_data.setImageFile(image_file_url);
    }
    else if ( userUploadedAnImageInEditMode())
    {
        // Change name only if in edit mode and when the user has uploaded a new image

        g_guestbook_data.setImageFile(image_file_url);
    }

    hideElementDivUploadContainerTwo();

    displayElementDivUploadTexts();

    setImageTextContainer();

    if (getEditRecordMode())
    {
        displayElementDivUploadButtonForwardThree();
    }

    g_upload_window.forward();

} // onClickReqireCodeButton

// Returns true if the user uploaded one or more images in edit mode
// TODO Bad solution. Implement something else in JazzUploadImage!
// For every new image there will be two (2) calls. Why?
// In edit mode is the default image replaced ==> n_loaded_images = 2
// (The user never klicked on the upload button for replace ...)
// Upload of a new image  ==> n_loaded_images = 4
function userUploadedAnImageInEditMode()
{
    var ret_uploaded = false;

    var b_edit_mode = getEditRecordMode();

    if (!b_edit_mode)
    {
        return ret_uploaded;
    }

    var n_loaded_images = g_upload_image_object.getNumberOfUploadedImages();

    if (n_loaded_images >= 4)
    {
        ret_uploaded = true;
    }

    return ret_uploaded;

} // userUploadedAnImageInEditMode

// User clicked the back part three (texts input) button
function onClickBackThreeButton()
{
    // alert("onClickBackThreeButton");

    hideElementDivUploadTexts();

    displayElementDivUploadContainerTwo();

    g_upload_window.backward();

} // onClickReqireCodeButton

// User clicked the forward three part three (texts input) button. i.e.
// the user wants to save the data (finish the input of data)
// Button is hidden in order to avoid double-click
function onClickForwardThreeButton()
{
    if(!getCheckGuestbookDataPartThree())
    {
        return;
    }

    hideElementDivUploadButtonForwardThree();

    debugGuestbookUpload('onClickForwardThreeButton User clicked save record');

    var b_edited_record_mode = getEditRecordMode();

    if (b_edited_record_mode)
    {  
        SaveEditedRecord.start();
    }
    else
    {
        AppendBothXml.start(callbackAppendBothXml);
    }

    

} // onClickForwardThreeButton

// Set controls for edit of the last uploaded record
// 1. Close the contact page (with the open button)
//    Call of hideElementDivContactContainer
// 2. Set the title for this window
//    Call of UploadWindows.toUploadImage
// 3. Get the URL for the image that will be uploaded after edit
//    Please note that the registered image will be displayed here
//    (and not the uploaded image as when the user adds a record)
//    Call of GuestbookData.getFileName and  GuestbookServer.getHomepageUrl
// 5. Display the image on page 2
//    Call of JazzUploadImage.changeDefaultImageFile
// 6. Set guest names on page 1.
//    The user is allowed to input any for edit of a record. Only
//    email, texte, etc. must be identical to data in GuestStorage
//    For the editing the names shall be equal to the original
//    Please note that the user is allowed to change them by editing
//    Call of UploadImageData.getNames and JazzTextBox.setValue
// 7. Set the image header (title) text page 3
//    Call of  UploadImageData.getImageTitle and JazzTextBox.setValue
// 8. Set the image text page 3
//    Call of  UploadImageData.getImageText and JazzTextBox.setValue
// 9. Set the concert dropdown if possible
//    Call of setControlEditConcertDropdown
// 10. Display the page for uploading the picture 
//     This will be the starting page for editing the record. The user can
//     can go back to the first page and change the names (but not the email).
//     Call of displayElementDivUploadContainerTwo
function setControlsEditLastUploadedRecord()
{
    debugGuestbookUpload('setControlsEditLastUploadedRecord Set controls for edit of record');

    hideElementDivContactContainer();

    g_upload_window.toUploadImage();
    
    var abs_reg_image_url = g_guestbook_data.getAbsoluteFileName();

    g_upload_image_object.changeDefaultImageFile(abs_reg_image_url);

    var guest_names = g_guestbook_data.getImageNames();

    g_upload_names_text_box.setValue(guest_names);

    var header_txt = g_guestbook_data.getImageTitle();

    g_upload_title_text_box.setValue(header_txt);

    var text_area = g_guestbook_data.getImageText();

    g_text_textarea.setValue(text_area);

    setControlEditConcertDropdown();

    displayElementDivUploadContainerTwo();

} // setControlsEditLastUploadedRecord

// Sets the concert dopd
function setControlEditConcertDropdown()
{
    if (null == g_upload_concert_drop_down)
    {
        alert("setControlEditConcertDropdown g_upload_concert_drop_down is null");

        return;
    }

    if (null == g_upload_concert_drop_down.m_drop_down_name_array)
    {
        alert("Warnung setControlEditConcertDropdown m_drop_down_name_array is null");

        return;    
    }

    var n_names = g_upload_concert_drop_down.m_drop_down_name_array.length;

    if (n_names == 0)
    {
        return;
    }

    var band_name = g_guestbook_data.getBand();

    var index_found = -1;

    for (var index_name = 0; index_name < n_names; index_name++)
    {
        var current_name = g_upload_concert_drop_down.m_drop_down_name_array[index_name];

        if (current_name == band_name)
        {
            index_found = index_name;

            break;
        }

    }

    if (index_found < 0)
    {
        return;
    }

    var n_option_numbers = g_upload_concert_drop_down.m_drop_down_number_array.length;

    if (index_found >=  n_option_numbers)
    {
        return;
    }

    var select_option_number = g_upload_concert_drop_down.m_drop_down_number_array[index_found];

    g_upload_concert_drop_down.setSelectOptionNumber(select_option_number);

} // setControlEditConcertDropdown


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Process Event Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Execution Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Callback function after adding new record with class AppendBothXml functions
function callbackAppendBothXml()
{
    location.reload();

} // callbackAppendBothXml

// The class AppendBothXml appends a new record to both XML files JazzGuestsUploaded.xml
// and JazzGuests.xml. Input data is the global variable g_guestbook_data and the
// name of the function that shall be called when all steps are executed
class AppendBothXml
{
    // Start function that backups the file JazzGuestsUploaded.xml and calls the next
    // function appendXmlUserInputData
    static start(i_append_both_callback)
    {
        g_guestbook_data.setAppendBothXmlCallback(i_append_both_callback);

        var user_email = g_guestbook_data.getImageEmail();

        g_util_lock_object.setUserEmail(user_email);

        g_util_lock_object.setLockedCallbackFunctionName(AppendBothXml.reloadJazzGuestsObject);

        g_util_lock_object.lock();

    } // start

    // Reloads the JazzGuests.xml object
    static reloadJazzGuestsObject()
    {
        reloadJazzGuestXmlObject(AppendBothXml.reloadJazzGuestsUploadedObject);

    } // reloadJazzGuestsObject

    // Reloads the JazzGuestsUploaded.xml object
    static reloadJazzGuestsUploadedObject()
    {
        reloadJazzGuestUploadedXmlObject(AppendBothXml.backupJazzGuestsUploaded);

    } // reloadJazzGuestsUploadedObject

    // Make a backup of JazzGuestsUploaded.xml
    static backupJazzGuestsUploaded()
    {
        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuestsUploaded(), 
                                    GuestbookServer.absoluteUrlJazzGuestsUploadedBackup(), 
                                    AppendBothXml.appendXmlUserInputData);

    } // backupJazzGuestsUploaded

    // Appends a new record, sets it with g_guestbook_data and saves JazzGuestsUploaded.xml.
    // The next function to be called is sendNotificationEmail
    static appendXmlUserInputData()
    {
        debugGuestbookUpload('AppendBothXml.appendUploaded Enter');

        var b_upload_also_to_homepage = true;
    
        g_guests_uploaded_xml.appendGuestNode();
    
        var n_records = g_guests_uploaded_xml.getNumberOfGuestRecords();

        g_guestbook_data.setUploadedXmlNewRecordNumber(n_records);
    
        debugGuestbookUpload('Record appended to JazzGuestsUploaded.xml. Number of records is ' + n_records.toString());
    
        var escaped_data = '';
    
        g_guests_uploaded_xml.setGuestYear(n_records, g_guestbook_data.getYear());
    
        g_guests_uploaded_xml.setGuestMonth(n_records, g_guestbook_data.getMonth());
    
        g_guests_uploaded_xml.setGuestDay(n_records, g_guestbook_data.getDay());
    
        g_guests_uploaded_xml.setGuestBand(n_records, g_guestbook_data.getBand());
    
        g_guests_uploaded_xml.setGuestMusicians(n_records, g_guestbook_data.getMusicians());
    
        escaped_data = UtilXml.escapeString( g_guestbook_data.getImageTitle());
    
        g_guests_uploaded_xml.setGuestHeader(n_records, escaped_data);
    
        escaped_data = UtilXml.escapeString( g_guestbook_data.getImageText());
    
        g_guests_uploaded_xml.setGuestText(n_records, escaped_data);
    
        escaped_data = UtilXml.escapeString( g_guestbook_data.getImageNames());
      
        g_guests_uploaded_xml.setGuestNames(n_records, escaped_data);
    
        escaped_data = UtilXml.escapeString( g_guestbook_data.getImageRemark());
    
        g_guests_uploaded_xml.setGuestRemark(n_records, escaped_data);
    
        g_guests_uploaded_xml.setGuestFileName(n_records, g_guestbook_data.getImageFile());
    
        g_guests_uploaded_xml.setGuestFileType(n_records, 'IMG');
    
        // Not used here g_guests_uploaded_xml.JazzGuestAvatar(n_records, '');
    
        g_guests_uploaded_xml.setGuestEmail(n_records, g_guestbook_data.getImageEmail());
    
        // Not used here g_guests_uploaded_xml.setGuestTelephone(n_records, '');
    
        if (b_upload_also_to_homepage)
        {
            g_guests_uploaded_xml.setGuestStatusUploadedByGuestToHomepage(n_records);
        }
        else
        {
            g_guests_uploaded_xml.setGuestStatusPendingRecordInUpdate(n_records);
        }
    
        g_guests_uploaded_xml.setGuestPublishBool(n_records, true);
    
        g_guests_uploaded_xml.setGuestRegNumber(n_records, 'Will be set when moved to JazzGuests.xml');
    
        debugGuestbookUpload('AppendBothXml.appendUploaded All members set. Status= ' + g_guests_xml.getGuestStatus(n_records));

        UtilServer.saveFileCallback(GuestbookServer.absoluteUrlJazzGuestsUploaded(), 
                                    GuestbookServer.getPrettyPrintContent(g_guests_uploaded_xml), 
                                    AppendBothXml.backupJazzGuests);
    
    } // appendXmlUserInputData

    // Make a backup of JazzGuests.xml and call AppendBothXml.constructImageFileNameAndCopy
    static backupJazzGuests()
    {
        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
                                    GuestbookServer.absoluteUrlJazzGuestsBackup(), 
                                    AppendBothXml.constructImageFileNameAndCopy);
    }

    // Construct the name of the image file for the registered record of JazzGuests.xml
    static constructImageFileNameAndCopy()
    {
        var record_uploaded_number = g_guestbook_data.getUploadedXmlNewRecordNumber();

        var next_reg_number_int = g_guests_xml.getNextRegNumberInt();

        g_guestbook_data.setXmlNewRegisterNumber(next_reg_number_int);

        var next_reg_number_str = 'REG' + UtilDate.getFormattedThousandNumber(next_reg_number_int);

        var guest_year = g_guests_uploaded_xml.getGuestYear(record_uploaded_number);

        var guest_month = g_guests_uploaded_xml.getGuestMonth(record_uploaded_number);

        var guest_day = g_guests_uploaded_xml.getGuestDay(record_uploaded_number);

        var date_str = 'd' + UtilDate.getYyyyMmDdDateString(guest_year, guest_month, guest_day);

        var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(record_uploaded_number);

        var file_ext = UtilServer.getFileExtension(uploaded_file_name);

        var output_image_file_name = GuestbookServer.getJazzGuestsDirUrl() + date_str + '_' + next_reg_number_str + file_ext;

        var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(record_uploaded_number);

        var name_no_path = UtilServer.getFileName(uploaded_file_name);
    
        var input_image_file_name = GuestbookServer.getUploadedXmlDirUrl() + name_no_path;
    
        var length_homepage = GuestbookServer.getHomepageUrl().length;
    
        var rel_output_file_name= output_image_file_name.substring(length_homepage);
    
        debugGuestbookUpload('AppendBothXml.constructImageFileNameAndCopy Image input name =    ' + input_image_file_name);
    
        debugGuestbookUpload('AppendBothXml.constructImageFileNameAndCopy Image output name =   ' + output_image_file_name);
    
        debugGuestbookUpload('AppendBothXml.constructImageFileNameAndCopy Image relative name = ' + rel_output_file_name);
    
        // Please not that this relative path will be stored in the XML JazzGuests.xml
        g_guestbook_data.setXmlNewRegisterImageFileName(rel_output_file_name);

        UtilServer.copyFileCallback(input_image_file_name, output_image_file_name, AppendBothXml.appendXmlUploadedData);

    } // constructImageFileNameAndCopy

    // Appends the new record and saves JazzGuests.xml. 
    // Input data is from JazzGuestsUploaded.xml
    // The next function to be called is sendNotificationEmail
    static appendXmlUploadedData()
    {
        g_guests_xml.appendGuestNode();

        var n_records = g_guests_xml.getNumberOfGuestRecords();

        debugGuestbookUpload('AppendBothXml.appendXmlUploadedData Record was added to JazzGuests.xml. Number of records= ' + n_records.toString());

        // TODO var b_case_admin = false;

        var b_case_admin = true;

        var record_uploaded_number = g_guestbook_data.getUploadedXmlNewRecordNumber();

        g_guests_xml.setGuestYear(n_records, g_guests_uploaded_xml.getGuestYear(record_uploaded_number));

        g_guests_xml.setGuestMonth(n_records, g_guests_uploaded_xml.getGuestMonth(record_uploaded_number));

        g_guests_xml.setGuestDay(n_records, g_guests_uploaded_xml.getGuestDay(record_uploaded_number));

        g_guests_xml.setGuestBand(n_records, g_guests_uploaded_xml.getGuestBand(record_uploaded_number));

        g_guests_xml.setGuestMusicians(n_records, g_guests_uploaded_xml.getGuestMusicians(record_uploaded_number));

        g_guests_xml.setGuestHeader(n_records, g_guests_uploaded_xml.getGuestHeader(record_uploaded_number));

        g_guests_xml.setGuestText(n_records, g_guests_uploaded_xml.getGuestText(record_uploaded_number));

        g_guests_xml.setGuestNames(n_records, g_guests_uploaded_xml.getGuestNames(record_uploaded_number));

        g_guests_xml.setGuestRemark(n_records, g_guests_uploaded_xml.getGuestRemark(record_uploaded_number));

        g_guests_xml.setGuestFileName(n_records, g_guestbook_data.getXmlNewRegisterImageFileName());

        g_guests_xml.setGuestFileType(n_records, g_guests_uploaded_xml.getGuestFileType(record_uploaded_number));

        g_guests_xml.setGuestAvatar(n_records, g_guests_uploaded_xml.getGuestAvatar(record_uploaded_number));

        g_guests_xml.setGuestEmail(n_records, g_guests_uploaded_xml.getGuestEmail(record_uploaded_number));

        g_guests_xml.setGuestTelephone(n_records, g_guests_uploaded_xml.getGuestTelephone(record_uploaded_number));

        if (b_case_admin)
        {
            g_guests_xml.setGuestStatusAddedOrCheckedByAdmin(n_records);
            // 20241006 g_guests_xml.setGuestStatusTestAddedOrCheckedByAdmin(n_records);
        }
        else
        {
            g_guests_xml.setGuestStatusUploadedByGuestToHomepage(n_records);

        }

        debugGuestbookUpload('AppendBothXml.appendSetSaveGuestbookData Record status set to: ' + g_guests_xml.getGuestStatus(n_records));

        g_guests_xml.setGuestPublishBool(n_records, true);

        g_guests_xml.setGuestRegNumberInt(n_records, g_guestbook_data.getXmlNewRegisterNumber());

        AppendBothXml.setGuestbookDataFileNameRegNumber(n_records);

        debugGuestbookUpload('AppendBothXml.appendXmlUploadedData Record appended to JazzGuests.xlm object. Record ' 
                            + g_guestbook_data.getXmlNewRegisterNumber().toString());

        UtilServer.saveFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
        GuestbookServer.getPrettyPrintContent(g_guests_xml), 
        AppendBothXml.unlockFiles);

    } // appendXmlUploadedData

    // Unlock the files JazzGuests.xml and JazzGuestsUploaded.xml
    // (making it possible for other users and Guestbook functions to add, delete and
    //  change Guestbook data on the server)
    static unlockFiles()
    {
        g_util_lock_object.setUnlockedCallbackFunctionName(AppendBothXml.sendNotificationEmail);

        g_util_lock_object.unlock();

    } // unlockFiles

    // Notify the user and send notication email to the administrator
    static sendNotificationEmail()
    {
        alert(GuestStr.guestbookRecordIsUploaded(g_guestbook_data.getImageNames()));

        GuestStorage.setGuestbookData(g_guestbook_data);

        var email_case = 'new_uploaded';

        sendNoticationEmailToAdministrator(email_case, g_guestbook_data, g_guestbook_data.getAppendBothXmlCallback());

    } // sendNotificationEmail

    // Set registered file name and reg number in object GuestbookData (g_guestbook_data)
    static setGuestbookDataFileNameRegNumber(i_record_number)
    {
        g_guestbook_data.setFileName(g_guests_xml.getGuestFileName(i_record_number));

        g_guestbook_data.setRegNumber(g_guests_xml.getGuestRegNumber(i_record_number));

    } // setGuestbookDataFileNameRegNumber

} // AppendBothXml

// Save after editing a record
class SaveEditedRecord
{
    // Start function saving data after editing a record
    // 1. Debug output defining input data and actions
    //    Call of SaveEditedRecord.debugStart
    // 2. Lock the XML file. Set callback to function reloadJazzGuestsObject
    //    Call of UtilLock functionns setUserEmail, setLockedCallbackFunctionName and lock
    static start()
    {
        SaveEditedRecord.debugStart();

        debugGuestbookUpload("SaveEditedRecord.start Enter");

        var user_email = g_guestbook_data.getImageEmail();

        g_util_lock_object.setUserEmail(user_email);

        g_util_lock_object.setLockedCallbackFunctionName(SaveEditedRecord.copyNewImageFile);

        g_util_lock_object.lock();

    } // start

    // Copy image file from directory JazzGuests/Uploaded to JazzGuests if user changed the image
    // 1. Call SaveEditedRecord.reloadJazzGuestsObject if no new picture was selected
    //    Call of userUploadedAnImageInEditMode
    // 2. Get file names and copy (overwrite) registered image file.
    //    Callback function SaveEditedRecord.reloadJazzGuestsObject. Call of GuestbookData.getImageFile, 
    //    GuestbookData.getFileName and UtilServer.copyFileCallback
    static copyNewImageFile()
    {
        debugGuestbookUpload("SaveEditedRecord.copyNewImageFile Enter");

        var b_user_uploaded_new_image = userUploadedAnImageInEditMode();

        if (b_user_uploaded_new_image)
        {
            var new_image_file_name = g_guestbook_data.getImageFile();

            var abs_reg_image_file_name = g_guestbook_data.getAbsoluteFileName();
    
            UtilServer.copyFileCallback(new_image_file_name, abs_reg_image_file_name, SaveEditedRecord.reloadJazzGuestsObject);
        }
        else
        {
            debugGuestbookUpload("SaveEditedRecord.copyNewImageFile User did not upload a new window. Call reloadJazzGuestsObject direct");

            SaveEditedRecord.reloadJazzGuestsObject();
        }

    } // copyNewImageFile

    // Reloads the JazzGuests.xml object with callback function SaveEditedRecord.backupJazzGuests
    // Call of reloadJazzGuestXmlObject
    static reloadJazzGuestsObject()
    {
        debugGuestbookUpload("SaveEditedRecord.reloadJazzGuestsObject Enter");

        reloadJazzGuestXmlObject(SaveEditedRecord.backupJazzGuests);

    } // reloadJazzGuestsObject

   // Make a backup of JazzGuests.xml with callback function SaveEditedRecord.changeXmlRecordAndSaveFile
   // Call of UtilServer.copyFileCallback
   static backupJazzGuests()
   {
       debugGuestbookUpload("SaveEditedRecord.backupJazzGuests Enter");

       UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
                                   GuestbookServer.absoluteUrlJazzGuestsBackup(), 
                                   SaveEditedRecord.changeXmlRecordAndSaveFile);
   } // backupJazzGuests

    // Changes the record in the JazzGuests XML object and save JazzGuests.xml
    // 1. Get the registratin number 
    //    Call of GuestbookData.getRegNumber (object g_guestbook_data)
    // 2. Get the record number for this registration number
    //    Call of JazzGuestsXml.getRecordNumberForRegistrationNumber (object g_guests_xml)
    // 3. Change the record with data from the GuestbookData object g_guestbook_data
    //    Call of GuestbookData function: getYear, getMonth, getDay, getBand, getMusicians, 
    //    getImageTitle, getImageText and getImageNames
    //    Call of JazzGuestsXml functions: setGuestYear, setGuestMonth, setGuestDay,
    //    setGuestBand, setGuestMusicians, setGuestHeader, setGuestText and setGuestNames 
    // 4. Save the XML file with callback function SaveEditedRecord.unlockFiles
    //    Call of UtilServer.saveFileCallback
    static changeXmlRecordAndSaveFile()
    {
        debugGuestbookUpload("SaveEditedRecord.changeXmlRecordAndSaveFile Enter");

        var registration_number = g_guestbook_data.getRegNumber();

        var record_number = g_guests_xml.getRecordNumberForRegistrationNumber(registration_number);

        if (record_number < 0)
        {
            alert("saveEditedRecord.changeXmlRecordAndSaveFile getRecordNumberForRegistrationNumber failed for registration_number= " + registration_number);

            return;
        }

        g_guests_xml.setGuestYear(record_number, g_guestbook_data.getYear());

        g_guests_xml.setGuestMonth(record_number, g_guestbook_data.getMonth());

        g_guests_xml.setGuestDay(record_number, g_guestbook_data.getDay());

        g_guests_xml.setGuestBand(record_number, g_guestbook_data.getBand());

        g_guests_xml.setGuestMusicians(record_number, g_guestbook_data.getMusicians());

        g_guests_xml.setGuestHeader(record_number, g_guestbook_data.getImageTitle());

        g_guests_xml.setGuestText(record_number, g_guestbook_data.getImageText());

        g_guests_xml.setGuestNames(record_number, g_guestbook_data.getImageNames());

        // Not set by edit g_guests_xml.setGuestRemark(record_number, g_guestbook_data.getImageRemark());

        // Registered file name not changed g_guests_xml.setGuestFileName(record_number, g_guestbook_data.getFileName());

        // Uploaded file name is in JazzGuestUploaded.xml. This name is only used for copying the image file if the
        // user has uploaded a new image. Pleas note that the upload image name not is used for the editing or
        // deleteion of the last uploaded record. The user may make multiple editio0ns

        // g_guests_xml.setGuestFileType(record_number, Not used ...

        // g_guests_xml.setGuestAvatar(record_number, Not yet used ...

        // Not allowed to change g_guests_xml.setGuestEmail(record_number, g_guestbook_data.getImageEmail());

        // g_guests_xml.setGuestTelephone(record_number, Not yet used ...


        UtilServer.saveFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
        GuestbookServer.getPrettyPrintContent(g_guests_xml), 
        SaveEditedRecord.unlockFiles);

    } // changeXmlRecordAndSaveFile

   // Unlock the file JazzGuests.xml 
    // (making it possible for other users and Guestbook functions to add, delete and
    //  change Guestbook data on the server)
    // 1. Set unlock callback function to SaveEditedRecord.sendNotificationEmail
    // 2. Unlock. Call UtilLock.unlock
    static unlockFiles()
    {
        debugGuestbookUpload("SaveEditedRecord.unlockFiles Enter");

        g_util_lock_object.setUnlockedCallbackFunctionName(SaveEditedRecord.sendNotificationEmail);

        g_util_lock_object.unlock();

    } // unlockFiles

    // Send a notificatin email to the administrator
    // Call of sendNoticationEmailToAdministrator. Callback function SaveEditedRecord.finish
    static sendNotificationEmail()
    {
        debugGuestbookUpload("SaveEditedRecord.sendNotificationEmail Enter");

        var email_case = 'last_edited';

        sendNoticationEmailToAdministrator(email_case, g_guestbook_data, SaveEditedRecord.finish);

    } // sendNotificationEmail

    // Finish funtion for the change of a record
    // 1. Set the storage date for the (new) last uploaded record
    //    Call of GuestStorage.setGuestbookData
    // 3. Popup message to the used that the changed record has benn saved
    //    Call of GuestStr.TODO and alert
    static finish()
    {
        debugGuestbookUpload("SaveEditedRecord.finish Enter");

        GuestStorage.setGuestbookData(g_guestbook_data);

        alert(GuestStr.guestbookEditedRecordIsSaved(g_guestbook_data.getImageNames()));

        location.reload();

    } // finish


    // Bebug output for the start situation
    static debugStart()
    {
        debugGuestbookUpload('SaveEditedRecord.debugStart ***************** Start **********************************');

        debugGuestbookUpload('User has edited a record and klicked save (on page 3)');

        debugGuestbookUpload('A backup of the XML file and the registered image is already made with class ChangeLastUploadedRecord');

        var image_file = g_guestbook_data.getImageFile();

        var reg_file = g_guestbook_data.getFileName();

        var registration_number = g_guestbook_data.getRegNumber();

        var record_number = g_guests_xml.getRecordNumberForRegistrationNumber(registration_number);

        var b_user_uploaded_new_image = userUploadedAnImageInEditMode();

        debugGuestbookUpload('The record to be save has registration number ' + registration_number);  

        debugGuestbookUpload('The record number is ' + record_number.toString());   

        debugGuestbookUpload('The name of the registered image in the directory JazzGuests is ');
        debugGuestbookUpload(reg_file);

        debugGuestbookUpload('The name of the uploaded file in the directory JazzGuests/Uploaded is ');
        debugGuestbookUpload(image_file);

        if (!b_user_uploaded_new_image)
        {
            debugGuestbookUpload('The user did not upload a new image:');
            debugGuestbookUpload('The upload image name will not be changed in the XML file');
        }
        else
        {
            debugGuestbookUpload('The user has uploaded a new image:');
            debugGuestbookUpload('The upload image name will be changed in the XML file and');
            debugGuestbookUpload('the uploaded file be copied to the JazzGuests directory.');
        }

        debugGuestbookUpload('Data that shall be written to the XML file is in the GuestbookData object g_guestbook_data');

        debugGuestbookUpload('SaveEditedRecord.debugStart ***************** End ************************************');

        g_guestbook_data.debugOutput();
        
    } // debugStart

} // saveEditedRecord


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Execution Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get User Input ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get and check the guestbook names
function getGuestbookNames()
{
    var guestbook_names = g_upload_names_text_box.getValue();

    if (!UtilString.twoOrMoreWordsInString(guestbook_names))
    {
        alert("Bitte Vorname und Nachname eingeben");

        return false;
    }

    g_guestbook_data.m_names = guestbook_names;

    var b_edit_record_mode = getEditRecordMode();

    if (!b_edit_record_mode)
    {
        GuestStorage.setNames(guestbook_names);
    }

    return true;

} // getGuestbookNames

// Get and check the guestbook names
function getGuestbookEmail()
{
    var guestbook_email = g_upload_email_text_box.getValue();

    if (!UtilString.validEmailAddress(guestbook_email))
    {
        alert("E-Mail Adresse nicht gültig");

        return false;
    }

    g_guestbook_data.m_email = guestbook_email;

    var b_edit_record_mode = getEditRecordMode();

    if (!b_edit_record_mode)
    {
        GuestStorage.setEmail(guestbook_email);
    }

    return true;

} // getGuestbookEmail

// Get names and email from local storage and set controls
function setGuestbookNamesAndEmailFromLocalStorage()
{
   var name_txt = GuestStorage.getNames();
   var email_txt = GuestStorage.getEmail();

   if (name_txt == null || email_txt == null)
   {
       return;
   }

   g_upload_names_text_box.setValue(name_txt);

   g_upload_email_text_box.setValue(email_txt); 

} // setGuestbookNamesAndEmailFromLocalStorage

function setGuestbookNamesAndEmailForTestVersionMobile()
{
    if (!g_upload_test_version_mobile_telephone)
    {
        // Not the test version mobile telephone
        return;
    }

    // Suppose that new tester (user) will upload image
    var name_txt = '';

    // This is the default email address. The user can see the email in the JAZZ live AARAU
    // test telephone. The user could also change the email address to his own
    var email_text = "guestjazzliveaarau@gmail.com";

    g_upload_names_text_box.setValue(name_txt);

    g_upload_email_text_box.setValue(email_text); 

} // setGuestbookNamesAndEmailForTestVersionMobile

// Get the texts from the part three user input. Returns false if data not is OK
function getCheckGuestbookDataPartThree()
{
    var image_title = g_upload_title_text_box.getValue();

    image_title = image_title.trim();

    if (image_title.length == 0)
    {
        alert(GuestStr.titleNotSet());

        return false;
    }

    g_guestbook_data.setImageTitle(image_title);

    var image_text = g_text_textarea.getValue();

    g_guestbook_data.setImageText(image_text);

    var image_renark = g_upload_remark_text_box.getValue();

    g_guestbook_data.setImageRemark(image_renark);

    return true;

} // getGuestbookDataPartThree

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get User Input //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Image Text Container //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the image text container
function setImageTextContainer()
{
    var guest_year = g_guestbook_data.getYear();

    var guest_month = g_guestbook_data.getMonth();

    var guest_day = g_guestbook_data.getDay();

    var guest_date = UtilDate.getSwissDateString(guest_year, guest_month, guest_day);

    var guest_names = g_guestbook_data.getImageNames();

    var guest_text = g_guestbook_data.getImageText();

    guest_text = UtilString.stringWindowsToHtml(guest_text);

    guest_text = UtilString.stringConvertJazzLiveAarauToHtml(guest_text);

    var guest_header = g_guestbook_data.getImageTitle();

    g_display_image_text.setTextOne(guest_header);

    g_display_image_text.setTextTwo(guest_date);

    g_display_image_text.setTextThree(guest_names);

    g_display_image_text.setTextFour(guest_text);

} // setImageTextContainer

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Image Text Container ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the title for the upload guest application
function setUploadTestInstructions()
{
    var el_div_test_instructions = getElementDivUploadStartInstructions();

    el_div_test_instructions.innerHTML = GuestStr.startUploadInstructionText();

} // setUploadTestInstructions

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Functions ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Email Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sends an email with code to the user
function sendGuestbookCodeEmailToUser()
{
    var random_code = g_guestbook_data.getRandomCode();

    var email_from = GuestStr.emailCodeFrom();

    var email_subject = GuestStr.emailCodeSubject() + random_code;

    var image_names = '<b>' + g_guestbook_data.getImageNames() +  '</b>';

    var email_message = GuestStr.emailCodeMessage(image_names) + random_code;

    var email_to = g_guestbook_data.getImageEmail();
    
    // var email_bcc = GuestStr.emailCodeFrom();
    // Not necessary that we see that somebody has got a code
    var email_bcc = '';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("sendGuestbookCodeEmailToUser PHP cannot execute with Visual Studio Live Server. The code: " + random_code);

        return;
    }

    UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, callbackSendGuestbookCodeEmailToUser);

} // sendGuestbookCodeEmailToUser

// Callback from 
function callbackSendGuestbookCodeEmailToUser()
{
    /*
    if (!g_upload_test_version_mobile_telephone)
    {
        alert(GuestStr.emailCodeSent(email_to));
    }
    else
    {
        // For the mobile test version. The user (tester) need not to open the email app
        alert(GuestStr.emailCodeSent(email_to) + " Der Code (nur im Test-Telefon gezeigt) ist " + random_code);
    }
    */

} // callbackSendGuestbookCodeEmailToUser

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Email Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Upload Window /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the title for the active upload page
class UploadWindow
{
    constructor(el_div_window_title)
    {
        // Container <div> element for the window title
        this.m_el_div_window_title = el_div_window_title;

        // Active window index 
        this.m_active_window_index = 0;

        // Array with titles for the upload windows
        this.m_windows_title_array = GuestStr.getUploadWindowTitleArray();

        // Maximum index number for function forward
        this.m_n_forward_max = -12345;

        // Minimum index number for function backward
        this.m_n_forward_min = -12345;

        // Active index for window contact (change of record)
        this.m_contact_active_window_index = -12345;

        this.init();

    } // constructor

    // Initialization
    init()
    {
        if (null == this.m_el_div_window_title)
        {
            alert("UploadWindow.init m_el_div_window_title is null");

            return;
        }

        var n_windows = this.m_windows_title_array.length;

        this.m_n_forward_max = n_windows - 2; 

        this.m_n_forward_min = 1; 

        this.m_contact_active_window_index  = n_windows - 1; 

        this.setTitle();

    } // init

    // Sets the title defined by m_active_window_index
    setTitle()
    {
        var windows_title = this.m_windows_title_array[this.m_active_window_index];

        this.m_el_div_window_title.innerHTML = windows_title;

    } // setTitle

    // Sets the title for the next window
    // 1. Increase active number with one
    // 2. Set the windows title. Call UploadWindow.title
    forward()
    {
        if (this.m_active_window_index < this.m_n_forward_max)
        {
            this.m_active_window_index = this.m_active_window_index + 1;
        }
        else
        {
            alert("UploadWindow.forward m_active_window_index >= " +  this.m_n_forward_max.toString());

            return;
        }
        
        this.setTitle();

    } // forward

    // Sets the title for the previous window
    // 1. Decrease active number with one
    // 2. Set the windows title. Call UploadWindow.title
    backward()
    {
        if (this.m_active_window_index >= 1)
        {
            this.m_active_window_index = this.m_active_window_index - 1;
        }
        else
        {
            alert("UploadWindow.backward m_active_window_index < " +  this.m_active_window_index.toString());

            return;
        }
        
        this.setTitle();

    } // backward

    // Sets the title for the page contact
    toContact()
    {

        this.m_active_window_index = this.m_contact_active_window_index;

        this.setTitle();

    } // toContact

    // Sets the title for the page upload window
    toUploadImage()
    {
        this.m_active_window_index = 1;

        this.setTitle();

    } // toUploadImage

    // Sets title for back from contact (page 1)
    cancelContact()
    {
        this.m_active_window_index = 0;

        this.setTitle();

    } // cancelContact

    // Returns the URL to the page information HTML file
    getInfoUrl()
    {
        var ret_url = null;

        var dir_url = 'https://jazzliveaarau.ch/Guestbook/Info/';

        if (0 == this.m_active_window_index)
        {
            var ret_url = dir_url + 'InfoGuestbookUploadNameEmailCode.htm';
        }
        else if (1 == this.m_active_window_index)
        {
            var ret_url = dir_url + 'InfoGuestbookUploadSelectPicture.htm';
        }
        else if (2 == this.m_active_window_index)
        {
            var ret_url = dir_url + 'InfoGuestbookUploadSetTexts.htm';
        }
        else if (3 == this.m_active_window_index)
        {
            var ret_url = dir_url + 'InfoGuestbookUploadContact.htm';
        }
        else
        {
            alert("UploadWindow.getInfoUrl m_active_window_index is not between 0 and 3");
        }

        return ret_url;

    } // getInfoUrl
    
} // UploadWindow


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Upload Window ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugGuestbookUpload(i_msg_str)
{
    console.log('GuestbookUpload: ' + i_msg_str);

    UtilServer.appendDebugFile('GuestbookUpload: ' + i_msg_str, 'GuestbookAdminSave');

} // debugGuestbookUpload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

