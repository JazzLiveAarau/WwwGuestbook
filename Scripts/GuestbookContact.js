// File: GuestbookContact.js
// Date: 2025-04-09
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Functions for Guestbook contact

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Execute Contact Request ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Execute the contact request
function executeContactRequest()
{
    var b_execute = true; // TODO Remove

    var selected_contact_case_number = g_contact_case_drop_down.getSelectOptionNumber();

    var index_case = parseInt(selected_contact_case_number) - 1;

    if (index_case == 0)
    {
        ; // Do nothing. Case is not selected
    }
    else if (index_case == 1 && g_guestbook_data_last_record != null)
    {
        ChangeLastUploadedRecord.start();
    }
    else if (index_case == 1)
    {
        alert("Kein letzter beitrag ist vorhanden");
    }
    else if (index_case == 2 && g_guestbook_data_last_record != null)
    {
        DeleteLastUploadedRecord.start();
    }
    else if (index_case == 2)
    {
        alert("Kein letzter beitrag ist vorhanden");
    }
    else if (index_case == 3)
    {
        ChangeRecord.start();
    }
    else if (index_case == 4)
    {
        DeleteRecord.start();
    }
    else if (index_case == 5)
    {
        ReportBug.start();
    }
    else if (index_case == 6)
    {
        UserProposal.start();
    }
    else if (index_case == 7)
    {
        OtherCase.start();
    }
    else
    {
        alert("executeContactRequest Not an implemented case= " + index_case.toString());
    }

} // executeContactRequest

class ChangeRecord
{
    // Start function. Calls sendNoticationEmail
    static start()
    {
        ChangeRecord.sendNoticationEmail();

    } // start

    // Sends a notification email to the administrator
    // Callback function is finish
    static sendNoticationEmail()
    {
        var email_message = getContentNotificationEmail(GuestStr.emailSubjectRequestRecordChange());
        
        var name_request = g_contact_from_text_box.getValue();

        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
        var email_subject = GuestStr.emailSubjectRequestRecordChange() + name_request;
    
        var email_bcc = '';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, ChangeRecord.finish);

    } // sendNoticationEmail

    // Finish function. Notifies the user that an email has been sent to the administrator
    static finish()
    {
        alert(GuestStr.emailWasSentToTheAdministrator(""));

        location.reload();

    } // finish

} // ChangeRecord

class DeleteRecord
{
    // Start function. Calls sendNoticationEmail
    static start()
    {
        DeleteRecord.sendNoticationEmail();

    } // start

    // Sends a notification email to the administrator
    // Callback function is finish
    static sendNoticationEmail()
    {
        var email_message = getContentNotificationEmail(GuestStr.emailSubjectRequestRecordDelete());
        
        var name_request = g_contact_from_text_box.getValue();

        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
        var email_subject = GuestStr.emailSubjectRequestRecordDelete() + name_request;
    
        var email_bcc = '';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, DeleteRecord.finish);

    } // sendNoticationEmail

    // Finish function. Notifies the user that an email has been sent to the administrator
    static finish()
    {
        alert(GuestStr.emailWasSentToTheAdministrator(""));

        location.reload();

    } // finish

} // DeleteRecord

class ReportBug
{
    // Start function. Calls sendNoticationEmail
    static start()
    {
        ReportBug.sendNoticationEmail();

    } // start

    // Sends a notification email to the administrator
    // Callback function is finish
    static sendNoticationEmail()
    {
        var email_message = getContentNotificationEmail(GuestStr.emailSubjectReportBug());
        
        var name_request = g_contact_from_text_box.getValue();

        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
        var email_subject = GuestStr.emailSubjectReportBug() + name_request;
    
        var email_bcc = '';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, ReportBug.finish);

    } // sendNoticationEmail

    // Finish function. Notifies the user that an email has been sent to the administrator
    static finish()
    {
        alert(GuestStr.emailWasSentToTheAdministrator(""));

        location.reload();

    } // finish

} // ReportBug

class UserProposal
{
    // Start function. Calls sendNoticationEmail
    static start()
    {
        UserProposal.sendNoticationEmail();

    } // start

