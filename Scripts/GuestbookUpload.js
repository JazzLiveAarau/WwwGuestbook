// File: GuestbookUpload.js
// Date: 2024-02-12
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

    sendGuestbookCodeEmail();

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

    saveGuestbookUploadData();

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
///////////////////////// Start Execute Contact Request ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Execute the contact request
function executeContactRequest()
{
    var selected_contact_case_number = g_contact_case_drop_down.getSelectOptionNumber();

    var index_case = parseInt(selected_contact_case_number) - 1;

    var b_execute = null;

    if (index_case == 0 && g_guestbook_data_last_record != null)
    {
        b_execute = executeContactRequestAutomaticDelete();

        if (b_execute)
        {
            alert(GuestStr.successAutomaticRemovalOfRecord());
        }
        else
        {
            alert(GuestStr.failureAutomaticRemovalOfRecord());
        }
    }
    else if (index_case == 0)
    {
        alert("Kein letzter beitrag ist vorhanden");

        return;
    }
    else if (index_case == 1)
    {
        b_execute = executeContactRequestManualDelete();
    }
    else if (index_case == 2)
    {
        b_execute = executeContactRequestBugReport();
    }
    else if (index_case == 3)
    {
        b_execute = executeContactRequestUserProposal();
    }
    else if (index_case == 4)
    {
        b_execute = executeContactRequestOtherCase();
    }
    else
    {
        alert("executeContactRequest Not an implemented case= " + index_case.toString());

        b_execute = false;
    }

    return b_execute;

} // executeContactRequest

// Execute the contact request automatic delete
function executeContactRequestAutomaticDelete()
{
    if (g_guestbook_data_last_record == null)
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete g_guestbook_data_last_record is null');

        return false;
    }

    var xml_str = 'uploaded';

    var uploaded_record_number = getDeletRecordNumber(xml_str);

    if (uploaded_record_number <= 0)
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete An uploaded record is not found');

        alert("executeContactRequestAutomaticDelete An uploaded record is not found");

        return false;
    }

    xml_str = 'admin';
    
    var admin_record_number = getDeletRecordNumber(xml_str);

    if (admin_record_number <= 0)
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete An admin record is not found');

        alert("executeContactRequestAutomaticDelete An admin record is not found");

        return false;
    }

    if (UtilServer.execApplicationOnServer())
    {
        if (!backupJazzGuestsXml())
        {
            debugGuestbookUpload('executeContactRequestAutomaticDelete Backup of JazzGuests.xml failed');
    
            return false;
        }
    
        if (!backupJazzGuestsUploadedXml())
        {
            debugGuestbookUpload('executeContactRequestAutomaticDelete Backup of JazzGuestsUploaded.xml failed');
    
            return false;
        } 
        
        debugGuestbookUpload('executeContactRequestAutomaticDelete JazzGuests.xml and JazzGuestsUploaded.xml backups are created');
    }
    else
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Not running on the server. No XML backups are created');  
    }

    debugGuestbookUpload('executeContactRequestAutomaticDelete Move uploaded image file to backup directory'); 

    if (!moveImageFromUploadedToBackupDir(uploaded_record_number))
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure moving uploaded image file to backup directory'); 
    }

    if (!moveImageFromJazzGuestDirToBackupDir(admin_record_number))
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure moving admin image file to backup directory'); 
    }

    g_guests_uploaded_xml.deleteGuestNode(uploaded_record_number);

    g_guests_xml.deleteGuestNode(admin_record_number);

    debugGuestbookUpload('executeContactRequestAutomaticDelete Records deleted in JazzGuests.xml and JazzGuestsUploaded.xml'); 

    debugGuestbookUpload('executeContactRequestAutomaticDelete Save JazzGuests.xml on the server'); 

    if (!saveJazzGuestsXmlOnServer())
    { 
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure saving JazzGuests.xml on the server'); 

        return false;
    }   

    debugGuestbookUpload('executeContactRequestAutomaticDelete Save JazzGuestsUploaded.xml on the server'); 
 
    if (!saveJazzGuestsUploadedXmlOnServer())
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure saving JazzGuestsUploaded.xml on the server'); 

        return false;
    }

    if (!sendEmailUserDeletedRecordToGuestbook(g_guestbook_data_last_record))
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure sending email'); 

        return false;
    }

    GuestStorage.initGuestbookData();

    debugGuestbookUpload('executeContactRequestAutomaticDelete Local storage record data have been used and was initialized'); 

    return true;

} // executeContactRequestAutomaticDelete

