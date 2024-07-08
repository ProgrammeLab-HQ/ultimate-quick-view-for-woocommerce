jQuery(document).ready(function($) {
    
	$( ".programmelab-quickview-opener" ).on( "click", function() {
        var _this =  $(this);
        var content = $(this).html();
        var dataJSON = {
            'action': 'prefix_ultimate_quick_view_for_woocommerce_get_product_details',
            'product_id': $(this).data('product_id'),
            'security': ultimate_quick_view_for_woocommerce_ajax_obj.security,
        };
    
        $.ajax({
            cache: false,
            type: "POST",
            url: ultimate_quick_view_for_woocommerce_ajax_obj.ajax_url,
            data: dataJSON,
            beforeSend: function() {
                _this.html('Loading...');
            },
            success: function( response ){
                console.log(response);
                data = $.parseJSON(response);
                if(data.success){
                    $( ".programmelab-quickview-dialog" ).html(data.html);
                    $( ".programmelab-quickview-dialog" ).jmodal({
                        // fadeDuration: 1000,
                        // fadeDelay: 0.50
                        // 
                    });
                    $('.zoom-image').zoom();
                }
            },
            error: function( xhr, status, error ) {
                console.log( 'Status: ' + xhr.status );
                console.log( 'Error: ' + xhr.responseText );
            },
            complete: function() {
                _this.html(content);
            }
        });
		
	});
    
});