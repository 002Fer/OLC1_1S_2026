/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Estructuras;

/**
 *
 * @author compu
 */
public class Database {
    String name;
    String filePath;
    
    public Database(String name, String filePath){
        this.name=name;
        this.filePath=filePath;
    }
        // Getter para obtener el nombre de la base de datos
    public String getName() {
        return this.name;
    }

    // Getter para obtener la ruta del archivo
    public String getFilePath() {
        return this.filePath;
    }
}
