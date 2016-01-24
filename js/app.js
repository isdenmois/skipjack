var b64 = require('./modules/base64');
var ua = require('./modules/uintArray');
var Skipjack = require('./lib/skipjack');
var ECBMode = require('./modes/ecb');
var OFBMode = require('./modes/ofb');
var CBCMode = require('./modes/cbc');
Uint8Array = Uint8Array || Array;
if (Uint8Array.prototype.slice == undefined) {
  Uint8Array = Array;
}
Uint16Array = Uint16Array || Array;
if (Uint16Array.prototype.slice == undefined) {
  Uint16Array = Array;
}

/**
 * Encrypt the message.
 */
function encrypt() {
    var toEncrypt = $('#encrypt').val();
    var pkey = $('#pkey').val();
    var iv = ua.toArray($('#iv').val());
    var mode = $('input[name="mode"]:checked').attr('id');

    var cipher = new Skipjack(pkey);
    switch (mode) {
        case 'ofb':
            mode = new OFBMode(cipher, iv);
            break;
        case 'cbc':
            mode = new CBCMode(cipher, iv);
            break;

        default:
            mode = new ECBMode(cipher);
    }

    toEncrypt = ua.to8Array(toEncrypt);
    toEncrypt = mode.encrypt(toEncrypt);
    var result = b64.encode(toEncrypt);
    $('#decrypt').val(result).blur().find('+ label').addClass('active');
}

/**
 * Decrypt the message.
 */
function decrypt() {
    var toDecrypt = $('#decrypt').val();
    var pkey = $('#pkey').val();
    var iv = ua.toArray($('#iv').val());
    var mode = $('input[name="mode"]:checked').attr('id');

    var cipher = new Skipjack(pkey);
    switch (mode) {
        case 'ofb':
            mode = new OFBMode(cipher, iv);
            break;
        case 'cbc':
            mode = new CBCMode(cipher, iv);
            break;

        default:
            mode = new ECBMode(cipher);
    }

    toDecrypt = b64.decode(toDecrypt);
    toDecrypt = mode.decrypt(toDecrypt);
    var result = ua.a8toString(toDecrypt);
    $('#encrypt').val(result).blur().find('+ label').addClass('active');
}

/**
 * Add listeners.
 */
window.onload = function () {
  $("#form").validate({
    errorClass: 'invalid',
    validClass: "valid",
    errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text());
    },
    rules: {
        pkey: {
            required: true,
            minlength: 10,
            maxlength: 10
        },
        iv: {
            required: "#ecb:not(:checked)",
            minlength: 8,
            maxlength: 8
        }
    },
    submitHandler: function (form, event) {
      event.preventDefault();

      var action = form.submited;
      var id = '#' + action;
      var $elem = $(id, form)
      if (!$elem.val()) {
        $elem
          .removeClass('valid')
          .addClass('invalid')
          .find('+ label')
          .attr('data-error', 'Required for ' + action)
        return;
      }
      if (action == 'encrypt') {
        encrypt();
      }
      else {
        decrypt();
      }
    },
    invalidHandler: function () {
      setTimeout(function(){
        $('form input').blur();
      }, 100);
    },
    messages: {
      pkey: {
        required: "Private key is required",
        minlength: "Private key might be 80 bit lenght (10 chars)",
        maxlength: "Private key might be 80 bit lenght (10 chars)"
      },
      iv: {
          required: "Initialize vector is required for this operation mode",
          minlength: "Initialize vector might be 64 bit lenght (8 chars)",
          maxlength: "Initialize vector might be 64 bit lenght (8 chars)"
      }
    }
  });
  var handleFileSelect = function (event) {
      var target = event.target;
      var file = target.files[0];
      target = $(target).attr('data-target');
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          $(target).val(e.target.result).blur().find('+ label').addClass('active');
          $(event.target).val("");
        };
      })(file);

      // Read in the image file as a data URL.
      reader.readAsText(file);
  };
  // Load files.
  document.getElementById('load-encrypt').addEventListener('change', handleFileSelect, false);
  document.getElementById('load-decrypt').addEventListener('change', handleFileSelect, false);

  // Save files.
  $('#save-decrypt, #save-encrypt').click(function(event) {
      var target = $(event.currentTarget);
      var filename = target.attr('data-name');
      var area = $(target.attr('data-target'));

      var blob = new Blob([area.val()], { type: 'text/plain' });

      // If IE.
      if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, filename);
      }
      else {
          var a = window.document.createElement('a');

          a.href = window.URL.createObjectURL(blob);
          a.download = filename;

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
  });
};
