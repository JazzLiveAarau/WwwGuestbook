// File: GuestbookUpload.js
// Date: 2024-02-21
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

// Object UploadImage control
var g_upload_image_object = null;


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization for Guestbook Upload
function initGuestbookUpload()
{
    g_load_for_guestbook_admin = false;

    loadAllXmlObjectsForAdminAndUpload();

    g_guestbook_data_last_record = GuestStorage.getGuestbookData();

} // initGuestbookUpload

// All XML objects have been created
function callbackAllXmlObjectsCreatedForUpload()
{
    g_guestbook_data = new GuestbookData();

    setUploadGuestbookTitle();

    createUpdateControls();

    setGuestbookNamesAndEmailFromLocalStorage();

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

    var upload_path = '../../JazzGuests/Uploaded/';

    var upload_file_name = 'Image_' + UtilDate.getTimeStamp();

    // The extension will be defined by the image file that the user selected
    var upload_file_extension = ''; 

    var image_max_size_mb = 1.5;

    var default_img = 'https://jazzliveaarau.ch/Guestbook/Icons/default_upload_image.jpg';

    var caption_select_img = 'Bild wählen';

    var input_data = new JazzUploadImageInput(upload_file_name, upload_file_extension, upload_path, image_max_size_mb, default_img, caption_select_img);

    g_upload_image_object = new JazzUploadImage(getIdDivUploadFileImage(), input_data);

    JazzUploadImage.initDebugFile();

} // callbackAllXmlObjectsCreatedForUpload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
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
            hideElementDivButtonSendCode();

            hideElementDivInputCode();
    
            initAllInputCodes();
    
            alert(GuestStr.emailChangedNewCodeRequired());
        }
    }

} // onInputTextUdateEmail

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

        // var default_img_file_name = 'Icons/default_upload_image.png';

        // Moved to init g_upload_image_object = new JazzUploadImage('guest_upload',  getIdDivUploadFileImage(), default_img_file_name);
    }
    else
    {
        alert(GuestStr.inputCodeError());
    }

} // onClickForwardOneButton

// User clicked the back part two (upload of image) button, i.e.
// the user comes bac to the start part with email address and names
function onClickBackTwoButton()
{
    displayElementDivNamesEmailCode();

    hideElementDivUploadContainerTwo();

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

    g_guestbook_data.setImageFile(image_file_url);

    hideElementDivUploadContainerTwo();

    displayElementDivUploadTexts();

    setImageTextContainer();

} // onClickReqireCodeButton

// User clicked the back part three (texts input) button
function onClickBackThreeButton()
{
    // alert("onClickBackThreeButton");

    hideElementDivUploadTexts();

    displayElementDivUploadContainerTwo();

} // onClickReqireCodeButton

// User clicked the forward three part three (texts input) button. i.e.
// the user wants to save the data (finish the input of data)
function onClickForwardThreeButton()
{
    if(!getCheckGuestbookDataPartThree())
    {
        return;
    }

    debugGuestbookUpload('onClickForwardThreeButton User clicked save record');

    saveNewGuestbookUploadedRecord();

} // onClickReqireCodeButton

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

    window.open(file_name, '_blank');

} // clickGuestbookInfo

// User clicked the contact button
function onClickContactButton()
{
    setContactControls();
    
    hideElementDivNamesEmailCode();

    displayElementDivContactContainer();

} // onClickContactButton

// User clicked the contact cancel button
function onClickContactCancelButton()
{
    hideElementDivContactContainer();

    displayElementDivNamesEmailCode();

} // onClickContactCancelButton

// User clicked the contact send button
function onClickContactSendButton()
{
    debugGuestbookUpload('onClickContactSendButton User clicked the contact execution button');

    var b_exec = executeContactRequest();

    if (!b_exec)
    {
        debugGuestbookUpload('onClickContactSendButton Execution failed');
    }

    debugGuestbookUpload('onClickContactSendButton Reload application');

    location.reload;

} // onClickContactSendButton

// User input of character for the contact message
function onInputContactMessageTextArea()
{
    console.log("onInputContactMessageTextArea");

} // onInputContactMessageTextArea