    // Sends a notification email to the administrator
    // Callback function is finish
    static sendNoticationEmail()
    {
        var email_message = getContentNotificationEmail(GuestStr.emailSubjectUserProposal());
        
        var name_request = g_contact_from_text_box.getValue();

        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
        var email_subject = GuestStr.emailSubjectUserProposal() + name_request;
    
        var email_bcc = '';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, UserProposal.finish);

    } // sendNoticationEmail

    // Finish function. Notifies the user that an email has been sent to the administrator
    static finish()
    {
        alert(GuestStr.emailWasSentToTheAdministrator(""));

        location.reload();

    } // finish

} // UserProposal

class OtherCase
{
    // Start function. Calls sendNoticationEmail
    static start()
    {
        OtherCase.sendNoticationEmail();

    } // start

    // Sends a notification email to the administrator
    // Callback function is finish
    static sendNoticationEmail()
    {
        var email_message = getContentNotificationEmail(GuestStr.emailSubjectOtherCase());
        
        var name_request = g_contact_from_text_box.getValue();

        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
        var email_subject = GuestStr.emailSubjectOtherCase() + name_request;
    
        var email_bcc = '';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, OtherCase.finish);

    } // sendNoticationEmail

    // Finish function. Notifies the user that an email has been sent to the administrator
    static finish()
    {
        alert(GuestStr.emailWasSentToTheAdministrator(""));

        location.reload();

    } // finish

} // OtherCase

function getContentNotificationEmail(i_subject)
{
    var name_request = g_contact_from_text_box.getValue();

    var email_request = g_contact_email_text_box.getValue();

    var textarea_str = g_contact_msg_textarea.getValue();

    textarea_str = UtilString.stringWindowsToHtml(textarea_str);

    var email_from = GuestStr.emailCodeFrom();

    var email_to = GuestStr.emailCodeFrom();

    var email_subject = i_subject + name_request;

    var email_bcc = '';

    var email_message = '';

    email_message = email_message + 'Betreff: ' + i_subject + '<br>';
    email_message = email_message + 'Name: ' + name_request + '<br>';
    email_message = email_message + 'Email: ' + email_request + '<br>';
    
    email_message = email_message + 'Text: ' + '<br>' + textarea_str + '<br>';

    return email_message;

} // getContentNotificationEmail

// Functions that automatically delete the last uploaded record
class DeleteLastUploadedRecord
{
    // Start function for the deletion of the last uploaded record
    // Input data:
    // g_guestbook_data_last_record: Instance of GuestbookData with data from GuestStorage
    // g_guests_uploaded_xml: XML object corresponding to JazzGuestsUploaded.xml
    // g_guests_xml:          XML object corresponding to JazzGuests.xml
    //
    // 1. Check that the local storage record data g_guestbook_data_last_record exists. 
    //    If not existing return.
    // 2. Check that the local storage record data exists in the JazzGuests.xml object g_guests_xml
    //    Call of LastUploadedRecord.getXmlRecordNumber
    // 3. Check that the local storage record data exists in the JazzGuestsUploaded.xml object g_guests_uploaded_xml
    //    Call of LastUploadedRecord.getXmlRecordNumber
    // 4. Lock XML files for this user email and call this.reloadJazzGuestsObject when locked
    //    Call UtilLock.setUserEmail,  UtilLock.setLockedCallbackFunctionName and UtilLock.lock 
    static start()
    {
        if (g_guestbook_data_last_record == null)
        {
            debugGuestbookUpload('DeleteLastUploadedRecord.start g_guestbook_data_last_record is null');
    
            return;
        }    

        var xml_str = 'uploaded';

        var uploaded_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);
    
        if (uploaded_record_number <= 0)
        {
            debugGuestbookUpload('DeleteLastUploadedRecord.start An uploaded record is not found');
    
            alert("DeleteLastUploadedRecord.start An uploaded record is not found");
    
            return;
        }
    
        xml_str = 'admin';
        
