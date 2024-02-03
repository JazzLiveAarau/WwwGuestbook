// File: JazzUploadImage.js
// Date: 2024-02-01
// Author: Gunnar Lidén

// Content
// ========
//
// Control for the upload of a photo to the JAZZ live AARAU server.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Upload Image //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Input data for JazzUploadImage
// i_upload_file_name:      The name of the file to be uploaded without extension
// i_upload_file_extension: The extension of the file to be uploaded
// i_upload_path:           The server (relative) path for the file to be uploaded
// i_image_max_size_mb:     Maximum image size in MByte. If bigger the image will be compressed
// i_default_img:           URL for the default (start) image in the image container <div>
// i_caption_select_img:    Caption for the select image button
class JazzUploadImageInput
{
    // Creates the instance of the class
    constructor(i_upload_file_name, i_upload_file_extension, i_upload_path, i_image_max_size_mb, i_default_img, i_caption_select_img)
    {
        // Name of the upload file without extension, e.g. Image_2024mmddhhmmss
        this.m_upload_file_name = i_upload_file_name;

        // Extension of the upload file,e.g. .jpg
        this.m_upload_file_extension = i_upload_file_extension;

        // The server (relative) path for m_upload_file_name
        this.m_upload_path = i_upload_path;

        // Maximum image size in MByte. If bigger the image will be compressed
        this.m_image_max_size_mb = i_image_max_size_mb;

        // URL for the default image, i.e. an start image that is diplayed in the image container
        this.m_default_img = i_default_img;

        // Caption for the select image button (actually a label)
        this.m_caption_select_img = i_caption_select_img;
    }

    // Sets the name of the upload file without extension, e.g. Image_yyymmddhhmmss
    setImageFileName(i_upload_file_name)
    {
        this.m_upload_file_name = i_upload_file_name; 

    } // setImageFileName

    // Sets the extension of the upload file, e.g. .jpg
    setImageFileExtension(i_upload_file_extension)
    {
        this.m_upload_file_extension = i_upload_file_extension;

    } // setImageFileExtension

    // Sets the extension of the upload file from another file, e.g. .jpg
    setFileExtensionFromAnotherFile(i_image_file)
    {
        var last_index_point = i_image_file.lastIndexOf('.');

        if (last_index_point < 0)
        {
            alert("JazzUploadImageInput.setImageFileExtension No file extension: " + i_image_file);

            return;
        }

        var extension_str = i_image_file.substring(last_index_point);

        this.m_upload_file_extension = extension_str;

    } // setFileExtensionFromAnotherFile

    // Returns the server file name (URL) for the file that shall be uploaded
    getImageFileFullName()
    {
        return this.m_upload_path + this.m_upload_file_name + this.m_upload_file_extension;

    } // getImageFileFullName

} // JazzUploadImageInput

// Class for the upload of an image to the server 
class JazzUploadImage
{
    // Creates the instance of the class
    // Used to construct identities and class names and handling of event functions
    // i_id_div_container:
    // Place holder for all the the upload controls
    // i_input_data:
    // Instance of JazzUploadImageInput with data (settings) for the upload
    constructor(i_id_div_container, i_input_data) 
    {
        // Member variables
        // ================

        // The identity of the container for the upload controls
        this.m_id_div_container = i_id_div_container;

        // Input data object JazzUploadImageInput
        this.m_input_data = i_input_data;

        // The container element object
        this.m_el_div_container = null;

        // The full server file name (URL) to the uploaded image
        this.m_full_server_file_name = '';

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

        this.addEventListenerForInputFileElement(this, this.m_input_data);

    } // init

    // Set the full server file name (URL) to the uploaded image
    setImageFileFullName(i_full_server_file_name)
    {
                
        this.m_full_server_file_name = i_full_server_file_name;

    } // setImageFileFullName

    // Swt the full server file name (URL) to the uploaded image
    getImageFileFullName(i_full_server_file_name)
    {       
        return this.m_full_server_file_name;

    } // getImageFileFullName

    // Adds an event listener for the inout file element
    // i_upload_image_object: This JazzUploadImage object
    // i_input_data:          An instance of JazzUploadImageInput
    //
    // Inside this function 'this' is the <input> object that holds the data about
    // the file that shall be uploaded. This data must of course be passed on
    // to the event execution member function userSelectedFiles.
    // The function userSelectedFiles is a member of the JazzUploadImage class. Therefore
    // must the object JazzUploadImageInput i_upload_image_object be input to this function.
    //
    // https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_parameters
    addEventListenerForInputFileElement(i_upload_image_object, i_input_data)
    {
        var input_file_el = JazzUploadImage.getElementFileInput();

        input_file_el.addEventListener("change", function() {
            i_upload_image_object.userSelectedFiles(this, i_input_data);
        });

    } // addEventListenerForInputFileElement

