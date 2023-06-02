<?php
/**
 * Admin Chat Box Rest Route
 *
 * This class is used to response and all rest route works
 *
 * @package ACB\Inc
 */

namespace ACB\Inc;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * ACB_Route used to rest route created
 *
 * @since 1.0.0
 */
class ACB_Route {

	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
        add_action( 'rest_api_init', array( $this, 'acb_create_rest_route' ) ); 
	}
	/**
	 * Admin Menu pages
	 *
	 * @since 1.0.0
	 */
    public function acb_create_rest_route(){
        /**
         * Credentials: Save
         */
        register_rest_route( 'acb/v1', '/firebasecredentials',[
            'methods'=>'POST',
            'callback'=>[$this, 'set_credentials'],
            'permission_callback' => [$this, 'set_credentials_permission']
        ] );

        /**
         * Credentials: GET
         */
        register_rest_route( 'acb/v1', '/getfirebasecredentials',[
            'methods'=>'GET',
            'callback'=>[$this, 'get_credentials'],
            'permission_callback' => [$this, 'get_credentials_permission']
        ] );
    }

	/**
	 * Setting page.
	 *
	 * @since 1.0.0
	 */
	public function set_credentials( $req ){
        $toogle    =  isset( $req['activefirebase'] ) ? sanitize_text_field( wp_unslash($req['activefirebase']) ) : 0;
        $apiKey    = isset( $req['apiKey'] ) ? sanitize_text_field( wp_unslash($req['apiKey']) ) : null;
        $appId    = isset( $req['appId'] ) ? sanitize_text_field( wp_unslash($req['appId']) ) : null;
        $authDomain    = isset( $req['authDomain'] ) ? sanitize_text_field( wp_unslash($req['authDomain']) ) : null;
        $messagingSenderId    = isset( $req['messagingSenderId'] ) ? sanitize_text_field( wp_unslash($req['messagingSenderId']) ) : null;
        $projectId    = isset( $req['projectId'] ) ? sanitize_text_field( wp_unslash($req['projectId']) ) : null;
        $storageBucket    = isset( $req['storageBucket'] ) ? sanitize_text_field( wp_unslash($req['storageBucket']) ) : null;

        $acb_update_options = [
			'activefirebase' =>  $toogle, //isset($_GET['username']) ? $_GET['username'] : 'not passed';
			'apiKey' => $apiKey,
			'appId' => $appId,
			'authDomain' => $authDomain,
			'messagingSenderId' =>  $messagingSenderId,
			'projectId' => $projectId,
			'storageBucket' =>  $storageBucket,
		];
        // print_r($acb_update_options);
        update_option( 'acb_firebase_authentication_value', json_encode($acb_update_options) );

        if($acb_update_options){
            return rest_ensure_response(1);
            wp_die();
        }else{
            return rest_ensure_response(0);
            wp_die();
        }

    }
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function set_credentials_permission(){
            $details_info = wp_get_current_user();
            $allowed_roles = array( 'editor', 'administrator');
            if ( array_intersect( $allowed_roles, $details_info->roles ) ) {
                return true;
            }else {
                 return false;
            }
            // return true;
     } 

    /**
     * Rest route get permission
     * 
     */
    public function get_credentials(){
        $get_credentials = get_option( 'acb_firebase_authentication_value');
        $credentials_keys = json_decode($get_credentials);

        $activefirebase = $credentials_keys->activefirebase;
        $apiKey = $credentials_keys->apiKey;
        $appId = $credentials_keys->appId;
        $authDomain = $credentials_keys->authDomain;
        $messagingSenderId = $credentials_keys->messagingSenderId;
        $projectId = $credentials_keys->projectId;
        $storageBucket = $credentials_keys->storageBucket;

         $raw_input_data = array(
            'toogle'=>$activefirebase,
            'apiKey'=>$apiKey,
            'appId'=>$appId,
            'authDomain'=>$authDomain,
            'messagingSenderId'=>$messagingSenderId,
            'projectId'=>$projectId,
            'storageBucket'=>$storageBucket,
        );

        return rest_ensure_response($raw_input_data);              
    } 
    public function get_credentials_permission(){
        return true;
    }  

}
