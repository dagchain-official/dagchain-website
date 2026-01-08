function execCommand(command) {
  console.log(command);
  document.execCommand(command, false, null);
}

var editable_code = "";

function openHtmlPopup(button) {
  var editorContent = $(button).closest(".editor").find(".editable").html();
  $(".popup-content textarea").val(editorContent);
  $("#popup").fadeIn();

  $(button).closest(".editor").prevAll("textarea").first().val(editorContent);

  editable_code = button;

  var htmlInput = document.getElementById("html-input");
  htmlInput.value = getCurrentTextareaValue();
  var popup = document.getElementById("html-popup");
  popup.style.display = "block";
}

function closeHtmlPopup() {
  var popup = document.getElementById("html-popup");
  popup.style.display = "none";
}

function insertHtmlFromPopup() {
  var html = document.getElementById("html-input").value;
  if (html) {
    var editable = getCurrentEditable();
    var range = window.getSelection().getRangeAt(0);
    var div = document.createElement("div");
    div.innerHTML = html;
    range.insertNode(div);
  }
  closeHtmlPopup();
}

function getCurrentTextareaValue() {
  var rawHtml = getCurrentRawHtml();
  return rawHtml.value;
}

function getCurrentRawHtml() {
  var rawHtmls = document.querySelectorAll(".raw-html");
  var currentRawHtml = rawHtmls[rawHtmls.length - 1];
  return currentRawHtml;
}

function getCurrentEditable() {
  var editables = document.querySelectorAll(".editable");
  var currentEditable = editables[editables.length - 1];
  return currentEditable;
}

function setFontFamily(fontFamily) {
  var editable = getCurrentEditable();
  editable.style.fontFamily = fontFamily;
}

function updateRawHtml() {
  var editable = getCurrentEditable();
  var rawHtml = getCurrentRawHtml();
  rawHtml.value = editable.innerHTML;
}

function initEditor(element) {
  let textareas = document.querySelectorAll(element);
  replaceTextareaWithEditor(textareas);

  //intilze value
  var editorTextareas = document.querySelectorAll(element);
  // Loop through each textarea
  editorTextareas.forEach(function (textarea) {
    // Find the next sibling div with class 'editable' and set its innerHTML to the textarea value
    var editableDiv = textarea.nextElementSibling.querySelector('.editable');
    editableDiv.innerHTML = textarea.value;
  });
}

// Replace textareas with the editor on page load
// document.addEventListener("DOMContentLoaded", );

