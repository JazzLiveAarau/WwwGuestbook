// File: GuestbookUpload.js
// Date: 2024-01-21
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

// Object UploadImage control
var g_upload_image_object = null;

// Keys for the local storage of names and email
var g_local_storage_guestbook_names = "guestbook_names_str";
var g_local_storage_guestbook_email = "guestbook_email_str";


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

} // initGuestbookUpload

// All XML objects have been created
function callbackAllXmlObjectsCreatedForUpload()
{
    g_guestbook_data = new GuestbookData();

    createUpdateControls();

    setGuestbookNamesAndEmailFromLocalStorage();

    hideElementDivUploadContainerTwo();

    hideElementDivUploadTexts();

    hideElementDivUploadButtonForwardTwo();

    hideElementDivUploadButtonForwardThree();

    hideElementDivInputCode();

    hideElementDivButtonSendCode();

    var upload_path = '../../JazzGuests/Uploaded/';

    var upload_file_name = 'Image_' + UtilDate.getTimeStamp();

    // The extension will be defined by the image file that the user selected
    var upload_file_extension = ''; 

    var image_max_size_mb = 1.5;

    var default_img = 'Icons/default_upload_image.jpg';

    var caption_select_img = 'Bild wählen';

    var input_data = new JazzUploadImageInput(upload_file_name, upload_file_extension, upload_path, image_max_size_mb, default_img, caption_select_img);

    g_upload_image_object = new JazzUploadImage(getIdDivUploadFileImage(), input_data);

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

    hideElementDivImageUploadIcon();

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

// Sends an email with code
function sendGuestbookCodeEmail()
{
    var random_code = g_guestbook_data.getRandomCode();

    var email_from = GuestStr.emailCodeFrom();

    var email_subject = GuestStr.emailCodeSubject() + random_code;

    var email_message = GuestStr.emailCodeMessage() + random_code;

    var email_to = g_guestbook_data.m_email;
    
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
    }
    else if (g_guestbook_data.allInputCodeAreSet() && !g_guestbook_data.inputCodeEqualToRandomCode())
    {
        // alert("Code ist falsch");
        setBackgroundColorInvalidElementDivInputCode();

        hideElementDivButtonSendCode();
    }

} // inputCodeIsEqualToRandomCode

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

// User clicked the send code button, i.e. the code input is valid
// and the user can in part two upload an image
function onClickSendCodeButton()
{
    // alert("onClickSendCodeButton");

    if (g_guestbook_data.inputCodeEqualToRandomCode())
    {
        hideElementDivNamesEmailCode();

        displayElementDivUploadContainerTwo();

        // var default_img_file_name = 'Icons/default_upload_image.png';

        // Moved to init g_upload_image_object = new JazzUploadImage('guest_upload',  getIdDivUploadFileImage(), default_img_file_name);
    }
    else
    {
        alert(GuestStr.inputCodeError());
    }

} // onClickReqireCodeButton

// User clicked the back two button
function onClickBackTwoButton()
{
    // alert("onClickBackTwoButton"); 

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

} // onInputTextBoxUpdateTitle

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

    if (UtilString.stringContainsIllegalCharacter(guestbook_names))
    {
        alert("Name enthält nicht erlaubte Zeichen");

        return false;
    }    

    if (!UtilString.twoOrMoreWordsInString(guestbook_names))
    {
        alert("Bitte Vorname und Nachname eingeben");

        return false;
    }

    g_guestbook_data.m_names = guestbook_names;

    localStorage.setItem(g_local_storage_guestbook_names, guestbook_names);

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

    localStorage.setItem(g_local_storage_guestbook_email, guestbook_email);

    return true;

} // getGuestbookEmail

// Get names and email from local storage and set controls
function setGuestbookNamesAndEmailFromLocalStorage()
{
   // Set it also as local storage to be used the next time the user makes a reservation
   var name_txt = localStorage.getItem(g_local_storage_guestbook_names);
   var email_txt = localStorage.getItem(g_local_storage_guestbook_email);

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


} // saveGuestbookUploadData

