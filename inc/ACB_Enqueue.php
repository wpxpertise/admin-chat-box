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
 * ACB_Enqueue Class is used to enqueue ass assets.
 *
 * @since 1.0.0
 */
class ACB_Enqueue extends ACB_BaseController {
	/**
	 * Register Instance.
	 *
	 * @since  1.0.0
	 */
	public function register() {
		add_action( 'admin_enqueue_scripts', [ $this, 'ACB_admin_enqueue' ] );
	}
	/**
	 * This ACB_admin_enqueue function is used to enqueue.
	 *
	 * @param string $screen used to show the current screen path.
	 * @since  1.0.0
	 */
	public function ACB_admin_enqueue( $screen ) {
		/**
		 * Global all screen loaded file
		 */
		if ( 'toplevel_page_admin_chat_box' == $screen || 'admin-chat-box_page_admin_chat_box_setting' == $screen ) {
			wp_enqueue_style( 'acb_main_scss_style', $this->plugin_url . 'build/index.css',[],'1.0.0','all' );

			/**
			 * Main Script enqueue here
			 */
			wp_enqueue_script( 'acb_min_js', $this->plugin_url . 'build/index.js',[ 'jquery', 'wp-element' ],1.0,true );
			wp_localize_script('acb_min_js', 'appLocalizer', [
				'apiUrl' => home_url( '/wp-json' ),
				'nonce' => wp_create_nonce( 'wp_rest'),
			] );
			wp_enqueue_script('acb_min_js');

		}

	}

}

