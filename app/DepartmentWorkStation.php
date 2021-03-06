<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DepartmentWorkStation extends Model
{
	protected $table = 'department_work_station';

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }

    public function department()
    {
    	return $this->belongsTo('App\Department');
    }

    public function work_station()
    {
    	return $this->belongsTo('App\WorkStation');
    }
}
