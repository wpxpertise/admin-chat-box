<?php
/**
 * Admin Chat Box Enqueue
 *
 * This class is used to enqueue ass assets
 *
 * @package ACB\Inc
 */
namespace ACB\Inc;

use \ACB\Inc\ACB_BaseController;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * ACB_FrontChat Class is used laod chat frontend.
 *
 * @since 1.0.0
 */
class ACB_FrontChat {
	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'ACB_public_chat' ] );
		add_action('wp_footer', [ $this, 'add_chatbox_front_widget_panel' ]);
	}
	/**
	 * ACB_public_enqueue loaded here.
	 *
	 * @since  1.0.0
	 */
	public function ACB_public_chat() {
		/**
		 * Chat box text fetch
		 */
		$plugin_url = plugin_dir_url( __FILE__ );

		wp_enqueue_script( 'acb_pub_bootstrap_min_js', $plugin_url . '../assets/library/bootstrap.min.js',[ 'jquery' ],1.0,true );
		wp_enqueue_script( 'acb_pub_seeetalert_min_js', $plugin_url . '../assets/library/sweetalert2@11.js',[ 'jquery' ],1.0,true );
	}

	/**
	 * Get the Template.
	 */
	public function add_chatbox_front_widget_panel() {
		$file = plugin_dir_path(__FILE__) . '../template/ACB_front_chat.php';

		if ( file_exists($file) ) {
			load_template($file,true );
		}
	}

}
