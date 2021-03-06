<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asset;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetController extends Controller
{
    public function purchaseOrders($id)
    {
        $this->id = $id;
        return Asset::with(['asset_purchase_order' => function($query){ $query->where('asset_id', $this->id)->with(['purchase_order' => function($query){ $query->with(['asset_tags' => function($query){ $query->withTrashed();}]); }]); }])->where('id', $this->id)->first();
    }

    public function brands($id)
    {
        return Asset::where('asset_type_id', $id)->groupBy('brand')->get();
    }
    public function checkDuplicate(Request $request, $id)
    {
        $this->validate($request, [
            'brand' => 'required|string',
            'model' => 'required|string',
        ]);

        $asset = $id ? Asset::where('brand', $request->brand)->where('model', $request->model)->whereNotIn('id', [$id])->first() : Asset::where('brand', $request->brand)->where('model', $request->model)->first();

        return response()->json($asset ? true : false);
    }

    public function paginate($id)
    {
        return $assets = Asset::where('asset_type_id', $id)->orderBy('brand')->paginate(10);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'brand' => 'required',
            'model' => 'required',
            'asset_type_id' => 'required|numeric',
        ]);

        $duplicate = Asset::where('brand', $request->brand)->where('model', $request->model)->first();

        if($duplicate){
            return response()->json(true);
        }

        $asset = new Asset;

        $asset->brand = $request->brand;
        $asset->model = $request->model;
        $asset->asset_type_id = $request->asset_type_id;

        $asset->save();

        // Search the activity type
        $activity_type = ActivityType::where('type', 'asset')->where('action', 'create')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset->id;

        $activity->save();

        return $asset->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $asset = Asset::where('id', $id)->with('type', 'details')->with(['asset_tags' => function($query){ $query->with('status'); }])->first();
        $asset->deployed = 0;
        $asset->pulled_out = 0;
        $asset->stocks = 0;

        foreach ($asset->asset_tags as $asset_tag_key => $asset_tag) {
            if(count($asset_tag->status)){
                $asset->pulled_out += 1;
            }
            else if($asset_tag->work_station_id)
            {
                $asset->deployed += 1;
            }
            else if(!$asset_tag->work_station_id){
                $asset->stocks += 1;
            }
        }

        return $asset;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'brand' => 'required',
            'model' => 'required',
        ]);

        $duplicate = Asset::where('brand', $request->brand)->where('model', $request->model)->whereNotIn('id', [$id])->first();

        if($duplicate){
            return response()->json(true);
        }

        $asset = Asset::where('id', $id)->first();

        $asset->brand = $request->brand;
        $asset->model = $request->model;

        $asset->save();

        // Search the activity type
        $activity_type = ActivityType::where('type', 'asset')->where('action', 'update')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset->id;

        $activity->save();

        return $asset->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $asset = Asset::where('id', $id)->first();
        
        // Search the activity type
        $activity_type = ActivityType::where('type', 'asset')->where('action', 'delete')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = Auth::user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset->id;

        $activity->save();

        $asset->delete();
    }
}
