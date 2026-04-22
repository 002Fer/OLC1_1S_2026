import React, { useState, useRef } from 'react';
import axios from 'axios';
import { 
  Play, 
  FileCode, 
  Upload, 
  Terminal, 
  Table as TableIcon,
  Github,
  Zap,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.gst')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setCode(event.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        alert('Por favor selecciona un archivo con extensión .gst');
      }
    }
  };

  const executeCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/interpret', { code });
      setOutput(response.data.output);
      setErrors(response.data.errors);
      setTokens(response.data.tokens);
    } catch (error: any) {
      setOutput(`Error de red o del servidor: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-surface/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20 group">
            <Zap className="w-6 h-6 text-primary fill-primary/20 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent leading-none">
              GoScript IDE
            </h1>
            <p className="text-xs text-white/40 font-medium">Interpreter v1.0.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium"
          >
            <Upload className="w-4 h-4 text-white/60" />
            Abrir archivo .gst
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".gst"
          />
          <button 
            onClick={executeCode}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all font-semibold shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-white" />
            )}
            Run
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Editor Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-bold px-2">
            <Code2 className="w-3 h-3" />
            Source Editor
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Escribe tu código Goscript aquí..."
              className="relative w-full h-full bg-surface border border-white/5 rounded-2xl p-6 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-white/90 placeholder:text-white/10"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="w-[450px] flex flex-col gap-6">
          {/* Console */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-bold px-2">
              <Terminal className="w-3 h-3" />
              Console Output
            </div>
            <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm text-green-400 overflow-auto shadow-inner">
              <pre className="whitespace-pre-wrap">{output || '> Waiting for execution...'}</pre>
            </div>
          </div>

          {/* Tokens/Errors Table */}
          <div className="h-[250px] flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-bold px-2">
              <TableIcon className="w-3 h-3" />
              Symbol Table / Errors
            </div>
            <div className="flex-1 bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-white/60 font-bold uppercase tracking-tighter">
                  <tr>
                    <th className="px-4 py-3">{errors.length > 0 ? 'Tipo' : 'Token'}</th>
                    <th className="px-4 py-3">{errors.length > 0 ? 'Descripción' : 'Lexema'}</th>
                    <th className="px-4 py-3">Fila/Col</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {errors.length > 0 ? (
                    errors.map((err, i) => (
                      <tr key={i} className="hover:bg-red-500/5 transition-colors text-red-100">
                        <td className="px-4 py-3"><span className="bg-red-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-red-400 border border-red-500/20">{err.tipoError}</span></td>
                        <td className="px-4 py-3">{err.descripcion}</td>
                        <td className="px-4 py-3 text-red-400/60">{err.linea}:{err.columna}</td>
                      </tr>
                    ))
                  ) : tokens.length > 0 ? (
                    tokens.map((tk, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors text-white/60">
                        <td className="px-4 py-3"><span className="bg-primary/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-primary border border-primary/20">{tk.type}</span></td>
                        <td className="px-4 py-3 text-white/90">{tk.text}</td>
                        <td className="px-4 py-3 text-white/20">{tk.line}:{tk.col}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-white/20 italic font-sans">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 border-t border-white/5 px-6 flex items-center justify-between bg-surface/30 backdrop-blur-sm text-[10px] text-white/30 font-medium lowercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            Server Connected: localhost:5000
          </span>
          <span>Interpreter Status: Ready</span>
        </div>
        <div className="flex items-center gap-4 uppercase">
          Build with React + Vite + Tailwind
        </div>
      </footer>
    </div>
  );
}

export default App;
