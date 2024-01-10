// File: GuestbookUploadElements.js
// Date: 2024-01-09
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

/*
// Returns the identity of the container div for the button forward part two
function getIdDivUploadButtonForwardTwo()
{
    return 'id_div_upload_button_forward_part_two';

} // getIdDivUploadButtonForwardTwo

// Hides the container element div for the buttons container part three
function hideElementDivUploadButtonBackForwardThree()
{
    getElementDivUploadButtonBackForwardThree().style.display = 'none';

} // hideElementDivUploadButtonBackForwardThree

// Displays the container element div for the buttons container part three
function displayElementDivUploadButtonBackForwardThree()
{
    getElementDivUploadButtonBackForwardThree().style.display = 'block';

} // displayElementDivUploadButtonBackForwardThree
*/

// Returns the container element div for the buttons container part three
function getElementDivUploadButtonBackForwardThree()
{
    return document.getElementById(getIdDivUploadButtonBackForwardThree());

} // getElementDivUploadButtonBackForwardThree

// Returns the identity of the container div for the buttons container part three
function getIdDivUploadButtonBackForwardThree()
{
    return 'id_div_upload_button_back_forward_part_three';

} // getIdDivUploadButtonBackForwardThree

/* 
// Returns the container element div for the button back part three
function getElementDivUploadButtonBackThree()
{
    return document.getElementById(getIdDivUploadButtonBackThree());

} // getElementDivUploadButtonBackThree

// Returns the identity of the container div for the button back part three
function getIdDivUploadButtonBackThree()
{
    return 'id_div_upload_button_back_part_three';

} // getIdDivUploadButtonBackThree

// Returns the container element div for the button forward part three
function getElementDivUploadButtonForwardThree()
{
    return document.getElementById(getIdDivUploadButtonForwardThree());

} // getElementDivUploadButtonForwardThree

// Returns the identity of the container div for the button forward part three
function getIdDivUploadButtonForwardThree()
{
    return 'id_div_upload_button_forward_part_three';

} // getIdDivUploadButtonForwardThree
*/
