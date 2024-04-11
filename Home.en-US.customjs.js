// //  Show section from Optionset
// function showFieldFromOptionset(showHideSection,choiceField,choiceIDDisplay) {
//     choiceIDDisplay = choiceIDDisplay.split(',');
//     if ($("#"+choiceField).val() != choiceIDDisplay) {$("[data-name='"+showHideSection+"']").parent().css("display", "none");}

//     $("#"+choiceField).change(function () {
//         if ($.inArray(this.value, choiceIDDisplay) !== -1) {$("[data-name='"+showHideSection+"']").parent().css("display", "");}
//             else {$("[data-name='"+showHideSection+"']").parent().css("display", "none");}
//     });
// }




//  $(document).ready(function() {
// 	showFieldFromOptionset("new_functionality","humber_typeofenhancement","777110000,777110001");
// 	// showFieldFromOptionset("new_functionality","humber_typeofenhancement","777110001");
// 	showFieldFromOptionset("reporting_request","humber_typeofenhancement","777110002");
// 	showFieldFromOptionset("security_sequest","humber_typeofenhancement","777110003");
//     hideFieldFromOptionset("humber_currentfunctionalityfeature","humber_typeofenhancement","777110000");

//     dropdownToRadioGroup("humber_typeofenhancement",true);
//  });

// function setupFieldVisibilityMappingsForRadio() {
//     var visibilityMappings = [
//         { section: "new_functionality", choiceField: "humber_typeofenhancement_flexRadioGroup", choiceIDs: ["777110000", "777110001"]},
//         { section: "reporting_request", choiceField: "humber_typeofenhancement_flexRadioGroup", choiceIDs: ["777110002"]},
//         { section: "security_sequest", choiceField: "humber_typeofenhancement_flexRadioGroup", choiceIDs: ["777110003"]},
//     ];

//     // Generic function to show or hide a section
//     function showHideSection(section, shouldShow) {
//         var displayValue = shouldShow ? "inherit" : "none";
//         $("[data-name='" + section + "']").parent().css("display", displayValue);
//         // if(section=="new_functionality"){
//         //     //fields to become required once show
//         //     var fieldIds = ["humber_overviewofnewfunctionalityfeaturerequest",
//         //     "humber_proposednewfunctionalityfeature","humber_businessjustification",
//         //     "humber_employeeimpact","humber_significantlymovesthedialonanyparticularhr"];

//         //     // Toggle the required attribute based on whether the section is shown or hidden
//         //     fieldIds.forEach(function(fieldId) {
//         //         if (shouldShow) {
//         //             $('#' + fieldId + "_label").closest('.table-info').addClass('required');
//         //             $('#' + fieldId).attr('aria-required', 'true');
//         //             $('#' + fieldId).prop('required',true);
//         //         } else {
//         //             $('#' + fieldId + "_label").closest('.table-info').removeClass('required');
//         //             $('#' + fieldId).removeAttr('aria-required');
//         //             $('#' + fieldId).removeProp('required',true);
//         //         }
//         //     });
//         // }

//     }

//     // Function to get the currently selected radio button's ID
//     function getSelectedRadioButtonId(name) {
//         return $('input[name="' + name + '"]:checked').attr('id');
//     }

//     // Check and set initial visibility based on the current selection
//     visibilityMappings.forEach(function(mapping) {
//         var isMatch = mapping.choiceIDs.includes(getSelectedRadioButtonId(mapping.choiceField));
//         showHideSection(mapping.section, isMatch);
//     });

//     // Set up the change event handler for the radio button group
//     $('input[name="humber_typeofenhancement_flexRadioGroup"]').change(function() {
//         var selectedId = getSelectedRadioButtonId("humber_typeofenhancement_flexRadioGroup");
//         visibilityMappings.forEach(function(mapping) {
//             var isMatch = mapping.choiceIDs.includes(selectedId);
//             showHideSection(mapping.section, isMatch);
//         });
//     });
// }

