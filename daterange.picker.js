(function ( $ ) {

	$.fn.dateRangePicker = function(config, callback){				
		var isFallbackPicker = false;
		
		var $dropdown = $('.dropdown');
		var $toggle = $('.dropdown-toggle');
		var $selected = $('.dropdown-selected');
		var $anchors = $('.dropdown-menu a').not('.action-cancel');
		var $parents = $('.dropdown-menu li');
		var $fromDate = $('#fromDate');
		var $toDate = $('#toDate');
		
		// stop propagation (so that dropdown persists)
		$('body').bind('click',function(e){
			if($dropdown.hasClass('open')){
				e.stopPropagation();	
			}
		});
		
		// set default date range (30 days)
		$fromDate.val(moment().subtract(29, 'days').format('YYYY-MM-DD'));
		$toDate.val(moment().format('YYYY-MM-DD'));
		$selected.html(moment($fromDate.val()).format('D MMM, YYYY') +' - '+ moment($toDate.val()).format('D MMM, YYYY'));
		
		// preset click behaviours
		$anchors.on('click', function (e) {			
			e.preventDefault();
			
			var $preset = $(this);	// set reference
			$parents.removeClass('active');			
			$preset.parent('li').addClass('active');
			
			switch ($preset.data('preset')) {
			    case 'Today':
					$fromDate.val(moment().format('YYYY-MM-DD'));
					$toDate.val(moment().format('YYYY-MM-DD'));
			        break;
			    case 'Yesterday':
					$toDate.val(moment().subtract(1, 'days').format('YYYY-MM-DD'));
					$fromDate.val(moment().subtract(1, 'days').format('YYYY-MM-DD'));
			        break;
			    case 'Last 7 days':
					$fromDate.val(moment().subtract(6, 'days').format('YYYY-MM-DD'));
					$toDate.val(moment().format('YYYY-MM-DD'));
			        break;
			    case 'Last 30 days':
					$fromDate.val(moment().subtract(29, 'days').format('YYYY-MM-DD'));
					$toDate.val(moment().format('YYYY-MM-DD'));
			        break;
			    case 'This month':
					$fromDate.val(moment().format('YYYY-MM')+'-01');
					$toDate.val(moment().format('YYYY-MM-DD'));
			        break;
			}
			
			if($preset.data('preset') == 'Custom Range'){
				e.stopPropagation();
				$fromDate.focus();
			}
			else{
				$selected.html(moment($fromDate.val()).format('D MMM, YYYY') +' - '+ moment($toDate.val()).format('D MMM, YYYY'));					
				$toggle.dropdown('toggle');
				
				if(isFallbackPicker){
					$fromDate.datepicker('update');				
					$toDate.datepicker('update');
				}
			}
			
			// callback function
			if (typeof callback == 'function') {
		        callback.call(this);
		    }		
		});
		
		// initialize fallback JS datepicker
		if (!Modernizr.inputtypes.date || $(window).width() > 1024) {
			$fromDate.attr('type','text').datepicker({format:'yyyy-mm-dd',autoclose:true});
			$toDate.attr('type','text').datepicker({format:'yyyy-mm-dd',autoclose:true});
			isFallbackPicker = true;
		}
	};

}( jQuery ));