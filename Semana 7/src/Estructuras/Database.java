/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Estructuras;

import java.util.*;

public class Database {

    private String name;
    private String filePath;
    private Map<String, Table> tables;

    public Database(String name, String filePath) {
        this.name = name;
        this.filePath = filePath;
        this.tables = new HashMap<>();
    }

    public void addTable(String tableName) {
        tables.put(tableName, new Table(tableName));
        System.out.println("Tabla creada: " + tableName);
    }

    public Table getTable(String name) {
        return tables.get(name);
    }

    public String getName() {
        return name;
    }
}