// File: ServerUtils.js
// Date: 2023-12-11
// Author: Gunnar Lidén

// File content
// =============
//
// Utility functions for server functions
//
// TODO Should become a class (or classes), i.e. create a project WwwServer
//      Find a solution how the PHP files shall be handled is a problem ...
//      These functions are used by Guestbook, Flyer and Tasks

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load XML Function  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Load the XML file. The XML object is returned as argument for the call back function
// https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
function jazzUtilLoadXml(i_path_file_name_xml, i_callback_function_name)
{
  // Request server object for the XML file
  var jazz_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  jazz_xmlhttp.onreadystatechange = function() 
  {
    if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
	  {
        var object_xml = jazz_xmlhttp.responseXML;
        
        i_callback_function_name(object_xml);
    }
    else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
	  {
      alert("Error 404: File " + i_path_file_name_xml + " not found" );
    }	
  };
  
  // Open the file
  jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
  
  jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  jazz_xmlhttp.send();	

} // jazzUtilLoadXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Load XML Function  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Basic Save File Function  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Function copied from FlyerSave.js

// Save a file with the JQuery function "post"
// Please refer to SaveFileOnServer.php for a detailed description of "post"
// Input parameter i_file_name is the server file name
// Input parameter i_content_string is the content of the file
// The function returns false for failure
function saveFileWithJQueryPostFunction(i_file_name, i_content_string)
{
  var file_name = '../' + i_file_name;

    $.post
      ('Php/SaveFileOnServer.php',
        {
          file_content: i_content_string,
          file_name: file_name
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of SaveFileOnServer.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // saveFileWithJQueryPostFunction


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Basic Save File Function  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Basic Backup File Function  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Backup a file with the JQuery function "post"
// Please refer to BackupFileOnServer.php for a detailed description of "post"
// Input parameter i_url_file_to_copy is the url for server file name that shall be copied
// Input parameter i_url_file_backup is the url for server file name for the backup copy
// The input relative URLs assume that the php is in the top directory. Since it is
// in the subdirectory Php the URLs are modified
// The function returns false for failure
function backupFileWithJQueryPostFunction(i_url_file_to_copy, i_url_file_backup)
{
    if (!execApplicationOnServer())
    {
        alert("backupFileWithJQueryPostFunction BackupFileOnServer.php cannot be executed on the local (live) server");

        return false;
    }

    var url_file_to_copy = '../' + i_url_file_to_copy;

    var url_file_backup = '../' + i_url_file_backup;

    $.post
      ('Php/BackupFileOnServer.php',
        {
          file_to_copy: url_file_to_copy,
          file_backup: url_file_backup
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of BackupFileOnServer.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // backupFileWithJQueryPostFunction

// Backup a file an then delete it with the JQuery function "post"
// Please refer to BackupFileDelete.php for a detailed description of "post"
// Input parameter i_url_file_copy_delete is the url for server file name that shall be copied
// Input parameter i_url_file_backup is the url for server file name for the backup copy
// The input relative URLs assume that the php is in the top directory. Since it is
// in the subdirectory Php the URLs are modified
// The function returns false for failure
function backupFileAndDeleteWithJQueryPostFunction(i_url_file_copy_delete, i_url_file_backup)
{
    if (!execApplicationOnServer())
    {
        alert("backupFileAndDeleteWithJQueryPostFunction BackupFileDelete.php cannot be executed on the local (live) server");

        return false;
    }

    var url_file_copy_delete = '../' + i_url_file_copy_delete;

    var url_file_backup = '../' + i_url_file_backup;

    $.post
      ('Php/BackupFileDelete.php',
        {
          file_to_copy_delete: url_file_copy_delete,
          file_backup: url_file_backup
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                 // alert(data_save);
            }
            else
            {
				alert("Execution of BackupFileDelete.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // backupFileAndDeleteWithJQueryPostFunction

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Basic Backup File Function  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
