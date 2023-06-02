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
 * ACB_DbTables Class Create Chat box database table
 *
 * @since 1.0.0
 */
final class ACB_DbTables {
	/**
	 * Holds the instance of the option table.
	 *
	 * @since 1.0.0
	 * @var ACB
	 */
	private $sql;
	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		/**
		 * Default setting value.
		 */
		$acb_default_options = [
			'activefirebase' => false,
			'apiKey' => null,
			'appId' => null,
			'authDomain' => null,
			'messagingSenderId' => null,
			'projectId' => null,
			'storageBucket' => null,
		];

		add_option( 'acb_firebase_authentication_value', json_encode($acb_default_options) );
	}

}
