// File: GuestbookContact.js
// Date: 2024-02-21
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
    var selected_contact_case_number = g_contact_case_drop_down.getSelectOptionNumber();

    var index_case = parseInt(selected_contact_case_number) - 1;

    var b_execute = null;

    if (index_case == 0 && g_guestbook_data_last_record != null)
    {
        b_execute = executeContactRequestAutomaticDelete();

        if (b_execute)
        {
            alert(GuestStr.successAutomaticRemovalOfRecord());
        }
        else
        {
            alert(GuestStr.failureAutomaticRemovalOfRecord());
        }
    }
    else if (index_case == 0)
    {
        alert("Kein letzter beitrag ist vorhanden");

        return;
    }
    else if (index_case == 1)
    {
        b_execute = executeContactRequestManualDelete();
    }
    else if (index_case == 2)
    {
        b_execute = executeContactRequestBugReport();
    }
    else if (index_case == 3)
    {
        b_execute = executeContactRequestUserProposal();
    }
    else if (index_case == 4)
    {
        b_execute = executeContactRequestOtherCase();
    }
    else
    {
        alert("executeContactRequest Not an implemented case= " + index_case.toString());

        b_execute = false;
    }

    return b_execute;

} // executeContactRequest

// Execute the contact request automatic delete
function executeContactRequestAutomaticDelete()
{
    if (g_guestbook_data_last_record == null)
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete g_guestbook_data_last_record is null');

        return false;
    }

    var xml_str = 'uploaded';

    var uploaded_record_number = getDeletRecordNumber(xml_str);

    if (uploaded_record_number <= 0)
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete An uploaded record is not found');

        alert("executeContactRequestAutomaticDelete An uploaded record is not found");

        return false;
    }

    xml_str = 'admin';
    
    var admin_record_number = getDeletRecordNumber(xml_str);

    if (admin_record_number <= 0)
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete An admin record is not found');

        alert("executeContactRequestAutomaticDelete An admin record is not found");

        return false;
    }

    if (UtilServer.execApplicationOnServer())
    {
        if (!backupJazzGuestsXml())
        {
            debugGuestbookUpload('executeContactRequestAutomaticDelete Backup of JazzGuests.xml failed');
    
            return false;
        }
    
        if (!backupJazzGuestsUploadedXml())
        {
            debugGuestbookUpload('executeContactRequestAutomaticDelete Backup of JazzGuestsUploaded.xml failed');
    
            return false;
        } 
        
        debugGuestbookUpload('executeContactRequestAutomaticDelete JazzGuests.xml and JazzGuestsUploaded.xml backups are created');
    }
    else
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Not running on the server. No XML backups are created');  
    }

    debugGuestbookUpload('executeContactRequestAutomaticDelete Move uploaded image file to backup directory'); 

    if (!moveImageFromUploadedToBackupDir(uploaded_record_number))
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure moving uploaded image file to backup directory'); 
    }

    if (!moveImageFromJazzGuestDirToBackupDir(admin_record_number))
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure moving admin image file to backup directory'); 
    }

    g_guests_uploaded_xml.deleteGuestNode(uploaded_record_number);

    g_guests_xml.deleteGuestNode(admin_record_number);

    debugGuestbookUpload('executeContactRequestAutomaticDelete Records deleted in JazzGuests.xml and JazzGuestsUploaded.xml'); 

    debugGuestbookUpload('executeContactRequestAutomaticDelete Save JazzGuests.xml on the server'); 

    if (!saveJazzGuestsXmlOnServer())
    { 
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure saving JazzGuests.xml on the server'); 

        return false;
    }   

    debugGuestbookUpload('executeContactRequestAutomaticDelete Save JazzGuestsUploaded.xml on the server'); 
 
    if (!saveJazzGuestsUploadedXmlOnServer())
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure saving JazzGuestsUploaded.xml on the server'); 

        return false;
    }

    if (!sendEmailUserDeletedRecordToGuestbook(g_guestbook_data_last_record))
    {
        debugGuestbookUpload('executeContactRequestAutomaticDelete Failure sending email'); 

        return false;
    }

    GuestStorage.initGuestbookData();

    debugGuestbookUpload('executeContactRequestAutomaticDelete Local storage record data have been used and was initialized'); 

    return true;

} // executeContactRequestAutomaticDelete

