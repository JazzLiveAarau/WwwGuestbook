// File: DisplayImageText.js
// Date: 2024-01-27
// Author: Gunnar Lidén

// File content
// =============
//
// Class DisplayImageText 

class DisplayImageText
{
  // Creates the instance of the class
    // i_id_my_fctn_str: 
    // Application unique string for the calling function. 
    // Used to construct identities and class names
    // i_id_div_container:
    // Place holder for the DisplayImageText element
    constructor(i_id_my_fctn_str, i_id_div_container)
    {
        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the control
        this.m_id_div_container = i_id_div_container;

        // Object container
        this.m_el_div_container = null;

        // Label text
        this.m_label_text = '';

        // The string for the text one element
        this.m_text_one_str = '';

        // The text for the text two element
        this.m_text_two_str = '';

        // The string for the text three element
        this.m_text_three_str = '';

        // The string for the text four element
        this.m_text_four_str = '';

         // Styles for the label to text group all element. Separate with semicolon
        this.m_style_label_all_text = ''; // clear: both

        // Styles for the text group all element. Separate with semicolon
        this.m_style_text_group_all = ''; // clear: both; overflow: hidden

        // Styles for the text group one element. Separate with semicolon
        this.m_style_text_group_one = ''; // clear: both; overflow: hidden

        // Styles for the text group two element. Separate with semicolon
        this.m_style_text_group_two = ''; // clear: both; overflow: hidden

        // Styles for text one. Separate with semicolon
        this.m_style_text_one = ''; // float: left; font-size: 15px; font-weight: bold; padding: 5px

        // Styles for text two. Separate with semicolon
        this.m_style_text_two = ''; // float: right; font-size: 15px; font-weight: bold; padding: 5px

        // Styles for text three. Separate with semicolon
        this.m_style_text_three = ''; // clear:both; font-size: 15px; font-style: italic; font-weight: bold; padding: 5px

        // Styles for text four. Separate with semicolon
        this.m_style_text_four = ''; // clear:both; font-size: 15px; font-style: italic; font-weight: bold; padding: 5px

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        this.init();

    } // constructor

    // Initialization
    init()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // init

    display()
    {
        var n_tabs = 2;

        var html_str = this.getHtmlString(n_tabs);

        this.getObject().innerHTML = html_str;
    }

