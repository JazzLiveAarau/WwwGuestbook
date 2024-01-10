// File: GuestbookAdmin.js
// Date: 2024-01-10
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application guestbook image upload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Holds the user input data
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

function initGuestbookUpload()
{
    g_guestbook_data = new GuestbookData();

    createUpdateControls();

    setGuestbookNamesAndEmailFromLocalStorage();

    hideElementDivUploadContainerTwo();

    hideElementDivUploadTexts();

    hideElementDivInputCode();

    hideElementDivButtonSendCode();

    var n_level_xml = 1;

    var update_xml = false;

    //g_guests_xml = new JazzGuestsXml(callbackGuestbookUploadedXml, n_level_xml, update_xml);

} // initGuestbookUpload

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the request code button
function onClickRequestCodeButton()
{
    // alert("onClickRequestCodeButton");

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
    
    var email_bcc = GuestStr.emailCodeFrom();

    var n_top = 2;

    if (!UtilServer.execApplicationOnServer())
    {
        alert("sendGuestbookCodeEmail PHP cannot execute with Visual Studio Live Server. The code: " + random_code);

        return;
    }
    
    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc, n_top);

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
    }
    else if (g_guestbook_data.allInputCodeAreSet() && !g_guestbook_data.inputCodeEqualToRandomCode())
    {
        alert("Code ist falsch");
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

// User clicked the send code button
function onClickSendCodeButton()
{
    // alert("onClickSendCodeButton");

    if (g_guestbook_data.inputCodeEqualToRandomCode())
    {
        hideElementDivNamesEmailCode();

        displayElementDivUploadContainerTwo();

        var default_img_file_name = 'Icons/default_upload_image.png';

        g_upload_image_object = new JazzUploadImage('guest_upload',  getIdDivUploadFileImage(), default_img_file_name);
    }
    else
    {
        alert("Eingabe Code ist falsch");
    }

} // onClickReqireCodeButton

// User clicked the back two button
function onClickBackTwoButton()
{
    alert("onClickBackTwoButton");

} // onClickReqireCodeButton

// User clicked the forward two button
function onClickForwardTwoButton()
{
    alert("onClickForwardTwoButton");

} // onClickReqireCodeButton

// User clicked the back three button
function onClickBackThreeButton()
{
    alert("onClickBackThreeButton");

} // onClickReqireCodeButton

// User clicked the forward three button
function onClickForwardThreeButton()
{
    alert("onClickForwardThreeButton");

} // onClickReqireCodeButton

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



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get User Input //////////////////////////////////////////////
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

        this.m_year = "";

        this.m_month = "";

        this.m_day = "";

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

    } // init

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
