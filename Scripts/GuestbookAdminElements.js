// File: GuestbookAdminElements.js
// Date: 2024-01-19
// Author: Gunnar Liden

// File content
// =============
//
// Functions to get identies, objects and classes 

// Returns the identity of the <div> element for the login and logout controls
function getIdDivLoginLogout()
{
    return 'id_admin_login_logout';

} // getIdDivLoginLogout

// Returns the identity of the login and logout text box
function getIdLoginLogoutTextBox()
{
    return 'id_login_logout_text_box';

} // getIdLoginLogoutTextBox

// Returns the identity of the login and logout button
function getIdLoginLogoutButton()
{
    return 'id_login_logout_button';

} // getIdLoginLogoutButton

// Returns the the container element div for the image
function getElementDivImageContainer()
{
    return document.getElementById(getIdDivImageContainer());

} // getElementDivImageContainer

// Returns the identity of the container div for the image
function getIdDivImageContainer()
{
    return 'id_div_admin_image_container';

} // getIdDivImageContainer