function setupFieldVisibilityMappingsForRadio() {
    var visibilityMappings = [
        { section: "new_functionality", choiceField: "humber_typeofenhancement_flexRadioGroup", choiceIDs: ["777110000", "777110001"] },
        { section: "reporting_request", choiceField: "humber_typeofenhancement_flexRadioGroup", choiceIDs: ["777110002"] },
        { section: "security_sequest", choiceField: "humber_typeofenhancement_flexRadioGroup", choiceIDs: ["777110003"] },
    ];

    function addCustomValidatorForField(requiredField, validationMessage) {
        if (typeof (Page_Validators) == 'undefined') return;
        var newValidator = document.createElement('span');
        newValidator.style.display = "none";
        newValidator.id = requiredField + "Validator";
        newValidator.controltovalidate = requiredField;
        newValidator.errormessage = "<a href='#" + requiredField + "_label'>" + $("label[for='" + requiredField + "']").text() + validationMessage + "</a>";
        newValidator.validationGroup = ""; // Set this to your validation group if needed
        newValidator.initialvalue = "";
        newValidator.evaluationfunction = function () {
            var field = $('#' + requiredField);
            return field.val() !== "" && field.val() !== null;
        };

        Page_Validators.push(newValidator);
    }

    function removeCustomValidatorFromField(requiredFieldId) {
        if (typeof (Page_Validators) === 'undefined') return;

        // Construct the ID of the validator want to be removed
        var validatorId = requiredFieldId + "Validator";

        // Find the validator in the Page_Validators array
        for (var i = 0; i < Page_Validators.length; i++) {
            if (Page_Validators[i].id === validatorId) {
                // Remove the validator element from the DOM
                var validatorElement = document.getElementById(validatorId);
                if (validatorElement) {
                    validatorElement.parentNode.removeChild(validatorElement);
                }

                // Remove the validator from the Page_Validators array
                Page_Validators.splice(i, 1);
                break;
            }
        }
    }


    // Generic function to show or hide a section and toggle required fields
    function showHideSection(section, shouldShow) {
        var displayValue = shouldShow ? "inherit" : "none";
        $("[data-name='" + section + "']").parent().css("display", displayValue);

        function addValidators(fieldIds, shouldShow) {
            fieldIds.forEach(function (fieldId) {
                if (shouldShow) {
                    $('#' + fieldId + "_label").parent().addClass("required");
                    $('#' + fieldId).attr({ 'aria-required': 'true', 'required': true });
                    addCustomValidatorForField(fieldId, " is a required field.");
                } else {
                    $('#' + fieldId + "_label").parent().removeClass("required");
                    $('#' + fieldId).removeAttr('aria-required').removeAttr('required');
                    removeCustomValidatorFromField(fieldId)
                }
            });
        }

        //Update fields to be required if a certain section is shown
        if (section == "new_functionality") {
            var fieldIds = ["humber_overviewofnewfunctionalityfeaturerequest",
                "humber_proposednewfunctionalityfeature", "humber_businessjustification",
                "humber_employeeimpact", "humber_supportsoneormorehrstrategicgoals",
                "humber_significantlymovesthedialonanyparticularhr"];
            addValidators(fieldIds, shouldShow);
        } else if (section == "reporting_request") {
            var fieldIds = ["humber_overviewofreportingrequest",
                "humber_typeofreportrequest", "humber_reportname",
                "humber_reportpurpose", "humber_datarequirements",
                "humber_format", "humber_audience"];
            addValidators(fieldIds, shouldShow);
        } else if (section == "security_sequest") {
            var fieldIds = ["humber_accessrequired"];
            addValidators(fieldIds, shouldShow);
        }
    }

    // Helper function to get the selected radio button ID
    function getSelectedRadioButtonId(name) {
        return $('input[name="' + name + '"]:checked').attr('id');
    }

    // Check and set initial visibility based on the current selection
    visibilityMappings.forEach(function (mapping) {
        var isMatch = mapping.choiceIDs.includes(getSelectedRadioButtonId(mapping.choiceField));
        showHideSection(mapping.section, isMatch);
    });

    // Set up the change event handler for the radio button group
    $('input[name="humber_typeofenhancement_flexRadioGroup"]').change(function () {
        var selectedId = getSelectedRadioButtonId("humber_typeofenhancement_flexRadioGroup");
        visibilityMappings.forEach(function (mapping) {
            var isMatch = mapping.choiceIDs.includes(selectedId);
            showHideSection(mapping.section, isMatch);
        });
    });
}





