// File: GuestStr.js
// Date: 2024-01-09
// Author: Gunnar Liden

// File content
// =============
//
// Class with all strings for the Guestbook applications

class GuestStr
{
    // Subject for the request code email
    static emailCodeSubject()
    {
        return 'JAZZ live AARAU Gästebuch Code ';

    } // EmailCodeSubject

    // Text for the request code email
    static emailCodeMessage()
    {
        return 'Vielen Dank, dass Sie ein Bild zum JAZZ <i>live</i> AARAU Gästebuch aufladen möchten. <br> ' +
                           'Dazu brauchen Sie diesen Code: <br>';
        
    } // EmailCodeSubject

    // From address and BCC email address for the request code email
    static emailCodeFrom()
    {
        return 'guestbook@jazzliveaarau.ch';

    } // emailCodeFrom

    // Confirmation that a  request code email was sent
    static emailCodeSent(i_to)
    {
        return 'Eine E-Mail mit dem Code für das Aufladen ist an ' + i_to + 'gesendet.';

    } // emailCodeSent

    // Error message that sending the  request code email failed
    static emailCodeError(i_to)
    {
        return 'Eine E-Mail mit dem Code ist an ' + i_to + ' konnte NICHT gesendet werden!';

    } // emailCodeError

    // Caption for the button request code
    static captionButtonRequestCode()
    {
        return 'Code verlangen';

    } // captionButtonRequestCode

    // Title (tooltip) for the the button request code
    static titleButtonRequestCode()
    {
        return 'Eine E-Mail mit dem Code wird an diese Adresse gesendet';

    } // titleButtonRequestCode

    // Caption for the button send code
    static captionButtonSendCode()
    {
        return 'Weiter';

    } // captionButtonSendCode

    // Title (tooltip) for the button send code
    static titleButtonSendCode()
    {
        return 'Bitte klicken. Nachher kann ein Bild aufgeladen werden';

    } // titleButtonSendCode

    // Label for the textbox names
    static labelTextBoxNames()
    {
        return 'Vorname(n) und Nachname(n)';

    } // labelTextBoxNames

    // Title (tooltip) for the textbox names
    static titleTextBoxNames()
    {
        return 'Name oder Namen eingeben. Mehrere personen gerne mit Komma trennen';

    } // titleTextBoxNames

    // Label for the textbox email
    static labelTextBoxEmail()
    {
        return 'E-Mail';

    } // labelTextBoxEmail

    // Title (tooltip) for the textbox email
    static titleTextBoxEmail()
    {
        return 'Ihre E-Mail-Adresse eingeben';

    } // titleTextBoxEmail

    // Label for the textbox code one
    static labelTextBoxCodeOne()
    {
        return 'Code ';

    } // labelTextBoxCodeOne

    // Title (tooltip) for the textbox code one
    static titleTextBoxCodeOne()
    {
        return 'Erste Zahl des Codes';

    } // titleTextBoxCodeOne

    // Title (tooltip) for the textbox code two
    static titleTextBoxCodeTwo()
    {
        return 'Zweite Zahl des Codes';

    } // titleTextBoxCodeTwo

    // Title (tooltip) for the textbox code three
    static titleTextBoxCodeThree()
    {
        return 'Dritte Zahl des Codes';

    } // titleTextBoxCodeThree

    // Title (tooltip) for the textbox code four
    static titleTextBoxCodeFour()
    {
        return 'Vierte Zahl des Codes';

    } // titleTextBoxCodeFour

    // Title (tooltip) for the textbox code five
    static titleTextBoxCodeFive()
    {
        return 'Fünfte Zahl des Codes';

    } // titleTextBoxCodeFive


} // GuestStr