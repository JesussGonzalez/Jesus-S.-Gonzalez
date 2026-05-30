/* =============================================================
   tweaks-app.jsx — Panel de variaciones visuales
   Conmuta data-theme (color) y data-font (tipografía) en <html>,
   y guarda la elección en localStorage para que el sitio la recuerde.
   ============================================================= */
const { useState } = React;

const THEMES = [
  { id: 'indigo',  label: 'Índigo',    swatch: '#6366f1', bg: '#0d0d12' },
  { id: 'cyan',    label: 'Cian neón', swatch: '#22d3ee', bg: '#0d0d12' },
  { id: 'emerald', label: 'Esmeralda', swatch: '#34d399', bg: '#0d0d12' },
  { id: 'light',   label: 'Claro',     swatch: '#4f46e5', bg: '#fafaf8' },
];

const FONTS = [
  { id: 'grotesk', label: 'Space Grotesk + Inter' },
  { id: 'sora',    label: 'Sora + Inter' },
  { id: 'system',  label: 'System UI' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "indigo",
  "font": "grotesk"
}/*EDITMODE-END*/;

function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
  try { localStorage.setItem('jg_theme', id); } catch (e) {}
}
function applyFont(id) {
  document.documentElement.setAttribute('data-font', id);
  try { localStorage.setItem('jg_font', id); } catch (e) {}
}

function Swatch({ active, theme, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={theme.label}
      aria-pressed={active}
      title={theme.label}
      style={{
        width: '100%', height: 52, borderRadius: 12, cursor: 'pointer',
        border: active ? '2px solid ' + theme.swatch : '1px solid rgba(255,255,255,0.14)',
        background: theme.bg, position: 'relative', overflow: 'hidden',
        outline: 'none', transition: 'transform .15s ease',
        transform: active ? 'translateY(-1px)' : 'none',
      }}
    >
      <span style={{
        position: 'absolute', left: 10, top: 10, width: 26, height: 26,
        borderRadius: 8, background: theme.swatch,
        boxShadow: '0 6px 16px -6px ' + theme.swatch,
      }} />
      <span style={{
        position: 'absolute', right: 10, bottom: 9, fontSize: 11,
        fontFamily: 'ui-monospace, monospace',
        color: theme.id === 'light' ? '#444' : 'rgba(255,255,255,0.7)',
      }}>{theme.label}</span>
    </button>
  );
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Aplica al montar y cada vez que cambia.
  React.useEffect(() => { applyTheme(t.theme); }, [t.theme]);
  React.useEffect(() => { applyFont(t.font); }, [t.font]);

  return (
    <TweaksPanel>
      <TweakSection label="Dirección de color" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 4 }}>
        {THEMES.map((th) => (
          <Swatch key={th.id} theme={th} active={t.theme === th.id}
                  onClick={() => setTweak('theme', th.id)} />
        ))}
      </div>

      <TweakSection label="Tipografía" />
      <TweakSelect
        label="Familia"
        value={t.font}
        options={FONTS.map((f) => ({ value: f.id, label: f.label }))}
        onChange={(v) => setTweak('font', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
