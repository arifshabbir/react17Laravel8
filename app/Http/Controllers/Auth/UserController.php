<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    /**
     * Create a new user instance after a valid registration.
     *
     * @param Request $request
     * @return mixed
     */
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:255|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $token = $user->createToken($user->email . '_token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'user' => $user->name,
            'token' => $token,
            'message' => 'Successfully registered a new user'
        ]);

    }

    /**
     * Login user after a valid registration.
     *
     * @param Request $request
     * @return mixed
     */
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        $user = User::where('email', $request['email'])->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials'
            ]);
        }

        $token = $user->createToken($user->email . '_token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'user' => $user->name,
            'token' => $token,
            'message' => 'Logged in Successfully.'
        ]);

    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        return response()->json([
            "status" => 200,
            "message"=> "logged out successfully"
        ]);

        auth()->user()->token()->delete();
        return response()->json([
            "status" => 200,
            "message"=> "logged out successfully"
        ]);
    }
}
