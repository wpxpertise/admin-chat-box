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
 * Admin dashboard created
 *
 * @since 1.0.0
 */
class ACB_AdminDashboard {

	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action('admin_menu', [ $this, 'add_chatbox_pages' ]);
	}
	/**
	 * Admin Menu pages
	 *
	 * @since 1.0.0
	 */
	public function add_chatbox_pages() {
		$icon = plugin_dir_url(__FILE__) . '../assets/logo.png';
		add_menu_page(
			__( 'Admin Chat Box', 'acb' ),
			__( 'Admin Chat Box', 'acb' ),
			'read',
			'admin_chat_box',
			[ $this, 'ACB_chat_pages' ],
			$icon,
			3 );
		add_submenu_page(
			'admin_chat_box', 'Dashboard', 'Dashboard', 'read', 'admin_chat_box',
			[ $this, 'ACB_chat_pages' ]
		);
		add_submenu_page(
			'admin_chat_box', 'Settings', 'Settings', 'manage_options', 'admin_chat_box_setting',
			[ $this, 'ACB_setting' ]
		);
	}

	/**
	 * Dashboard page
	 *
	 * @since 1.0.0
	 */
	public function ACB_chat_pages() {
		require_once plugin_dir_path(__FILE__) . '../template/ACB_dashboard.php';
	}
	/**
	 * Setting page
	 *
	 * @since 1.0.0
	 */
	public function ACB_setting() {
		 require_once plugin_dir_path(__FILE__) . '../template/ACB_setting.php';
	}

}
