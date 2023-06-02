<?php
/**
 * Plugin Name: Admin Chat Box
 *
 * @author            Sabbir Sam, devsabbirahmed
 * @copyright         2022- devsabbirahmed
 * @license           GPL-2.0-or-later
 * @package Admin-Chat-Box
 *
 * @wordpress-plugin
 * Plugin Name: Admin Chat Box
 * Plugin URI: https://github.com/sabbirsam/Admin-Chat-Box/tree/free
 * Description: This plugin is a chat system that uses Firebase to authenticate users and store chat messages and photos. Users can converse and exchange information, including images, in real time thanks to the user-friendly design.
 * Version:           2.0.1
 * Requires at least: 5.0 or higher
 * Requires PHP:      5.6 or higher
 * Author:            SABBIRSAM
 * Author URI:        https://github.com/sabbirsam/
 * Text Domain:       acb
 * Domain Path: /languages/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// if direct access than exit the file.
defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
define( 'ADMIN_CHAT_BOX_VERSION', '2.0.0' );
define( 'ADMIN_CHAT_BOX__FILE__', __FILE__ );
define( 'ADMIN_CHAT_BOX_DIR', __DIR__ );
define( 'ADMIN_CHAT_BOX_DIR_PATH', plugin_dir_path( ADMIN_CHAT_BOX__FILE__ ) );
define( 'ADMIN_CHAT_BOX_URL', plugins_url( '', __FILE__ ) );
define( 'ADMIN_CHAT_BOX_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'ADMIN_CHAT_BOX_NAME', plugin_dir_url( __FILE__ ) );

if ( file_exists(dirname(__FILE__) . '/vendor/autoload.php') ) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}

/**
 * All Namespace.
 */
use ACB\Inc\ACB_Route;
use ACB\Inc\ACB_Enqueue;
use ACB\Inc\ACB_DbTables;
use ACB\Inc\ACB_Activate;
use ACB\Inc\ACB_Deactivate;
use ACB\Inc\ACB_AdminDashboard;
use ACB\Inc\ACB_BaseController;

if ( ! class_exists('ACB_AdminChatBox') ) {
	/**
	 * Main plugin class.
	 *
	 * @since 1.0.0
	 */
	class ACB_AdminChatBox {
		/**
		 * Holds the plugin base file
		 *
		 * @since 1.0.0
		 * @var ACB
		 */
		public $admin_chat_box;
		/**
		 * Constructor of the plugin.
		 *
		 * @since 1.0.0
		 * @var ACB
		 */
		public function __construct() {
			$this->includes();
			$this->admin_chat_box = plugin_basename(__FILE__);
		}
		/**
		 * Register
		 */
		public function register() {
			add_action('plugins_loaded', [ $this, 'acb_load' ]);
			add_action('activated_plugin', [ $this, 'acb_plugin_activation' ]);

		}
		/**
		 * Main Plugin Instance.
		 *
		 * Insures that only one instance of the addon exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 */
		public static function acb_load() {
			load_plugin_textdomain('acb', false,dirname(__FILE__) . 'languages');
		}
		/**
		 * Classes instantiating here.
		 */
		public function includes() {
			new ACB_AdminDashboard();
			$enqueue = new ACB_Enqueue();
			$enqueue->register();
			new ACB_DbTables();
			new ACB_BaseController();
			new ACB_Route();

		}
		/**
		 * While active the plugin redirect.
		 *
		 * @param string $plugin redirect to the dashboard.
		 * @since 1.0.0
		 */
		public function acb_plugin_activation( $plugin ) {
			if ( plugin_basename(__FILE__) == $plugin ) {
				wp_redirect(admin_url('admin.php?page=admin_chat_box_setting'));
				die();
			}
		}
		/**
		 * Activation Hook
		 */
		public function acb_activate() {
			ACB_Activate::acb_activate();
		}
		/**
		 * Deactivation Hook
		 */
		public function acb_deactivate() {
			ACB_Deactivate::acb_deactivate();
		}
	}
	/**
	 * Instantiate an Object Class
	 */
	$acb = new ACB_AdminChatBox();
	$acb->register();
	register_activation_hook (ADMIN_CHAT_BOX__FILE__, [ $acb, 'acb_activate' ] );
	register_deactivation_hook (ADMIN_CHAT_BOX__FILE__, [ $acb, 'acb_deactivate' ] );
}
