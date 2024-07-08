<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://www.programmelab.com/
 * @since      1.0.0
 *
 * @package    Ultimate_Quick_View_For_Woocommerce
 * @subpackage Ultimate_Quick_View_For_Woocommerce/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Ultimate_Quick_View_For_Woocommerce
 * @subpackage Ultimate_Quick_View_For_Woocommerce/public
 * @author     Programmelab <rizvi@programmelab.com>
 */
class Ultimate_Quick_View_For_Woocommerce_Public
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Ultimate_Quick_View_For_Woocommerce_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Ultimate_Quick_View_For_Woocommerce_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */


		wp_enqueue_style($this->plugin_name . '-jquery-modal', ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_PATH  . 'assets/plugins/jquery-modal/jquery.modal.css', array(), $this->version, 'all');

		wp_enqueue_style($this->plugin_name . '-fancyapps', ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_PATH  . 'assets/plugins/fancybox/fancybox.css', array(), $this->version, 'all');

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/ultimate-quick-view-for-woocommerce-public.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Ultimate_Quick_View_For_Woocommerce_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Ultimate_Quick_View_For_Woocommerce_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.		 
		 *
		 */

		wp_enqueue_script($this->plugin_name . '-jquery-modal', ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_PATH  . 'assets/plugins/jquery-modal/jquery.modal.js', array('jquery'), $this->version, false);

		wp_enqueue_script($this->plugin_name . '-fancyapps', ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_PATH  . 'assets/plugins/fancybox/fancybox.umd.js', array('jquery'), $this->version, false);

		wp_enqueue_script($this->plugin_name . '-jquery.zoom', ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_PATH  . 'assets/plugins/jquery-zoom/jquery.zoom.min.js', array('jquery'), $this->version, false);

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/ultimate-quick-view-for-woocommerce-public.js', array('jquery'), $this->version, false);

		wp_enqueue_script($this->plugin_name . '-ajax', plugin_dir_url(__FILE__) . 'js/ultimate-quick-view-for-woocommerce-public-ajax.js', array('jquery'), $this->version, false);
		$ajax_params = array(
			'ajax_url' => admin_url('admin-ajax.php'),
			'security' => esc_attr(wp_create_nonce('ultimate_quick_view_for_woocommerce_security_nonce')),
		);
		wp_localize_script($this->plugin_name . '-ajax', 'ultimate_quick_view_for_woocommerce_ajax_obj', $ajax_params);
	}
	public function ultimate_quick_view_for_woocommerce_customize_woo_hooks()
	{

		$programmelab_ultimate_quick_view_for_woocommerce = get_option('programmelab_ultimate_quick_view_for_woocommerce');
		// var_dump($programmelab_ultimate_quick_view_for_woocommerce);
		// 

		add_action('woocommerce_before_shop_loop_item_title', function () {
			echo '<span class="woocommerce-loop-product__thumbnail-wrapper">';
		}, 9);
		if ($programmelab_ultimate_quick_view_for_woocommerce["quickview_enable_for_product"]) {
			add_action('woocommerce_before_shop_loop_item_title', function () {
				global $product;
				$show = $this->ultimate_quick_view_for_woocommerce_enable_quickview($product->get_id());
				if ($show) {
					$feature_image_id = $product->get_image_id();
					$feature_image_url = $feature_image_id ? wp_get_attachment_url($feature_image_id) : '';
					$gallery_image_ids = $product->get_gallery_image_ids();
					if ($feature_image_url) {
						echo '<span class="programmelab-fancybox-gallery">';
						echo '<span data-fancybox="gallery-' . esc_html($product->get_id()) . '" data-src="' . esc_url($feature_image_url) . '">Zoom</span>';
						if ($gallery_image_ids) {
							foreach ($gallery_image_ids as $attachment_id) {
								echo '<span data-fancybox="gallery-' . esc_html($product->get_id()) . '" data-src="' . esc_url(wp_get_attachment_url($attachment_id)) . '">Image - ' . esc_html($attachment_id) . '</span>';
							}
						}
						echo '</span>';
					}
					echo '</span">';
				}
			}, 11);
		}
		add_action('woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_link_close', 12);
		add_action('woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_link_open', 13);
		$quick_view_button_position = 9;
		// $current_theme = wp_get_theme();
		// var_dump(get_option('stylesheet'));
		if (get_option('stylesheet') == 'astra' || get_option('stylesheet') == 'oceanwp') {
			$quick_view_button_position = 9999;
		}
		// Change the quickview button position below the add to cart button 9 to 11
		add_action('woocommerce_after_shop_loop_item', function () {
			global $product;
			$show = $this->ultimate_quick_view_for_woocommerce_enable_quickview($product->get_id());
			// var_dump($show);
			if ($show)	echo '<div class="programmelab-quickview-opener-wrapper wp-block-button wc-block-components-product-button  is-style-fill  align-center"><button class="button wp-block-button__link wp-element-button wc-block-components-product-button__button has-font-size has-x-small-font-size has-text-align-center wc-interactive programmelab-quickview-opener" data-product_id="' . esc_html($product->get_id()) . '">' . esc_html__('Quick View', 'ultimate-quick-view-for-woocommerce') . '</button></div>';
		}, $quick_view_button_position);
		add_action('woocommerce_after_main_content', function () {
			global $product;
			echo '<div class="programmelab-quickview-dialog" style="display: none">Loading...</div>';
		}, 999);
	}
	public function ultimate_quick_view_for_woocommerce_enable_quickview($product_id)
	{
		$programmelab_ultimate_quick_view_for_woocommerce = get_option('programmelab_ultimate_quick_view_for_woocommerce');

		$show_meta = false;
		if (@$programmelab_ultimate_quick_view_for_woocommerce['quickview_category_for'] == 'all') {
			$show_meta = true;
		} else {
			$cat_ids = $allowed_cats = [];
			$categories_for_the_current_post = get_the_terms($product_id, 'product_cat');
			if (@$categories_for_the_current_post && sizeof($categories_for_the_current_post)) {
				foreach ($categories_for_the_current_post as $category) {
					$cat_ids[] = $category->term_id;
				}
			}
			if (is_array($programmelab_ultimate_quick_view_for_woocommerce['quickview_categories']) && sizeof($programmelab_ultimate_quick_view_for_woocommerce['quickview_categories'])) {
				$allowed_cats = [];
				foreach ($programmelab_ultimate_quick_view_for_woocommerce['quickview_categories'] as $cat) {
					$allowed_cats[] = $cat["value"];
				}
			}

			$result = [];
			$result = array_intersect($cat_ids, $allowed_cats);
			if (sizeof($result)) $show_meta = true;
		}
		/*
		* 
		*/
		return $show_meta;
	}

	// Callback function
	public function ultimate_quick_view_for_woocommerce_get_product_details()
	{

		if (!wp_verify_nonce(sanitize_text_field(wp_unslash(@$_POST['security'])), 'ultimate_quick_view_for_woocommerce_security_nonce')) {
			wp_send_json_error(esc_html__("Nonce validation failed.", "ultimate-quick-view-for-woocommerce"));
			die();
		}

		if (!$_POST['product_id']) {
			wp_send_json_error(esc_html__("Necessary variables not set.", "ultimate-quick-view-for-woocommerce"));
			die();
		}


		$html = "";
		global $post;
		$product = wc_get_product($_POST['product_id']);



		if ($product->get_id()) {
			$ret['success'] = 1;
			$programmelab_ultimate_quick_view_for_woocommerce = get_option('programmelab_ultimate_quick_view_for_woocommerce');
			ob_start();
?>
			<div class="single-product">
				<div id="product-<?php echo esc_html($product->get_id()) ?>" class="product">
					<?php if ($product->get_image_id()) : ?>
						<div class="woocommerce-product-gallery ultimate-quick-view-for-woocommerce-woocommerce-product-gallery">
							<div class="woocommerce-product-gallery__wrapper <?php echo ($programmelab_ultimate_quick_view_for_woocommerce["quickview_enable_zoom"]) ? 'zoom-image' : '' ?>" data-img="<?php echo esc_url(wp_get_attachment_url($product->get_image_id())) ?>">
								<?php echo wp_get_attachment_image($product->get_image_id(), 'full', "", array('class' => 'quickview-feature-image')); ?>
							</div>
							<?php
							$gallery_image_ids = $product->get_gallery_image_ids();
							if ($gallery_image_ids && is_array($gallery_image_ids)) :
							?>
								<ol class="flex-control-nav flex-control-thumbs quickview-control-thumbs">
									<li class="active">
										<?php echo wp_get_attachment_image($product->get_image_id(), 'woocommerce_gallery_thumbnail', "", array("class" => "img-responsive programmelab-quickview-gallery-image", "data-src" => esc_url(wp_get_attachment_url($product->get_image_id()))));  ?>
									</li>
									<?php foreach ($gallery_image_ids as $image_id) : ?>
										<li>
											<?php echo wp_get_attachment_image($image_id, array('100', '100'), false, array("class" => "programmelab-quickview-gallery-image", "data-src" => esc_url(wp_get_attachment_url($image_id))));  ?>
										</li>
									<?php endforeach; ?>
								</ol>
							<?php endif ?>
							<?php if ($programmelab_ultimate_quick_view_for_woocommerce["quickview_enable_full_details"]) : ?>
								<a href="<?php echo esc_url(get_the_permalink($product->get_id())) ?>" class="quickview-full-details-button button alt"><?php echo esc_html__('View Full Details', 'ultimate-quick-view-for-woocommerce') ?></a>
							<?php endif ?>
						</div>
					<?php endif ?>
					<div class="summary entry-summary">
						<h1 class="product_title entry-title"><?php echo esc_html($product->get_name()) ?></h1>
						<p class="price">
							<?php echo wp_kses_post($product->get_price_html()) ?>
						</p>
						<div class="woocommerce-product-details__short-description">
							<?php echo wp_kses_post($product->get_short_description()) ?>
						</div>
						<?php
						if ($programmelab_ultimate_quick_view_for_woocommerce["quickview_enable_cart_button"]) {
							if ($product->get_type() == 'simple') {
								if ($product->is_purchasable()) {
									echo '<form class="cart" action="" method="post" enctype="multipart/form-data"><div class="quantity"><label class="screen-reader-text" for="quantity_' . esc_html($product->get_id()) . '">' . esc_html($product->get_name()) . ' quantity</label><input type="number" id="quantity_' . esc_html($product->get_id()) . '" class="input-text qty text" name="quantity" value="1" aria-label="Product quantity" size="4" min="1" max="" step="1" placeholder="" inputmode="numeric" autocomplete="off"></div><button type="submit" name="add-to-cart" value="' . esc_html($product->get_id()) . '" class="single_add_to_cart_button button alt">' . esc_html($product->add_to_cart_text()) . '</button></form>';
								}
							} elseif ($product->get_type() == 'variable') {
								echo '<div class="quickview-cart-button-wrap"><a href="' . esc_url(get_the_permalink($product->get_id())) . '" data-quantity="1" class="button product_type_variable add_to_cart_button alt" data-product_id="' . esc_html($product->get_id()) . '" data-product_sku="' . esc_html($product->get_sku()) . '" aria-label="' . esc_html($product->add_to_cart_text()) . ' for “' . esc_html($product->get_name()) . '”" aria-describedby="This product has multiple variants. The options may be chosen on the product page" rel="nofollow">' . esc_html($product->add_to_cart_text()) . '</a></div>';
							} elseif ($product->get_type() == 'grouped') {
								echo '<div class="quickview-cart-button-wrap"><a href="' . esc_url(get_the_permalink($product->get_id())) . '" data-quantity="1" class="button product_type_grouped alt" data-product_id="' . esc_html($product->get_id()) . '" data-product_sku="' . esc_html($product->get_sku()) . '" aria-label="' . esc_html($product->add_to_cart_text()) . ' in the “' . esc_html($product->get_name()) . '” group" aria-describedby="" rel="nofollow">' . esc_html($product->add_to_cart_text()) . '</a></div>';
							} elseif ($product->get_type() == 'external') {
								$product_url = (get_post_meta($product->get_id(), '_product_url', true)) ? get_post_meta($product->get_id(), '_product_url', true) : get_the_permalink($product->get_id());
								echo '<div class="quickview-cart-button-wrap"><a href="' . esc_url($product_url) . '" data-quantity="1" class="button product_type_external alt" data-product_id="' . esc_html($product->get_id()) . '" data-product_sku="' . esc_html($product->get_sku()) . '" aria-label="' . esc_html($product->add_to_cart_text()) . '" aria-describedby="" rel="nofollow">' . esc_html($product->add_to_cart_text()) . '</a></div>';
							}
						}
						?>
						<div class="product_meta">
							<?php if ($product->get_sku()) : ?>
								<span class="sku_wrapper"><?php echo esc_html__('SKU', 'ultimate-quick-view-for-woocommerce') ?>: <span class="sku"><?php echo esc_html($product->get_sku()) ?></span></span>
							<?php endif ?>
							<?php $categories = $product->get_category_ids(); ?>
							<?php if ($categories && is_array($categories)) : ?>
								<span class="posted_in"><?php echo esc_html__('Category', 'ultimate-quick-view-for-woocommerce') ?>:
									<?php foreach ($categories as $id) : ?>
										<?php
										$term = get_term($id);
										// $taxonomy = get_taxonomy($term->taxonomy);
										$term_link = get_term_link($term);
										?>
										<a href="<?php echo esc_url($term_link) ?>" rel="tag"><?php echo esc_html($term->name) ?></a>
									<?php endforeach ?>
								</span>
							<?php endif ?>
						</div>
					</div>
				</div>
			</div>
<?php
			$html = ob_get_clean();
			$ret['html'] = $html;
		}
		die(wp_json_encode($ret));
	}
}
