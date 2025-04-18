// File: GuestStr.js
// Date: 2025-04-18
// Author: Gunnar Liden

// File content
// =============
//
// Class with all strings for the Guestbook applications

class GuestStr
{
    // Title for the upload guestbook application
    static titleGuestbookApplication()
    {
        return 'Beitrag erfassen';

    } // titleGuestbookApplication

    // Subject for the guestbook email
    static emailGuestbookSubject()
    {
        return 'Neuer Beitrag von ';

    } // emailGuestbookSubject

     // Error for the guestbook email
     static emailGuestbookError(i_email)
     {
         return 'E-Mail wurde nicht an ' + i_email + ' gesendet';
 
     } // emailGuestbookError   

    // Subject for the request code email
    static emailCodeSubject()
    {
        return 'JAZZ live AARAU Gaestebuch Code ';

    } // EmailCodeSubject

    // Text for the request code email
    static emailCodeMessage(i_names)
    {
        return 'Vielen Dank ' + i_names + ', dass Sie ein Bild zum JAZZ <i>live</i> AARAU Gästebuch hochladen möchten. <br> ' +
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
        return 'Eine E-Mail mit dem Code für das Hochladen ist an ' + i_to + ' gesendet.';

    } // emailCodeSent

    // Error message that sending the  request code email failed
    static emailCodeError(i_to)
    {
        return 'Eine E-Mail mit dem Code an ' + i_to + ' konnte NICHT gesendet werden!';

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
        return 'Eine E-Mail mit dem Code wird an diese Adresse gesendet ';

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
        return 'Name oder Namen eingeben. Mehrere Personen gerne mit Komma trennen';

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
        return 'Daten hochladen und speichern. Eine Bestätigungs-E-Mail wird gesendet';

    } // titleButtonSave

    // Caption for the admin button save
    static captionAdminButtonSave()
    {
        return 'Speichern';

    } // captionAdminButtonSave

    // Title (tooltip) for theadmin button save
    static titleAdminButtonSave()
    {
        return 'Daten hochladen und speichern';

    } // titleAdminButtonSave


    // Caption for the button confirm
    static captionButtonConfirm()
    {
        return 'Bestätigung Bild ersetzen';

    } // captionButtonConfirm

    // Title (tooltip) for the button confirm
    static titleButtonConfirm()
    {
        return 'Bestätigung, dass das Bild ersetzt werden soll';

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
        return 'Guestbuch-Eintrag kann gelöscht werden. Normal wird aber die "Nicht publizieren" Flagge verwendet';

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
        return 'Alle existierenden (registrierte) oder neu vom Publikum aufgeladene';

    } // titleCheckBoxNewRecords

    // Label all texts for uploaded image
    static labelUploadedAllTexts()
    {
        return 'Text auf der Homepage';

    } // labelUploadedAllTexts

    // Title (tooltip) all texts for uploaded image
    static titleUploadedAllTexts()
    {
        return 'Auf der Homepage gezeigte Texte';

    } // titleUploadedAllTexts
	
    // Upload code has been inputted and is valid and the user has changed the email address
    // This warning tells the user that a new code must requested for the new email 
    static emailChangedNewCodeRequired()
    {
        return 'Bitte einen neuen Code verlangen für die geänderte E-Mail Adresse';

    } // emailChangedNewCodeRequired

    // Change of the email address after getting the code will erase all input data.
    // Continue?
    static changedEmailRequiresNewCode()
    {
        return 'Änderung einer E-Mail Adresse wird eingegebene Daten  löschen. \nFortsetzen?';

    } // changedEmailRequiresNewCode

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

        ret_str = ret_str + 'Bild und Text sind zum Server hochgeladen.' + '\n';

        ret_str = ret_str + 'Wenn etwas mit dem Beitrag nicht gut wurde, kann man diesen letzten Beitrag selbst ändern.' + '\n';

