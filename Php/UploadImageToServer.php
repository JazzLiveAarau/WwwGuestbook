
<?php

// File: UploadImageToServer.php
// Date: 2023-12-21
// Author: Gunnar Lidén

// References
// https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example
// https://www.php.net/manual/en/features.file-upload.post-method.php
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/append


/* Get the name of the uploaded file */
$filename_original = $_FILES['file_name']['name'];
// The original name of the file on the client machine.

// Directory where the file will be saved
$target_dir = "../../JazzGuests/Uploaded/";

/* Choose where to save the uploaded file */
$location = $target_dir.$filename_original;

$filename_temp_server = $_FILES['file_name']['tmp_name'];
// The temporary filename of the file in which the uploaded file was stored on the server.


/* Save the uploaded file to the local filesystem */
if ( move_uploaded_file($filename_temp_server, $location) ) 
{ 
  echo 'Success'; 
} 
else 
{ 
  echo 'Failure'; 
}

?>


