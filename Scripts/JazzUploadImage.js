// File: JazzUploadImage.js
// Date: 2023-12-27
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Functions for the upload of an image

// https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example
// https://www.php.net/manual/en/features.file-upload.post-method.php
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
// https://web.dev/articles/fetch-api-error-handling?hl=de

async function uploadImageToServer() 
{
    // <input id="id_fileupload" type="file" name="fileupload" /> 

    var form_data = new FormData();           
    
    form_data.append("file_name", id_fileupload.files[0]);

    console.log(id_fileupload.files[0]);

    if (!UtilServer.execApplicationOnServer())
    {
        alert("uploadImageToServer Images cannot be uploaded with PHP functions. Please upload and execute the application on the server");

        return;
    }

    var reponse = null;

    try
    {
        reponse = await fetch('Php/UploadImageToServer.php', 
        {
        method: "POST", 
        body: form_data
        }
      );    
    }
    catch (error) 
    {
        console.log(error);

        alert('Failure uploading file: ' + error);

        return;
    }

    if (reponse.ok)
    {
        alert('The file has been uploaded successfully.');
    }
    else
    {
        alert('Failure uploading file (respons).');
    }
 

} // uploadFile