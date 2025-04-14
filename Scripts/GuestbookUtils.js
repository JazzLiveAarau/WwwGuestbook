// File: GuestbookUtils.js
// Date: 2025-04-13
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Guestbook utility functions:
// - Class GuestbookData with user input data
// - Class GuestbookServer with server file names and paths 
// - Class GuestStorage with functions to set and get guestbook data from local storage.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class GuestbookData ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The class the data for a guest record. There is one instance of the class for the admin
// application and one instance for the guest upload version.
// The class also has functions and holds data that only is used by one application like 
// for instance the random values for the confirmation email.
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

        this.m_musicians = "";

        this.m_year = "";

        this.m_month = "";

        this.m_day = "";

        // Uploaded image relative name (URL)
        this.m_image_file = '';

        // The registered absolute file name (URL)
        this.m_file_name = '';

        this.m_reg_number = '';

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

        // Callback function after execution of AppendBothXml
        this.m_append_both_callback = null;

        // The record number of JazzGuestsUploaded.xml for the appended new record
        this.m_uploaded_xml_new_record_number = -12345;

        // The record number of JazzGuests.xml for the appended new record
        this.m_xml_new_register_number = -12345;

        // The name of the JazzGuests.xml new image file
        this.m_xml_new_register_image_file_name = '';

        this.init();

    } // constructor

    // Debug output of the data 
    debugOutput()
    {
        debugGuestbookUpload('GuestbookData.debugOutput ***************** Start **********************************');

        debugGuestbookUpload('m_names=      ' + this.m_names);
        debugGuestbookUpload('m_email=      ' + this.m_email);
        debugGuestbookUpload('m_title=      ' + this.m_title);
        debugGuestbookUpload('m_text=       ' + this.m_text);
        debugGuestbookUpload('m_remark=     ' + this.m_remark);
        debugGuestbookUpload('m_band=       ' + this.m_band);
        debugGuestbookUpload('m_musicians=  ' + this.m_musicians);
        debugGuestbookUpload('m_year=       ' + this.m_year);
        debugGuestbookUpload('m_month=      ' + this.m_month);
        debugGuestbookUpload('m_day=        ' + this.m_day);
        debugGuestbookUpload('m_image_file= ' + this.m_image_file);
        debugGuestbookUpload('m_file_name=  ' + this.m_file_name);
        debugGuestbookUpload('m_reg_number= ' + this.m_reg_number);
 
        debugGuestbookUpload('GuestbookData.debugOutput ***************** End ************************************');

    } // debugOutput

    // Initialization
    init()
    {
        this.m_random = new UtilRandom();

        this.setRandomCode();

        this.setCurrentDate();

    } // init

     // Set callback function after execution of AppendBothXml
    setAppendBothXmlCallback(i_append_both_callback)
    {
        this.m_append_both_callback = i_append_both_callback;

    } // setAppendBothXmlCallback

    // Get callback function after execution of AppendBothXml
    getAppendBothXmlCallback()
    {
        return this.m_append_both_callback;
 
    } // getAppendBothXmlCallback      
    
    // Set he record number of JazzGuestsUploaded.xml for the appended new record
    setUploadedXmlNewRecordNumber(i_uploaded_xml_new_record_number)
    {
        this.m_uploaded_xml_new_record_number = i_uploaded_xml_new_record_number;

    } // setUploadedXmlNewRecordNumber
        
    // Get he record number of JazzGuestsUploaded.xml for the appended new record
    getUploadedXmlNewRecordNumber()
    {
        return this.m_uploaded_xml_new_record_number;

    } // getUploadedXmlNewRecordNumber

    // Set he register number of JazzGuests.xml for the appended new record
    setXmlNewRegisterNumber(i_xml_new_record_number)
    {
        this.m_xml_new_register_number = i_xml_new_record_number;

    } // setXmlNewRegisterNumber
        
    // Get the register number of JazzGuests.xml for the appended new record
    getXmlNewRegisterNumber()
    {
        return this.m_xml_new_register_number;

    } // getXmlNewRegisterNumber

    // Set the name of the JazzGuests.xml new image file
    setXmlNewRegisterImageFileName(i_xml_new_register_image_file_name)
    {
        this.m_xml_new_register_image_file_name = i_xml_new_register_image_file_name;

    } // setXmlNewRegisterImageFileName

    // Get the name of the JazzGuests.xml new image file
    getXmlNewRegisterImageFileName()
    {
        return this.m_xml_new_register_image_file_name;

    } // getXmlNewRegisterImageFileName

    // Set current data
    setCurrentDate()
    {
        var current_date = new Date();

        this.m_year = current_date.getFullYear().toString();

        this.m_month = (current_date.getMonth() + 1).toString();

        this.m_day = current_date.getDate().toString();

    } // setCurrentDate

    // Sets the image band name
    setBand(i_band)
    {
        this.m_band = i_band;

    } // setBand

    // Returns the image band name
    getBand()
    {
        return this.m_band;
        
    } // getBand

    // Sets the image musician names
    setMusicians(i_musicians)
    {
        this.m_musicians = i_musicians;

    } // setMusicians

    // Returns the image musician names
    getMusicians()
    {
        return this.m_musicians;
        
    } // getMusicians

    // Sets the image year
    setYear(i_year)
    {
        this.m_year = i_year;

    } // setYear

    // Returns the image year
    getYear()
    {
        return this.m_year;

    } // getYear

    // Sets the image month
    setMonth(i_month)
    {
        this.m_month = i_month;

    } // setMonth

    // Returns the image month
    getMonth()
    {
        return this.m_month;

    } // getMonth

    // Sets the image day
    setDay(i_day)
    {
        this.m_day = i_day;

    } // setDay

    // Returns the image day
    getDay()
    {
        return this.m_day;

    } // getDay

    // Sets the image file name (URL)
    setImageFile(i_image_file)
    {
        this.m_image_file = i_image_file;

    } // setImageFile

    // Returns the image file name (URL)
    getImageFile()
    {
        return this.m_image_file;
        
    } // getImageFile

    // Sets the registered absolute file name (URL)
    setFileName(i_file_name)
    {
        this.m_file_name = i_file_name;

    } // setFileName

    // Returns the registered relative file name (URL)
    getFileName()
    {
        return this.m_file_name;
        
    } // getFileName

    // Returns the registered absolute file name (URL)
    getAbsoluteFileName()
    {
        var file_name_without_path = UtilServer.getFileName(this.m_file_name);

        var ret_abs = GuestbookServer.getJazzGuestsDirUrl() + file_name_without_path;

        return ret_abs;

    } // getAbsoluteFileName

    // Sets the registration number
    setRegNumber(i_file_name)
    {
        this.m_reg_number = i_file_name;

    } // setRegNumber

    // Returns the registration number
    getRegNumber()
    {
        return this.m_reg_number;
        
    } // getRegNumber

    // Sets image names
    setImageNames(i_names)
    {
        this.m_names = i_names;

    } // setImageNames

    // Returns image names
    getImageNames()
    {
        return this.m_names;

    } // getImageNames

    // Sets the image email
    setImageEmail(i_email)
    {
        this.m_email = i_email;

    } // setImageEmail

    // Returns the image email
    getImageEmail()
    {
        return this.m_email;

    } // getImageEmail

    // Sets the image title
    setImageTitle(i_title)
    {
        this.m_title = i_title;

    } // setImageTitle

    // Returns the image title
    getImageTitle()
    {
        return this.m_title;
        
    } // getImageTitle

    // Sets the image text
    setImageText(i_text)
    {
        this.m_text = i_text;

    } // setImageText

    // Returns the image text
    getImageText()
    {
        return this.m_text;
        
    } // getImageText

    // Sets the image remark
    setImageRemark(i_remark)
    {
        this.m_remark = i_remark;

    } // setImageRemark

    // Returns the image remark
    getImageRemark()
    {
        return this.m_remark;

    } // getImageRemark

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

        if (this.inputCodeEqualToSpecialValue())
        {
            return true;
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

    // Special value for the memnbers of the jazzclub
    inputCodeEqualToSpecialValue()
    {
        if (g_guestbook_data.m_input_one   == '0' && g_guestbook_data.m_input_two  == '8' && 
            g_guestbook_data.m_input_three == '9' && g_guestbook_data.m_input_four == '6' && 
            g_guestbook_data.m_input_five  == '8')
        {
            return true;
        }
        else
        {
            return false;
        }
    } // inputCodeEqualToSpecialValue

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


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start GuestbookServer Class /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class with server file names and paths 
class GuestbookServer
{
    // Returns the absulute URL for the JAZZ live AARAU homepage
    static getHomepageUrl()
    {
        return 'https://jazzliveaarau.ch/';

    } // getHomepageUrl

    // Returns the absolute URL for the directory where the file JazzGuests.xml is saved
    static getXmlDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'XML/';
        
    } // getXmlDirUrl

    // Returns the absolute URL for the directory where the images are saved
    static getJazzGuestsDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'JazzGuests/';
        
    } // getJazzGuestsDirUrl

    // Returns the absolute URL for the directory where the file JazzGuestsUploaded.xml is saved
    static getUploadedXmlDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'JazzGuests/Uploaded/';
        
    } // getUploadedXmlDirUrl

    // Returns the name JazzGuests.xml
    static getJazzGuestsXmlFilename()
    {
        return 'JazzGuests.xml';
        
    } // getJazzGuestsXmlFilename

    // Returns the name JazzGuestsUploaded.xml
    static getJazzGuestsUploadedXmlFilename()
    {
        return 'JazzGuestsUploaded.xml';
        
    } // getJazzGuestsUploadedXmlFilename

    // Returns the absolute URL for the guestbook backup directory 
    static getBackupDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'JazzGuests/Backups/';
        
    } // getBackupDirUrl

    // Returns the absolute URL to JazzGuestsUploaded.xml
    static absoluteUrlJazzGuestsUploaded()
    {
        return GuestbookServer.getUploadedXmlDirUrl() + GuestbookServer.getJazzGuestsUploadedXmlFilename();

    } // absoluteUrlJazzGuestsUploaded

    // Returns the absolute URL to JazzGuestsUploaded.xml
    static absoluteUrlJazzGuestsUploadedBackup()
    {
        var time_stamp = UtilDate.getTimeStamp();
        
        return GuestbookServer.getBackupDirUrl() + GuestbookServer.getJazzGuestsUploadedXmlFilename() + '_' + time_stamp;

    } // absoluteUrlJazzGuestsUploadedBackup

    // Returns the absolute URL to JazzGuests.xml
    static absoluteUrlJazzGuests()
    {
        return GuestbookServer.getXmlDirUrl() + GuestbookServer.getJazzGuestsXmlFilename();

    } // absoluteUrlJazzGuests

    // Returns the absolute URL to JazzGuests.xml
    static absoluteUrlJazzGuestsBackup()
    {
        var time_stamp = UtilDate.getTimeStamp();
        
        return GuestbookServer.getBackupDirUrl() + GuestbookServer.getJazzGuestsXmlFilename() + '_' + time_stamp;

    } // absoluteUrlJazzGuestsBackup

    // Returns the input file name with path to directory Backups and with a time stamp
    static absoluteBackupTimeStamp(i_file_name)
    {
        var file_name = UtilServer.getFileName(i_file_name);

        var file_backup_url = GuestbookServer.getBackupDirUrl() + file_name + '_' + UtilDate.getTimeStamp();

        return file_backup_url;

    } // absoluteBackupTimeStamp

    static getPrettyPrintContent(i_xml_object)
    {
        var pretty_print = new PrettyPrintXml(i_xml_object.getXmlObject());

        var xml_content_str = pretty_print.xmlToWinFormattedString();

        return xml_content_str;

    } // getPrettyPrintContent

} // GuestbookServer


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End GuestbookServer Class ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Local Storage /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class with functions to set and get guestbook data from local storage.
// 

