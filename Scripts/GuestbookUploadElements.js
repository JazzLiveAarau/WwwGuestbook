// File: GuestbookUploadElements.js
// Date: 2024-02-28
// Author: Gunnar Liden

// File content
// =============
//
// Functions to get identies, objects and hide elements for the application guestbook image upload

// Hides the container element div for the names, email and code
function hideElementDivNamesEmailCode()
{
    getElementDivNamesEmailCode().style.display = 'none';

} // hideElementDivNamesEmailCode

// Displays the container element div for the names, email and code
function displayElementDivNamesEmailCode()
{
    getElementDivNamesEmailCode().style.display = 'block';

} // displayElementDivNamesEmailCode

// Returns the container element div for the names, email and code
function getElementDivNamesEmailCode()
{
    return document.getElementById(getIdDivNamesEmailCode());

} // getElementDivNamesEmailCode

// Returns the identity of the container div for the names, email and code
function getIdDivNamesEmailCode()
{
    return 'id_div_upload_names_email_code';

} // getIdDivNamesEmailCode

// Hides the container element div for the upload of the image
function hideElementDivUploadContainerTwo()
{
    getElementDivUploadContainerTwo().style.display = 'none';

} // hideElementDivUploadImage

// Displays the container element div for the upload of the image
function displayElementDivUploadContainerTwo()
{
    getElementDivUploadContainerTwo().style.display = 'block';

} // displayElementDivUploadImage

// Returns the container element div for the upload of the image
function getElementDivUploadContainerTwo()
{
    return document.getElementById(getIdDivUploadContainerTwo());

} // getElementDivUploadImage

// Returns the identity of the container div for the upload of the image
function getIdDivUploadContainerTwo()
{
    return 'id_div_upload_container_part_two';

} // getIdDivUploadImage

// Hides the container element div for the upload of the texts
function hideElementDivUploadTexts()
{
    getElementDivUploadTexts().style.display = 'none';

} // hideElementDivUploadTexts

// Displays the container element div for the upload of the texts
function displayElementDivUploadTexts()
{
    getElementDivUploadTexts().style.display = 'block';

} // displayElementDivUploadTexts

// Returns the container element div for the upload of the texts
function getElementDivUploadTexts()
{
    return document.getElementById(getIdDivUploadTexts());

} // getElementDivUploadTexts

// Returns the identity of the container div for the upload of the texts
function getIdDivUploadTexts()
{
    return 'id_div_upload_texts';

} // getIdDivUploadTexts

// Hides the container element div for the input of the code
function hideElementDivInputCode()
{
    getElementDivInputCode().style.display = 'none';

} // hideElementDivInputCode

// Displays the container element div for the input of the code
function displayElementDivInputCode()
{
    getElementDivInputCode().style.display = 'block';

} // displayElementDivInputCode

// Sets the background color to valid (code)
function setBackgroundColorValidElementDivInputCode()
{
    getElementDivInputCode().style.background = 'white';

} // setBackgroundColorValidElementDivInputCode

// Sets the background color to invalid (code)
function setBackgroundColorInvalidElementDivInputCode()
{
    getElementDivInputCode().style.background = 'red';

} // setBackgroundColorInvalidElementDivInputCode

// Returns the container element div for the input of the code
function getElementDivInputCode()
{
    return document.getElementById(getIdDivInputCode());

} // getElementDivInputCode

// Returns the identity of the container div for the input of the code
function getIdDivInputCode()
{
    return 'id_div_upload_code';

} // getIdDivInputCode

// Hides the container element div for the button send code
function hideElementDivButtonSendCode()
{
    getElementDivButtonSendCode().style.display = 'none';

} // hideElementDivButtonSendCode

// Displays the container element div for the button send code
function displayElementDivButtonSendCode()
{
    getElementDivButtonSendCode().style.display = 'block';

} // displayElementDivButtonSendCode

// Returns the container element div for the button send code
function getElementDivButtonSendCode()
{
    return document.getElementById(getIdDivButtonSendCode());

} // getElementDivButtonSendCode