    // Event function when the user selected files with the input element, type file
    // i_input_object: Element <input> holding the data about the file that shall be uploaded
    // i_input_data:   An instance of JazzUploadImageInput holding data for the upload
    async userSelectedFiles(i_input_object, i_input_data)
    {
        JazzUploadImage.debugAppend("userSelectedFiles Enter");

        this.setDefaultImage();

        JazzUploadImage.debugAppend("userSelectedFiles After setDefaultImage");

        displayElementDivUploadButtonForwardTwo();
        
        var max_size_mb = i_input_data.m_image_max_size_mb;

        var image_file = i_input_object.files[0];

        var file_name_orig = image_file.name;

        var file_name_el = JazzUploadImage.getElementDivFileName();

        file_name_el.innerHTML = file_name_orig;
    
        if (!JazzUploadImage.fileIsOfTypeImage(image_file))
        {
            alert("JazzUploadImage.userSelectedFiles The file is not an image.");
    
            return;
        }
        else
        {
            console.log("JazzUploadImage.userSelectedFiles The input file is an image");
        }
    
        var original_size = image_file.size/1000000.0;

        console.log("Original image size is " + original_size.toString());

        var full_server_file_name = '';

        if (original_size < max_size_mb)
        {
            console.log("JazzUploadImage.userSelectedFiles The original image is not changed");

            var file_name = image_file.name;

            i_input_data.setFileExtensionFromAnotherFile(file_name);

            full_server_file_name = i_input_data.getImageFileFullName();

            JazzUploadImage.debugAppend("userSelectedFiles The original image is not compressed");

            JazzUploadImage.uploadImageToServer(image_file, full_server_file_name);
        }
        else
        {
            // Note again that this. not cannot be used for getCompressedImageFile, i.e. this
            // function must be static
            var compressed_file = await JazzUploadImage.getCompressedImageFile(image_file, max_size_mb);

            console.log("JazzUploadImage.userSelectedFiles The image was compressed");

            i_input_data.setFileExtensionFromAnotherFile(compressed_file.name);

            full_server_file_name = i_input_data.getImageFileFullName();

            JazzUploadImage.debugAppend("userSelectedFiles The input image was compressed");

            JazzUploadImage.uploadImageToServer(compressed_file, full_server_file_name);
        }

        this.setImageFileFullName(full_server_file_name);

    } // userSelectedFiles

    // Set default image and ....
    async setDefaultImage()
    {

        if (this.getImageFileFullName().length == 0)
        {
            JazzUploadImage.debugAppend("setDefaultImage Do nothing. No image has yet been uploaded");

            return;
        }

        JazzUploadImage.debugAppend("setDefaultImage An image has already been uploaded");

        var b_execute_server = UtilServer.execApplicationOnServer();

        var uploaded_file_name = this.getImageFileFullName();

        var name_no_path = UtilServer.getFileName(uploaded_file_name);

        var input_move_file = g_guestbook_upload_xml_dir + name_no_path;
    
        var output_move_file = g_guestbook_backups_xml_dir + name_no_path;

        JazzUploadImage.debugAppend("setDefaultImage input_move_file= " + input_move_file);

        JazzUploadImage.debugAppend("setDefaultImage output_move_file= " + output_move_file);

        if (!b_execute_server)
        {
            JazzUploadImage.debugAppend('setDefaultImage Do not move image by testing with Live Server');
    
            return;
        }

        var b_move = UtilServer.moveFile(input_move_file, output_move_file);

        if (b_move)
        {
            JazzUploadImage.debugAppend("setDefaultImage Previous uploaded image has been moved to Backups");
        }
        else
        {
            JazzUploadImage.debugAppend('setDefaultImage Failure moving previous uploaded image to Backups');

            return;
        }
    
        var url_default_image = this.m_input_data.m_default_img;

        UtilImage.replaceImageInDivContainer(url_default_image, JazzUploadImage.getElementDivImageContainer());
        
        JazzUploadImage.debugAppend("setDefaultImage Default image was set");

    } // setDefaultImage

