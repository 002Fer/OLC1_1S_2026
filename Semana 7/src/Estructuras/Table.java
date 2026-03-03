/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Estructuras;

import java.util.*;

public class Table {

    private String name;
    private Map<String, Field> fields;
    private List<RecorData> records;

    public Table(String name) {
        this.name = name;
        this.fields = new LinkedHashMap<>();
        this.records = new ArrayList<>();
    }

    public void addField(String name, String type) {
        fields.put(name, new Field(name, type));
    }

    public void addRecord(Map<String, Object> inputValues) {

        RecorData record = new RecorData();

        for (Field field : fields.values()) {

            if (inputValues.containsKey(field.getName())) {
                record.put(field.getName(), inputValues.get(field.getName()));
            } else {
                // Valor por defecto
                switch (field.getType()) {
                    case "int": record.put(field.getName(), 0); break;
                    case "double": record.put(field.getName(), 0.0); break;
                    case "string": record.put(field.getName(), ""); break;
                    case "boolean": record.put(field.getName(), false); break;
                }
            }
        }

        records.add(record);
        System.out.println("Registro agregado a tabla " + name);
    }

    public void readAll() {
        System.out.println("Tabla: " + name);
        for (RecorData r : records) {
            System.out.println(r);
        }
    }

    public String getName() {
        return name;
    }
}