// Execute the contact request manual delete
function executeContactRequestManualDelete()
{
    var ret_b = true;

    alert("executeContactRequestManualDelete This case is not implemented");

    return ret_b;

} // executeContactRequestManualDelete

// Execute the contact request bug report
function executeContactRequestBugReport()
{
    var ret_b = true;

    alert("executeContactRequestBugReport This case is not implemented");

    return ret_b;

} // executeContactRequestBugReport

// Execute the contact request user proposal
function executeContactRequestUserProposal()
{
    var ret_b = true;

    alert("executeContactRequestUserProposal This case is not implemented");

    return ret_b;

} // executeContactRequestUserProposal

// Execute the contact request other case
function executeContactRequestOtherCase()
{
    var ret_b = true;

    alert("executeContactRequestOtherCase This case is not implemented");

    return ret_b;

} // executeContactRequestOtherCase

// Returns the record number to delete
// i_xml_str Eq. uploadwd JazzGuestsUploaded.xml  Eq. admin JazzGuests.xml
function getDeletRecordNumber(i_xml_str)
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
        alert("getDeletRecordNumber Error i_xml_str= " + i_xml_str);

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
                    debugGuestbookUpload('getDeletRecordNumber uploaded rec_number= ' + rec_number.toString());

                    return rec_number;
                }
                else if (i_xml_str == 'admin')
                {
                    debugGuestbookUpload('getDeletRecordNumber admin rec_number= ' + rec_number.toString());

                    return rec_number;
                }

            } // properties equal

    } // rec_number

    return -1;

} // getDeletRecordNumber


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Execute Contact Request /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Contact Controls //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the contact controls
function setContactControls()
{
    var names_txt = g_guestbook_data.getImageNames();

    var email_txt = g_guestbook_data.getImageEmail();

    g_contact_from_text_box.setValue(names_txt);

    g_contact_email_text_box.setValue(email_txt);

    if (g_guestbook_data_last_record != null)
    {
        var iso_date_str = UtilDate.getIsoDateString(g_guestbook_data_last_record.getYear(), 
        g_guestbook_data_last_record.getMonth(), g_guestbook_data_last_record.getDay());

        var last_record_txt = g_guestbook_data_last_record.getImageTitle() + ' Datum: ' + iso_date_str;

        g_last_record_text_box.setValue(last_record_txt);

        var selected_contact_case_number = g_contact_case_drop_down.getSelectOptionNumber();

        var index_case = parseInt(selected_contact_case_number) - 1;

        if (index_case == 0)
        {
            debugGuestbookUpload('setContactControls Letzter Beitrag löschen');

            g_contact_msg_textarea.setPlaceholderText("Eine Mitteilung ist nicht notwendig. Mit Senden sollte den Beitrag automatisch gelöscht werden.");

        }
        else if (index_case == 1)
        {
            debugGuestbookUpload('setContactControls Anderer Beitrag löschen');

            var delete_text = '';
            delete_text = delete_text + 'Bitte folgender Beitrag löschen' + '\n';
            delete_text = delete_text + 'Titel: ' + '\n';
            delete_text = delete_text + 'Datum: ' + '\n';
            delete_text = delete_text + 'Namen: ' + '\n';
            delete_text = delete_text + ' ' + '\n';
            delete_text = delete_text + 'Bitte lass uns wissen warum. ' + '\n';
            delete_text = delete_text + 'Grund: ' + '\n';

            g_contact_msg_textarea.setValue(delete_text);

        }
        else if (index_case == 2)
        {
            debugGuestbookUpload('setContactControls Fehler melden');

            g_contact_msg_textarea.setPlaceholderText("Fehlerbeschreibung ...");

        }
        else if (index_case == 3)
        {
            debugGuestbookUpload('setContactControls Vorschlag machen');

            g_contact_msg_textarea.setPlaceholderText("Vorschlagbeschreibung ...");
        }
        else if (index_case == 4)
        {
            debugGuestbookUpload('setContactControls Anderes');

            g_contact_msg_textarea.setPlaceholderText("Mitteilung hier schreiben ...");
        }
        else
        {
    
            alert("setContactControls Not an implemented case index= " + index_case.toString());
            
        }

    }
    else
    {
        g_last_record_text_box.setValue("Kein letzter Beitrag");

        g_contact_msg_textarea.setPlaceholderText("Mitteilung hier schreiben ...");

        g_contact_case_drop_down.setSelectOptionNumber(2);
    }


} // setContactControls


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Contact Controls ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