        var admin_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);
    
        if (admin_record_number <= 0)
        {
            debugGuestbookUpload('DeleteLastUploadedRecord.start An admin record is not found');
    
            alert("DeleteLastUploadedRecord.start An admin record is not found");
    
            return;
        }

        var user_email = g_guestbook_data_last_record.getImageEmail();

        g_util_lock_object.setUserEmail(user_email);

        g_util_lock_object.setLockedCallbackFunctionName(DeleteLastUploadedRecord.reloadJazzGuestsObject);

        g_util_lock_object.lock();

    } // start

    // Reloads the JazzGuests.xml object
    // 1. Call of reloadJazzGuestXmlObject with callback function this.reloadJazzGuestsUploadedObject
    static reloadJazzGuestsObject()
    {
        reloadJazzGuestXmlObject(DeleteLastUploadedRecord.reloadJazzGuestsUploadedObject);

    } // reloadJazzGuestsObject

    // Reloads the JazzGuestsUploaded.xml object
    // 1. Call of reloadJazzGuestUploadedXmlObject with callback function this.backupJazzGuestsUploaded
    static reloadJazzGuestsUploadedObject()
    {
        reloadJazzGuestUploadedXmlObject(DeleteLastUploadedRecord.backupJazzGuestsUploaded);

    } // reloadJazzGuestsUploadedObject

    // Make a backup of JazzGuestsUploaded.xml
    // 1. Call of UtilServer.copyFileCallback with callback function this.backupJazzGuestsUploaded
    static backupJazzGuestsUploaded()
    {
        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuestsUploaded(), 
                                    GuestbookServer.absoluteUrlJazzGuestsUploadedBackup(), 
                                    DeleteLastUploadedRecord.backupJazzGuestsXml);
    } // backupJazzGuestsUploaded

    // Backup JazzGuests.xml. Call back function is moveImageFromUploadedToBackupDir
    // 1. Call of UtilServer.copyFileCallback with callback function this.moveImageFromUploadedToBackupDir
    static backupJazzGuestsXml()
    {

        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
                                    GuestbookServer.absoluteUrlJazzGuestsBackup(), 
                                    DeleteLastUploadedRecord.moveImageFromUploadedToBackupDir);

    } // backupJazzGuestsXml

    // Moves the upload image from /www/JazzGuests/Uploaded/ to the backup directory
    // 1. Get record number in object JazzGuestsUploaded.xml. Call this.getDeleteRecordNumber
    // 2. Get image file name. Call of JazzGuestsXml.getGuestFileName
    // 3. Construct full path to existing file. Call of GuestbookServer.getUploadedXmlDirUrl
    // 4. Construct full path to backup file. Call of GuestbookServer.getBackupDirUrl
    // 5. Create the backup file and delete the existing file. 
    //    When finished call this.moveImageFromJazzGuestDirToBackupDir
    //    Call UtilServer.moveFileCallback
    static moveImageFromUploadedToBackupDir()
    {
        var xml_str = 'uploaded';

        var uploaded_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);

        var uploaded_file_name = g_guests_uploaded_xml.getGuestFileName(uploaded_record_number);

        var name_no_path = UtilServer.getFileName(uploaded_file_name);
    
        var input_move_file = GuestbookServer.getUploadedXmlDirUrl() + name_no_path;
    
        var output_move_file = GuestbookServer.getBackupDirUrl() + name_no_path;

        UtilServer.moveFileCallback(input_move_file, output_move_file, DeleteLastUploadedRecord.moveImageFromJazzGuestDirToBackupDir);

    } // moveImageFromUploadedToBackupDir


    // Moves the upload image from /www/JazzGuests/ to the backup directory
    // 1. Get record number in object JazzGuests.xml. Call this.getDeleteRecordNumber
    // 2. Get image file name. Call of JazzGuestsXml.getGuestFileName
    // 3. Construct full path to existing file. Call of GuestbookServer.getUploadedXmlDirUrl
    // 4. Construct full path to backup file. Call of GuestbookServer.getBackupDirUrl
    // 5. Create the backup file and delete the existing file. 
    //    When finished call this.deleteRecordSaveJazzGuestsUploadedXml
    //    Call UtilServer.moveFileCallback
    static moveImageFromJazzGuestDirToBackupDir()
    {
        var xml_str = 'admin';
        
        var admin_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);

        var uploaded_file_name = g_guests_xml.getGuestFileName(admin_record_number);

        var name_no_path = UtilServer.getFileName(uploaded_file_name);
    
        var input_move_file = GuestbookServer.getJazzGuestsDirUrl() + name_no_path;
    
        var output_move_file = GuestbookServer.getBackupDirUrl() + name_no_path;

        UtilServer.moveFileCallback(input_move_file, output_move_file, 
                        DeleteLastUploadedRecord.deleteRecordSaveJazzGuestsUploadedXml);

    } // moveImageFromJazzGuestDirToBackupDir

    // Deletes the upload XML record and saves the file JazzGuestsUploaded.xml
    // 1. Get record number in object JazzGuestsUploaded.xml. Call this.getDeleteRecordNumber
    // 2. Delete the record. Call of JazzGuestsXml.deleteGuestNode
    // 3. Save the file JazzGuestsUploaded.xml. When finished call this.deleteRecordSaveJazzGuestsdXml
    //    Call of UtilServer.saveFileCallback
    static deleteRecordSaveJazzGuestsUploadedXml()
    {
        var xml_str = 'uploaded';

        var uploaded_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);

        g_guests_uploaded_xml.deleteGuestNode(uploaded_record_number);

        UtilServer.saveFileCallback(GuestbookServer.absoluteUrlJazzGuestsUploaded(), 
                                    GuestbookServer.getPrettyPrintContent(g_guests_uploaded_xml), 
                                    DeleteLastUploadedRecord.deleteRecordSaveJazzGuestsdXml);

    } // deleteRecordSaveJazzGuestsUploadedXml

    // Deletes the XML record and saves the file JazzGuests.xml
    // 1. Get record number in object JazzGuest.xml. Call this.getDeleteRecordNumber
    // 2. Delete the record. Call of JazzGuestsXml.deleteGuestNode
    // 3. Save the file JazzGuest.xml. When finished call this.unlockFiles
    //    Call of UtilServer.saveFileCallback
    static deleteRecordSaveJazzGuestsdXml()
    {
        var xml_str = 'admin';
        
        var admin_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);

        g_guests_xml.deleteGuestNode(admin_record_number);

        UtilServer.saveFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
        GuestbookServer.getPrettyPrintContent(g_guests_xml), 
        DeleteLastUploadedRecord.unlockFiles);

    } // deleteRecordSaveJazzGuestsdXml

    // Unlock the files JazzGuests.xml and JazzGuestsUploaded.xml
    // (Actually making it possible for other users and Guestbook functions to add, delete and
    //  change Guestbook data on the server)
    // 1. Set callback function name to this.sendNoticationEmail. 
    //    Call of UtilLock.setUnlockedCallbackFunctionName and UtilLock.unlock
    static unlockFiles()
    {
        g_util_lock_object.setUnlockedCallbackFunctionName(DeleteLastUploadedRecord.sendNoticationEmail);

        g_util_lock_object.unlock();

    } // unlockFiles

    // Sends a notification email to the administrator
    // Callback function is finish
    // 1. Set emailsender, receiver and content
    // 2. Send the email. When finished call function this.finish.
    //    Call of UtilEmail.sendSecureCallback
    static sendNoticationEmail()
    {
        var email_from = GuestStr.emailCodeFrom();

        var email_to = GuestStr.emailCodeFrom();
    
        var email_subject = GuestStr.emailGuestbookRecordDeletedSubject() + g_guestbook_data_last_record.getImageNames();
    
        var email_bcc = '';
    
        var textarea_str = g_guestbook_data_last_record.getImageText();
    
        textarea_str = UtilString.stringWindowsToHtml(textarea_str);
    
        var email_message = '';
    
        var record_date = UtilDate.getIsoDateString(g_guestbook_data_last_record.getYear(), 
                                                    g_guestbook_data_last_record.getMonth(), 
                                                    g_guestbook_data_last_record.getDay());
    
        email_message = email_message + 'Datum: ' + record_date + '<br>';
        email_message = email_message + 'Email: ' + g_guestbook_data_last_record.getImageEmail() + '<br>';
        email_message = email_message + 'Names: ' + g_guestbook_data_last_record.getImageNames() + '<br>';
        email_message = email_message + 'Title: ' + g_guestbook_data_last_record.getImageTitle() + '<br>';
        email_message = email_message + 'Band: ' + g_guestbook_data_last_record.getBand() + '<br>';
        email_message = email_message + 'Musicians: ' + g_guestbook_data_last_record.getMusicians() + '<br>';
        email_message = email_message + 'Remark: ' + g_guestbook_data_last_record.getImageRemark() + '<br>';
        email_message = email_message + 'File: ' + g_guestbook_data_last_record.getImageFile() + '<br>';
        email_message = email_message + 'Text: ' + g_guestbook_data_last_record + '<br>';
    
        UtilEmail.sendSecureCallback(email_from, email_subject, email_message, email_to, email_bcc, g_email_secure, DeleteLastUploadedRecord.finish);

    } // sendNoticationEmail

    // Reloads the application
    // 1. Initialize (delete) guest local storage data.
    //    Call GuestStorage.initGuestbookData set global variable to null
    // 2. Reload the application. Call of location.reload
    static finish()
    {
        GuestStorage.initGuestbookData();

        g_guestbook_data_last_record = null;

        alert(GuestStr.successAutomaticRemovalOfRecord());

        location.reload();

    } // finish

} // DeleteLastUploadedRecord

