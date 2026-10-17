import React, { useRef, useState, useEffect } from 'react';
import { 
  Brush, 
  RotateCcw, 
  Download, 
  Trash2, 
  Sparkles, 
  ArrowLeft, 
  HelpCircle, 
  Volume2, 
  Check, 
  Eraser,
  PenTool,
  Feather,
  CircleDot,
  Droplet,
  Palette as PaletteIcon,
  Layers,
  Activity,
  Bot
} from 'lucide-react';
import { soundEffects, speechNarrator } from '../utils/audio';

interface VirtualLabDrawingProps {
  onBack: () => void;
  onUnlockBadge: (badgeId: string) => void;
  studentName: string;
}

type ToolMode = 'arsir' | 'dussel' | 'pointilis' | 'aquarel' | 'plakat' | 'blok' | 'linear' | 'eraser';
type TemplateType = 'apple' | 'sphere' | 'vase' | 'blank';

export const VirtualLabDrawing: React.FC<VirtualLabDrawingProps> = ({
  onBack,
  onUnlockBadge,
  studentName
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<ToolMode>('arsir');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [brushColor, setBrushColor] = useState<string>('#1e293b');
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('apple');
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [usedTools, setUsedTools] = useState<Set<ToolMode>>(new Set(['arsir']));
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAiEvaluating, setIsAiEvaluating] = useState<boolean>(false);

  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Predefined student art palettes
  const paletteColors = [
    { label: 'Pensil 6B (Pekat)', hex: '#0f172a' },
    { label: 'Pensil 2B (Abu Gelap)', hex: '#334155' },
    { label: 'Pensil HB (Abu Sedang)', hex: '#64748b' },
    { label: 'Pensil 2H (Abu Tipis)', hex: '#94a3b8' },
    { label: 'Merah Cat Poster', hex: '#ef4444' },
    { label: 'Kuning Oker', hex: '#f59e0b' },
    { label: 'Biru Kobalt', hex: '#2563eb' },
    { label: 'Hijau Daun', hex: '#10b981' },
    { label: 'Ungu Grafit', hex: '#7c3aed' },
    { label: 'Cokelat Tanah', hex: '#78350f' },
  ];

  // Draw template outlines
  const drawTemplateGuide = (ctx: CanvasRenderingContext2D, type: TemplateType, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = '#cbd5e1';
    ctx.fillStyle = '#f8fafc';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    if (type === 'apple') {
      // Draw Apple Template
      const cx = width / 2;
      const cy = height / 2 - 10;
      
      // Apple body
      ctx.beginPath();
      ctx.moveTo(cx, cy - 80);
      ctx.bezierCurveTo(cx - 70, cy - 120, cx - 140, cy - 30, cx - 100, cy + 60);
      ctx.bezierCurveTo(cx - 70, cy + 130, cx - 20, cy + 120, cx, cy + 105);
      ctx.bezierCurveTo(cx + 20, cy + 120, cx + 70, cy + 130, cx + 100, cy + 60);
      ctx.bezierCurveTo(cx + 140, cy - 30, cx + 70, cy - 120, cx, cy - 80);
      ctx.stroke();

      // Stem (Tangkai)
      ctx.setLineDash([]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 80);
      ctx.quadraticCurveTo(cx - 15, cy - 125, cx - 10, cy - 135);
      ctx.stroke();

      // Leaf (Daun)
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy - 110);
      ctx.quadraticCurveTo(cx + 40, cy - 135, cx + 55, cy - 110);
      ctx.quadraticCurveTo(cx + 25, cy - 90, cx - 5, cy - 110);
      ctx.stroke();

      // Shadow floor guideline
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.ellipse(cx + 60, cy + 115, 90, 16, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Guidance Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('💡 Sorot Cahaya (Kiri Atas)', cx - 110, cy - 105);
      ctx.fillText('🌑 Zona Arsir Gelap (Kanan Bawah)', cx + 40, cy + 85);
      ctx.fillText('〰️ Bayangan Jatuh (Cast Shadow)', cx + 40, cy + 145);
    } else if (type === 'sphere') {
      // Geometric Sphere
      const cx = width / 2;
      const cy = height / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Floor cast shadow guideline
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.ellipse(cx + 50, cy + 105, 110, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('💡 Highlight', cx - 50, cy - 60);
      ctx.fillText('🌑 Core Shadow', cx + 20, cy + 40);
    } else if (type === 'vase') {
      // Ceramic Vase
      const cx = width / 2;
      const cy = height / 2;
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy - 120);
      ctx.lineTo(cx + 40, cy - 120);
      ctx.bezierCurveTo(cx + 30, cy - 70, cx + 80, cy - 20, cx + 70, cy + 70);
      ctx.bezierCurveTo(cx + 60, cy + 120, cx - 60, cy + 120, cx - 70, cy + 70);
      ctx.bezierCurveTo(cx - 80, cy - 20, cx - 30, cy - 70, cx - 40, cy - 120);
      ctx.stroke();

      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.ellipse(cx + 40, cy + 110, 80, 18, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  };

  // Initialize canvas
  const initCanvas = (template: TemplateType = activeTemplate) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (template !== 'blank') {
      drawTemplateGuide(ctx, template, canvas.width, canvas.height);
    }

    // Save initial state for undo
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  };

  useEffect(() => {
    initCanvas(activeTemplate);
  }, [activeTemplate]);

  // Check badge criteria (if 3 tools used, unlock badge b2)
  useEffect(() => {
    if (usedTools.size >= 3) {
      onUnlockBadge('b2');
    }
  }, [usedTools, onUnlockBadge]);

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-12), data]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    soundEffects.click();
    const newHistory = [...history];
    newHistory.pop(); // remove current
    const previous = newHistory[newHistory.length - 1];
    setHistory(newHistory);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !previous) return;
    ctx.putImageData(previous, 0, 0);
  };

  const handleClear = () => {
    soundEffects.click();
    initCanvas(activeTemplate);
  };

  const handleDownload = () => {
    soundEffects.fanfare();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Karya_Seni_${selectedTool}_${studentName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Helper to get coordinates
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  // 7 Realistic Techniques Brush Drawing Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const coords = getCoordinates(e);
    lastPos.current = coords;
    drawStroke(coords.x, coords.y, true);
    soundEffects.pencilScratch();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPos.current = null;
      saveHistoryState();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    drawStroke(coords.x, coords.y, false);
    lastPos.current = coords;
  };

  const drawStroke = (x: number, y: number, isFirst: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const from = lastPos.current || { x, y };

    ctx.save();

    switch (selectedTool) {
      case 'arsir': {
        // Hatching & Cross-Hatching: Draws multiple fine parallel diagonal lines across the stroke trajectory
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = Math.max(1, brushSize / 10);
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.5;

        const distance = Math.hypot(x - from.x, y - from.y) || 1;
        const steps = Math.max(1, Math.floor(distance / 4));
        
        for (let i = 0; i <= steps; i++) {
          const interpX = from.x + (x - from.x) * (i / steps);
          const interpY = from.y + (y - from.y) * (i / steps);

          // Diagonal hatch slant
          const hatchLen = brushSize * 1.2;
          ctx.beginPath();
          ctx.moveTo(interpX - hatchLen / 2, interpY - hatchLen / 2);
          ctx.lineTo(interpX + hatchLen / 2, interpY + hatchLen / 2);
          ctx.stroke();

          // Occasionally cross-hatch if brush size is bigger
          if (brushSize > 18 && i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(interpX + hatchLen / 2, interpY - hatchLen / 2);
            ctx.lineTo(interpX - hatchLen / 2, interpY + hatchLen / 2);
            ctx.stroke();
          }
        }
        break;
      }

      case 'dussel': {
        // Dussel / Smudge: Soft blending gradient circle
        const radius = brushSize * 1.5;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, brushColor);
        grad.addColorStop(0.3, brushColor + '80');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.12; // soft smudge build up
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'pointilis': {
        // Stippling: Scatter cluster of dots
        ctx.fillStyle = brushColor;
        const dotCount = Math.floor(brushSize * 0.8);
        const radius = brushSize * 1.2;

        for (let i = 0; i < dotCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random()) * radius;
          const dotX = x + Math.cos(angle) * r;
          const dotY = y + Math.sin(angle) * r;
          const dotSize = Math.random() * 1.8 + 0.8;

          ctx.globalAlpha = 0.7 + Math.random() * 0.3;
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'aquarel': {
        // Watercolor Wash: Transparent layering with soft edge
        ctx.strokeStyle = brushColor;
        ctx.fillStyle = brushColor;
        ctx.lineWidth = brushSize * 1.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.08; // very translucent layering

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Edge water bead bloom
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'plakat': {
        // Opaque Poster Color: Thick, fully opaque strokes
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize * 1.4;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        ctx.globalAlpha = 1.0; // 100% opaque

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      }

      case 'blok': {
        // Silhouette Block: Solid fill stroke
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#000000';
        ctx.lineWidth = brushSize * 2.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1.0;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      }

      case 'linear': {
        // Linear Contour Line Art: Clean, sharp line
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = Math.max(1.5, brushSize / 4);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.95;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      }

      case 'eraser': {
        // Precision Eraser
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = brushSize * 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1.0;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  };

  const handleSelectTool = (tool: ToolMode) => {
    soundEffects.click();
    setSelectedTool(tool);
    setUsedTools(prev => new Set(prev).add(tool));
  };

  // AI Art Evaluator
  const evaluateArtwork = () => {
    soundEffects.fanfare();
    setIsAiEvaluating(true);
    speechNarrator.speak('Maestro Seno sedang menganalisis karya gambarmu!');

    setTimeout(() => {
      setIsAiEvaluating(false);
      let feedback = '';
      if (selectedTool === 'arsir') {
        feedback = `Luar biasa, ${studentName}! Garis arsir yang kamu goreskan sudah mulai memperlihatkan ilusi volume 3D. Pastikan kerapatan garis pada zona bayangan inti (core shadow) lebih padat daripada bagian midtone ya!`;
      } else if (selectedTool === 'dussel') {
        feedback = `Bagus sekali, ${studentName}! Transisi dussel yang kamu buat terlihat sangat lembut bagai kabut sutra. Jangan lupa sisakan sedikit titik putih bersih untuk sorot cahaya (highlight)!`;
      } else if (selectedTool === 'pointilis') {
        feedback = `Hebat dan sangat teliti, ${studentName}! Kesabaranmu menyusun titik-titik pointilis sungguh membuahkan tekstur rupa yang kaya. Terus tingkatkan kepadatan titik pada sisi bayangan jatuh.`;
      } else if (selectedTool === 'aquarel') {
        feedback = `Sapuan cat airmu terlihat segar dan tembus pandang, ${studentName}! Karakter transparan khas aquarel sudah tampak nyata.`;
      } else {
        feedback = `Karya yang impresif, ${studentName}! Karakter goresan ${selectedTool.toUpperCase()} sudah tertata rapi. Kamu siap melanjutkan ke misi Mini Games!`;
      }
      setAiFeedback(feedback);
      speechNarrator.speak(feedback);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Template Selectors */}
          <span className="text-xs text-slate-400 font-semibold hidden md:inline">Template:</span>
          {(['apple', 'sphere', 'vase', 'blank'] as TemplateType[]).map((tmpl) => (
            <button
              key={tmpl}
              onClick={() => {
                soundEffects.click();
                setActiveTemplate(tmpl);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-fun font-bold transition cursor-pointer border ${
                activeTemplate === tmpl
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {tmpl === 'apple' ? '🍎 Apel 3D' :
               tmpl === 'sphere' ? '⚪ Bola Geometris' :
               tmpl === 'vase' ? '🏺 Guci Nusantara' : '📄 Kanvas Bebas'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Toolbar: 7 Technique Brushes & Settings */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tool Selector Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl">
            <h3 className="font-fun text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
              <Brush className="w-4 h-4 text-amber-400" /> Pilih Kuas Teknik
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectTool('arsir')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'arsir'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <PenTool className="w-4 h-4 text-blue-300" /> Arsir
              </button>

              <button
                onClick={() => handleSelectTool('dussel')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'dussel'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Feather className="w-4 h-4 text-purple-300" /> Dussel
              </button>

              <button
                onClick={() => handleSelectTool('pointilis')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'pointilis'
                    ? 'bg-pink-600 text-white border-pink-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <CircleDot className="w-4 h-4 text-pink-300" /> Pointilis
              </button>

              <button
                onClick={() => handleSelectTool('aquarel')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'aquarel'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Droplet className="w-4 h-4 text-cyan-300" /> Aquarel
              </button>

              <button
                onClick={() => handleSelectTool('plakat')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'plakat'
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <PaletteIcon className="w-4 h-4 text-amber-300" /> Plakat
              </button>

              <button
                onClick={() => handleSelectTool('blok')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'blok'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4 text-emerald-300" /> Blok
              </button>

              <button
                onClick={() => handleSelectTool('linear')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'linear'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Activity className="w-4 h-4 text-indigo-300" /> Linear
              </button>

              <button
                onClick={() => handleSelectTool('eraser')}
                className={`p-2.5 rounded-xl text-xs font-fun font-bold text-left flex items-center gap-2 border transition ${
                  selectedTool === 'eraser'
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Eraser className="w-4 h-4 text-rose-300" /> Penghapus
              </button>
            </div>
          </div>

          {/* Size & Palette Adjuster */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-bold mb-1.5">
                <span>Ukuran Kuas</span>
                <span className="text-amber-400">{brushSize} px</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Palet Warna Seniman
              </span>
              <div className="grid grid-cols-5 gap-2">
                {paletteColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      soundEffects.click();
                      setBrushColor(color.hex);
                    }}
                    className={`w-7 h-7 rounded-lg border-2 transition transform hover:scale-110 cursor-pointer ${
                      brushColor === color.hex ? 'border-amber-400 scale-110 shadow-md' : 'border-slate-700'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Lab Achievement tracker */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-fun font-bold text-slate-300">Lencana Laboran Seni</span>
              <span className="text-amber-400 font-bold">{usedTools.size}/3 Teknik Dicoba</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (usedTools.size / 3) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Center Canvas Studio */}
        <div className="lg:col-span-9 flex flex-col items-center">
          {/* Action Bar Above Canvas */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Batalkan goresan terakhir (Undo)"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Undo
              </button>

              <button
                onClick={handleClear}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Bersihkan kanvas"
              >
                <Trash2 className="w-3.5 h-3.5" /> Bersihkan
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={evaluateArtwork}
                disabled={isAiEvaluating}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-fun font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition cursor-pointer"
              >
                <Bot className="w-4 h-4 text-purple-200" />
                <span>{isAiEvaluating ? 'Menganalisis...' : 'Evaluasi Maestro'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-fun font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Karya (.PNG)</span>
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Element */}
          <div className="w-full relative rounded-3xl overflow-hidden border-4 border-slate-700 shadow-2xl bg-white flex items-center justify-center touch-none">
            <canvas
              ref={canvasRef}
              width={780}
              height={520}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onMouseMove={handleMouseMove}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={handleMouseMove}
              className="w-full h-auto max-h-[520px] bg-white cursor-crosshair object-contain"
            />
          </div>

          {/* AI Teacher Critique Box */}
          {aiFeedback && (
            <div className="w-full mt-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 rounded-2xl p-4 shadow-xl flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <span className="text-xs font-fun font-bold text-amber-300 block">
                  Ulasan Maestro Seno
                </span>
                <p className="text-xs text-slate-200 leading-relaxed mt-0.5">
                  {aiFeedback}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
