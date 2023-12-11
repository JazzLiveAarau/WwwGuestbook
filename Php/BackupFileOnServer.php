
<?php

// Backups a file on the server
// ----------------------------
// Input data is the file name and the full content of the file
// Please note that escape characters like \n not is allowed in the string
//
// This function is called from another HTML (or PHP) page this way:
// $.post("BackupFileOnServer.php", {file_to_copy: url_to_copy_str, file_backup: url_backup_str},function(data,status){alert(data);});
//
// $.post():                 Method requesting data from the server using an HTTP POST request. 
//                           Hier actually only requesting an execution, i.e. create a file 
// "BackupFileOnServer.php": URL parameter specifies the URL you wish to request
//                           Please note that the whole file will be executed. Not a normal function call
// file_to_copy:             Input PHP parameter for the execution (url_to_copy_str is the JavaScript parameter) 
// file_backup:              Input PHP parameter for the execution (url_backup_str is the JavaScript parameter) 
// function:                 The callback function, i.e. defining what to do with the PHP result
//                           In this case nothing needs to be done in the calling JavaScript function
// data:                     The result of the execution. In this case only a message.
//                           The data is a string that is created from calls of PHP function echo
// status:                   Status from the execution. The value is success for a succesfull execution
//
// The function $.post is defined in a jQuery library that has to be included on calling web page
// The library may be downloaded, but also a CDN (Content Delivery Network) library can be referenced with
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// The above things are described on these pages:
// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// https://www.w3schools.com/jquery/jquery_get_started.asp
// https://www.youtube.com/watch?v=jVAaxkbmCts
// https://www.php.net/manual/de/function.copy.php


// Passed data from the calling function
$file_to_copy = $_POST['file_to_copy'];
$file_backup = $_POST['file_backup'];

echo "BackupFileOnServer.php Enter\n";

echo "file_to_copy= " . $file_to_copy . "\n";

echo "file_backup=  $file_backup \n";

if (!copy($file_to_copy, $file_backup)) 
{
    echo "Copy of file $file_to_copy failed ...\n";
}
else
{
    echo "A backup file was created. The name of the file is \n";
    echo  $file_backup;
}
 
?>
 
