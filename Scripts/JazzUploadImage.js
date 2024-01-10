// File: JazzUploadImage.js
// Date: 2024-01-09
// Author: Gunnar Lidén

// Content
// ========
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
    // Place holder for all the the upload controls
    // i_default_img:
    // The default image for the image container (created by the class)
    constructor(i_id_my_fctn_str, i_id_div_container, i_default_img) 
    {
        // Member variables
        // ================

        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the upload controls
        this.m_id_div_container = i_id_div_container;

         // The default image for the image container
        this.m_default_img = i_default_img;

        // The container element object
        this.m_el_div_container = null;

        // Caption for the button (actually label) for the selection of a picture
        this.m_caption_select_img = 'Bild wählen';

        // Caption for the back button
        this.m_caption_button_back = 'Zurück';

        // Caption for the forward button
        this.m_caption_button_forward = 'Weiter';

        this.m_input_label_width = '180px';

        this.m_input_button_width = '110px';

        // Initialization
        this.init();

    } // constructor

    // Initialization 
    init()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_el_div_container)
        {
            alert("JazzUploadImage.init  Error: Container element is null for id= " + this.m_id_div_container);

            return;
        }

        var html_content = this.getHtml();

        this.m_el_div_container.innerHTML = html_content;

    } // init

    // Get the HTML string defining the content of i_id_div_container
    getHtml()
    {
        var ret_html = '';

        const tabs_two = 2;

        var id_div_input = this.getIdDivFileInput();

        var input_styles_str = 'overflow: hidden; clear: both';

        var div_input_inner_html = this.getInputHtml();

        var div_input_html = UtilHtml.getDivElementLeafStyleString(id_div_input, input_styles_str, div_input_inner_html, tabs_two);

        var id_div_label_name = this.getIdDivFileName();

        var file_name_styles_str = 'border: solid 1px green; margin-top: 10px; clear: both;';

        var div_file_name_inner_html = 'Datei-Name des ausgewählten Bildes'; // TODO Remove text

        var div_file_name_html = UtilHtml.getDivElementLeafStyleString(id_div_label_name, file_name_styles_str, div_file_name_inner_html, tabs_two);

        var id_div_image_container = this.getIdDivImageContainer();

        var image_container_styles_str = 'border: solid 1px blue; margin-top: 10px; clear: both;';

        var id_upload_image = this.getIdUploadImage();

        var image_styles_str = '';

        var image_width = '60%';

        var event_fctn = '';

        var file_name_icon = this.m_default_img;

        var image_title = '';

        var upload_image_html = UtilHtml.getDivElementIconStyleString(id_upload_image, image_styles_str, file_name_icon, image_width, event_fctn, image_title, tabs_two+1);

        var div_image_container_html = UtilHtml.getDivElementLeafStyleString(id_div_image_container, image_container_styles_str, upload_image_html, tabs_two);

        ret_html = ret_html + div_input_html;

        ret_html = ret_html + div_file_name_html;

        ret_html = ret_html + div_image_container_html;

        return ret_html;

    } // getHtml

    // Get the HTML string as defined below
    // <input id="id_fileupload" type="file" accept="image/png, image/jpeg, image/jpg" /> 
    // <label for="id_fileupload">Bild wählen</label> 
    getInputHtml()
    {
        var ret_input_html = '';

        var input_style_str = '';

        input_style_str = input_style_str + ' style= "';

        input_style_str = input_style_str + 'width: 0; ';
        input_style_str = input_style_str + 'height: 0; ';
        input_style_str = input_style_str + 'z-index: -1; ';
        input_style_str = input_style_str + 'position: absolute; ';
        input_style_str = input_style_str + 'overflow: hidden; ';
        input_style_str = input_style_str + 'opacity: 0 ';

        input_style_str = input_style_str + '" ';

        var label_style_str = '';

        label_style_str =  label_style_str + ' style= "';
     
        label_style_str =  label_style_str + 'width: ' + this.m_input_label_width + '; '; 
        label_style_str =  label_style_str + 'border: solid 3px black; ';
        label_style_str =  label_style_str + 'padding: 10px; ';
        label_style_str =  label_style_str + 'font-size: 18px; ';
        label_style_str =  label_style_str + 'font-weight: bold; ';
        label_style_str =  label_style_str + 'margin-left: 90px;';
        label_style_str =  label_style_str + 'margin-top: 10px;';
        label_style_str =  label_style_str + 'margin-bottom: 10px;';
        label_style_str =  label_style_str + 'background-color: rgb(229, 225, 218);';
        label_style_str =  label_style_str + 'cursor: pointer ';

        label_style_str =  label_style_str + '" ';

        var id_input_str = this.getIdFileInput();

        ret_input_html = ret_input_html + '<input id="' + id_input_str + '" type="file" accept="image/png, image/jpeg, image/jpg"';

        ret_input_html = ret_input_html + input_style_str + '/>';

        ret_input_html = ret_input_html + '<label for="' + id_input_str + '" ';

        ret_input_html = ret_input_html + label_style_str + '>' + this.m_caption_select_img + '</label>';

        return ret_input_html;
        
    } // getInputHtml

    /*QQQQQQQ

    // <button type="button">Click Me!</button>
    getDivButtonsTwoHtml(i_n_tab)
    {
        var button_back_html = '';

        button_back_html = button_back_html + '<button type="button" ';

        button_back_html = button_back_html + ' id="' + this.getIdUploadButtonBackTwo() + '" ';

        button_back_html = button_back_html + ' onclick="clickButtonBackTwo()" ';

        button_back_html = button_back_html + this.getButtonStyleString(' float: left; ');

        button_back_html = button_back_html + ' >' + this.m_caption_button_back;

        button_back_html = button_back_html + '</button>';

        var button_forward_html = '';

        button_forward_html = button_forward_html + '<button type="button" ';

        button_forward_html = button_forward_html + ' id="' + this.getIdUploadButtonForwardTwo() + '" ';

        button_forward_html = button_forward_html + ' onclick="clickButtonForwardTwo()" ';

        button_forward_html = button_forward_html + this.getButtonStyleString(' float: right; ');

        button_forward_html = button_forward_html + ' >' + this.m_caption_button_forward;

        button_forward_html = button_forward_html + '</button>';

        var id_div_buttons_two = this.getIdDivUploadButtonsTwo();

        var buttons_two_styles_str = 'overflow: hidden; clear: both';


        var div_buttons_two_html = UtilHtml.getDivElementLeafStyleString(id_div_buttons_two, buttons_two_styles_str, button_back_html + button_forward_html, i_n_tab);

        return div_buttons_two_html;

    } // getDivButtonsTwoHtml

    getButtonStyleString(i_style_float_str)
    {
        var button_style_str = '';

        button_style_str =  button_style_str + ' style= "';
     
        button_style_str =  button_style_str + 'width: ' + this.m_input_button_width + '; '; 
        button_style_str =  button_style_str + 'border: solid 3px black; ';
        button_style_str =  button_style_str + 'padding: 5px; ';
        button_style_str =  button_style_str + 'font-size: 18px; ';
        button_style_str =  button_style_str + 'font-weight: bold; ';
        button_style_str =  button_style_str + 'margin-left: 20px;';
        button_style_str =  button_style_str + 'margin-right: 20px;';
        button_style_str =  button_style_str + 'margin-top: 10px;';
        button_style_str =  button_style_str + 'margin-bottom: 10px;';
        button_style_str =  button_style_str + 'background-color: rgb(229, 225, 218);';
        button_style_str =  button_style_str + 'cursor: pointer; ';
        button_style_str =  button_style_str + i_style_float_str;

        button_style_str =  button_style_str + '" ';

        return button_style_str;

    } // getButtonStyleString

    QQQQ*/

    // Returns the <input> element
    getElementFileInput()
    {
        return document.getElementById(this.getIdFileInput());

    } // getElementFileInput

    // Returns the identity string for the <input> element
    getIdFileInput()
    {
        return 'id_guestbook_fileupload_' + this.m_id_my_fctn_str;

    } // getIdFileInput

    // Returns the identity string for the <div> that has the <input> element
    getIdDivFileInput()
    {
        return 'id_div_guestbook_fileupload_' + this.m_id_my_fctn_str;

    } // getIdDivFileInput

    // Returns the div element file name
    getElementDivFileName()
    {
        return document.getElementById(this.getIdDivFileName());

    } // getElementDivFileName

    // Returns the identity string for the file name <div>
    getIdDivFileName()
    {
        return 'id_div_guestbook_file_name_' + this.m_id_my_fctn_str;

    } // getIdDivFileName

    // Returns the div element image container
    getElementDivImageContainer()
    {
        return document.getElementById(this.getIdDivImageContainer());

    } // getElementDivImageContainer

    // Returns the identity string for the image container <div>
    getIdDivImageContainer()
    {
        return 'id_div_image_container_' + this.m_id_my_fctn_str;

    } // getIdDivImageContainer

    // Returns the element upload <img>
    getElementUploadImage()
    {
        return document.getElementById(this.getIdUploadImage());

    } // getElementUploadImage

    // Returns the identity string for the upload <img>
    getIdUploadImage()
    {
        return 'id_upload_image_' + this.m_id_my_fctn_str;

    } // getIdUploadImage

    /* QQQQQ
    // Returns the element upload <button> back part two
    getElementUploadButtonBackTwo()
    {
        return document.getElementById(this.getIdUploadButtonBackTwo());

    } // getElementUploadButtonBackTwo

    // Returns the identity string for the upload <button> back part two
    getIdUploadButtonBackTwo()
    {
        return 'id_button_part_two_back_' + this.m_id_my_fctn_str;

    } // getIdUploadButtonBackTwo

    // Returns the element upload <button> forward part two
    getElementUploadButtonForwardTwo()
    {
        return document.getElementById(this.getIdUploadButtonForwardTwo());

    } // getElementUploadButtonForwardTwo

    // Returns the identity string for the upload <button> back part two
    getIdUploadButtonForwardTwo()
    {
        return 'id_button_part_two_forward_' + this.m_id_my_fctn_str;

    } // getIdUploadButtonForwardTwo

    // Returns the identity string for the upload <div> buttons part two
    getIdDivUploadButtonsTwo()
    {
        return 'id_div_upload_buttons_two_' + this.m_id_my_fctn_str;

    } // getIdDivUploadButtonsTwo

    QQQQ*/

} // JazzUploadImage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload Image ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User selected files with the input element, type file
async function userSelectedFiles()
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

    var compressed_file = await getCompressedImageFile(max_size_mb);

    uploadImageToServer(compressed_file);

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

    console.log("compressImage blob= ");
    console.log(blob);

    // Turn Blob into File
    const ret_file = new File([blob], file.name, {
        type: blob.type,
    });

    console.log("compressImage ret_file= ");
    console.log(ret_file);

    return ret_file;

    /* Original
    // Turn Blob into File
    return new File([blob], file.name, {
        type: blob.type,
    });
    Original */
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