// Add and set an XML record for JazzGuestsUploaded.xml
function appendSetSaveGuestbookUploadData()
{
    g_guests_uploaded_xml.appendGuestNode();

    var n_records = g_guests_uploaded_xml.getNumberOfGuestRecords();

    g_guests_uploaded_xml.setGuestYear(n_records, g_guestbook_data.getYear());

    g_guests_uploaded_xml.setGuestMonth(n_records, g_guestbook_data.getMonth());

    g_guests_uploaded_xml.setGuestDay(n_records, g_guestbook_data.getDay());

    g_guests_uploaded_xml.setGuestBand(n_records, g_guestbook_data.getBand());

    g_guests_uploaded_xml.setGuestMusicians(n_records, g_guestbook_data.getMusicians());

    g_guests_uploaded_xml.setGuestHeader(n_records, g_guestbook_data.getImageTitle());

    g_guests_uploaded_xml.setGuestText(n_records, g_guestbook_data.getImageText());
  
    g_guests_uploaded_xml.setGuestNames(n_records, g_guestbook_data.getImageNames());

    g_guests_uploaded_xml.setGuestRemark(n_records, g_guestbook_data.getImageRemark());

    g_guests_uploaded_xml.setGuestFileName(n_records, g_guestbook_data.getImageFile());

    g_guests_uploaded_xml.setGuestFileType(n_records, 'IMG');

    // Not used here g_guests_uploaded_xml.JazzGuestAvatar(n_records, '');

    g_guests_uploaded_xml.setGuestEmail(n_records, g_guestbook_data.getImageEmail());

    // Not used here g_guests_uploaded_xml.setGuestTelephone(n_records, '');

    g_guests_uploaded_xml.setGuestStatusPendingRecordInUpdate(n_records);

    g_guests_uploaded_xml.setGuestPublishBool(n_records, true);

    g_guests_uploaded_xml.setGuestRegNumber(n_records, 'Will be set when moved to JazzGuests.xml');

    if (saveJazzGuestsUploadedXmlOnServer())
    {
        alert(GuestStr.guestbookRecordIsUploaded(g_guestbook_data.getImageNames()));
    }
    else
    {
        alert(GuestStr.errorGuestbookRecordIsNotUploaded(g_guestbook_data.getImageNames()));

        return;
    }

    // TODO setTimeout(recordDirectToHomepage, 3000);

} // appendSetSaveGuestbookUploadData

function recordDirectToHomepage()
{

    var n_records = g_guests_uploaded_xml.getNumberOfGuestRecords();

    g_guests_uploaded_xml.setGuestStatusUploadedByGuestToHomepage(n_records);

    var b_case_admin = true;

    if (!appendUserUploadedRecordMakeBackups(n_records, b_case_admin))
    {
        return;
    }

    location.reload();

} // recordDirectToHomepage


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Register Uploaded Data //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class GuestbookData ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Holds the input data from the guest
class GuestbookData
{
    constructor()
    {
        this.m_names = "";

        this.m_email = "";

        this.m_title = "";

        this.m_text = "";

        this.m_remark = "";

        this.m_band = "";

        this.m_musicians = "";

        this.m_year = "";

        this.m_month = "";

        this.m_day = "";

        this.m_image_file = '';

        this.m_random = null;

        // Generated code
        this.m_random_one = "";
        this.m_random_two = "";
        this.m_random_three = "";
        this.m_random_four = "";
        this.m_random_five = "";

        // Input code from user (guest)
        this.m_input_one = "";
        this.m_input_two = "";
        this.m_input_three = "";
        this.m_input_four = "";
        this.m_input_five = "";

        this.init();

    } // constructor

    // Initialization
    init()
    {
        this.m_random = new UtilRandom();

        this.setRandomCode();

        this.setCurrentDate();

    } // init

    // Set current data
    setCurrentDate()
    {
        var current_date = new Date();

        this.m_year = current_date.getFullYear().toString();

        this.m_month = (current_date.getMonth() + 1).toString();

        this.m_day = current_date.getDate().toString();

    } // setCurrentDate

    // Sets the image band name
    setBand(i_band)
    {
        this.m_band = i_band;

    } // setBand

    // Returns the image band name
    getBand()
    {
        return this.m_band;
        
    } // getBand

    // Sets the image musician names
    setMusicians(i_musicians)
    {
        this.m_musicians = i_musicians;

    } // setMusicians

    // Returns the image musician names
    getMusicians()
    {
        return this.m_musicians;
        
    } // getMusicians

    // Sets the image year
    setYear(i_year)
    {
        this.m_year = i_year;

    } // setYear

    // Returns the image year
    getYear()
    {
        return this.m_year;

    } // getYear

    // Sets the image month
    setMonth(i_month)
    {
        this.m_month = i_month;

    } // setMonth

    // Returns the image month
    getMonth()
    {
        return this.m_month;

    } // getMonth

    // Sets the image day
    setDay(i_day)
    {
        this.m_day = i_day;

    } // setYear

    // Returns the image day
    getDay()
    {
        return this.m_day;

    } // getYear

    // Sets the image file name (URL)
    setImageFile(i_image_file)
    {
        this.m_image_file = i_image_file;

    } // setImageFile

    // Returns the image file name (URL)
    getImageFile()
    {
        // TODO 
        var ret_file_name = this.m_image_file.substring(6);
        
        return ret_file_name;
        
    } // setImageFile

