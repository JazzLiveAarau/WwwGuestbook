// File: JazzUploadImage.js
// Date: 2024-01-04
// Author: Gunnar Lidén

// Inhalt
// =============
//
// 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Upload Image //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Class for the upload of an image to the server 
class JazzUploadImage
{
    // Creates the instance of the class
    // i_id_my_fctn_str: 
    // Application unique string for the calling function. 
    // Used to construct identities and class names and handling of event functions
    // i_id_div_container:
    // Place holder for the upload controls
    constructor(i_id_my_fctn_str, i_id_div_container) 
    {
        // Member variables
        // ================

        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the upload controls
        this.m_id_div_container = i_id_div_container;

        // The container element object
        this.m_el_div_container = null;

    } // constructor

} // JazzUploadImage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload Image ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User selected files with the input element, type file
function userSelectedFiles()
{
    var max_size_mb = 1.5;

    var image_file = getElementInputFile().files[0];

    if (!fileIsOfTypeImage(image_file))
    {
        alert("userSelectedFiles The file is not an image.");

        return;
    }
    else
    {
        console.log("userSelectedFiles The input file is an image");
    }

    var original_size = image_file.size/1000000.0;

    console.log("Original image size is " + original_size.toString());

    if (original_size < max_size_mb)
    {
        console.log("The original image is not changed");

        uploadImageToServer(image_file);

        return;
    }

    var compressed_file = getCompressedImageFile(max_size_mb);
 
    alert("userSelectedFiles TODO ");


} // userSelectedFiles

// Get a compressed image if bigger as the input maximum size in Megabyte
async function getCompressedImageFile(i_max_size_mb)
{
    var image_file = getElementInputFile().files[0];

    if (!fileIsOfTypeImage(image_file))
    {
        alert("getCompressedImageFile The file is not an image.");

        return null;
    }
    else
    {
        console.log("getCompressedImageFile The input file is an image");
    }

    var original_size = image_file.size/1000000.0;

    console.log("Original image size is " + original_size.toString());

    if (original_size < i_max_size_mb)
    {
        console.log("The original image is not changed");

        return image_file;
    }

    var scale_factor = i_max_size_mb/original_size;
    
    console.log("Scaling factor " + scale_factor.toString());

    const compressed_file = await compressImage(image_file, {
        quality: scale_factor,
        type: 'image/jpeg',
    });

    if (null == compressed_file)
    {
        alert("getCompressedImageFile Compressed image file is null");
        
        return null;
    }

    return compressed_file;

} // getCompressedImageFile

// Returns true if the input file is of type image
// Type of image is for instance 'image/jpeg'
function fileIsOfTypeImage(i_file)
{
    var file_type_str = i_file.type;

    var index_image = file_type_str.indexOf('image');

    if (index_image >= 0)
    {
        return true;
    }
    else
    {
        return false;
    }

} // fileIsOfTypeImage

// https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example
// https://www.php.net/manual/en/features.file-upload.post-method.php
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
// https://web.dev/articles/fetch-api-error-handling?hl=de

async function uploadImageToServer(i_image_file) 
{
    // This is the statement in GuestbookAdmin.htm defining the input of type file object
    // <input id="id_fileupload" type="file" name="fileupload" /> 

    // When the user has selected files data about them can be retrieved from a FileList object: An array of File objects
    // The HTML object <input> of type file has an attribute files that is this array.
    // Very strange is that it is possible to use the identity string of the <input> object to retrieve the array
    // For this application there is only one element (file) in the array. Below is the object used to retrieve the FileList


    // console.log("uploadImageToServer Selected files FileList= ");
    // console.log(getElementInputFile().files);

    if (null == i_image_file)
    {
        alert("uploadImageToServer Input image file is null");

        return;
    }

    var form_data = new FormData(); 
    
    form_data.append("file_input", i_image_file);

    console.log("uploadImageToServer Sent to PHP is FormData where the following data has been appended ");

    console.log(i_image_file);

    if (!UtilServer.execApplicationOnServer())
    {
        alert("uploadImageToServer Images cannot be uploaded with PHP functions. Please upload and execute the application on the server");

        return;
    }

    var response = null;

    try
    {
        response = await fetch('Php/UploadImageToServer.php', 
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

    console.log("uploadImageToServer response=");
    console.log(response);

    if (response.ok)
    {
        alert('The file has been uploaded successfully.');
    }
    else
    {
        alert('Failure uploading file (respons).');
    }
 

} // uploadFile

// Send image to the server
function sendImageToServer()
{
    var form_data = new FormData();           
    
    form_data.append("file_name", id_fileupload.files[0]);

    console.log(id_fileupload.files[0]);

    if (!UtilServer.execApplicationOnServer())
    {
        alert("uploadImageToServer Images cannot be uploaded with PHP functions. Please upload and execute the application on the server");

        return;
    }


} // sendImageToServer

const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], file.name, {
        type: blob.type,
    });
};

/*

https://pqina.nl/blog/compress-image-before-upload/#saving-the-compressed-image-back-to-the-file-input
<input type="file" multiple class="my-image-field" />

<script>
    const compressImage = async (file, { quality = 1, type = file.type }) => {
        // Get as image data
        const imageBitmap = await createImageBitmap(file);

        // Draw to canvas
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        // Turn into Blob
        const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, type, quality)
        );

        // Turn Blob into File
        return new File([blob], file.name, {
            type: blob.type,
        });
    };

    // Get the selected file from the file input
    const input = document.querySelector('.my-image-field');
    input.addEventListener('change', async (e) => {
        // Get the files
        const { files } = e.target;

        // No files selected
        if (!files.length) return;

        // We'll store the files in this data transfer object
        const dataTransfer = new DataTransfer();

        // For every file in the files list
        for (const file of files) {
            // We don't have to compress files that aren't images
            if (!file.type.startsWith('image')) {
                // Ignore this file, but do add it to our result
                dataTransfer.items.add(file);
                continue;
            }

            // We compress the file by 50%
            const compressedFile = await compressImage(file, {
                quality: 0.5,
                type: 'image/jpeg',
            });

            // Save back the compressed file instead of the original file
            dataTransfer.items.add(compressedFile);
        }

        // Set value of the file input to our new files list
        e.target.files = dataTransfer.files;
    });
</script>

*/