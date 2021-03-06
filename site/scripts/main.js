/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

Site.handle_scroll = function(event) {
	var header = document.getElementsByTagName('header')[0];

	if (window.scrollY > 0)
		header.classList.add('floating'); else
		header.classList.remove('floating');
};

/**
 * Handle successful form submission.
 */
Site.handle_submission = function(reponse_data) {
	// trigger facebook tracking
	fbq('track', 'Lead');

	// trigger adwords conversion
	var image = new Image();
	image.src = '//www.googleadservices.com/pagead/conversion/880511647/?label=f4FLCPi_omcQn5XuowM&amp;guid=ON&amp;script=0';

	return true;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// handle window scroll
	window.addEventListener('scroll', Site.handle_scroll);
	Site.handle_scroll();

	// handle form submissions
	for (var index in Caracal.ContactForm.list) {
		var contact_form = Caracal.ContactForm.list[index];
		contact_form.events.connect('submit-success', Site.handle_submission);
	}
};


// connect document `load` event with handler function
$(Site.on_load);