    // Get object container
    getObject()
    {
        return this.m_el_div_container;

    } // getObject

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

    } // setLabelText    

    // Set the text one element
    setTextOne(i_text_one_str)
    {      
        this.m_text_one_str = i_text_one_str;

        var el_text_one = this.getElementTextOneDiv();

        if (null == el_text_one)
        {
            alert("DisplayImage.setTextOne Element is not created");

            return;
        }

        el_text_one.innerHTML = this.m_text_one_str;

    } // setTextOne

    // Set the text two element
    setTextTwo(i_text_two_str)
    {      
        this.m_text_two_str = i_text_two_str;

        var el_text_two = this.getElementTextTwoDiv();

        if (null == el_text_two)
        {
            alert("DisplayImage.setTextTwo Element is not created");

            return;
        }

        el_text_two.innerHTML = this.m_text_two_str;
        
    } // setTextTwo

    // Set the text three element
    setTextThree(i_text_three_str)
    {      
        this.m_text_three_str = i_text_three_str;

        var el_text_three = this.getElementTextThreeDiv();

        if (null == el_text_three)
        {
            alert("DisplayImage.setTextThree Element is not created");

            return;
        }

        el_text_three.innerHTML = this.m_text_three_str;
        
    } // setTextThree

    // Set the text four element
    setTextFour(i_text_four_str)
    {      
        this.m_text_four_str = i_text_four_str;

        var el_text_four = this.getElementTextFourDiv();

        if (null == el_text_four)
        {
            alert("DisplayImage.setTextFour Element is not created");

            return;
        }

        el_text_four.innerHTML = this.m_text_four_str;
        
    } // setTextFour

     // Set styles for label all text. Separate with semicolon
     setStyleLabelAllTextString(i_style_label_all_text)
     {
         this.m_style_label_all_text = i_style_label_all_text;
 
     } // setStyleLabelAllTextString

     // Set styles for the text group all element. Separate with semicolon
     setStyleTextGroupAll(i_style_text_group_all)
     {
         this.m_style_text_group_all = i_style_text_group_all;
 
     } // setStyleTextGroupAll
        
     // Set styles for the text group one element. Separate with semicolon
     setStyleTextGroupOne(i_style_text_group_one)
     {
         this.m_style_text_group_one = i_style_text_group_one;
 
     } // setStyleTextGroupOne
 
     // Set styles for the text group two element. Separate with semicolon
     setStyleTextGroupTwo(i_style_text_group_two)
     {
         this.m_style_text_group_two = i_style_text_group_two;
 
     } // setStyleTextGroupTwo        
        
     // Set styles for text one. Separate with semicolon
     setStylTextOneString(i_style_text_one)
     {
         this.m_style_text_one = i_style_text_one;
 
     } // setStylTextOneString
 
     // Set styles for text two. Separate with semicolon
     setStylTextTwoString(i_style_text_two)
     {
         this.m_style_text_two = i_style_text_two;
 
     } // setStylTextTwoString
 
     // Set styles for text three. Separate with semicolon
     setStylTextThreeString(i_style_text_three)
     {
         this.m_style_text_three = i_style_text_three;
 
     } // setStylTextThreeString 
 
     // Set styles for text three. Separate with semicolon
     setStylTextFourString(i_style_text_four)
     {
         this.m_style_text_four = i_style_text_four;
 
     } // setStylTextFourString 

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    // TODO Not yet impemented
    setTitle(i_title) 
    {
        this.m_title = i_title; 

    } // setTitle

    // Returns the identity of the text group all div
    getIdTextGroupAllDiv()
    {
        return 'id_text_group_all_div_' + this.m_id_my_fctn_str;

    } // getIdTextGroupAllDiv

    // Returns the element text group all div
    getElementTextGroupAllDiv()
    {
        return document.getElementById(this.getIdTextGroupAllDiv());
    }

    // Hide element div text group all div
    hideElementTextGroupAllDiv()
    {
        this.getElementTextGroupAllDiv().style.display = "none";

    } // hideElementTextGroupAllDiv

    // Display element div text group all div
    displayElementTextGroupAllDiv()
    {
        this.getElementTextGroupAllDiv().style.display = "block";
        
    } // hideElementTextGroupAllDiv

    // Get the HTML string defining the text group all div
    getTextGroupAllDivHtmlString(i_n_tabs)
    {
        var text_group_all_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_group_all_div_style_str = text_group_all_div_style_str + '; border: 1px solid blue';
        }
        
        if (this.m_style_text_group_all.length > 0)
        {
            text_group_all_div_style_str = text_group_all_div_style_str + '; ' + this.m_style_text_group_all;
        }

        var text_group_all_inner_html = '';
		
        text_group_all_inner_html = text_group_all_inner_html + this.getTextGroupOneDivHtmlString(i_n_tabs+1);

        text_group_all_inner_html = text_group_all_inner_html + this.getTextGroupTwoDivHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextGroupAllDiv(), text_group_all_div_style_str, text_group_all_inner_html, i_n_tabs+1);

    } // getTextGroupAllDivHtmlString

    // Returns the identity of the text group one div
    getIdTextGroupOneDiv()
    {
        return 'id_text_group_one_div_' + this.m_id_my_fctn_str;

    } // getIdTextGroupOneDiv

    // Returns the element text group one div
    getElementTextGroupOneDiv()
    {
        return document.getElementById(this.getIdTextGroupOneDiv());
    }

    // Hide element div text group one div
    hideElementTextGroupOneDiv()
    {
        this.getElementTextGroupOneDiv().style.display = "none";

    } // hideElementTextGroupOneDiv

    // Display element div text group one div
    displayElementTextGroupOneDiv()
    {
        this.getElementTextGroupOneDiv().style.display = "block";
        
    } // hideElementTextGroupOneDiv

    // Returns the identity of the text group two div
    getIdTextGroupTwoDiv()
    {
        return 'id_text_group_two_div_' + this.m_id_my_fctn_str;

    } // getIdTextGroupTwoDiv

    // Returns the element text group two div
    getElementTextGroupTwoDiv()
    {
        return document.getElementById(this.getIdTextGroupTwoDiv());
    }

    // Hide element div text group two div
    hideElementTextGroupTwoDiv()
    {
        this.getElementTextGroupTwoDiv().style.display = "none";

    } // hideElementTextGroupTwoDiv

    // Display element div text group two div
    displayElementTextGroupTwoDiv()
    {
        this.getElementTextGroupTwoDiv().style.display = "block";
        
    } // hideElementTextGroupTwoDiv

    // Get the HTML string defining the label textgroup all div
    getLabelAllTextDivHtmlString(i_n_tabs)
    {
        var label_all_text_div_style_str = '';

        if (this.m_display_div_borders)
        {
            label_all_text_div_style_str = label_all_text_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_label_all_text.length > 0)
        {
            label_all_text_div_style_str = label_all_text_div_style_str + '; ' + this.m_style_label_all_text;
        }

        var label_all_text_inner_html = this.m_label_text;

        return UtilHtml.getDivElementLeafStyleString(this.getIdLabelAllTextDiv(), label_all_text_div_style_str, label_all_text_inner_html, i_n_tabs+1);

    } // getLabelAllTextDivHtmlString

    // Get the HTML string defining the text group one div
    getTextGroupOneDivHtmlString(i_n_tabs)
    {
        var text_group_one_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_group_one_div_style_str = text_group_one_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_group_one.length > 0)
        {
            text_group_one_div_style_str = text_group_one_div_style_str + '; ' + this.m_style_text_group_one;
        }

        var text_group_one_inner_html = '';
		
        text_group_one_inner_html = text_group_one_inner_html + this.getTextOneDivHtmlString(i_n_tabs+1);

        text_group_one_inner_html = text_group_one_inner_html + this.getTextTwoDivHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextGroupOneDiv(), text_group_one_div_style_str, text_group_one_inner_html, i_n_tabs+1);

    } // getTextGroupOneDivHtmlString

    // Get the HTML string defining the text group two div
    getTextGroupTwoDivHtmlString(i_n_tabs)
    {
        var text_group_two_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_group_two_div_style_str = text_group_two_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_group_two.length > 0)
        {
            text_group_two_div_style_str = text_group_two_div_style_str + '; ' + this.m_style_text_group_two;
        }

        var text_group_two_inner_html = '';
		
        text_group_two_inner_html = text_group_two_inner_html + this.getTextThreeDivHtmlString(i_n_tabs+1);

        text_group_two_inner_html = text_group_two_inner_html + this.getTextFourDivHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextGroupTwoDiv(), text_group_two_div_style_str, text_group_two_inner_html, i_n_tabs+1);

    } // getTextGroupTwoDivHtmlString


    // Returns the identity of the div for the label text
    getIdLabelAllTextDiv()
    {
        return 'id_label_all_text_div_' + this.m_id_my_fctn_str;

    } // getIdLabelAllTextDiv

    // Returns the element for the label text
    getElementLabelAllTextDiv()
    {
        return document.getElementById(this.getIdLabelAllTextDiv());
        
    } // getElementLabelAllTextDiv

    // Returns the identity of the text one div
    getIdTextOneDiv()
    {
        return 'id_text_one_div_' + this.m_id_my_fctn_str;

    } // getIdTextOneDiv

    // Returns the element text one div
    getElementTextOneDiv()
    {
        return document.getElementById(this.getIdTextOneDiv());

    } // getElementTextOneDiv

    // Hide element div text one div
    hideElementTextOneDiv()
    {
        this.getElementTextOneDiv().style.display = "none";

    } // hideElementTextOneDiv

    // Display element div text one div
    displayElementTextOneDiv()
    {
        this.getElementTextOneDiv().style.display = "block";
        
    } // hideElementTextOneDiv

    // Get the HTML string defining the text one div
    getTextOneDivHtmlString(i_n_tabs)
    {
        var text_one_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_one_div_style_str = text_one_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_one.length > 0)
        {
            text_one_div_style_str = text_one_div_style_str + '; ' + this.m_style_text_one;
        }

        var text_one_inner_html = 'Place holder div for text one';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextOneDiv(), text_one_div_style_str, text_one_inner_html, i_n_tabs+1);

    } // getTextOneDivHtmlString

    // Returns the identity of the text two div
    getIdTextTwoDiv()
    {
        return 'id_text_two_div_' + this.m_id_my_fctn_str;

    } // getIdTextTwoDiv

    // Returns the element text two div
    getElementTextTwoDiv()
    {
        return document.getElementById(this.getIdTextTwoDiv());
    }

    // Hide element div text two div
    hideElementTextTwoDiv()
    {
        this.getElementTextTwoDiv().style.display = "none";

    } // hideElementTextTwoDiv

    // Display element div text two div
    displayElementTextTwoDiv()
    {
        this.getElementTextTwoDiv().style.display = "block";
        
    } // hideElementTextTwoDiv

    // Get the HTML string defining the text two div
    getTextTwoDivHtmlString(i_n_tabs)
    {
        var text_two_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_two_div_style_str = text_two_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_two.length > 0)
        {
            text_two_div_style_str = text_two_div_style_str + '; ' + this.m_style_text_two;
        }

        var text_two_inner_html = 'Place holder div for text two';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextTwoDiv(), text_two_div_style_str, text_two_inner_html, i_n_tabs+1);

    } // getTextTwoDivHtmlString

    // Returns the identity of the text three div
    getIdTextThreeDiv()
    {
        return 'id_text_three_div_' + this.m_id_my_fctn_str;

    } // getIdTextThreeDiv

    // Returns the element text three div
    getElementTextThreeDiv()
    {
        return document.getElementById(this.getIdTextThreeDiv());
    }

    // Hide element div text three div
    hideElementTextThreeDiv()
    {
        this.getElementTextThreeDiv().style.display = "none";

    } // hideElementTextThreeDiv

    // Display element div text three div
    displayElementTextThreeDiv()
    {
        this.getElementTextThreeDiv().style.display = "block";
        
    } // hideElementTextThreeDiv

    // Get the HTML string defining the text three div
    getTextThreeDivHtmlString(i_n_tabs)
    {
        var text_three_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_three_div_style_str = text_three_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_three.length > 0)
        {
            text_three_div_style_str = text_three_div_style_str + '; ' + this.m_style_text_three;
        }

        var text_three_inner_html = 'Place holder div for text three';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextThreeDiv(), text_three_div_style_str, text_three_inner_html, i_n_tabs+1);

    } // getTextThreeDivHtmlString

    // Returns the identity of the text four div
    getIdTextFourDiv()
    {
        return 'id_text_four_div_' + this.m_id_my_fctn_str;

    } // getIdTextFourDiv

    // Returns the element text four div
    getElementTextFourDiv()
    {
        return document.getElementById(this.getIdTextFourDiv());
    }

    // Hide element div text four div
    hideElementTextFourDiv()
    {
        this.getElementTextFourDiv().style.display = "none";

    } // hideElementTextFourDiv

    // Display element div text four div
    displayElementTextFourDiv()
    {
        this.getElementTextFourDiv().style.display = "block";
        
    } // hideElementTextFourDiv

    // Get the HTML string defining the text four div
    getTextFourDivHtmlString(i_n_tabs)
    {
        var text_four_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_four_div_style_str = text_four_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_four.length > 0)
        {
            text_four_div_style_str = text_four_div_style_str + '; ' + this.m_style_text_four;
        }

        var text_four_inner_html = 'Place holder div for text four';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextFourDiv(), text_four_div_style_str, text_four_inner_html, i_n_tabs+1);

    } // getTextFourDivHtmlString

    checkInputData()
    {
        // TODO
        return true;

    } // checkInputData

    // Returns the string that defines the HTML display image string
    getHtmlString(i_n_tabs)
    {
        if (!this.checkInputData())
        {
            return '';
        }

        var ret_html_str = '';

        ret_html_str = ret_html_str + this.getLabelAllTextDivHtmlString(i_n_tabs+1);

        ret_html_str = ret_html_str + this.getTextGroupAllDivHtmlString(i_n_tabs);

        return ret_html_str;

    } // getHtmlString

} // DisplayImageText