    // Upload image to the server
    static async uploadImageToServer(i_image_file, i_full_server_file_name) 
    {
        if (null == i_image_file)
        {
            alert("uploadImageToServer Input image file is null");
    
            return;
        }
    
        var form_data = new FormData(); 
        
        form_data.append("file_input", i_image_file);

        form_data.append("to_file_name", i_full_server_file_name);
    
        console.log("uploadImageToServer Sent to PHP is FormData where the following data has been appended ");

        console.log(i_full_server_file_name);
    
        console.log(i_image_file);

        JazzUploadImage.debugAppend("uploadImageToServer FormData to_file_name appended: " + i_full_server_file_name);
    
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

            JazzUploadImage.debugAppend("uploadImageToServer Failure uploading file: " + error);
    
            return;
        }
    
        console.log("uploadImageToServer response=");
        console.log(response);
    
        if (response.ok)
        {
            // alert('The file has been uploaded successfully.');

            JazzUploadImage.debugAppend("uploadImageToServer The file has been uploaded successfully");

            // setTimeout(JazzUploadImage.displayUploadedImage, 500, i_full_server_file_name);

            var abs_url_file = 'https://jazzliveaarau.ch/JazzGuests/Uploaded/' + UtilServer.getFileName(i_full_server_file_name);

            JazzUploadImage.displayUploadedImage(abs_url_file);
        }
        else
        {
            JazzUploadImage.debugAppend("uploadImageToServer Failure uploading the file");

            alert('Failure uploading file (respons).');
        }
     
    
    } // uploadFile

    // Display the uploaded image
    static async displayUploadedImage(i_file_name)
    {
        JazzUploadImage.debugAppend("displayUploadedImage i_file_name= " + i_file_name);

        UtilImage.replaceImageInDivContainer(i_file_name, JazzUploadImage.getElementDivImageContainer());

        JazzUploadImage.debugAppend("displayUploadedImage UtilImage.replaceImageInDivContainer was called");

    } // displayUploadedImage
    

    // Get a compressed image if bigger as the input maximum size in Megabyte
    static async getCompressedImageFile(i_image_file, i_max_size_mb)
    {
        if (!JazzUploadImage.fileIsOfTypeImage(i_image_file))
        {
            alert("JazzUploadImage.getCompressedImageFile The file is not an image.");

            return null;
        }
        else
        {
            console.log("JazzUploadImage.getCompressedImageFile The input file is an image");
        }

        var original_size = i_image_file.size/1000000.0;

        console.log("JazzUploadImage.getCompressedImageFile Original image size is " + original_size.toString());

        if (original_size < i_max_size_mb)
        {
            console.log("JazzUploadImage.getCompressedImageFile The original image is not changed");

            return i_image_file;
        }

        var scale_factor = i_max_size_mb/original_size;
        
        console.log("JazzUploadImage.getCompressedImageFile Scaling factor " + scale_factor.toString());

        JazzUploadImage.debugAppend("getCompressedImageFile Scaling factor= " + scale_factor.toString());

        const compressed_file = await compressImage(i_image_file, {
            quality: scale_factor,
            type: 'image/jpeg',
        });

        if (null == compressed_file)
        {
            alert("JazzUploadImage.getCompressedImageFile Compressed image file is null");
            
            return null;
        }

        return compressed_file;

    } // getCompressedImageFile

    // Returns true if the input file is of type image
    // Type of image is for instance 'image/jpeg'
    static fileIsOfTypeImage(i_file)
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

    // Get the HTML string defining the content of i_id_div_container
    getHtml()
    {
        var ret_html = '';

        const tabs_two = 2;

        var id_div_input = JazzUploadImage.getIdDivFileInput();

        var input_styles_str = 'overflow: hidden; clear: both; text-align: center;';

        var div_input_inner_html = this.getInputHtml();

        var div_input_html = UtilHtml.getDivElementLeafStyleString(id_div_input, input_styles_str, div_input_inner_html, tabs_two);

        var id_div_label_name = JazzUploadImage.getIdDivFileName();

        var file_name_styles_str = 'border: solid 1px grey; margin-top: 10px; clear: both;text-align: center;';

        var div_file_name_inner_html = '...'; 

        var div_file_name_html = UtilHtml.getDivElementLeafStyleString(id_div_label_name, file_name_styles_str, div_file_name_inner_html, tabs_two);

        var id_div_image_container = JazzUploadImage.getIdDivImageContainer();

        var image_container_styles_str = 'border: solid 1px blue;  margin-top: 10px; clear: both;'; // TODO Must have a border, otherwise it disappears ??

        var id_upload_image = JazzUploadImage.getIdUploadImage();

        var image_styles_str = '';

        var image_width = '98%';

        var event_fctn = '';

        var file_name_icon = this.m_input_data.m_default_img;

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

        // https://www.w3docs.com/snippets/css/how-to-control-the-width-of-the-label-tag.html
        label_style_str =  label_style_str + ' style= "';
     
        label_style_str =  label_style_str + 'display: inline-block; '; 
        label_style_str =  label_style_str + 'width: 95%; '; 
        label_style_str =  label_style_str + 'border: solid 2px black; ';
        label_style_str =  label_style_str + 'padding-top: 5px; ';
        label_style_str =  label_style_str + 'padding-bottom: 5px; ';
        label_style_str =  label_style_str + 'margin-left: 0px;';
        label_style_str =  label_style_str + 'background-color: rgb(229, 225, 218);';
        label_style_str =  label_style_str + 'cursor: pointer ';

        label_style_str =  label_style_str + '" ';

        var id_input_str = JazzUploadImage.getIdFileInput();

        ret_input_html = ret_input_html + '<input id="' + id_input_str + '" type="file" accept="image/png, image/jpeg, image/jpg"';

        ret_input_html = ret_input_html + input_style_str + '/>';

        ret_input_html = ret_input_html + '<label for="' + id_input_str + '" ';

        ret_input_html = ret_input_html + label_style_str + '>' + this.m_input_data.m_caption_select_img + '</label>';

        return ret_input_html;
        
    } // getInputHtml

    // Returns the <input> element
    static getElementFileInput()
    {
        return document.getElementById(JazzUploadImage.getIdFileInput());

    } // getElementFileInput

    // Returns the identity string for the <input> element
    static getIdFileInput()
    {
        return 'id_jazzuploadimage_fileupload';

    } // getIdFileInput

    // Returns the identity string for the <div> that has the <input> element
    static getIdDivFileInput()
    {
        return 'id_div_jazzuploadimage_fileupload';

    } // getIdDivFileInput

    // Returns the div element file name
    static getElementDivFileName()
    {
        return document.getElementById(JazzUploadImage.getIdDivFileName());

    } // getElementDivFileName

    // Returns the identity string for the file name <div>
    static getIdDivFileName()
    {
        return 'id_div_jazzuploadimage_file_name';

    } // getIdDivFileName

    // Returns the div element image container
    static getElementDivImageContainer()
    {
        return document.getElementById(JazzUploadImage.getIdDivImageContainer());

    } // getElementDivImageContainer

    // Returns the identity string for the image container <div>
    static getIdDivImageContainer()
    {
        return 'id_div_jazzuploadimage_image_container';

    } // getIdDivImageContainer

    // Returns the element upload <img>
    static getElementUploadImage()
    {
        return document.getElementById(JazzUploadImage.getIdUploadImage());

    } // getElementUploadImage

    // Returns the identity string for the upload <img>
    static getIdUploadImage()
    {
        return 'id_jazzuploadimage_upload_image';

    } // getIdUploadImage

    // Returns the debug file name
    static getDebugFilename()
    {
        return  'JazzUploadImage';

        // return  'NoDebug';

    } // getDebugFilename

    // Create a new debug file
    static initDebugFile()
    {
        var b_execute_server = UtilServer.execApplicationOnServer();

        if (!b_execute_server)
        {
            return;
        }

        if (JazzUploadImage.getDebugFilename() == 'NoDebug')
        {
            return;
        }

        UtilServer.initDebugFile(JazzUploadImage.getDebugFilename());

    } // initDebugFile

    // Append to debug file
    static debugAppend(i_msg_str)
    {
        var b_execute_server = UtilServer.execApplicationOnServer();

        if (!b_execute_server)
        {
            return;
        }
        
        if (JazzUploadImage.getDebugFilename() == 'NoDebug')
        {
            return;
        }
        
        if (JazzUploadImage.getDebugFilename() == 'NoDebug')
        {
            return;
        }

        UtilServer.appendDebugFile(i_msg_str, JazzUploadImage.getDebugFilename());

    } // debugAppend

} // JazzUploadImage


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload Image ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Compress Function /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Compress Function ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////