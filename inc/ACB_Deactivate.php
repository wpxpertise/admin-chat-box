<?php
/**
 * Admin Chat Box Datatable
 *
 * This class is used to builds all of the tables
 *
 * @package ACB\Inc
 */

namespace ACB\Inc;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * ACB_Deactivate Class fire on deactivation of the plugin.
 *
 * @since 1.0.0
 */
class ACB_Deactivate {
	/**
	 * ACB_deactivate Instance.
	 *
	 * @since  1.0.0
	 */
	public static function ACB_deactivate() {
		flush_rewrite_rules();
	}
}
