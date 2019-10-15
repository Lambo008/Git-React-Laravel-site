<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'Api\Auth\LoginController@Login')->name('api.login');
Route::get('/getOther', 'Api\PostController@getother')->name('api.getOther');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
})->name('api.getuser');

Route::group(['middleware' => 'api_key'], function () {
    Route::get('/getlistings', 'Api\RoomsController@getlistings');
    Route::get('/getListingDetail', 'Api\RoomsController@getListingDetail');
    Route::get('/getlistingpricedetails', 'Api\RoomsController@getlistingpricedetails');




    /**
     * Manage listing api routes
    */
    Route::post('/createlisting', 'Api\ManageListingController@createRoom');
    Route::post('/addupdatebedroom', 'Api\ManageListingController@addupdatebedroom');
    Route::post('/addupdatebathroom', 'Api\ManageListingController@addupdatebathroom');
    Route::post('/deletebedroom', 'Api\ManageListingController@deletebedroom');
    Route::post('/deletebathroom', 'Api\ManageListingController@deletebathroom');
    Route::post('/update_rooms', 'Api\ManageListingController@update_rooms');
    Route::post('/update_description', 'Api\ManageListingController@update_description');
    Route::post('/finish_address', 'Api\ManageListingController@finish_address');
    Route::post('/update_amenities', 'Api\ManageListingController@update_amenities');
    Route::post('/add_photos', 'Api\ManageListingController@add_photos');
    Route::post('/update_price', 'Api\ManageListingController@update_price');
    Route::post('/update_additional_price', 'Api\ManageListingController@update_additional_price');
    Route::post('/save_reservation', 'Api\ManageListingController@save_reservation');
});

