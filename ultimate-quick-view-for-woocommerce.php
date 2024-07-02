<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.programmelab.com/
 * @since             1.0.0
 * @package           Ultimate_Quick_View_For_Woocommerce
 *
 * @wordpress-plugin
 * Plugin Name:       Ultimate Quick View for WooCommerce
 * Plugin URI:        https://https://www.programmelab.com/ultimate-quick-view-for-woocommerce/
 * Description:       Ultimate Quick View Plugin for WooCommerce
 * Version:           1.0.0
 * Author:            Programmelab
 * Author URI:        https://www.programmelab.com//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       ultimate-quick-view-for-woocommerce
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_VERSION', '1.0.0');
define('ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_NAME', __('Ultimate Quick View for WooCommerce', 'ultimate-quick-view-for-woocommerce'));
define('ULTIMATE_QUICK_VIEW_FOR_WOOCOMMERCE_PATH', plugin_dir_url(__FILE__));

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-ultimate-quick-view-for-woocommerce-activator.php
 */
function ultimate_quick_view_for_woocommerce_activate()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-ultimate-quick-view-for-woocommerce-activator.php';
	Ultimate_Quick_View_For_Woocommerce_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-ultimate-quick-view-for-woocommerce-deactivator.php
 */
function ultimate_quick_view_for_woocommerce_deactivate()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-ultimate-quick-view-for-woocommerce-deactivator.php';
	Ultimate_Quick_View_For_Woocommerce_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'ultimate_quick_view_for_woocommerce_activate');
register_deactivation_hook(__FILE__, 'ultimate_quick_view_for_woocommerce_deactivate');

require plugin_dir_path(__FILE__) . '/vendor/autoload.php';
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-ultimate-quick-view-for-woocommerce.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function ultimate_quick_view_for_woocommerce_run()
{

	$plugin = new Ultimate_Quick_View_For_Woocommerce();
	$plugin->run();
}
ultimate_quick_view_for_woocommerce_run();
