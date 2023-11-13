<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'per_page' =>'nullable|numeric',
            'page' => 'nullable|numeric',
            'order_field' => 'nullable|string',
            'order_direction' => 'nullable|string'
        ];
    }
}