class GuestStorage
{
    //////////////////////////////////////////////////
    /////////// Local Storage Utility Functions //////
    //////////////////////////////////////////////////

    // Returns an instance of GuestbookData with local storage data
    static getGuestbookData()
    {
        if (!GuestStorage.allDataIsSet())
        {
            return null;
        }

        var guestbook_data = new GuestbookData;

        guestbook_data.m_names = GuestStorage.getNames();

        guestbook_data.m_email = GuestStorage.getEmail();

        guestbook_data.m_title = GuestStorage.getTitle();

        guestbook_data.m_text = GuestStorage.getText();

        guestbook_data.m_remark = GuestStorage.getRemark();

        guestbook_data.m_band = GuestStorage.getBand();

        guestbook_data.m_musicians = GuestStorage.getMusicians();

        guestbook_data.m_year = GuestStorage.getYear();

        guestbook_data.m_month = GuestStorage.getMonth();

        guestbook_data.m_day = GuestStorage.getDay();

        guestbook_data.m_image_file = GuestStorage.getImageFile();

        guestbook_data.m_file_name = GuestStorage.getFileName();

        guestbook_data.m_reg_number = GuestStorage.getRegNumber();

        return guestbook_data;

    } // getGuestbookData

    // Add local storage data to an instance of GuestbookData for edit 
    // Flag is also set that the data is from the local storage 
    static addGuestbookDataForEdit(i_guestbook_data)
    {
        if (!GuestStorage.allDataIsSet())
        {
            return null;
        }

        var guestbook_data = i_guestbook_data;

        guestbook_data.m_names = GuestStorage.getNames();

        guestbook_data.m_email = GuestStorage.getEmail();

        guestbook_data.m_title = GuestStorage.getTitle();

        guestbook_data.m_text = GuestStorage.getText();

        guestbook_data.m_remark = GuestStorage.getRemark();

        guestbook_data.m_band = GuestStorage.getBand();

        guestbook_data.m_musicians = GuestStorage.getMusicians();

        guestbook_data.m_year = GuestStorage.getYear();

        guestbook_data.m_month = GuestStorage.getMonth();

        guestbook_data.m_day = GuestStorage.getDay();

        guestbook_data.m_image_file = GuestStorage.getImageFile();

        guestbook_data.m_file_name = GuestStorage.getFileName();

        guestbook_data.m_reg_number = GuestStorage.getRegNumber();

        return guestbook_data;

    } // addGuestbookDataForEdit

