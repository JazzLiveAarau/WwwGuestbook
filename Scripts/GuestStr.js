// File: GuestStr.js
// Date: 2024-01-12
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
        return 'JAZZ live AARAU Gaestebuch Code ';

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

    // Error message input code is not correct
    static inputCodeError()
    {
        return 'Eingabe Code ist falsch';

    } // inputCodeError

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
        return '* Vorname(n) und Nachnamen(n)';

    } // labelTextBoxNames

    // Title (tooltip) for the textbox names
    static titleTextBoxNames()
    {
        return 'Name oder Namen eingeben. Mehrere personen gerne mit Komma trennen';

    } // titleTextBoxNames

    // Label for the textbox email
    static labelTextBoxEmail()
    {
        return '* E-Mail';

    } // labelTextBoxEmail

    // Title (tooltip) for the textbox email
    static titleTextBoxEmail()
    {
        return 'Ihre E-Mail-Adresse eingeben. Nach einer Änderung einen neuen Code verlangen';

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

    // Caption for the button back
    static captionButtonBack()
    {
        return 'Zurück';

    } // captionButtonBack

    // Title (tooltip) for the button back
    static titleButtonBack()
    {
        return 'Zurück zum vorigen Dialog';

    } // titleButtonBack

    // Caption for the button forward
    static captionButtonForward()
    {
        return 'Weiter';

    } // captionButtonForward

    // Title (tooltip) for the button forward
    static titleButtonForward()
    {
        return 'Weiter zum nächsten Dialog';

    } // titleButtonForward

    // Caption for the button save
    static captionButtonSave()
    {
        return 'Speichern';

    } // captionButtonSave

    // Title (tooltip) for the button save
    static titleButtonSave()
    {
        return 'Daten auflauden und speichern. Eine Bestätigung E-Mail wird gesendet';

    } // titleButtonSave

    // Label for the textbox title
    static labelTextBoxTitle()
    {
        return '* Bildtext';

    } // labelTextBoxTitle

    // Title (tooltip) for the textbox title
    static titleTextBoxTitle()
    {
        return 'Kurzer Bildtext';

    } // titleTextBoxTitle

    // Label for the concert dropdown
    static labelDropdownConcert()
    {
        return 'Konzert wählen';

    } // labelDropdownConcert

    // Title (tooltip) for the concert dropdown
    static titleDropdownConcert()
    {
        return 'Wenn Eintrag für ein bestimmtes Konzert ist, bitte Konzert wählen';

    } // titleDropdownConcert

    // Append for the concert dropdown
    static appendDropdownConcert()
    {
        return 'Kein Konzert';

    } // appendDropdownConcert

     // Label for the textarea text
    static labelTextAreaText()
    {
        return 'Text';

    } // labelTextAreaText

     // Title (tooltip) for the textarea text
     static titleTextAreaText()
     {
         return 'Freier Text';
 
     } // titleTextAreaText

    // Label for the textbox remark
    static labelTextBoxRemark()
    {
        return 'Bemerkung';

    } // labelTextBoxRemark

    // Title (tooltip) for the textbox remark
    static titleTextBoxRemark()
    {
        return 'Bemerkung';

    } // titleTextBoxRemark

    // Upload code has been inputted and is valid and the user has changed the email address
    // This warning tells the user that a new code must requested for the new email 
    static emailChangedNewCodeRequired()
    {
        return 'Bitte einen neuen Code verlangen für die geänderte E-Mail Adresse';

    } // emailChangedNewCodeRequired

    // The user klicks the button for part three (input texts) and an image is not uploaded
    // This error message the user to upload an image
    static imageNotUploaded()
    {
        return 'Bitte Bild zuerst wählen';
    }

    // There must a title for the image
    static titleNotSet()
    {
        return 'Bitte Bild Titel eingeben';

    } // titleNotSet

} // GuestStr