// Functions for changing the last uploaded record
class ChangeLastUploadedRecord
{
    // Start function for editing the last uploaded record
    // Input data:
    // g_guestbook_data_last_record: Instance of GuestbookData with data from GuestStorage
    // g_guests_xml: XML object corresponding to JazzGuests.xml
    //
    // 1. Check that the local storage record data g_guestbook_data_last_record exists. 
    //    If not existing return.
    // 2. Check that the local storage record data exists is in the JazzGuests.xml object g_guests_xml
    //    Call of LastUploadedRecord.getXmlRecordNumber
    // 3. Reload the JazzGuests.xml object g_guests_xml. 
    //    Call of ChangeLastUploadedRecord.reloadJazzGuestsObject
    static start()
    {
        if (g_guestbook_data_last_record == null)
        {
            debugGuestbookUpload('ChangeLastUploadedRecord.start g_guestbook_data_last_record is null');
    
            return;
        }
    
        var xml_str = 'admin';
        
        var admin_record_number = LastUploadedRecord.getXmlRecordNumber(xml_str);
    
        if (admin_record_number <= 0)
        {
            debugGuestbookUpload('ChangeLastUploadedRecord.start An admin record is not found');
    
            alert("ChangeLastUploadedRecord.start An admin record is not found");
    
            return;
        }

        ChangeLastUploadedRecord.reloadJazzGuestsObject();

    } // start

