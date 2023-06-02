<?php
/**
 * Admin Chat Box Activator
 *
 * This class is used to builds all of the tables when the plugin is activated
 *
 * @package ACB\Inc
 */

namespace ACB\Inc;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * Activator Class.
 *
 * @since 1.0.0
 */
class ACB_Activate {

	/**
	 * Activate function, Seed initial settings.
	 *
	 * @since 1.0.0
	 */
	public static function ACB_activate() {
		// Make it static so I can call it direct on a function.
		flush_rewrite_rules();
	}
}