// User selected a contact case
function eventSelectContactCaseDropdown()
{
    setContactControls();

} // eventSelectContactCaseDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
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

    GuestStorage.setNames(guestbook_names);

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

    GuestStorage.setEmail(guestbook_email);

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
///////////////////////// Start Execution Classes /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// The class AppendBothXml appends a new record to both XML files JazzGuestsUploaded.xml
// and JazzGuests.xml. Input data is the global variable g_guestbook_data and the
// name of the function that shall be called when all steps are executed
class AppendBothXml
{
    // Start function that backups the file JazzGuestsUploaded.xml and calls the next
    // function appendXmlUserInputData
    static start(i_append_both_callback)
    {
        g_append_both_callback = i_append_both_callback;

        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuestsUploaded(), 
                                    GuestbookServer.absoluteUrlJazzGuestsUploadedBackup(), 
                                    AppendBothXml.appendXmlUserInputData);

    } // start

    // Appends a new record, sets it with g_guestbook_data and saves JazzGuestsUploaded.xml.
    // The next function to be called is sendNotificationEmail
    static appendXmlUserInputData()
    {
        debugGuestbookUpload('AppendBothXml.appendUploaded Enter');

        b_upload_also_to_homepage = true;
    
        g_guests_uploaded_xml.appendGuestNode();
    
        var n_records = g_guests_uploaded_xml.getNumberOfGuestRecords();
    
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

    // Make a backup of JazzGuests.xml and call 
    static backupJazzGuests()
    {
        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
                                    GuestbookServer.absoluteUrlJazzGuestsBackup(), 
                                    AppendBothXml.appendXml);
    }

    // Appends the new record and saves JazzGuests.xml.
    // The next function to be called is sendNotificationEmail
    static appendXml()
    {

    } // appendXml


    static sendNotificationEmail()
    {

    } // sendNotificationEmail

} // AppendBothXml

// End callback function after appending new record to both XML files
var g_append_both_callback = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Execution Classes ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Register Uploaded Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Save (append) a new record to the upload XML file JazzGuestsLoaded.xml.
// The XML object corresponding to the file is g_guests_uploaded_xml.
// 1. Set flag (b_upload_also_to_homepage) that determines if record also shall be 
//    saved to the JazzGuests.xml object 
// 2. Append and set node data for the JazzGuestLoaded.xml object. 
//    Call of appendSetGuestbookUploadData
// 3. Save JazzGuestsLoaded.xml on the server. 
//    Call of saveJazzGuestsUploadedXmlOnServer
// 4. Send new record notification email to the administrator
//    Call of sendNewRecordNotificationEmailToAdmin.
// 5. Set local storage data with the user input data (GuestbookData)
//    Call of GuestStorage.setGuestbookData(g_guestbook_data);
// 6. Save the new record also in the file JazzGuests.xml 
//    Call of saveNewRecordAlsoToJazzGuestsXml
function saveNewGuestbookUploadedRecord()
{
    debugGuestbookUpload('saveNewGuestbookUploadedRecord Enter');

    var b_upload_also_to_homepage = true;

    appendSetGuestbookUploadData(b_upload_also_to_homepage);

    if (!saveJazzGuestsUploadedXmlOnServer())
    {
        alert(GuestStr.errorGuestbookRecordIsNotUploaded(g_guestbook_data.getImageNames()));

        return;
    }

    if (!sendNewRecordNotificationEmailToAdmin())
    {
        return;
    }

    GuestStorage.setGuestbookData(g_guestbook_data);

    if (b_upload_also_to_homepage)
    {
        if(saveNewRecordAlsoToJazzGuestsXml())
        {
            alert(GuestStr.guestbookRecordIsUploaded(g_guestbook_data.getImageNames()));
        }
        else
        {
            alert(GuestStr.errorGuestbookRecordIsNotUploaded(g_guestbook_data.getImageNames()));
        }
    }

    location.reload();

} // saveNewGuestbookUploadedRecord

// Add and set an XML record for JazzGuestsUploaded.xml
// 1. Append node to the JazzGuestsUploaded.xml XML object 
// 2. Set data for the appended node
function appendSetGuestbookUploadData(i_b_upload_also_to_homepage)
{
    debugGuestbookUpload('appendSetGuestbookUploadData Enter');

    b_upload_also_to_homepage = true;

    g_guests_uploaded_xml.appendGuestNode();

    var n_records = g_guests_uploaded_xml.getNumberOfGuestRecords();

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

    if (i_b_upload_also_to_homepage)
    {
        g_guests_uploaded_xml.setGuestStatusUploadedByGuestToHomepage(n_records);
    }
    else
    {
        g_guests_uploaded_xml.setGuestStatusPendingRecordInUpdate(n_records);
    }

    g_guests_uploaded_xml.setGuestPublishBool(n_records, true);

    g_guests_uploaded_xml.setGuestRegNumber(n_records, 'Will be set when moved to JazzGuests.xml');

    debugGuestbookUpload('appendSetGuestbookUploadData All members set. Status= ' + g_guests_xml.getGuestStatus(n_records));

    debugGuestbookUpload('appendSetGuestbookUploadData Exit');

} // appendSetGuestbookUploadData


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Register Uploaded Data //////////////////////////////////////
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
function setUploadGuestbookTitle()
{
    var el_div_application_title = getElementDivUploadGuestbookTitle();

    el_div_application_title.innerHTML = GuestStr.titleGuestbookApplication();

} // setUploadGuestbookTitle

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

