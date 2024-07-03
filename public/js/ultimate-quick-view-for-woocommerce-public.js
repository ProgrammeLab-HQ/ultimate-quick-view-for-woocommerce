jQuery(document).ready(function($) {   
	Fancybox.bind('[data-fancybox]', {
		// Your custom options
	}); 
	$('body').on('click', '.programmelab-quickview-gallery-image', function(){
		var src = $(this).data('src');
		var srcset =$(this).attr('srcset');
		// console.log(src);
		// console.log(srcset);
		// console.log('clicked');
		$(this).closest('.woocommerce-product-gallery').find('.quickview-feature-image').attr({'src':src, 'srcset':srcset});//{attribute:value, attribute:value,...}
		$(this).closest('.woocommerce-product-gallery').find('.zoomImg').attr('src',src);
		$(this).closest('li').addClass('active').siblings('li').removeClass('active');
	}); 

});