    // Reloads the JazzGuests.xml object
    // 1. Call of reloadJazzGuestXmlObject. 
    //    Callback function ChangeLastUploadedRecord.backupJazzGuestsXml
    static reloadJazzGuestsObject()
    {
        reloadJazzGuestXmlObject(ChangeLastUploadedRecord.backupJazzGuestsXml);

    } // reloadJazzGuestsObject

    // Backup the file JazzGuests.xml.
    // 1. Call of UtilServer.copyFileCallback.
    //    Callback function is ChangeLastUploadedRecord.moveImageFromUploadedToBackupDir
    static backupJazzGuestsXml()
    {

        UtilServer.copyFileCallback(GuestbookServer.absoluteUrlJazzGuests(), 
                                    GuestbookServer.absoluteUrlJazzGuestsBackup(), 
                                    ChangeLastUploadedRecord.setGuestbookDataForEdit);

    } // backupJazzGuestsXml

    // Sets the GuestbookData object g_guestbook_data
    // 1. Add data to GuestbookData object g_guestbook_data 
    //    Call of GuestStorage.addGuestbookDataForEdit.
    // 2. Set edit of record mode to true
    //    Call  setEditRecordModeToTrue
    // 3. Open page two of the Guestbook Upload app
    //    Call of ChangeLastUploadedRecord.finish
    static setGuestbookDataForEdit()
    {
        g_guestbook_data = GuestStorage.addGuestbookDataForEdit(g_guestbook_data);

        setEditRecordModeToTrue();

        ChangeLastUploadedRecord.backupRegImage();

    } // setGuestbookDataForEdit