function dropdownToRadioGroup(dropdownLogicalName, hideDropdown) {
    var dropdownid = [];
    var dropdownvalue = [];

    $('#' + dropdownLogicalName).after($('<div>').attr('id', dropdownLogicalName + '_radio'));
    if (hideDropdown == true) { $('#' + dropdownLogicalName).css('display', 'none'); }

    $("#" + dropdownLogicalName + " option[value!='']").each(function () {
        dropdownid.push($(this).val());
        dropdownvalue.push($(this).text());
    });

    dropdownvalue.forEach(function (item, index) {
        var div = $('<div>').addClass('form-check');
        // if ($("#"+dropdownLogicalName+" option[selected='selected']").val()) {
        if ($("#" + dropdownLogicalName + " option[selected='selected']").val() === dropdownid[index]) {
            var input = $('<input>').addClass('form-check-input').attr({ type: 'radio', name: dropdownLogicalName + '_flexRadioGroup', id: dropdownid[index], checked: "checked" });
        } else {
            var input = $('<input>').addClass('form-check-input').attr({ type: 'radio', name: dropdownLogicalName + '_flexRadioGroup', id: dropdownid[index] });
        }
        // }        

        var label = $('<label>').addClass('form-check-label').css('margin-left', '5px').attr('for', dropdownid[index]).text(item);

        // var label = $('<label>').addClass('form-check-label').css('margin-left', '5px').attr('for', dropdownvalue[index]).text(item);     
        div.append(input, label);
        $('#' + dropdownLogicalName + '_radio').append(div);
        $('#' + dropdownLogicalName + '_radio').insertAfter('#' + dropdownLogicalName);
    });

    $('#' + dropdownLogicalName + '_radio input[type="radio"]').change(function () {
        if ($(this).is(':checked')) {
            $("#" + dropdownLogicalName + " option[value='" + $(this).attr('id') + "']").attr("selected", "selected");
        }
    });
}

function hideFieldFromRadioGroup(choiceField, choiceIDDisplay) {
    // Function to check and hide field based on radio button selection
    function checkAndHideField() {
        var isSelected = $('input[name="' + choiceField + '"]:checked').attr('id') === choiceIDDisplay;
        var rowToHide = $('#humber_currentfunctionalityfeature_label').closest('tr');
        if (isSelected) {
            rowToHide.hide();
        } else {
            rowToHide.show();
        }
    }

    // Check the initial state and hide field if needed
    checkAndHideField();

    // Set up the change event handler for the radio buttons
    $('input[name="' + choiceField + '"]').change(checkAndHideField);
}

function setupChangeRequestTitleForRadio() {
    // Function to change the title based on the selected radio button
    function changeTitleBasedOnSelection() {
        var selectedId = $('input[name="humber_typeofenhancement_flexRadioGroup"]:checked').attr('id');

        // Determine the title text based on the selected radio button
        var titleText = "";
        if (selectedId === "777110000") {
            titleText = "New Functionality/Feature Request";
        } else if (selectedId === "777110001") {
            titleText = "Feature / Functionality Change Request";
        }

        // Update the title text
        if (titleText) {
            $("fieldset[aria-label='Feature / Functionality Change Request'] .section-title h3").text(titleText);
        }
    }

    // Set up the change event handler for the radio button group
    $('input[name="humber_typeofenhancement_flexRadioGroup"]').change(changeTitleBasedOnSelection);

    // Call the function once to set the correct title on page load
    changeTitleBasedOnSelection();
}

function dropdownToCheckboxGroup(dropdownLogicalName, hideDropdown) {
    var dropdownid = [];
    var dropdownvalue = [];

    // Create a container for checkboxes
    $('#' + dropdownLogicalName).after($('<div>').attr('id', dropdownLogicalName + '_checkbox'));

    // Optionally hide the original dropdown
    if (hideDropdown === true) {
        $('#' + dropdownLogicalName).hide();
    }

    // Iterate over each dropdown option (excluding the placeholder if it's empty)
    $("#" + dropdownLogicalName + " option[value!='']").each(function () {
        dropdownid.push($(this).val());
        dropdownvalue.push($(this).text());
    });

    // Create checkboxes for each option
    dropdownvalue.forEach(function (item, index) {
        var div = $('<div>').addClass('form-check');
        var input = $('<input>').addClass('form-check-input').attr({
            type: 'checkbox', // Changed to checkbox for multiple selections
            name: dropdownLogicalName + '_checkboxGroup', // Adjusted the name to reflect checkboxes
            id: dropdownid[index],
            value: dropdownid[index] // Ensure to set the value attribute as well
        });

        // Check if the option was originally selected
        if ($("#" + dropdownLogicalName + " option[value='" + dropdownid[index] + "']").is(':selected')) {
            input.prop("checked", true);
        }

        var label = $('<label>').addClass('form-check-label').css('margin-left', '5px').attr('for', dropdownid[index]).text(item);
        div.append(input, label);
        $('#' + dropdownLogicalName + '_checkbox').append(div);
    });

    // Event listener for changes on the checkboxes
    $('#' + dropdownLogicalName + '_checkbox input[type="checkbox"]').change(function () {
        // Synchronize the changes with the original dropdown (optional)
        var checkboxValue = $(this).val();
        var option = $("#" + dropdownLogicalName + " option[value='" + checkboxValue + "']");
        if ($(this).is(':checked')) {
            option.prop("selected", true);
        } else {
            option.prop("selected", false);
        }
    });
}

