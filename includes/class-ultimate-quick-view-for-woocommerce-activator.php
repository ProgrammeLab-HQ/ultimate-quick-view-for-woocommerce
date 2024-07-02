<?php

/**
 * Fired during plugin activation
 *
 * @link       https://www.programmelab.com/
 * @since      1.0.0
 *
 * @package    Ultimate_Quick_View_For_Woocommerce
 * @subpackage Ultimate_Quick_View_For_Woocommerce/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Ultimate_Quick_View_For_Woocommerce
 * @subpackage Ultimate_Quick_View_For_Woocommerce/includes
 * @author     Programmelab <rizvi@programmelab.com>
 */
class Ultimate_Quick_View_For_Woocommerce_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{


		add_option('ultimate_quick_view_for_woocommerce_do_activation_redirect', true);
	}
}