    // Set local storage data with the input instance of GuestbookData
    static setGuestbookData(i_guestbook_data)
    {
        if (i_guestbook_data == null)
        {
            alert("GuestStorage.setGuestbookData Input GuestbookData is null");

            return;
        }

        GuestStorage.setNames(i_guestbook_data.m_names);

        GuestStorage.setEmail(i_guestbook_data.m_email);

        GuestStorage.setTitle(i_guestbook_data.m_title);

        GuestStorage.setText(i_guestbook_data.m_text);

        GuestStorage.setRemark(i_guestbook_data.m_remark);

        GuestStorage.setBand(i_guestbook_data.m_band);

        GuestStorage.setMusicians(i_guestbook_data.m_musicians);

        GuestStorage.setYear(i_guestbook_data.m_year);

        GuestStorage.setMonth(i_guestbook_data.m_month);

        GuestStorage.setDay(i_guestbook_data.m_day);

        GuestStorage.setImageFile(i_guestbook_data.m_image_file);

        GuestStorage.setFileName(i_guestbook_data.m_file_name);

        GuestStorage.setRegNumber(i_guestbook_data.m_reg_number);

    } // setGuestbookData

    // Initialize local storage data 
    // This function is supposed to be called after user deletion of an uploaded record
    // Please not that names and email NOT shall be initialized
    static initGuestbookData()
    {
        // Do NOT init GuestStorage.setNames('');

        // Do NOT init GuestStorage.setEmail('');

        GuestStorage.setTitle('');

        GuestStorage.setText('');

        GuestStorage.setRemark('');

        GuestStorage.setBand('');

        GuestStorage.setMusicians('');

        GuestStorage.setYear('');

        GuestStorage.setMonth('');

        GuestStorage.setDay('');

        GuestStorage.setImageFile('');

        GuestStorage.setFileName('');

        GuestStorage.getRegNumber('');

    } // initGuestbookData

