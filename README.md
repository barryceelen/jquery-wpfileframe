# jquery.wpfileframe.js

A little helper jquery plugin because I keep forgetting how to do this. Attach to an element to open a WordPress media view with media library and uploader.

On the post.php or post-new.php admin screens for post types with 'editor' support all scripts, styles, settings, and templates necessary to use the media JS APIs are most likely already present. In all other cases the `wp_enqueue_media()` function should be called before enqueuing this script.

```
$('.my-amazing-button').wpfileframe( {
	buttonText: 'Select',             // Default translated 'Select'.
	frameTitle: 'Media View Title',   // Default untranslated 'Select Media'.
	mimeType: 'application/pdf',      // Default all mime types.
	multiple: false,                  // Default 'true'.
	onSelect: function( selection ) { // Called when the user hits the select button.

		// Do stuff with the returned JSON.
		console.log( selection );
	}
});
```