    // Make a backup of the registered image and call LastUploadedRecord.finish
    static backupRegImage()
    {
        var reg_image_url = g_guestbook_data.getFileName();
        
        UtilServer.copyFileCallback(reg_image_url, 
                                    GuestbookServer.absoluteBackupTimeStamp(reg_image_url), 
                                    ChangeLastUploadedRecord.finish);
    } // backupJazzGuests

    // Open page two of the Guestbook Upload app
    // 1. Open 'page' upload of image.
    //    Call of setControlsEditLastUploadedRecord
    static finish()
    {
        setControlsEditLastUploadedRecord();

    } // finish

} // ChangeLastUploadedRecord

class LastUploadedRecord
{
    // Returns the record number for the record defined in a GuestStorage object 
    //  Returns negative value for failure
    //
    // Input data:
    // i_xml_str: Defines the XML object (g_guests_uploaded_xml or g_guests_xml) 
    //            that shall be used by the function
    //            Eq. uploadwd: XML object for file JazzGuestsUploaded.xml  
    //            Eq. admin:    XML object for file JazzGuests.xml
    //
    // g_guestbook_data_last_record: Instance of GuestbookData with data from GuestStorage
    // 
    // 1. Select XML object g_guests_uploaded_xml or g_guests_xml
    // 2. Get number of XML records
    // 3. Get comparison data from g_guestbook_data_last_record (GuestStorage):
    //    Title, year, month, day and image file name
    // 4. Loop for all XML records
    // 4.1 Get title, year, month, day and image file name from the XML record
    // 4.2 Compare title, year, month, day and image file name
    //     If all are equal return the XML record number
    static getXmlRecordNumber(i_xml_str)
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
            alert("DeleteLastUploadedRecord.getXmlRecordNumber Error i_xml_str= " + i_xml_str);
    
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
                        debugGuestbookUpload('DeleteLastUploadedRecord.getXmlRecordNumber uploaded rec_number= ' + rec_number.toString());
    
