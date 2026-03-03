/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Estructuras;

public class Field {

    private String name;
    private String type;

    public Field(String name, String type) {
        this.name = name;
        this.type = type.toLowerCase();
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }
}