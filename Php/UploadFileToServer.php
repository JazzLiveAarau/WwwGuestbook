<html>
    <body>
        <?php

        // File: UploadFileToServer.php
        // Date: 2021-05-01
        // Author: Gunnar Lidén

        // Uploads a file to the server
        // ----------------------------
        //
        // This function is called from another HTML (or PHP) page when the user clicks 
        // on the submit for a <form> element. 

        // <form action="UploadFileToServer.php" method="post" enctype="multipart/form-data">
        // <input type="file" id="id_upload_pdf" name="name_file_to_upload" onchange="eventXyz()">
        // <input type="submit" value="Upload" name="name_submit"></form>
        //
        // The above things are described on these pages:
        // https://www.w3schools.com/php/php_file_upload.asp
        // https://www.w3schools.com/tags/att_input_type_file.asp
        // https://www.geeksforgeeks.org/php-_files-array-http-file-upload-variables/ ($_FILES)
        // https://www.w3schools.com/php/func_filesystem_basename.asp (basename)
        // https://www.tutorialrepublic.com/faq/how-to-make-a-redirect-in-php.php (header)

        // Directory where the file will be saved
        $target_dir = "../Documents/";

        echo "UploadFileToServer target_dir= " . $target_dir . "<br>";

        $file_name = basename($_FILES["name_file_to_upload"]["name"]);

        echo "UploadFileToServer file_name= " . $file_name . "<br>";

        // Path + file name. ["name"] is an attribute for $_FILES 
        $target_file = $target_dir . $file_name;

        echo "UploadFileToServer target_file= " . $target_file . "<br>";

        // Execution status flag
        $b_upload_ok = 1;

        $status_msg = "";

        $file_type = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        echo "UploadFileToServer file_type= " . $file_type . "<br>";

        // Allow certain file formats
        if($file_type != "doc" && $file_type != "docx" && $file_type != "pdf") 
        {
            $status_msg = $status_msg . "UploadFileToServer Sorry, only doc, docx and pdf files are allowed.";

            echo "UploadFileToServer Sorry, only doc, docx and pdf files are allowed.<br>";
            
            $b_upload_ok = 0;
        }


        if ($b_upload_ok == 0) 
        {
            echo "UploadFileToServer Sorry, your file was not uploaded.<br>";

            $status_msg = $status_msg . "UploadFileToServer Sorry, your file was not uploaded.";
        } 
        else 
        {
            echo "Datei ". $file_name . " wird (mit Funktion move_uploaded_file) zum Ordner ". $target_dir . "hochgeladen<br>";

            if (move_uploaded_file($_FILES["name_file_to_upload"]["tmp_name"], $target_file)) 
            {
                echo "Datei ". $file_name . " ist zum Server hochgeladen (Ordner ". $target_dir . ")<br>";

                $status_msg = $status_msg . "Datei ". $file_name . " ist zum Server hochgeladen (Ordner ". $target_dir . ")";
            } 
            else 
            {
                echo "UploadFileToServer Sorry, there was an error uploading your file. Function move_uploaded_file failed.<br>";

                $status_msg = $status_msg . "UploadFileToServer Sorry, there was an error uploading your file.";
            }
        }

        // echo "<script>alert('$status_msg');</script>"; 


        // header("Location: http://www.jazzliveaarau.ch/GunnarTasks/JazzTasks.htm");


        ?>

        <p>En paragraf</p>
        
    </body>
</html>
 
