/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package semana3;

import Analizadores.parser;
import Analizadores.scanner;
import java.io.BufferedReader;
import java.io.StringReader;

/**
 *
 * @author compu
 */
public class Semana3 {



/**
 *
 * @author compu
 */



    /**
     * @param args the command line arguments
     */
     public static void main(String[] args) {
        // TODO code application logic here
        try {
            String texto = """
                           database universidad { 
                           store at \"universidad.json\"; 
                           }; 
                           database ejemplo { 
                           store at \"ejemplo.json\"; 
                           }; 
                           database compi1 {
                           store at \"compi1.json\"; 
                           }; 
                          use ejemplo;
                           
                          
                           """;
            parser p = new parser(new scanner(new BufferedReader(new StringReader(texto))));
            var resultado = p.parse();
            System.out.println(resultado.value);
        }catch(Exception ex){
            System.out.println("Algo salio mal");
        }
    

}
}