// Returns the identity of the container div for the button send code
function getIdDivButtonSendCode()
{
    return 'id_div_upload_button_send';

} // getIdDivButtonSendCode

// Hides the container element div for the upload icon
function hideElementDivImageUploadIcon()
{
    getElementDivImageUploadIcon().style.display = 'none';

} // hideElementDivImageUploadIcon

// Displays the container element div for the upload icon
function displayElementDivImageUploadIcon()
{
    getElementDivImageUploadIcon().style.display = 'block';

} // displayElementDivImageUploadIcon

// Returns the container element div for the upload icon
function getElementDivImageUploadIcon()
{
    return document.getElementById(getIdDivImageUploadIcon());

} // getElementDivImageUploadIcon

// Returns the identity of the container div for the upload icon
function getIdDivImageUploadIcon()
{
    return 'id_div_upload_icon';

} // getIdDivImageUploadIcon

// Hides the container element div for the upload start instructions
function hideElementDivUploadStartInstructions()
{
    getElementDivUploadStartInstructions().style.display = 'none';

} // hideElementDivUploadStartInstructions

// Displays the container element div for the upload start instructions
function displayElementDivUploadStartInstructions()
{
    getElementDivUploadStartInstructions().style.display = 'block';

} // displayElementDivUploadStartInstructions

// Returns the container element div for the upload start instructions
function getElementDivUploadStartInstructions()
{
    return document.getElementById(getIdDivUploadStartInstructions());

} // getElementDivUploadStartInstructions

// Returns the identity of the container div for the upload start instructions
function getIdDivUploadStartInstructions()
{
    return 'id_div_start_instructions';

} // getIdDivUploadStartInstructions

// Returns the container element <div> continer for the JazzUploadImage object
function getElementDivUploadFileImage()
{
    return document.getElementById(getIdDivUploadFileImage());

} // getElementDivUploadFileImage

// Returns the identity of the <div> continer for the JazzUploadImage object
function getIdDivUploadFileImage()
{
    return 'id_div_upload_input_file_image';

} // getIdDivUploadFileImage

// Hides the container element div for the buttons container part two
function hideElementDivUploadButtonBackForwardTwo()
{
    getElementDivUploadButtonBackForwardTwo().style.display = 'none';

} // hideElementDivUploadButtonBackForwardTwo

// Displays the container element div for the buttons container part two
function displayElementDivUploadButtonBackForwardTwo()
{
    getElementDivUploadButtonBackForwardTwo().style.display = 'block';

} // displayElementDivUploadButtonBackForwardTwo

// Returns the container element div for the buttons container part two
function getElementDivUploadButtonBackForwardTwo()
{
    return document.getElementById(getIdDivUploadButtonBackForwardTwo());

} // getElementDivUploadButtonBackForwardTwo

// Returns the identity of the container div for the buttons container part two
function getIdDivUploadButtonBackForwardTwo()
{
    return 'id_div_upload_button_back_forward_part_two';

} // getIdDivUploadButtonBackForwardTwo

// Returns the container element div for the button back part two
function getElementDivUploadButtonBackTwo()
{
    return document.getElementById(getIdDivUploadButtonBackTwo());

} // getElementDivUploadButtonBackTwo

// Returns the identity of the container div for the button back part two
function getIdDivUploadButtonBackTwo()
{
    return 'id_div_upload_button_back_part_two';

} // getIdDivUploadButtonBackTwo

// Returns the container element div for the button forward part two
function getElementDivUploadButtonForwardTwo()
{
    return document.getElementById(getIdDivUploadButtonForwardTwo());

} // getElementDivUploadButtonForwardTwo

// Returns the container element div for the buttons container part three
function getElementDivUploadButtonBackForwardThree()
{
    return document.getElementById(getIdDivUploadButtonBackForwardThree());

} // getElementDivUploadButtonBackForwardThree

// Hides the container element div for the button forward container part two
function hideElementDivUploadButtonBackTwo()
{
    getElementDivUploadButtonBackTwo().style.display = 'none';

} // hideElementDivUploadButtonBackTwo

