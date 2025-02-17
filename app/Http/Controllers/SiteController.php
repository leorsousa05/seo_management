<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        $sites = Site::all();
        return response()->json($sites);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name'    => 'required|string|max:255',
            'domain'  => 'required|string|max:255|unique:sites'
        ]);

        $site = Site::create($data);

        return response()->json($site, 201);
    }

    public function show($id)
    {
        $site = Site::findOrFail($id);
        return response()->json($site);
    }

    public function update(Request $request, $id)
    {
        $site = Site::findOrFail($id);

        $data = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'name'    => 'sometimes|required|string|max:255',
            'domain'  => 'sometimes|required|string|max:255|unique:sites,domain,'.$site->id
        ]);

        $site->update($data);

        return response()->json($site);
    }

    public function destroy($id)
    {
        $site = Site::findOrFail($id);
        $site->delete();
        return response()->json(null, 204);
    }
}

