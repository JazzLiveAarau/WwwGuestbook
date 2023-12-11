

<?php

// Saves a file on the server
// ---------------------------
// Input data is the file name and the full content of the file
// Please note that escape characters like \n not is allowed in the string
//
// This function is called from another HTML (or PHP) page this way:
// $.post("SaveFileOnServer.php", {file_content: content_string, file_name: file_name_str},function(data,status){alert(data);});
//
// $.post():               Method requesting data from the server using an HTTP POST request. 
//                         Hier actually only requesting an execution, i.e. create a file 
// "SaveFileOnServer.php": URL parameter specifies the URL you wish to request
//                         Please note that the whole file will be executed. Not a normal function call
// file_content:           Input PHP parameter for the execution (content_string is the JavaScript parameter) 
// file_name:              Input PHP parameter for the execution (file_name_str is the JavaScript parameter) 
// function:               The callback function, i.e. defining what to do with the PHP result
//                         In this case nothing needs to be done in the calling JavaScript function
// data:                   The result of the execution. In this case only a message.
//                         The data is a string that is created from calls of PHP function echo
// status:                 Status from the execution. The value is success for a succesfull execution
//
// The function $.post is defined in a jQuery library that has to be included on calling web page
// The library may be downloaded, but also a CDN (Content Delivery Network) library can be referenced with
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// The above things are described on these pages:
// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// https://www.w3schools.com/jquery/jquery_get_started.asp
// https://www.youtube.com/watch?v=jVAaxkbmCts


// Passed data from the calling function
$file_content = $_POST['file_content'];
$file_name = $_POST['file_name'];

// Open file. If the file already exists it will be overwritten
$file_object = fopen($file_name, "w") or die("Unable to open file!");

// Write the input string with the file content to the file.
fwrite($file_object, $file_content); 

// Close the file
fclose($file_object); 

echo "Datei mit Eingabe-Inhalt ist auf dem JAZZ live AARAU Server, in der Datei ";
echo $file_name;
echo ", gespeichert";
 
?>
 
