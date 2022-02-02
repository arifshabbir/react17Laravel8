<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Psy\Util\Json;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
//        sleep(1);
        $contacts = Contact::all();

        return response()->json(['status' => 200, "contacts" => $contacts]);
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $contact = new Contact;
        $contact->fullName = $request->fullName;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->save();

        if($contact->save()) {
            return response()->json([
                'status' => 200,
                'message' => "successfully submitted"
            ]);
        }

        return response()->json(['Unable to save data'],422);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        dd('show', $id);
    }

    /**
     * Show the form for editing the specified resource.
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $contact = Contact::find($id);
        if($contact){
            return response()->json(["status" => 200, "contact" => $contact]);
        }

        return response()->json(["contact" => $contact], 599);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        $contact->fullName = $request->fullName;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        if( $contact->save()) {
            return response()->json([
                "status" => 200,
                'message' => "successfully Updated"
            ]);
        }

        return response()->json([
            'message' => "Unable to update Data"
        ], 599);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $delete = Contact::destroy($id);
        if( $delete) {
            return response()->json([
                "status" => 200,
                'message' => "successfully deleted"
            ]);
        }

        return response()->json([
            'message' => "Unable to delete Data"
        ], 599);
    }
}
