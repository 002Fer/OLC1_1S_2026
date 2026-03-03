/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Estructuras;

import java.util.HashMap;
import java.util.Map;

public class RecorData {

    private Map<String, Object> values;

    public RecorData() {
        values = new HashMap<>();
    }

    public void put(String field, Object value) {
        values.put(field, value);
    }

    public Map<String, Object> getValues() {
        return values;
    }

    @Override
    public String toString() {
        return values.toString();
    }
}