                        return rec_number;
                    }
                    else if (i_xml_str == 'admin')
                    {
                        debugGuestbookUpload('DeleteLastUploadedRecord.getXmlRecordNumber admin rec_number= ' + rec_number.toString());
    
                        return rec_number;
                    }
    
                } // properties equal
    
        } // rec_number

        debugGuestbookUpload('DeleteLastUploadedRecord.getXmlRecordNumber Error. Record is NOT found ');
    
        return -1;
    
    } // getXmlRecordNumber

} // LastUploadedRecord

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Execute Contact Request /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Contact Controls //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the contact dropdown texts. Hide and display also elements
function setContactDropdownTexts()
{
    var names_txt = g_guestbook_data.getImageNames();

    var email_txt = g_guestbook_data.getImageEmail();

    g_contact_from_text_box.setValue(names_txt);

    g_contact_email_text_box.setValue(email_txt);

    hideElementDivContactMessageTextArea();

    hideElementDivContactSendButton();

    if (g_guestbook_data_last_record != null)
    {
        var iso_date_str = UtilDate.getIsoDateString(g_guestbook_data_last_record.getYear(), 
        g_guestbook_data_last_record.getMonth(), g_guestbook_data_last_record.getDay());

        var last_record_txt = g_guestbook_data_last_record.getImageTitle() + ' Datum: ' + iso_date_str;

        g_last_record_text_box.setValue(last_record_txt);

        displayElementDivContactTextBoxLastRecord();

    }
    else
    {
        hideElementDivContactTextBoxLastRecord();
    }

    var selected_contact_case_number = g_contact_case_drop_down.getSelectOptionNumber();

    var index_case = parseInt(selected_contact_case_number) - 1;

    if (index_case == 0)
    {
        hideElementDivContactMessageTextArea();

        hideElementDivContactSendButton();

        debugGuestbookUpload('setContactDropdownTexts Case not selected');

    }
    else if (index_case == 1)
    {
        setAndDisplayContactExecuteButtonOpen();

        debugGuestbookUpload('setContactDropdownTexts Letzten Beitrag ändern');

        if (g_guestbook_data_last_record == null)
        {
            displayElementDivContactMessageTextArea();

            g_contact_msg_textarea.setPlaceholderText("");

            g_contact_msg_textarea.setValue(GuestStr.errorEditRecordNotAvailable());

            hideElementDivContactSendButton();
        }

    } 
    else if (index_case == 2)
    {
        setAndDisplayContactExecuteButtonDelete();

        debugGuestbookUpload('setContactDropdownTexts Letzten Beitrag löschen');

        if (g_guestbook_data_last_record == null)
        {
            displayElementDivContactMessageTextArea();

            g_contact_msg_textarea.setPlaceholderText("");

            g_contact_msg_textarea.setValue(GuestStr.errorAutomaticDeleteNotAvailable());

            hideElementDivContactSendButton();

        }

    } 
    else if (index_case == 3)
    {
        displayElementDivContactMessageTextArea();

        setAndDisplayContactExecuteButtonSend();

        debugGuestbookUpload('setContactDropdownTexts Beitrag ändern');

        g_contact_msg_textarea.setPlaceholderText(GuestStr.placeholderTextAreaContactTextCaseChangeRecord());

        g_contact_msg_textarea.setValue(GuestStr.textTextAreaContactTextCaseChangeRecord());

    }
    else if (index_case == 4)
    {
        displayElementDivContactMessageTextArea();

        setAndDisplayContactExecuteButtonSend();

        debugGuestbookUpload('setContactDropdownTexts Beitrag löschen');

        g_contact_msg_textarea.setPlaceholderText(GuestStr.placeholderTextAreaContactTextCaseDeleteRecord());

        g_contact_msg_textarea.setValue(GuestStr.textTextAreaContactTextCaseDeleteRecord());

    }
    else if (index_case == 5)
    {
        displayElementDivContactMessageTextArea();

        setAndDisplayContactExecuteButtonSend();

        debugGuestbookUpload('setContactDropdownTexts Fehler melden');

        g_contact_msg_textarea.setValue(GuestStr.textTextAreaContactTextCaseReportBug());

        g_contact_msg_textarea.setPlaceholderText(GuestStr.placeholderTextAreaContactTextCaseReportBug());

    }
    else if (index_case == 6)
    {
        displayElementDivContactMessageTextArea();

        setAndDisplayContactExecuteButtonSend();
        
        debugGuestbookUpload('setContactDropdownTexts Vorschlag machen');

        g_contact_msg_textarea.setValue(GuestStr.textTextAreaContactTextMakeProposal());

        g_contact_msg_textarea.setPlaceholderText(GuestStr.placeholderTextAreaContactTextMakeProposal());
    }
    else if (index_case == 7)
    {
        displayElementDivContactMessageTextArea();

        setAndDisplayContactExecuteButtonSend();
        
        debugGuestbookUpload('setContactDropdownTexts Anderes');

        g_contact_msg_textarea.setValue(GuestStr.textTextAreaContactTextOtherMessage());

        g_contact_msg_textarea.setPlaceholderText(GuestStr.placeholderTextAreaContactTextOtherMessage());
    }
    else
    {
        g_contact_msg_textarea.setPlaceholderText("setContactDropdownTexts Not an implemented case index= " + index_case.toString());

        g_contact_msg_textarea.setValue("setContactDropdownTexts Not an implemented case index= " + index_case.toString());

        alert("setContactDropdownTexts Not an implemented case index= " + index_case.toString());
        
    }

} // setContactDropdownTexts


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Contact Controls ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