function replaceTextareaWithEditor(textareas) {
  textareas.forEach(function (textarea) {
    // Create editor div
    var editorDiv = document.createElement("div");
    editorDiv.classList.add("editor");

    var toolbarDiv = document.createElement("div");
    toolbarDiv.classList.add("toolbar");

    toolbarDiv.innerHTML = `
  <button type="button" class="editor_toc" onclick="execCommand('undo')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <g id="Edit / Undo">
      <path id="Vector" d="M10 8H5V3M5.29102 16.3569C6.22284 17.7918 7.59014 18.8902 9.19218 19.4907C10.7942 20.0913 12.547 20.1624 14.1925 19.6937C15.8379 19.225 17.2893 18.2413 18.3344 16.8867C19.3795 15.5321 19.963 13.878 19.9989 12.1675C20.0347 10.4569 19.5211 8.78001 18.5337 7.38281C17.5462 5.98561 16.1366 4.942 14.5122 4.40479C12.8878 3.86757 11.1341 3.86499 9.5083 4.39795C7.88252 4.93091 6.47059 5.97095 5.47949 7.36556" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>
  </button>

  <button type="button" class="editor_toc" onclick="execCommand('redo')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <g id="Edit / Redo">
      <path id="Vector" d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>
  </button>


  <button type="button" class="editor_toc" onclick="execCommand('bold')"> <svg width="24" height="24" focusable="false"><path d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8Zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4Zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4Z" fill-rule="evenodd"></path></svg></button>
  
  <button type="button" class="editor_toc" onclick="execCommand('italic')"><svg width="24" height="24" focusable="false"><path d="m16.7 4.7-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8Z" fill-rule="evenodd"></path></svg></button>
  
  <button type="button" class="editor_toc" onclick="execCommand('underline')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <path d="M4 21H20M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 3H8M16 3H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></button>
      
  <button type="button" class="editor_toc" onclick="execCommand('insertOrderedList')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <path d="M10 6L21 6.00066M10 12L21 12.0007M10 18L21 18.0007M3 5L5 4V10M5 10H3M5 10H7M7 20H3L6.41274 17.0139C6.78593 16.6873 7 16.2156 7 15.7197C7 14.7699 6.23008 14 5.28033 14H5C4.06808 14 3.28503 14.6374 3.06301 15.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></button>

  <button type="button" class="editor_toc" onclick="execCommand('insertUnorderedList')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <path d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  </button>

  <button type="button" class="editor_toc" onclick="execCommand('justifyLeft')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <path d="M12 5.25H3C2.59 5.25 2.25 4.91 2.25 4.5C2.25 4.09 2.59 3.75 3 3.75H12C12.41 3.75 12.75 4.09 12.75 4.5C12.75 4.91 12.41 5.25 12 5.25Z" fill="#000000"/>
      <path d="M12 10.25H3C2.59 10.25 2.25 9.91 2.25 9.5C2.25 9.09 2.59 8.75 3 8.75H12C12.41 8.75 12.75 9.09 12.75 9.5C12.75 9.91 12.41 10.25 12 10.25Z" fill="#000000"/>
      <path d="M21 15.25H3C2.59 15.25 2.25 14.91 2.25 14.5C2.25 14.09 2.59 13.75 3 13.75H21C21.41 13.75 21.75 14.09 21.75 14.5C21.75 14.91 21.41 15.25 21 15.25Z" fill="#000000"/>
      <path d="M21 20.25H3C2.59 20.25 2.25 19.91 2.25 19.5C2.25 19.09 2.59 18.75 3 18.75H21C21.41 18.75 21.75 19.09 21.75 19.5C21.75 19.91 21.41 20.25 21 20.25Z" fill="#000000"/>
      </svg>
  </button>
  <button type="button" class="editor_toc" onclick="execCommand('justifyCenter')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <path d="M3 4.5H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 9.5H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 14.5H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 19.5H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  </button>

  <button type="button" class="editor_toc" onclick="execCommand('justifyRight')"><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 56 56"><path d="M 6.1679 11.3594 L 49.8085 11.3594 C 50.8165 11.3594 51.6133 10.5859 51.6133 9.5781 C 51.6133 8.5937 50.8165 7.8203 49.8085 7.8203 L 6.1679 7.8203 C 5.1601 7.8203 4.3867 8.5937 4.3867 9.5781 C 4.3867 10.5859 5.1601 11.3594 6.1679 11.3594 Z M 6.1679 23.6406 L 49.8085 23.6406 C 50.8165 23.6406 51.6133 22.8672 51.6133 21.8594 C 51.6133 20.8750 50.8165 20.1015 49.8085 20.1015 L 6.1679 20.1015 C 5.1601 20.1015 4.3867 20.8750 4.3867 21.8594 C 4.3867 22.8672 5.1601 23.6406 6.1679 23.6406 Z M 6.1679 35.9219 L 49.8085 35.9219 C 50.8165 35.9219 51.6133 35.1250 51.6133 34.1406 C 51.6133 33.1563 50.8165 32.3828 49.8085 32.3828 L 6.1679 32.3828 C 5.1601 32.3828 4.3867 33.1563 4.3867 34.1406 C 4.3867 35.1250 5.1601 35.9219 6.1679 35.9219 Z M 24.7539 48.1797 L 49.8085 48.1797 C 50.8165 48.1797 51.6133 47.4063 51.6133 46.4219 C 51.6133 45.4375 50.8165 44.6406 49.8085 44.6406 L 24.7539 44.6406 C 23.7695 44.6406 22.9960 45.4375 22.9960 46.4219 C 22.9960 47.4063 23.7695 48.1797 24.7539 48.1797 Z"/></svg>
  </button>

  <button type="button" class="editor_toc" onclick="openHtmlPopup(this)"><svg width="24" height="24" focusable="false"><g fill-rule="nonzero"><path d="M9.8 15.7c.3.3.3.8 0 1-.3.4-.9.4-1.2 0l-4.4-4.1a.8.8 0 0 1 0-1.2l4.4-4.2c.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.1L6 12l3.8 3.7ZM14.2 15.7c-.3.3-.3.8 0 1 .4.4.9.4 1.2 0l4.4-4.1c.3-.3.3-.9 0-1.2l-4.4-4.2a.8.8 0 0 0-1.2 0c-.3.3-.3.8 0 1.1L18 12l-3.8 3.7Z"></path></g></svg>
  </button>`;

    var editableDiv = document.createElement("div");
    editableDiv.classList.add("editable");
    editableDiv.contentEditable = true;

    editorDiv.appendChild(toolbarDiv);
    editorDiv.appendChild(editableDiv);

    // Insert the editor div after the textarea
    textarea.insertAdjacentElement("afterend", editorDiv);

    // Hide the textarea
    textarea.style.display = 'none';
  });

  document.querySelectorAll(".editable").forEach(function (editable) {
    editable.addEventListener("input", updateRawHtml);
  });

  $(".editable").on("input", function () {
    let editor_value = $(this).html();
    $(this).closest(".editor").prevAll("textarea").first().val(editor_value);
  });

  document.querySelectorAll(".editable").forEach(function (editable) {
    editable.addEventListener("keydown", function (event) {
      // Check if Enter key is pressed
      if (event.key === "Enter") {
        // Prevent default behavior (new line in contenteditable div)
        event.preventDefault();

        // Create a new paragraph element
        var paragraph = document.createElement("p");
        paragraph.textContent = "\u200B"; // Add a zero-width space to ensure the paragraph is editable

        // Get the current selection
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);

        // Check if the selection is collapsed (cursor position)
        if (range.collapsed) {
          // Insert the paragraph after the current element
          var currentElement = range.startContainer;
          var parentElement = currentElement.parentNode;
          parentElement.insertBefore(paragraph, currentElement.nextSibling);
        } else {
          // Split the current range and insert the paragraph in between
          range.deleteContents();
          range.insertNode(paragraph);
        }

        // Move the cursor inside the new paragraph
        var newRange = document.createRange();
        newRange.setStart(paragraph, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Create and append the popup modal box
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "popup";
  popup.innerHTML = `
  <div class="popup-content">
      <textarea cols="100" style="padding:10px;" rows="50"></textarea>
      <div class="button-container">
          <button type="button" class="save-btn " onclick="updateHtmlCode(this)">Save</button>
          <button type="button" class="cancel-btn close-popup" id="close-popup">Cancel</button>
      </div>
  </div>
  `;

  document.body.appendChild(popup);

  const openPopupButton = document.getElementById("open-popup");
  const closePopupButton = document.getElementByClass("close-popup");

  openPopupButton.addEventListener("click", function () {
    popup.style.display = "block";
  });

  closePopupButton.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Close the popup when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

function updateHtmlCode(elem) {
  let updated_code = $(elem).closest(".popup-content").find("textarea").val();

  $(editable_code)
    .closest(".editor")
    .prevAll("textarea")
    .first()
    .val(updated_code);
  $(editable_code).closest(".editor").find(".editable").html(updated_code);

  $("#popup").fadeOut();
}