function agreementOnManager() {
    // Disable the button on initial page load
    $('#NextButton').prop('disabled', true);

    // Attach a change event listener to the checkbox
    $('#cr9a4_ismanager').change(function () {
        // Check the status of the checkbox
        if ($(this).is(':checked')) {
            // If the checkbox is checked, enable the button
            $('#NextButton').prop('disabled', false);
            $('#NextButton').attr('onclick', 'setIsDirty(this.id);');
        } else {
            // If the checkbox is not checked, disable the button
            $('#NextButton').prop('disabled', true);
            $('#NextButton').removeAttr('onclick', 'setIsDirty(this.id);');
        }
    });
}

// // ("777110000","humber_overviewofnewfunctionalityfeaturerequest"," is a custom required field"); 
function setRequiedFieldFromRadioButton(radioButton, requiredfield, validationmessage) {
    //set the error message
    if (validationmessage == "") {
        validationmessage = $("#" + requiredfield + "_label").text() + " is a required field";
    } else {
        validationmessage = $("#" + requiredfield + "_label").text() + validationmessage;
    }

    //add * to the label, can be added to the setupFieldVisibilityMappingsForRadio
    if ($('#' + radioButton).is(':checked')) {
        $("#" + requiredfield + "_label").parent().addClass("required");
    } else {
        $("#" + requiredfield + "_label").parent().removeClass("required");
    }

    //also for label
    const checkbox_0 = document.getElementById("777110000");
    checkbox_0.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            $("#" + requiredfield + "_label").parent().removeClass("required");
        }
    });

    const checkbox_1 = document.getElementById(radioButton + '_1');
    checkbox_1.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            $("#" + requiredfield + "_label").parent().addClass("required");
        }
    });

    if (typeof (Page_Validators) == 'undefined') return;
    var newValidator = document.createElement('span');
    newValidator.style.display = "none";
    newValidator.id = requiredfield + "Validator";
    newValidator.controltovalidate = requiredfield;
    newValidator.errormessage = "<a href='#" + requiredfield + "_label'>" + validationmessage + "</a>";
    newValidator.validationGroup = "";
    newValidator.initialvalue = "";
    newValidator.evaluationfunction = function () {
        if ($('#' + radioButton + '_1').is(':checked')) {
            if ($('#' + requiredfield).val() != "" && $('#' + requiredfield).val() !== null) { return true; }
            else { return false; }
        } else { return true; }
    };
    Page_Validators.push(newValidator);
    $("a[href='#" + requiredfield + "_label']").on("click", function () { scrollToAndFocus(requiredfield + '_label', requiredfield); });
}

function setRequiredFieldFromRadioButtons(radioButtons, requiredField, validationMessage) {
    // Set the error message
    if (!validationMessage) {
        validationMessage = $("#" + requiredField + "_label").text() + " is a required field.";
    } else {
        validationMessage = $("#" + requiredField + "_label").text() + " " + validationMessage;
    }

    // Helper function to toggle the 'required' class
    function toggleRequiredClass(isRequired) {
        var $labelParent = $("#" + requiredField + "_label").parent();
        if (isRequired) {
            $labelParent.addClass("required");
        } else {
            $labelParent.removeClass("required");
        }
    }

    // Attach change event listeners to the radio buttons
    radioButtons.forEach(function (buttonId) {
        $('#' + buttonId).change(function () {
            var isThisButtonChecked = $(this).is(':checked');
            toggleRequiredClass(isThisButtonChecked);
        });
    });

    // Assuming the first radio button in the array signifies the required state
    var isRequired = $('#' + radioButtons[0]).is(':checked');
    toggleRequiredClass(isRequired);

    // Your existing validator logic here
    // ...
}

// Example usage of the refactored function
setRequiredFieldFromRadioButtons(['radioButton', 'radioButton_1'], 'requiredField', 'You must fill out this field.');

$(document).ready(function () {
    dropdownToRadioGroup("humber_typeofenhancement", true);
    dropdownToRadioGroup("humber_typeofreportrequest", true);
    dropdownToRadioGroup("humber_employeeimpact", true);
    dropdownToCheckboxGroup("humber_impactedtohrbusinessprocesssystems", true) //reuqire modification
    // setupFieldVisibilityMappings();
    setupFieldVisibilityMappingsForRadio();
    // hideFieldFromOptionset("humber_currentfunctionalityfeature_label","humber_typeofenhancement_flexRadioGroup","777110000");
    hideFieldFromRadioGroup("humber_typeofenhancement_flexRadioGroup", "777110000");
    setupChangeRequestTitleForRadio();
    // setRequiedFieldFromRadioButton("777110000","humber_overviewofnewfunctionalityfeaturerequest"," is a custom required field"); //toggleRadioButton,requiredField,requiredMessage
    // agreementOnManager();
});
