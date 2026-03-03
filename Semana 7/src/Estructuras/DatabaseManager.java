/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Estructuras;

import java.util.HashMap;
import java.util.Map;

public class DatabaseManager {

    private Map<String, Database> databases;  // Mapa para almacenar las bases de datos
    private Database currentDatabase;  // Base de datos activa

    public DatabaseManager() {
        this.databases = new HashMap<>();
        this.currentDatabase = null;
    }

    // Método para agregar una base de datos
    public void addDatabase(String name, String filePath) {
        databases.put(name, new Database(name, filePath));
    }

    // Método para activar una base de datos
    public void useDatabase(String dbName) {
        if (databases.containsKey(dbName)) {
            currentDatabase = databases.get(dbName);
            System.out.println("Se está usando la base de datos: " + currentDatabase.getName());
        } else {
            System.out.println("Error: La base de datos '" + dbName + "' no está definida.");
        }
    }

    // Método para obtener la base de datos activa
    public Database getCurrentDatabase() {
        return currentDatabase;
    }
    public void addTable(String tableName) {
    if (currentDatabase != null) {
        currentDatabase.addTable(tableName);
    }
}

public Table getTable(String tableName) {
    if (currentDatabase != null) {
        return currentDatabase.getTable(tableName);
    }
    return null;
}
}
