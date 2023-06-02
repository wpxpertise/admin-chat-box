<?php
/**
 * Admin Chat Box Basecontrol
 *
 * This class is used to based control
 *
 * @package ACB\Inc
 */

namespace ACB\Inc;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * ACB_BaseController Class
 *
 * @since 1.0.0
 */
class ACB_BaseController {
	/**
	 * $plugin_url Holds the path of the root directory.
	 *
	 * @var Admin
	 * @since 1.0.0
	 */
	public $plugin_url;
	/**
	 * $plugin Holds the path of the Inc directory.
	 *
	 * @var Admin
	 * @since 1.0.0
	 */

	public $plugin;
	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->plugin_url = plugin_dir_url( dirname( __FILE__, 1 ) ); // Admin-chat-box.
		$this->plugin = plugin_dir_url(__FILE__); // inc.
	}

}
