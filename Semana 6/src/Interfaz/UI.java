/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Interfaz;

import Analizadores.parser;
import Analizadores.scanner;

import javax.swing.*;
import java.awt.*;
import java.awt.datatransfer.DataFlavor;
import java.io.*;
import java.nio.file.Files;
import java.util.List;

public class UI extends JFrame {

    private JTextArea editor;
    private JTextArea consola;
    private JTextArea errores;

    public UI() {
        setTitle("Proyecto ELI - Editor");
        setSize(900, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        initComponents();
    }

    private void initComponents() {

        editor = new JTextArea();
        consola = new JTextArea();
        errores = new JTextArea();

        consola.setEditable(false);
        errores.setEditable(false);

        JScrollPane scrollEditor = new JScrollPane(editor);
        JScrollPane scrollConsola = new JScrollPane(consola);
        JScrollPane scrollErrores = new JScrollPane(errores);

        JTabbedPane tabsSalida = new JTabbedPane();
        tabsSalida.addTab("Salida", scrollConsola);
        tabsSalida.addTab("Errores", scrollErrores);

        JButton btnEjecutar = new JButton("Ejecutar");
        btnEjecutar.addActionListener(e -> ejecutarCodigo());

        JSplitPane split = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                scrollEditor, tabsSalida);

        split.setDividerLocation(300);

        add(split, BorderLayout.CENTER);
        add(btnEjecutar, BorderLayout.SOUTH);

        configurarDragAndDrop();
    }

    private void configurarDragAndDrop() {
        editor.setTransferHandler(new TransferHandler() {
            @Override
            public boolean canImport(TransferSupport support) {
                return support.isDataFlavorSupported(DataFlavor.javaFileListFlavor);
            }

            @Override
            public boolean importData(TransferSupport support) {
                try {
                    List<File> files = (List<File>)
                            support.getTransferable()
                                    .getTransferData(DataFlavor.javaFileListFlavor);

                    File file = files.get(0);
                    String content = Files.readString(file.toPath());
                    editor.setText(content);
                    return true;

                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                return false;
            }
        });
    }

    private void ejecutarCodigo() {
        consola.setText("");
        errores.setText("");

        try {
            String texto = editor.getText();

            scanner s = new scanner(new BufferedReader(new StringReader(texto)));
            parser p = new parser(s);

            var resultado = p.parse();

            if (resultado != null && resultado.value != null) {
                consola.setText(resultado.value.toString());
            }

           

        } catch (Exception ex) {
            errores.setText("Error Sintáctico o de ejecución:\n" + ex.getMessage());
        }
    }
}