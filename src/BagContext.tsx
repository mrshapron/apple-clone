import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { FONT, BLUE, DARK, WHITE_TEXT } from "./shared";

export interface BagItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  image?: React.ReactNode;
  selections?: { label: string; value: string }[];
}

interface BagContextType {
  items: BagItem[];
  addItem: (item: BagItem) => void;
  removeItem: (id: string) => void;
  count: number;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
}

const BagContext = createContext<BagContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  count: 0,
  bagOpen: false,
  setBagOpen: () => {},
});

export const useBag = () => useContext(BagContext);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<BagItem | null>(null);

  const addItem = useCallback((item: BagItem) => {
    setItems(prev => [...prev, item]);
    setJustAdded(item);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }, []);

  return (
    <BagContext.Provider value={{ items, addItem, removeItem, count: items.length, bagOpen, setBagOpen }}>
      {children}
      <AddedToBagOverlay item={justAdded} onClose={() => setJustAdded(null)} onViewBag={() => { setJustAdded(null); setBagOpen(true); }} />
      <BagSlideOver open={bagOpen} onClose={() => setBagOpen(false)} items={items} onRemove={removeItem} />
    </BagContext.Provider>
  );
}

function AddedToBagOverlay({ item, onClose, onViewBag }: { item: BagItem | null; onClose: () => void; onViewBag: () => void }) {
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (item) {
      setRender(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 400);
      }, 5000);
    } else {
      setVisible(false);
      const t = setTimeout(() => setRender(false), 400);
      return () => clearTimeout(t);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [item]);

  if (!render || !item) return null;

  const handleViewBag = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onViewBag();
  };

  const handleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    setTimeout(onClose, 400);
  };

  return (
    <>
      <div onClick={handleClose} style={{
        position: "fixed", inset: 0, zIndex: 9998,
        backgroundColor: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      } as any} />
      <div style={{
        position: "fixed", top: 44, right: 0, zIndex: 9999,
        width: "min(420px, 92vw)",
        backgroundColor: "#fff",
        borderRadius: "0 0 0 18px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        transform: visible ? "translateY(0)" : "translateY(-16px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease",
        overflow: "hidden",
      }}>
        <div style={{ padding: "28px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              backgroundColor: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#34c759"/>
                <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: DARK, margin: 0 }}>
                Added to Bag.
              </p>
            </div>
            <button onClick={handleClose} style={{
              marginLeft: "auto", background: "none", border: "none", cursor: "pointer",
              color: "#86868b", padding: 4, lineHeight: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l10 10M14 4L4 14"/>
              </svg>
            </button>
          </div>

          <div style={{
            display: "flex", gap: 16, padding: "16px", backgroundColor: "#f5f5f7",
            borderRadius: 14, alignItems: "center",
          }}>
            {item.image && <div style={{ width: 80, height: 80, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.image}</div>}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: DARK, margin: "0 0 2px" }}>
                {item.name}
              </p>
              <p style={{ fontSize: 13, color: "#6e6e73", margin: "0 0 4px" }}>{item.variant}</p>
              <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: DARK, margin: 0 }}>
                ${item.price.toLocaleString()}.00
              </p>
            </div>
          </div>

          {item.selections && item.selections.length > 0 && (
            <div style={{ marginTop: 12 }}>
              {item.selections.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < item.selections!.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                  <span style={{ fontSize: 12, color: "#86868b" }}>{s.label}</span>
                  <span style={{ fontSize: 12, color: DARK, fontWeight: 500 }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={handleViewBag} style={{
              flex: 1, padding: "12px 20px", borderRadius: 22, fontSize: 15, fontWeight: 500,
              border: `1.5px solid ${BLUE}`, backgroundColor: "#fff", color: BLUE,
              cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
            }}>Review Bag</button>
            <button onClick={() => { handleViewBag(); }} style={{
              flex: 1, padding: "12px 20px", borderRadius: 22, fontSize: 15, fontWeight: 600,
              border: "none", backgroundColor: BLUE, color: "#fff",
              cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0077ed"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = BLUE}
            >Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
}

function BagSlideOver({ open, onClose, items, onRemove }: {
  open: boolean; onClose: () => void; items: BagItem[]; onRemove: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setRender(false), 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!render) return null;

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 9998,
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      } as any} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 9999,
        width: "min(440px, 100vw)",
        backgroundColor: "#fff",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px", borderBottom: "1px solid #e5e5e7",
        }}>
          <h2 style={{ fontFamily: FONT, fontSize: 21, fontWeight: 600, color: DARK, margin: 0 }}>
            Your Bag {items.length > 0 && <span style={{ fontSize: 15, fontWeight: 400, color: "#86868b" }}>({items.length} {items.length === 1 ? "item" : "items"})</span>}
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#86868b", padding: 4, lineHeight: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15"/>
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 16 }}>
                <rect x="10" y="20" width="44" height="36" rx="4" stroke="#d2d2d7" strokeWidth="2"/>
                <path d="M22 20V16a10 10 0 0120 0v4" stroke="#d2d2d7" strokeWidth="2"/>
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 21, fontWeight: 600, color: DARK, margin: "0 0 8px" }}>
                Your bag is empty.
              </p>
              <p style={{ fontSize: 15, color: "#6e6e73", margin: "0 0 24px" }}>
                Find something you love and add it to your bag.
              </p>
              <button onClick={onClose} style={{
                padding: "12px 32px", borderRadius: 22, fontSize: 15, fontWeight: 600,
                border: "none", backgroundColor: BLUE, color: "#fff",
                cursor: "pointer", fontFamily: FONT,
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0077ed"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = BLUE}
              >Continue Shopping</button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={item.id + idx} style={{
                display: "flex", gap: 16, padding: "20px 0",
                borderBottom: idx < items.length - 1 ? "1px solid #f0f0f0" : "none",
                alignItems: "flex-start",
              }}>
                {item.image && (
                  <div style={{
                    width: 80, height: 80, flexShrink: 0, backgroundColor: "#f5f5f7",
                    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{item.image}</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: DARK, margin: "0 0 2px" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 13, color: "#6e6e73", margin: "0 0 8px" }}>{item.variant}</p>
                  {item.selections && item.selections.map((s, i) => (
                    <p key={i} style={{ fontSize: 12, color: "#86868b", margin: "2px 0" }}>
                      {s.label}: {s.value}
                    </p>
                  ))}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: DARK, margin: "0 0 8px" }}>
                    ${item.price.toLocaleString()}.00
                  </p>
                  <button onClick={() => onRemove(item.id)} style={{
                    fontSize: 13, color: BLUE, backgroundColor: "transparent",
                    border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 500,
                  }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{
            borderTop: "1px solid #e5e5e7", padding: "20px 24px",
            backgroundColor: "#fafafa",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 15, color: DARK }}>Subtotal</span>
              <span style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: DARK }}>
                ${total.toLocaleString()}.00
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "#6e6e73" }}>or ${Math.round(total / 24)}/mo. for 24 mo.*</span>
            </div>
            <button style={{
              width: "100%", padding: "14px", borderRadius: 22, fontSize: 16, fontWeight: 600,
              border: "none", backgroundColor: BLUE, color: "#fff",
              cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0077ed"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = BLUE}
            >Check Out</button>
            <button onClick={onClose} style={{
              width: "100%", marginTop: 10, padding: "12px", borderRadius: 22, fontSize: 15,
              fontWeight: 500, border: "1.5px solid #d2d2d7", backgroundColor: "#fff",
              color: DARK, cursor: "pointer", fontFamily: FONT,
            }}>Continue Shopping</button>
            <p style={{ fontSize: 11, color: "#86868b", textAlign: "center", marginTop: 12 }}>
              *Monthly pricing requires Apple Card.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
