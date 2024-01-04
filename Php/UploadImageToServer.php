
<?php

// File: UploadImageToServer.php
// Date: 2024-01-04
// Author: Gunnar Lidén

// References
// https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example
// https://www.php.net/manual/en/features.file-upload.post-method.php
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/append


$debug_file = fopen("Debug.txt", "w") or die("Unable to open file!");

fwrite($debug_file, "Debug of UploadImageToServer.php \n");


/* Get the name of the uploaded file */
$file_name = $_FILES['file_input']['name'];
// The original name of the file on the client machine.

fwrite($debug_file, "file_name= " . $file_name . "\n");

// Directory where the file will be saved
$target_dir = "../../JazzGuests/Uploaded/";
//$target_dir = "./TempImages/";

fwrite($debug_file, "target_dir= " . $target_dir . "\n");

/* Choose where to save the uploaded file */
$location = $target_dir.$file_name;

$file_name_temp_server = $_FILES['file_input']['tmp_name'];
// The temporary filename of the file in which the uploaded file was stored on the server.

fwrite($debug_file, "file_name_temp_server= " . $file_name_temp_server . "\n");

/* Save the uploaded file to the local filesystem */
if (move_uploaded_file($file_name_temp_server, $location) ) 
{ 
  echo 'Success'; 
  fwrite($debug_file, "move_uploaded_file returned true \n");
} 
else 
{ 
  echo 'Failure'; 
  fwrite($debug_file, "move_uploaded_file returned false \n");
}

fclose($debug_file);

?>