// Displays the container element div for the button forward container part two
function displayElementDivUploadButtonBackTwo()
{
    getElementDivUploadButtonBackTwo().style.display = 'block';

} // displayElementDivUploadButtonBackTwo

// Returns the container element div for the button forward container part two
function getElementDivUploadButtonBackTwo()
{
    return document.getElementById(getIdDivUploadButtonBackTwo());

} // getElementDivUploadButtonBackTwo

// Returns the identity of the container div for the button forward container part two
function getIdDivUploadButtonBackTwo()
{
    return 'id_div_upload_button_back_part_two';

} // getIdDivUploadButtonBackTwo

// Display or hide the container element div for the button forward container part two
function displayOrHideElementDivUploadButtonForwardTwo(i_b_hide)
{
    if (i_b_hide)
    {
        hideElementDivUploadButtonForwardTwo();
    }
    else
    {
        displayElementDivUploadButtonForwardTwo();
    }
    
} // displayOrHideElementDivUploadButtonForwardTwo

// Hides the container element div for the button forward container part two
function hideElementDivUploadButtonForwardTwo()
{
    getElementDivUploadButtonForwardTwo().style.display = 'none';

} // hideElementDivUploadButtonForwardTwo

// Displays the container element div for the button forward container part two
function displayElementDivUploadButtonForwardTwo()
{
    getElementDivUploadButtonForwardTwo().style.display = 'block';

} // displayElementDivUploadButtonForwardTwo

// Returns the container element div for the button forward container part two
function getElementDivUploadButtonForwardTwo()
{
    return document.getElementById(getIdDivUploadButtonForwardTwo());

} // getElementDivUploadButtonForwardTwo

// Returns the identity of the container div for the button forward container part two
function getIdDivUploadButtonForwardTwo()
{
    return 'id_div_upload_button_forward_part_two';

} // getIdDivUploadButtonForwardTwo

// Hides the container element div for the button back container part three
function hideElementDivUploadButtonBackThree()
{
    getElementDivUploadButtonBackThree().style.display = 'none';

} // hideElementDivUploadButtonBackThree

// Displays the container element div for the button back container part three
function displayElementDivUploadButtonBackThree()
{
    getElementDivUploadButtonBackThree().style.display = 'block';

} // displayElementDivUploadButtonBackThree

// Returns the container element div for the button back container part three
function getElementDivUploadButtonBackThree()
{
    return document.getElementById(getIdDivUploadButtonBackThree());

} // getElementDivUploadButtonBackThree

// Returns the identity of the container div for the button back container part three
function getIdDivUploadButtonBackThree()
{
    return 'id_div_upload_button_back_part_three';

} // getIdDivUploadButtonBackThree

// Hides the container element div for the button forward container part two
function hideElementDivUploadButtonForwardThree()
{
    getElementDivUploadButtonForwardThree().style.display = 'none';

} // hideElementDivUploadButtonForwardThree

// Displays the container element div for the button forward container part two
function displayElementDivUploadButtonForwardThree()
{
    getElementDivUploadButtonForwardThree().style.display = 'block';

} // displayElementDivUploadButtonForwardThree

// Returns the container element div for the button forward container part two
function getElementDivUploadButtonForwardThree()
{
    return document.getElementById(getIdDivUploadButtonForwardThree());

} // getElementDivUploadButtonForwardThree

// Returns the identity of the container div for the button forward container part two
function getIdDivUploadButtonForwardThree()
{
    return 'id_div_upload_button_forward_part_three';

} // getIdDivUploadButtonForwardThree

// Returns the div element for the upload application title
function getElementDivUploadGuestbookTitle()
{
    return document.getElementById(getIdDivUploadGuestbookTitle());

} // getElementDivUploadGuestbookTitle

// Returns the div identity for the upload application title
function getIdDivUploadGuestbookTitle()
{
    return 'id_div_guestbook_title';

} // getIdDivUploadGuestbookTitle