// The function sends an email to the Guestbook account after upload of a new record.
// This email informs the administrator that a new uploaded record should be checked
// with application GuestbookAdmin.html
function sendNewRecordNotificationEmailToAdmin()
{
    var email_from = GuestStr.emailCodeFrom();

    var email_to = GuestStr.emailCodeFrom();

    var email_subject = GuestStr.emailGuestbookSubject() + g_guestbook_data.getImageNames();

    var email_bcc = '';

    var textarea_str = g_guestbook_data.getImageText();

    textarea_str = UtilString.stringWindowsToHtml(textarea_str);

    var email_message = '';

    var record_date = UtilDate.getIsoDateString(g_guestbook_data.getYear(), g_guestbook_data.getMonth(), g_guestbook_data.getDay());

    email_message = email_message + 'Datum: ' + record_date + '<br>';
    email_message = email_message + 'Email: ' + g_guestbook_data.getImageEmail() + '<br>';
    email_message = email_message + 'Names: ' + g_guestbook_data.getImageNames() + '<br>';
    email_message = email_message + 'Title: ' + g_guestbook_data.getImageTitle() + '<br>';
    email_message = email_message + 'Band: ' + g_guestbook_data.getBand() + '<br>';
    email_message = email_message + 'Musicians: ' + g_guestbook_data.getMusicians() + '<br>';
    email_message = email_message + 'Remark: ' + g_guestbook_data.getImageRemark() + '<br>';
    email_message = email_message + 'Text: ' + textarea_str + '<br>';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("sendNewRecordNotificationEmailToAdmin PHP cannot execute with Visual Studio Live Server.");

        return true;
    }    

    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc);

    if (!b_send)
    {
        alert(GuestStr.emailGuestbookError(email_to));

        debugGuestbookUpload('sendNewRecordNotificationEmailToAdmin Error: Email has NOT been sent to the administrator');

        return false;
    }

    debugGuestbookUpload('sendNewRecordNotificationEmailToAdmin Email has been sent to the administrator');

    return true;

} // sendNewRecordNotificationEmailToAdmin

// Sends an email with code to the user
function sendGuestbookCodeEmailToUser()
{
    var random_code = g_guestbook_data.getRandomCode();

    var email_from = GuestStr.emailCodeFrom();

    var email_subject = GuestStr.emailCodeSubject() + random_code;

    var email_message = GuestStr.emailCodeMessage() + random_code;

    var email_to = g_guestbook_data.getImageEmail();
    
    // var email_bcc = GuestStr.emailCodeFrom();
    // Not necessary that we see that somebody has got a code
    var email_bcc = '';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("sendGuestbookCodeEmailToUser PHP cannot execute with Visual Studio Live Server. The code: " + random_code);

        return;
    }
    
    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc);

    if (b_send)
    {
        alert(GuestStr.emailCodeSent(email_to));
    }
    else
    {
        alert(GuestStr.emailCodeError(email_to));
    }

} // sendGuestbookCodeEmailToUser


// The function sends an email to the Guestbook account after user deletion of a record.
// This email informs the administrator that a user has deleted the last uploaded record
// with application GuestbookAdmin.html
function sendEmailUserDeletedRecordToGuestbook(i_data_last_record)
{
    var email_from = GuestStr.emailCodeFrom();

    var email_to = GuestStr.emailCodeFrom();

    var email_subject = GuestStr.emailGuestbookRecordDeletedSubject() + i_data_last_record.getImageNames();

    var email_bcc = '';

    var textarea_str = i_data_last_record.getImageText();

    textarea_str = UtilString.stringWindowsToHtml(textarea_str);

    var email_message = '';

    var record_date = UtilDate.getIsoDateString(i_data_last_record.getYear(), i_data_last_record.getMonth(), i_data_last_record.getDay());

    email_message = email_message + 'Datum: ' + record_date + '<br>';
    email_message = email_message + 'Email: ' + i_data_last_record.getImageEmail() + '<br>';
    email_message = email_message + 'Names: ' + i_data_last_record.getImageNames() + '<br>';
    email_message = email_message + 'Title: ' + i_data_last_record.getImageTitle() + '<br>';
    email_message = email_message + 'Band: ' + i_data_last_record.getBand() + '<br>';
    email_message = email_message + 'Musicians: ' + i_data_last_record.getMusicians() + '<br>';
    email_message = email_message + 'Remark: ' + i_data_last_record.getImageRemark() + '<br>';
    email_message = email_message + 'File: ' + i_data_last_record.getImageFile() + '<br>';
    email_message = email_message + 'Text: ' + textarea_str + '<br>';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("sendEmailUserDeletedRecordToGuestbook PHP cannot execute with Visual Studio Live Server.");

        return true;
    }    

    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc);

    if (!b_send)
    {
        alert(GuestStr.emailGuestbookError(email_to));

        return false;
    }

    return true;

} // sendEmailUserDeletedRecordToGuestbook

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Email Functions /////////////////////////////////////////////
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