    // Returns true if all storage data is set
    static allDataIsSet()
    {
        var ret_b_all = true;

        if (GuestStorage.getNames() == null || GuestStorage.getNames().length == 0)
        {
            console.log("GuestStorage.getNames() is null or string is empty");

            ret_b_all = false;
        }

        if (GuestStorage.getEmail() == null || GuestStorage.getEmail().length == 0)
        {
            console.log("GuestStorage.getEmail() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getTitle() == null || GuestStorage.getTitle().length == 0)
        {
            console.log("GuestStorage.getTitle() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getText() == null)
        {
            console.log("GuestStorage.getText() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getRemark() == null)
        {
            console.log("GuestStorage.getRemark() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getBand() == null)
        {
            console.log("GuestStorage.getBand() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getMusicians() == null)
        {
            console.log("GuestStorage.getMusicians() is null");
            
            ret_b_all = false;
        }

        if (GuestStorage.getYear() == null || GuestStorage.getYear().length == 0)
        {
            console.log("GuestStorage.getYear() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getMonth() == null || GuestStorage.getMonth().length == 0)
        {
            console.log("GuestStorage.getMonth() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getDay() == null || GuestStorage.getDay().length == 0)
        {
            console.log("GuestStorage.getDay() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getImageFile() == null || GuestStorage.getImageFile().length == 0)
        {
            console.log("GuestStorage.getImageFile() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getFileName() == null || GuestStorage.getFileName().length == 0)
        {
            console.log("GuestStorage.getFileName() is null or string is empty");
            
            ret_b_all = false;
        }

        if (GuestStorage.getRegNumber() == null || GuestStorage.getRegNumber().length == 0)
        {
            console.log("GuestStorage.getRegNumber() is null or string is empty");
            
            ret_b_all = false;
        }
    

        return ret_b_all;

    } // allDataIsSet

    //////////////////////////////////////////////////
    /////////// Local Storage Get Functions //////////
    //////////////////////////////////////////////////

    static getNames()
    {
        return localStorage.getItem(GuestStorage.getKeyNames());

    } // getNames

    static getEmail()
    {
        return localStorage.getItem(GuestStorage.getKeyEmail());

    } // getEmail

    static getTitle(i_title)
    {
        return localStorage.getItem(GuestStorage.getKeyTitle());

    } // getTitle

    static getText()
    {
        return localStorage.getItem(GuestStorage.getKeyText());

    } // getText

    static getRemark()
    {
        return localStorage.getItem(GuestStorage.getKeyRemark());

    } // getRemark

    static getBand()
    {
        return localStorage.getItem(GuestStorage.getKeyBand());

    } // getBand

    static getMusicians()
    {
        return localStorage.getItem(GuestStorage.getKeyMusicians());

    } // getMusicians

    static getYear()
    {
        return localStorage.getItem(GuestStorage.getKeyYear());

    } // getYear

    static getMonth()
    {
        return localStorage.getItem(GuestStorage.getKeyMonth());

    } // getMonth

    static getDay()
    {
        return localStorage.getItem(GuestStorage.getKeyDay());

    } // getDay

    static getImageFile()
    {
        return localStorage.getItem(GuestStorage.getKeyImageFile());

    } // getImageFile

    static getFileName()
    {
        return localStorage.getItem(GuestStorage.getKeyFileName());

    } // getFileName

    static getRegNumber()
    {
        return localStorage.getItem(GuestStorage.getKeyRegNumber());

    } // getRegNumber

    //////////////////////////////////////////////////
    /////////// Local Storage Set Functions //////////
    //////////////////////////////////////////////////

    static setNames(i_names)
    {
        localStorage.setItem(GuestStorage.getKeyNames(), i_names);

    } // setNames

    static setEmail(i_email)
    {
        localStorage.setItem(GuestStorage.getKeyEmail(), i_email);

    } // setEmail

    static setTitle(i_title)
    {
        localStorage.setItem(GuestStorage.getKeyTitle(), i_title);

    } // setTitle

    static setText(i_text)
    {
        localStorage.setItem(GuestStorage.getKeyText(), i_text);

    } // setText

    static setRemark(i_remark)
    {
        localStorage.setItem(GuestStorage.getKeyRemark(), i_remark);

    } // setRemark

    static setBand(i_band)
    {
        localStorage.setItem(GuestStorage.getKeyBand(), i_band);

    } // setBand

    static setMusicians(i_musicians)
    {
        localStorage.setItem(GuestStorage.getKeyMusicians(), i_musicians);

    } // setMusicians

    static setYear(i_year)
    {
        localStorage.setItem(GuestStorage.getKeyYear(), i_year);

    } // setYear

    static setMonth(i_month)
    {
        localStorage.setItem(GuestStorage.getKeyMonth(), i_month);

    } // setMonth

    static setDay(i_day)
    {
        localStorage.setItem(GuestStorage.getKeyDay(), i_day);

    } // setDay

    static setImageFile(i_image_file)
    {
        localStorage.setItem(GuestStorage.getKeyImageFile(), i_image_file);

    } // setImageFile

    static setFileName(i_file_name)
    {
        localStorage.setItem(GuestStorage.getKeyFileName(), i_file_name);

    } // setFileName

    static setRegNumber(i_reg_number)
    {
        localStorage.setItem(GuestStorage.getKeyRegNumber(), i_reg_number);

    } // setRegNumber

    //////////////////////////////////////////////////
    /////////// Local Storage Keys ///////////////////
    //////////////////////////////////////////////////

    static getKeyNames()
    {
        return "guestbook_names_str";

    } // getKeyNames

    static getKeyEmail()
    {
        return "guestbook_email_str";
        
    } // getKeyEmail

    static getKeyTitle()
    {
        return "guestbook_title_str";
        
    } // getKeyTitle

    static getKeyText()
    {
        return "guestbook_text_str";
        
    } // getKeyText

    static getKeyRemark()
    {
        return "guestbook_remark_str";
        
    } // getKeyRemark

    static getKeyBand()
    {
        return "guestbook_band_str";
        
    } // getKeyBand

    static getKeyMusicians()
    {
        return "guestbook_musicians_str";
        
    } // getKeyMusicians

    static getKeyYear()
    {
        return "guestbook_year_str";
        
    } // getKeyYear

    static getKeyMonth()
    {
        return "guestbook_month_str";
        
    } // getKeyMonth

    static getKeyDay()
    {
        return "guestbook_day_str";
        
    } // getKeyDay

    static getKeyImageFile()
    {
        return "guestbook_image_file_str";
        
    } // getKeyImageFile

    static getKeyFileName()
    {
        return "guestbook_file_name_str";
        
    } // getKeyFileName

    static getKeyRegNumber()
    {
        return "guestbook_reg_number_str";
        
    } // getKeyRegNumber

} // GuestStorage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Local Storage /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