        return  ret_str;

    } // guestbookRecordIsUploaded

    // Thanks to user for uploading an image
    static guestbookEditedRecordIsSaved(i_names)
    {
        var ret_str = '';

        ret_str = ret_str + 'Vielen Dank ' + i_names + '!' + '\n';

        ret_str = ret_str + 'Geänderten Beitrag ist gespeichert' + '\n';

        return  ret_str;

    } // guestbookEditedRecordIsSaved


    // User upload of an image failed
    static errorGuestbookRecordIsNotUploaded(i_names)
    {
        var ret_str = '';

        ret_str = ret_str + 'Vielen Dank ' + i_names + '!' + '\n';

        ret_str = ret_str + 'Leider ist etwas falsch gegangen. Nichts wurde hochgeladen' + '\n';

        ret_str = ret_str + 'Bitte gerne Bild und Text an guestbook@jazzliveaarau.ch senden.' + '\n';

        ret_str = ret_str + 'Wir werden dann den Beitrag zum Gästebuch hochladen.' + '\n';

        return  ret_str;

    } // errorGuestbookRecordIsNotUploaded

    // Placeholder text for the upload textarea
    static placeholderTextareaUpload()
    {
        var ret_str = '';

        ret_str = ret_str + 'Schreib gerne etwas über ein Konzert oder über JAZZ live AARAU.' + '\n';

        ret_str = ret_str + 'Wenn es über ein bestimmtes Konzert ist, bitte Konzert oben wählen.' + '\n';

        return  ret_str;

    } // placeholderTextareaUpload

    // Placeholder text for the upload textarea
    static placeholderTitleImageUpload()
    {
        var ret_str = '';

        ret_str = ret_str + 'Bitte Bildtext/Titel hier eingeben (notwendig) ...';

        return  ret_str;

    } // placeholderTitleImageUpload

    // Start upload instruction text
    static startUploadInstructionText()
    {
        var ret_str = '';

        ret_str = ret_str + 'Mach zuerst gerne eine Zeichnung für unser Gästebuch und scanne sie mit der Kamera.' + '<br>' + '<br>';

        ret_str = ret_str + 'Ein Selfie oder ein Konzert-Foto ist auch willkommen.' + '<br>' + '<br>';

        ret_str = ret_str + 'Danach mit dieser App das Foto hochladen.' + '<br>' + '<br>';

        ret_str = ret_str + 'Code verlangen für Änderung eines bestehenden Beitrags.';

        return  ret_str;

    } // startUploadInstructionText

    // Returns the contact dropdown alternatives
    static getContactDropdownArray()
    {
        var contact_case_array = [];

        contact_case_array[0] = 'Grund noch nicht gewählt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

        contact_case_array[1] = 'Letzten Beitrag ändern';

        contact_case_array[2] = 'Letzten Beitrag löschen';
	
        contact_case_array[3] = 'Änderung eines Beitrags verlangen';
    
        contact_case_array[4] = 'Löschen eines Beitrags verlangen';

        contact_case_array[5] = 'Fehler melden';
    
        contact_case_array[6] = 'Vorschlag der App';

        contact_case_array[7] = 'Anderes';

        return contact_case_array;

    } // getContactDropdownArray

    // Successful automatic deletion of guestbook record
    static successAutomaticRemovalOfRecord()
    {
        return 'Gästebuch Beitrag ist gelöscht';

    } // successAutomaticRemovalOfRecord

    // Automatic deletion of guestbook record failed
    static failureAutomaticRemovalOfRecord()
    {
        return 'Gästebuch Beitrag wurde nicht gelöscht. Bitte Administrator melden.';

    } // successAutomaticRemovalOfRecord

    // Subject for the guestbook email record deleted by user
    static emailGuestbookRecordDeletedSubject()
    {
        return 'Beitrag wurde gelöscht von ';

    } // emailGuestbookRecordDeletedSubject

    // Subject for the guestbook email record deleted by user
    static emailGuestbookRecordEditedSubject()
    {
        return 'Beitrag wurde geändert von ';

    } // emailGuestbookRecordEditedSubject

    // Email subject: Request for a record change
    static emailSubjectRequestRecordChange()
    {
        return 'Beitrag ändern angefordert von ';

    } // emailSubjectRequestRecordChange

    // Email subject: Request for a record to be deleted
    static emailSubjectRequestRecordDelete()
    {
        return 'Beitrag löschen angefordert von ';

    } // emailSubjectRequestRecordDelete

    // Email subject: Report a bug
    static emailSubjectReportBug()
    {
        return 'Fehlermeldung von ';

    } // emailSubjectReportBug

    // Email subject: make a proposal
    static emailSubjectUserProposal()
    {
        return 'Verbesserungsvorschlag von ';

    } // emailSubjectUserProposal

    // Email subject: Other case
    static emailSubjectOtherCase()
    {
        return 'Mitteilung von ';

    } // emailSubjectOtherCase

    // Notification to the user: Email was sent to the administrator
    // Input string is not yet used
    static emailWasSentToTheAdministrator(i_str)
    {
        var message_str = 'Danke, dass Sie uns kontaktieren. ' + 
                          'Ein E-Mail wurde an den Administrator (guestbook@jazzliveaarau.ch) gesendet.' + '\n' +
                          'Innerhalb einiger Tage sollten Sie eine Antwort bekommen.'

        return message_str;

    } // emailWasSentToTheAdministrator
	
    // Caption for the button contact administrator
    static captionButtonContactAdministrator()
    {
        return 'Änderung eines bestehenden Beitrags';

    } // captionButtonContactAdministrator

    // Title (tooltip) for the the button contact administrator
    static titleButtonContactAdministrator()
    {
        return 'Gästebuch Administrator kontaktieren um Beitrag zu löschen oder modifizieren, Fehler zu melden oder etwas vorzuschlagen';

    } // titleButtonContactAdministrator

    // Caption for the button cancel contact administrator
    static captionButtonContactAdministratorCancel()
    {
        return 'Abbrechen';

    } // captionButtonContactAdministratorCancel

    // Title (tooltip) for the the button cancel contact administrator
    static titleButtonContactAdministratorCancel()
    {
        return 'Keine Mitteilung an den Gästebuch Administrator senden';

    } // titleButtonContactAdministratorCancel

    // Caption for the contact exection button: Send message to the administrator
    static captionButtonContactAdministratorSend()
    {
        return 'Senden';

    } // captionButtonContactAdministratorSend

    // Caption for the contact exection button: Open record to be edited
    static captionButtonContactAdministratorOpen()
    {
        return 'Öffnen';

    } // captionButtonContactAdministratorOpen

    // Caption for the contact exection button: Delete record 
    static captionButtonContactAdministratorDelete()
    {
        return 'Löschen';

    } // captionButtonContactAdministratorDelete

    // Title (tooltip) for the the button send message to the contact administrator
    static titleButtonContactAdministratorSend()
    {
        return 'Mitteilung an den Administrator senden';

    } // titleButtonContactAdministratorSend

    // Label for the textbox contact name
    static labelTextBoxContactName()
    {
        return 'Absender Name';

    } // labelTextBoxContactName

    // Title (tooltip) for the textbox contact name
    static titleTextBoxContactName()
    {
        return 'Absender Name eingeben';

    } // titleTextBoxContactName

    // Label for the textbox contact email
    static labelTextBoxContactEmail()
    {
        return 'Absender E-Mail';

    } // labelTextBoxContactEmail

    // Title (tooltip) for the textbox contact email
    static titleTextBoxContactEmail()
    {
        return 'Absender E-Mail eingeben';

    } // titleTextBoxContactEmail

    // Label for the textbox last uploaded record
    static labelTextBoxLastRecord()
    {
        return 'Letzer hochgeladener Beitrag';

    } // labelTextBoxLastRecord

    // Title (tooltip) for the textbox last uploaded record
    static titleTextBoxLastRecord()
    {
        return 'Zeigt den letzen hochgeladenen Beitrag';

    } // titleTextBoxLastRecord

    // Label for the textarea contact text
    static labelTextAreaContactText()
    {
        return 'Mitteilung';

    } // labelTextAreaContactText

     // Title (tooltip) for the textarea contact text
     static titleTextAreaContactText()
     {
         return 'Freier Text an den Administrator';
 
     } // titleTextAreaContactText
	 
    // Placeholder text for the textarea contact text
    static placeholderTextAreaContactText()
    {
        var ret_str = '';

        ret_str = ret_str + 'Bitte Titel und Datum des Beitrags immer eingeben.' + '\n';

        return  ret_str;

    } // placeholderTextAreaContactText

    // Label for the contact case dropdown
    static labelDropdownContactCase()
    {
        return 'Kontakt-Grund wählen';

    } // labelDropdownContactCase

    // Title (tooltip) for the contact case dropdown
    static titleDropdownContactCase()
    {
        return 'Kontakt-Grund bitte wählen';

    } // titleDropdownContactCase


     // Title (tooltip) for the textarea contact text case automatic delete
     static titleTextAreaContactTextCaseAutoDelete()
     {
         return '';
 
     } // titleTextAreaContactTextCaseAutoDelete
	 
    // Placeholder text for the textarea contact text case automatic delete
    static placeholderTextAreaContactTextCaseAutoDelete()
    {
        var ret_str = '';

        ret_str = ret_str + 'Eine Mitteilung ist nicht notwendig. ' + '\n';

        ret_str = ret_str + 'Mit Senden sollte der Beitrag automatisch gelöscht werden.' + '\n';

        return  ret_str;

    } // placeholderTextAreaContactTextCaseAutoDelete

     // Title (tooltip) for the textarea contact text case change record request
     static textTextAreaContactTextCaseChangeRecord()
     {
        var delete_text = '';
        delete_text = delete_text + 'Bitte folgenden Beitrag ändern' + '\n';
        delete_text = delete_text + 'Titel: ' + '\n';
        delete_text = delete_text + 'Datum: ' + '\n';
        delete_text = delete_text + 'Namen: ' + '\n';
        delete_text = delete_text + ' ' + '\n';
        delete_text = delete_text + 'Mach bitte folgende Änderung(en): ' + '\n';
        delete_text = delete_text + ' ' + '\n';
			
         return delete_text;
 
     } // textTextAreaContactTextCaseChangeRecord
	 
    // Placeholder text for the textarea contact text case change record request
    static placeholderTextAreaContactTextCaseChangeRecord()
    {
        var ret_str = '';

        return  ret_str;

    } // placeholderTextAreaContactTextCaseChangeRecord

     // Title (tooltip) for the textarea contact text case delete record request
     static textTextAreaContactTextCaseDeleteRecord()
     {
        var delete_text = '';
        delete_text = delete_text + 'Bitte folgenden Beitrag löschen' + '\n';
        delete_text = delete_text + 'Titel: ' + '\n';
        delete_text = delete_text + 'Datum: ' + '\n';
        delete_text = delete_text + 'Namen: ' + '\n';
        delete_text = delete_text + ' ' + '\n';
        delete_text = delete_text + 'Bitte lass uns wissen warum. ' + '\n';
        delete_text = delete_text + 'Grund: ' + '\n';
			
         return delete_text;
 
     } // textTextAreaContactTextCaseDeleteRecord
	 
    // Placeholder text for the textarea contact text case delete record request
    static placeholderTextAreaContactTextCaseDeleteRecord()
    {
        var ret_str = '';

        return  ret_str;

    } // placeholderTextAreaContactTextCaseDeleteRecord

    // Automatic delete is not possible. Data from a last record is not available
    static errorAutomaticDeleteNotAvailable()
    {
        var ret_str = 'Löschen ist nicht möglich. Daten vom letzten Beitrag sind nicht gespeichert. Bitte eine andere Alternative wählen.';

        return  ret_str;

    } // errorAutomaticDeleteNotAvailable

    // Edit record is not possible. Data from a last record is not available
    static errorEditRecordNotAvailable()
    {
        var ret_str = 'Änderungen sind nicht möglich. Daten vom letzten Beitrag sind nicht gespeichert. Bitte eine andere Alternative wählen.';

        return  ret_str;

    } // errorEditRecordNotAvailable

     // Text for the textarea contact text case report bug
     static textTextAreaContactTextCaseReportBug()
     {
        var delete_text = '';
			
         return delete_text;
 
     } // textTextAreaContactTextCaseReportBug
	 
    // Placeholder text for the textarea contact text case report bug
    static placeholderTextAreaContactTextCaseReportBug()
    {
        var ret_str = 'Bitte Fehler beschreiben';

        return  ret_str;

    } // placeholderTextAreaContactTextCaseReportBug

     // Text for the textarea contact text case make a proposal
     static textTextAreaContactTextMakeProposal()
     {
        var delete_text = '';
			
         return delete_text;
 
     } // textTextAreaContactTextMakeProposal
	 
    // Placeholder text for the textarea contact text case make a proposal
    static placeholderTextAreaContactTextMakeProposal()
    {
        var ret_str = 'Bitte Vorschlag beschreiben';

        return  ret_str;

    } // placeholderTextAreaContactTextMakeProposal

     // Text for the textarea contact text case other message
     static textTextAreaContactTextOtherMessage()
     {
        var delete_text = '';
			
         return delete_text;
 
     } // textTextAreaContactTextOtherMessage
	 
    // Placeholder text for the textarea contact text case other message
    static placeholderTextAreaContactTextOtherMessage()
    {
        var ret_str = 'Bitte Mitteilung schreiben';

        return  ret_str;

    } // placeholderTextAreaContactTextOtherMessage

    // Returns an array with titles for the upload windows
    static getUploadWindowTitleArray()
    {
        var upload_window_title_array = [];

        upload_window_title_array[0] = 'Name, E-Mail und Code';
	
        upload_window_title_array[1] = 'Bild wählen';
    
        upload_window_title_array[2] = 'Texte eingeben';

        upload_window_title_array[3] = 'Änderung eines Beitrags';

        return upload_window_title_array;

    } // getUploadWindowTitleArray


} // GuestStr