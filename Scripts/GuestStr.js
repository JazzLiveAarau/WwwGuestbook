// File: GuestStr.js
// Date: 2024-01-21
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

    // Caption for the admin button save
    static captionAdminButtonSave()
    {
        return 'Speichern';

    } // captionAdminButtonSave

    // Title (tooltip) for theadmin button save
    static titleAdminButtonSave()
    {
        return 'Daten auflauden und speichern';

    } // titleAdminButtonSave


    // Caption for the button confirm
    static captionButtonConfirm()
    {
        return 'Bestätigung Bild ersetzen';

    } // captionButtonConfirm

    // Title (tooltip) for the button confirm
    static titleButtonConfirm()
    {
        return 'Bestätigung, das Bild ersetzt werden soll';

    } // titleButtonConfirm

    // Caption for the button download
    static captionButtonDownload()
    {
        return 'Bild herunterladen';

    } // captionButtonDownload

    // Title (tooltip) for the button download
    static titleButtonDownload()
    {
        return 'Bild zum Editieren vom Server herunterladen';

    } // titleButtonDownload

    // Caption for the button delete
    static captionButtonDelete()
    {
        return 'Löschen';

    } // captionButtonDelete

    // Title (tooltip) for the button delete
    static titleButtonDelete()
    {
        return 'Guestbuch-Eintrag kann gelöscht werden. Normal wird aber nicht publizieren Flagge verwendet';

    } // titleButtonDelete

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

    // Append text for the guest record dropdown
    static appendDropdownGuest()
    {
        return 'Neues Bild zufügen';

    } // appendDropdownGuest

    // Label for the guest record dropdown
    static labelDropdownGuest()
    {
        return 'Eintrag wählen';

    } // labelDropdownGuest

    // Title (tooltip) for the guest record dropdown
    static titleDropdownGuest()
    {
        return 'Eintrag zum Editieren wählen';

    } // titleDropdownGuest

    // Append text for the concert dropdown
    static appendDropdownConcert()
    {
        return 'Kein Konzert';

    } // appendDropdownConcert

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
        return 'Eine Bemerkung wird nicht publiziert';

    } // titleTextBoxRemark

    // Label for the textbox status
    static labelTextBoxStatus()
    {
        return 'Status';

    } // labelTextBoxStatus

    // Title (tooltip) for the textbox status
    static titleTextBoxStatus()
    {
        return 'Status. Dieser Text kann nicht direkt geändert werden';

    } // titleTextBoxStatus

    // Label for the textbox date
    static labelTextBoxDate()
    {
        return 'Datum';

    } // labelTextBoxDate

    // Title (tooltip) for the textbox date
    static titleTextBoxDate()
    {
        return 'Datum für ein Konzert oder Datum als Bild zugefügt war';

    } // titleTextBoxDate

    // Label for the checkbox publish
    static labelCheckBoxPublish()
    {
        return 'Publizieren ';

    } // labelCheckBoxPublish

    // Title (tooltip) for the checkbox publish
    static titleCheckBoxPublish()
    {
        return 'Wähle ob Eintrag publiziert werden soll. Nicht publizierte werden auf der Homepage nicht gezeigt';

    } // titleCheckBoxPublish

    // Label for the checkbox new records
    static labelCheckBoxNewRecords()
    {
        return 'Aufgeladene ';

    } // labelCheckBoxNewRecords

    // Title (tooltip) for the checkbox new records
    static titleCheckBoxNewRecords()
    {
        return 'Alle existierende (registrierte) oder neue vom Publikum aufgeladene';

    } // titleCheckBoxNewRecords
	
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

    // Thanks to user for uploading an image
    static guestbookRecordIsUploaded(i_names)
    {
        var ret_str = '';

        ret_str = ret_str + 'Vielen Dank ' + i_names + '!' + '\n';

        ret_str = ret_str + 'Bild und Texte sind aufgeladen' + '\n';

        return  ret_str;

    } // guestbookRecordIsUploaded


    // User upload of an image failed
    static errorGuestbookRecordIsNotUploaded(i_names)
    {
        var ret_str = '';

        ret_str = ret_str + 'Vielen Dank ' + i_names + '!' + '\n';

        ret_str = ret_str + 'Leider ist etwas falsch gegangen. Nichts wurde aufgeladen' + '\n';

        ret_str = ret_str + 'Bitte gerne Bild und Text an guestbook@jazzliveaarau.ch senden.' + '\n';

        ret_str = ret_str + 'Wir werden dann den Beitrag zum Gästebuch aufladen.' + '\n';

        return  ret_str;

    } // errorGuestbookRecordIsNotUploaded


} // GuestStr