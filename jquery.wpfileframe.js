/*!
 * jQuery WordPress File Frame - v1.0.0
 * https://github.com/barryceelen/jquery-wpfileframe
 * Copyright (C) 2015  Barry Ceelen
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

/*
 * Opens a WordPress file frame.
 *
 * All scripts, styles, settings, and templates necessary to use
 * the media JS APIs need to be enqueued before using this script.
 *
 * On the post.php or post-new.php admin screens for post types with
 * 'editor' support this is most likely already the case.
 * In all other cases the wp_enqueue_media() function should be called
 * before enqueuing this script.
 *
 * Options:
 *
 * buttonText string optional Label for the select button, defaults to 'Select'.
 * frameTitle string optional Title of the frame. Note: The default english 'Add Media'
 *                            is not automatically translated.
 * mimeType   string optional Only show and allow the user to select files with this mime type.
 *                            Note that the user can still upload files with other mime types
 *                            in the upload view.
 *                            Todo: Can we pass an array of mime types?
 *                            Todo: Can we prevent uploading file types in the uploader?
 * multiple   bool   optional Allow selecting a single or multiple files. Default multiple.
 *
 * Callback:
 *
 * onSelect, returns a JSON object containing data for the selected file(s).
 */
;(function ( $ ) {

  $.fn.wpfileframe = function( options ) {

    if ( typeof wp.media == 'undefined' ) {
      if ( window.console ) {
        console.log( 'wp.media is undefined' );
      }
      return;
    }

    var frame = false;
    var options = $.extend( {}, $.fn.wpfileframe.defaults, options );

    this.each( function() {

      $( this ).on( 'click', function( event ) {
        event.preventDefault();
        openFileFrame();
      });

      return this;
    });

    function openFileFrame() {

      if ( frame ) {
        frame.open();
        return;
      }

      frameOptions = {
        title: options.frameTitle,
        multiple: options.multiple
      }

      if ( options.buttonText ) {
        frameOptions.button = { text: options.buttonText };
      }

      if ( options.mimeType ) {
        frameOptions.library = { type : options.mimeType };
      }

      frame = wp.media.frames.frame = wp.media( frameOptions );

      frame.on( 'select', function() {

        var attachments;

        if ( frame.options.multiple ) {
          attachments = frame.state().get( 'selection' ).toJSON();
        } else {
          attachments = frame.state().get( 'selection' ).first().toJSON();
        }

        options.onSelect( attachments );
      });

      frame.open();
    }
  };

  $.fn.wpfileframe.defaults = {
    buttonText: null,
    frameTitle: 'Add Media',
    mimeType: null,
    multiple: true,
    onSelect: function() {}
  }

}( jQuery ));