// Execute the contact request manual delete
function executeContactRequestManualDelete()
{
    var ret_b = true;

    alert("executeContactRequestManualDelete This case is not implemented");

    return ret_b;

} // executeContactRequestManualDelete

// Execute the contact request bug report
function executeContactRequestBugReport()
{
    var ret_b = true;

    alert("executeContactRequestBugReport This case is not implemented");

    return ret_b;

} // executeContactRequestBugReport

// Execute the contact request user proposal
function executeContactRequestUserProposal()
{
    var ret_b = true;

    alert("executeContactRequestUserProposal This case is not implemented");

    return ret_b;

} // executeContactRequestUserProposal

// Execute the contact request other case
function executeContactRequestOtherCase()
{
    var ret_b = true;

    alert("executeContactRequestOtherCase This case is not implemented");

    return ret_b;

} // executeContactRequestOtherCase

// Returns the record number to delete
// i_xml_str Eq. uploadwd JazzGuestsUploaded.xml  Eq. admin JazzGuests.xml
function getDeletRecordNumber(i_xml_str)
{
    var current_xml = null;

    if (i_xml_str == 'uploaded')
    {
        current_xml = g_guests_uploaded_xml;
    }
    else if (i_xml_str == 'admin')
    {
        current_xml = g_guests_xml;
    }
    else
    {
        alert("getDeletRecordNumber Error i_xml_str= " + i_xml_str);

        return -9;
    }

    var n_records = current_xml.getNumberOfGuestRecords();

    var search_title = g_guestbook_data_last_record.getImageTitle();

    var search_year = g_guestbook_data_last_record.getYear();

    var search_month = g_guestbook_data_last_record.getMonth();

    var search_day = g_guestbook_data_last_record.getDay();

    var search_file = g_guestbook_data_last_record.getImageFile();


    for (var rec_number=1; rec_number <= n_records; rec_number++)
    {
        var guest_title = current_xml.getGuestHeader(rec_number);

        var guest_year = current_xml.getGuestYear(rec_number);

        var guest_month = current_xml.getGuestMonth(rec_number);

        var guest_day = current_xml.getGuestDay(rec_number);

        var guest_file = current_xml.getGuestFileName(rec_number);

        if (guest_title == search_title &&

            guest_year == search_year && 

            guest_month == search_month && 

            guest_day == search_day )
            {
                if (i_xml_str == 'uploaded' && guest_file == search_file)
                {
                    debugGuestbookUpload('getDeletRecordNumber uploaded rec_number= ' + rec_number.toString());

                    return rec_number;
                }
                else if (i_xml_str == 'admin')
                {
                    debugGuestbookUpload('getDeletRecordNumber admin rec_number= ' + rec_number.toString());

                    return rec_number;
                }

            } // properties equal

    } // rec_number

    return -1;

} // getDeletRecordNumber


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Execute Contact Request /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Contact Controls //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the contact controls
function setContactControls()
{
    var names_txt = g_guestbook_data.getImageNames();

    var email_txt = g_guestbook_data.getImageEmail();

    g_contact_from_text_box.setValue(names_txt);

    g_contact_email_text_box.setValue(email_txt);

    if (g_guestbook_data_last_record != null)
    {
        var iso_date_str = UtilDate.getIsoDateString(g_guestbook_data_last_record.getYear(), 
        g_guestbook_data_last_record.getMonth(), g_guestbook_data_last_record.getDay());

        var last_record_txt = g_guestbook_data_last_record.getImageTitle() + ' Datum: ' + iso_date_str;

        g_last_record_text_box.setValue(last_record_txt);

        var selected_contact_case_number = g_contact_case_drop_down.getSelectOptionNumber();

        var index_case = parseInt(selected_contact_case_number) - 1;

        if (index_case == 0)
        {
            debugGuestbookUpload('setContactControls Letzter Beitrag löschen');

            g_contact_msg_textarea.setPlaceholderText("Eine Mitteilung ist nicht notwendig. Mit Senden sollte den Beitrag automatisch gelöscht werden.");

        }
        else if (index_case == 1)
        {
            debugGuestbookUpload('setContactControls Anderer Beitrag löschen');

            var delete_text = '';
            delete_text = delete_text + 'Bitte folgender Beitrag löschen' + '\n';
            delete_text = delete_text + 'Titel: ' + '\n';
            delete_text = delete_text + 'Datum: ' + '\n';
            delete_text = delete_text + 'Namen: ' + '\n';
            delete_text = delete_text + ' ' + '\n';
            delete_text = delete_text + 'Bitte lass uns wissen warum. ' + '\n';
            delete_text = delete_text + 'Grund: ' + '\n';

            g_contact_msg_textarea.setValue(delete_text);

        }
        else if (index_case == 2)
        {
            debugGuestbookUpload('setContactControls Fehler melden');

            g_contact_msg_textarea.setPlaceholderText("Fehlerbeschreibung ...");

        }
        else if (index_case == 3)
        {
            debugGuestbookUpload('setContactControls Vorschlag machen');

            g_contact_msg_textarea.setPlaceholderText("Vorschlagbeschreibung ...");
        }
        else if (index_case == 4)
        {
            debugGuestbookUpload('setContactControls Anderes');

            g_contact_msg_textarea.setPlaceholderText("Mitteilung hier schreiben ...");
        }
        else
        {
    
            alert("setContactControls Not an implemented case index= " + index_case.toString());
            
        }

    }
    else
    {
        g_last_record_text_box.setValue("Kein letzter Beitrag");

        g_contact_msg_textarea.setPlaceholderText("Mitteilung hier schreiben ...");

        g_contact_case_drop_down.setSelectOptionNumber(2);
    }


} // setContactControls


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Contact Controls ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Local Storage /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class GuestStorage
{
    //////////////////////////////////////////////////
    /////////// Local Storage Utility Functions //////
    //////////////////////////////////////////////////

    // Returns an instance of GuestbookData with local storage data
    static getGuestbookData()
    {
        if (!GuestStorage.allDataIsSet())
        {
            return null;
        }

        var guestbook_data = new GuestbookData;

        guestbook_data.m_names = GuestStorage.getNames();

        guestbook_data.m_email = GuestStorage.getEmail();

        guestbook_data.m_title = GuestStorage.getTitle();

        guestbook_data.m_text = GuestStorage.getText();

        guestbook_data.m_remark = GuestStorage.getRemark();

        guestbook_data.m_band = GuestStorage.getBand();

        guestbook_data.m_musicians = GuestStorage.getMusicians();

        guestbook_data.m_year = GuestStorage.getYear();

        guestbook_data.m_month = GuestStorage.getMonth();

        guestbook_data.m_day = GuestStorage.getDay();

        guestbook_data.m_image_file = GuestStorage.getImageFile();

        return guestbook_data;

    } // getGuestbookData

    // Set local storage data with the input instance of GuestbookData
    static setGuestbookData(i_guestbook_data)
    {
        if (i_guestbook_data == null)
        {
            alert("GuestStorage.setGuestbookData Input GuestbookData is null");

            return;
        }

        GuestStorage.setNames(i_guestbook_data.m_names);

        GuestStorage.setEmail(i_guestbook_data.m_email);

        GuestStorage.setTitle(i_guestbook_data.m_title);

        GuestStorage.setText(i_guestbook_data.m_text);

        GuestStorage.setRemark(i_guestbook_data.m_remark);

        GuestStorage.setBand(i_guestbook_data.m_band);

        GuestStorage.setMusicians(i_guestbook_data.m_musicians);

        GuestStorage.setYear(i_guestbook_data.m_year);

        GuestStorage.setMonth(i_guestbook_data.m_month);

        GuestStorage.setDay(i_guestbook_data.m_day);

        GuestStorage.setImageFile(i_guestbook_data.m_image_file);

    } // setGuestbookData

    // Initialize local storage data 
    // This function is supposed to be called after user deletion of an uploaded record
    // Please not that names and email NOT shall be initialized
    static initGuestbookData()
    {
        // Do NOT init GuestStorage.setNames('');

        // Do NOT init GuestStorage.setEmail('');

        GuestStorage.setTitle('');

        GuestStorage.setText('');

        GuestStorage.setRemark('');

        GuestStorage.setBand('');

        GuestStorage.setMusicians('');

        GuestStorage.setYear('');

        GuestStorage.setMonth('');

        GuestStorage.setDay('');

        GuestStorage.setImageFile('');

    } // initGuestbookData

    // Returns true if all storage data is set
    static allDataIsSet()
    {
        var ret_b_all = true;

        if (GuestStorage.getNames() == null)
        {
            console.log("GuestStorage.getNames() is null");

            ret_b_all = false;
        }

        if (GuestStorage.getEmail() == null)
        {
            console.log("GuestStorage.getEmail() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getTitle() == null)
        {
            console.log("GuestStorage.getTitle() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getText() == null)
        {
            console.log("GuestStorage.getText() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getRemark() == null)
        {
            console.log("GuestStorage.getRemark() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getBand() == null)
        {
            console.log("GuestStorage.getBand() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getMusicians() == null)
        {
            console.log("GuestStorage.getMusicians() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getYear() == null)
        {
            console.log("GuestStorage.getYear() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getMonth() == null)
        {
            console.log("GuestStorage.getMonth() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getDay() == null)
        {
            console.log("GuestStorage.getDay() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getImageFile() == null)
        {
            console.log("GuestStorage.getImageFile() is null");
            
            ret_b_all = false;
        }

        return ret_b_all;

    } // allDataIsSet

    //////////////////////////////////////////////////
    /////////// Local Storage Get Functions //////////
    //////////////////////////////////////////////////

    static getNames()
    {
        return localStorage.getItem(GuestStorage.getKeyNames());

    } // getNames

    static getEmail()
    {
        return localStorage.getItem(GuestStorage.getKeyEmail());

    } // getEmail

    static getTitle(i_title)
    {
        return localStorage.getItem(GuestStorage.getKeyTitle());

    } // getTitle

    static getText()
    {
        return localStorage.getItem(GuestStorage.getKeyText());

    } // getText

    static getRemark()
    {
        return localStorage.getItem(GuestStorage.getKeyRemark());

    } // getRemark

    static getBand()
    {
        return localStorage.getItem(GuestStorage.getKeyBand());

    } // getBand

    static getMusicians()
    {
        return localStorage.getItem(GuestStorage.getKeyMusicians());

    } // getMusicians

    static getYear()
    {
        return localStorage.getItem(GuestStorage.getKeyYear());

    } // getYear

    static getMonth()
    {
        return localStorage.getItem(GuestStorage.getKeyMonth());

    } // getMonth

    static getDay()
    {
        return localStorage.getItem(GuestStorage.getKeyDay());

    } // getDay

    static getImageFile()
    {
        return localStorage.getItem(GuestStorage.getKeyImageFile());

    } // getImageFile

    //////////////////////////////////////////////////
    /////////// Local Storage Set Functions //////////
    //////////////////////////////////////////////////

    static setNames(i_names)
    {
        localStorage.setItem(GuestStorage.getKeyNames(), i_names);

    } // setNames

    static setEmail(i_email)
    {
        localStorage.setItem(GuestStorage.getKeyEmail(), i_email);

    } // setEmail

    static setTitle(i_title)
    {
        localStorage.setItem(GuestStorage.getKeyTitle(), i_title);

    } // setTitle

    static setText(i_text)
    {
        localStorage.setItem(GuestStorage.getKeyText(), i_text);

    } // setText

    static setRemark(i_remark)
    {
        localStorage.setItem(GuestStorage.getKeyRemark(), i_remark);

    } // setRemark

    static setBand(i_band)
    {
        localStorage.setItem(GuestStorage.getKeyBand(), i_band);

    } // setBand

    static setMusicians(i_musicians)
    {
        localStorage.setItem(GuestStorage.getKeyMusicians(), i_musicians);

    } // setMusicians

    static setYear(i_year)
    {
        localStorage.setItem(GuestStorage.getKeyYear(), i_year);

    } // setYear

    static setMonth(i_month)
    {
        localStorage.setItem(GuestStorage.getKeyMonth(), i_month);

    } // setMonth

    static setDay(i_day)
    {
        localStorage.setItem(GuestStorage.getKeyDay(), i_day);

    } // setDay

    static setImageFile(i_image_file)
    {
        localStorage.setItem(GuestStorage.getKeyImageFile(), i_image_file);

    } // setImageFile

    //////////////////////////////////////////////////
    /////////// Local Storage Keys ///////////////////
    //////////////////////////////////////////////////

    static getKeyNames()
    {
        return "guestbook_names_str";

    } // getKeyNames

    static getKeyEmail()
    {
        return "guestbook_email_str";
        
    } // getKeyEmail

    static getKeyTitle()
    {
        return "guestbook_title_str";
        
    } // getKeyTitle

    static getKeyText()
    {
        return "guestbook_text_str";
        
    } // getKeyText

    static getKeyRemark()
    {
        return "guestbook_remark_str";
        
    } // getKeyRemark

    static getKeyBand()
    {
        return "guestbook_band_str";
        
    } // getKeyBand

    static getKeyMusicians()
    {
        return "guestbook_musicians_str";
        
    } // getKeyMusicians

    static getKeyYear()
    {
        return "guestbook_year_str";
        
    } // getKeyYear

    static getKeyMonth()
    {
        return "guestbook_month_str";
        
    } // getKeyMonth

    static getKeyDay()
    {
        return "guestbook_day_str";
        
    } // getKeyDay

    static getKeyImageFile()
    {
        return "guestbook_image_file_str";
        
    } // getKeyImageFile

} // GuestStorage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Local Storage /////////////////////////////////////////////
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
///////////////////////// Start Register Uploaded Data ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Save (append) the data in the upload XML file JazzGuestLoaded.xml object (g_guests_uploaded_xml)
function saveGuestbookUploadData()
{
    console.log("Enter saveGuestbookUploadData GuestbookData= ");
    console.log(g_guestbook_data);

    appendSetSaveGuestbookUploadData();

    GuestStorage.setGuestbookData(g_guestbook_data);

} // saveGuestbookUploadData

// Add and set an XML record for JazzGuestsUploaded.xml
function appendSetSaveGuestbookUploadData()
{
    var b_upload_also_to_homepage = true;

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

    debugGuestbookUpload('All members set. Status= ' + g_guests_xml.getGuestStatus(n_records));

    if (saveJazzGuestsUploadedXmlOnServer())
    {
        alert(GuestStr.guestbookRecordIsUploaded(g_guestbook_data.getImageNames()));

        debugGuestbookUpload('JazzGuestsUploaded.xml is saved on the server ');
    }
    else
    {
        alert(GuestStr.errorGuestbookRecordIsNotUploaded(g_guestbook_data.getImageNames()));

        return;
    }

    var b_send = sendEmailToGuestbook();

    if (b_upload_also_to_homepage)
    {
        setTimeout(recordDirectToHomepage, 1000);
    }
    else
    {
        location.reload();
    }

} // appendSetSaveGuestbookUploadData

function recordDirectToHomepage()
{

    debugGuestbookUpload('Enter recordDirectToHomepage');

    appendGuestRecordAlsoToXmlHomepageObject();

    location.reload();

} // recordDirectToHomepage


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
function sendEmailToGuestbook()
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
        alert("sendEmailToGuestbook PHP cannot execute with Visual Studio Live Server.");

        return true;
    }    

    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc);

    if (!b_send)
    {
        alert(GuestStr.emailGuestbookError(email_to));

        return false;
    }

    return true;

} // sendEmailToGuestbook

// Sends an email with code
function sendGuestbookCodeEmail()
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
        alert("sendGuestbookCodeEmail PHP cannot execute with Visual Studio Live Server. The code: " + random_code);

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

} // sendGuestbookCodeEmail


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
    console.log('GuestbookUpload:' + i_msg_str);

    UtilServer.appendDebugFile('GuestbookUpload:' + i_msg_str, 'GuestbookAdminSave');

} // debugGuestbookUpload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