    // Sets image names
    setImageNames(i_names)
    {
        this.m_names = i_names;

    } // setImageNames

    // Returns image names
    getImageNames(i_names)
    {
        return this.m_names;

    } // getImageNames

    // Sets the image email
    setImageEmail(i_email)
    {
        this.m_email = i_email;

    } // setImageEmail

    // Returns the image email
    getImageEmail()
    {
        return this.m_email;

    } // getImageEmail

    // Sets the image title
    setImageTitle(i_title)
    {
        this.m_title = i_title;

    } // setImageTitle

    // Returns the image title
    getImageTitle()
    {
        return this.m_title;
        
    } // getImageTitle

    // Sets the image text
    setImageText(i_text)
    {
        this.m_text = i_text;

    } // setImageText

    // Returns the image text
    getImageText()
    {
        return this.m_text;
        
    } // getImageText

    // Sets the image remark
    setImageRemark(i_remark)
    {
        this.m_remark = i_remark;

    } // setImageRemark

    // Returns the image remark
    getImageRemark(i_remark)
    {
        return this.m_remark;

    } // getImageRemark

    // Generate random code
    setRandomCode()
    {
        this.m_random_one = Math.trunc(10.0*this.m_random.getUniform()).toString();

        this.m_random_two = Math.trunc(10.0*this.m_random.getUniform()).toString();

        this.m_random_three = Math.trunc(10.0*this.m_random.getUniform()).toString();

        this.m_random_four = Math.trunc(10.0*this.m_random.getUniform()).toString();

        this.m_random_five = Math.trunc(10.0*this.m_random.getUniform()).toString();

    } // setRandomCode

    // Get the random code
    getRandomCode()
    {
        return this.m_random_one + ' ' + this.m_random_two + ' ' + this.m_random_three + 
                ' ' + this.m_random_four + ' ' + this.m_random_five + ' ';
    }

    // Returns true if random code is equal to input code
    inputCodeEqualToRandomCode()
    {
        if (!g_guestbook_data.allInputCodeAreSet())
        {
            return false;
        }

        if (this.inputCodeEqualToSecretCode())
        {
            return true;
        }

        if (this.m_random_one != g_guestbook_data.m_input_one || this.m_random_one.length == 0)
        {
            return false;
        }

        if (this.m_random_two != g_guestbook_data.m_input_two || this.m_random_two.length == 0)
        {
            return false;
        }

        if (this.m_random_three != g_guestbook_data.m_input_three || this.m_random_three.length == 0)
        {
            return false;
        }

        if (this.m_random_four != g_guestbook_data.m_input_four || this.m_random_four.length == 0)
        {
            return false;
        }

        if (this.m_random_five != g_guestbook_data.m_input_five || this.m_random_five.length == 0)
        {
            return false;
        }

        return true;

    } // inputCodeEqualToRandomCode

    // Secret code for the memnbers in the jazzclub
    inputCodeEqualToSecretCode()
    {
        if (g_guestbook_data.m_input_one   == '8' && g_guestbook_data.m_input_two  == '9' && 
            g_guestbook_data.m_input_three == '6' && g_guestbook_data.m_input_four == '8' && 
            g_guestbook_data.m_input_five  == '0')
        {
            return true;
        }
        else
        {
            return false;
        }
    } // inputCodeEqualToSecretCode

    // Returns true if input code values have been set
    allInputCodeAreSet()
    {
        if (this.m_input_one.length == 1 && this.m_input_two.length == 1   && this.m_input_three.length == 1 
            && this.m_input_four.length == 1  && this.m_input_five.length == 1 ) 
        {
            return true;
        }
        else
        {
            return false;
        }        

    } // allInputCodeAreSet

    // Init all input codes to not set
    initAllInputCodes()
    {
        this.m_input_one = "";

        this.m_input_two = "";

        this.m_input_three = "";

        this.m_input_four = "";

        this.m_input_five = "";

    } // initAllInputCodes

    // Returns true for a valid code number, i.e. 0, 1, 2, 3, .. or 9
    static validCodeNumber(i_code_number)
    {
        if (i_code_number.length == 0 || i_code_number.length > 1)
        {
            return false;
        }

        if (i_code_number == "0" || i_code_number == "1" || i_code_number == "2" || i_code_number == "3" || 
            i_code_number == "4" || i_code_number == "5" || i_code_number == "6" || i_code_number == "7" || 
            i_code_number == "8" || i_code_number == "9" )
        {
            return true;
        }
        else
        {
            return false;
        }

    } // validCodeNumber

} // GuestbookData


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class GuestbookData /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