// Hides the container element div for the text box remark
function hideDivUploadTextsRemark()
{
    getElementDivUploadTextsRemark().style.display = 'none';

} // hideDivUploadTextsRemark

// Returns the div element for the text box remark
function getElementDivUploadTextsRemark()
{
    return document.getElementById(getIdDivUploadTextsRemark());

} // getElementDivUploadTextsRemark

// Returns the div identity for the text box remark
function getIdDivUploadTextsRemark()
{
    return 'id_div_upload_texts_remark';

} // getIdDivUploadTextsRemark

// Hides the container element div for contact
function hideElementDivContactContainer()
{
    getElementDivContactContainer().style.display = 'none';

} // hideElementDivContactContainer

// Displays the container element div for contact
function displayElementDivContactContainer()
{
    getElementDivContactContainer().style.display = 'block';

} // displayElementDivContactContainer

// Returns the container element div for contact
function getElementDivContactContainer()
{
    return document.getElementById(getIdDivContactContainer());

} // getElementDivContactContainer

// Returns the identity of the container div for contact
function getIdDivContactContainer()
{
    return 'id_div_container_contact';

} // getIdDivContactContainer

// Hides the container element div for contact
function hideElementDivContactButton()
{
    getElementDivContactButton().style.display = 'none';

} // hideElementDivContactButton

// Displays the container element div for contact
function displayElementDivContactButton()
{
    getElementDivContactButton().style.display = 'block';

} // displayElementDivContactButton

// Returns the container element div for contact
function getElementDivContactButton()
{
    return document.getElementById(getIdDivContactButton());

} // getElementDivContactButton

// Returns the identity of the contact button
function getIdDivContactButton()
{
    return 'id_div_button_contact';

} // getIdDivContactButton

// Hides the container element div for the contact last record textbook
function hideElementDivContactTextBoxLastRecord()
{
    getElementDivContactTextBoxLastRecord().style.display = 'none';

} // hideElementDivContactTextBoxLastRecord

// Displays the container element div for the contact last record textbook
function displayElementDivContactTextBoxLastRecord()
{
    getElementDivContactTextBoxLastRecord().style.display = 'block';

} // displayElementDivContactTextBoxLastRecord

// Returns the container element div for the contact last record textbook
function getElementDivContactTextBoxLastRecord()
{
    return document.getElementById(getIdDivContactTextBoxLastRecord());

} // getElementDivContactTextBoxLastRecord

// Returns the identity of the container div for the contact last record textbook
function getIdDivContactTextBoxLastRecord()
{
    return 'id_div_contact_textbox_last_rec';

} // getIdDivContactTextBoxLastRecord

// Hides the container element div for the contact text area
function hideElementDivContactMessageTextArea()
{
    getElementDivContactMessageTextArea().style.display = 'none';

} // hideElementDivContactMessageTextArea

// Displays the container element div for the contact text area
function displayElementDivContactMessageTextArea()
{
    getElementDivContactMessageTextArea().style.display = 'block';

} // displayElementDivContactMessageTextArea

// Returns the container element div for the contact text area
function getElementDivContactMessageTextArea()
{
    return document.getElementById(getIdDivContactMessageTextArea());

} // getElementDivContactMessageTextArea

// Returns the identity of the container div for the contact text area
function getIdDivContactMessageTextArea()
{
    return 'id_div_contact_textarea_message';

} // getIdDivContactMessageTextArea

// Hides the container element div for the contact send button
function hideElementDivContactSendButton()
{
    getElementDivContactSendButton().style.display = 'none';

} // hideElementDivContactSendButton

// Displays the container element div for the contact send button
function displayElementDivContactSendButton()
{
    getElementDivContactSendButton().style.display = 'block';

} // displayElementDivContactSendButton

// Returns the container element div for the contact send button
function getElementDivContactSendButton()
{
    return document.getElementById(getIdDivContactSendButton());

} // getElementDivContactSendButton

// Returns the identity of the container div for the contact send button
function getIdDivContactSendButton()
{
    return 'id_div_contact_button_send';

} // getIdDivContactSendButton
