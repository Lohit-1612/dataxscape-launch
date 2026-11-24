"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

export function RadialOrbitalTimeline({
  timelineData,
  className = "",
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(200);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Responsive radius calculation so orbit stays perfectly proportioned on phones & tablets and expands on desktop
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 450) {
          setRadius(130);
        } else if (width < 640) {
          setRadius(155);
        } else if (width < 1024) {
          setRadius(185);
        } else if (width < 1280) {
          setRadius(280);
        } else if (width < 1536) {
          setRadius(320);
        } else {
          setRadius(350);
        }
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.35) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-cyan-300 bg-cyan-950/80 border-cyan-400/60 shadow-[0_0_10px_rgba(0,210,255,0.3)]";
      case "in-progress":
        return "text-black bg-cyan-400 border-cyan-300 font-bold shadow-[0_0_15px_rgba(0,210,255,0.7)] animate-pulse";
      case "pending":
        return "text-white/60 bg-black/60 border-white/20";
      default:
        return "text-white/60 bg-black/60 border-white/20";
    }
  };

  return (
    <div
      className={`w-full relative min-h-[560px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[820px] xl:min-h-[900px] flex flex-col items-center justify-center bg-transparent select-none overflow-visible ${className}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[520px] sm:h-[600px] lg:h-[780px] xl:h-[860px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Glowing Planetary Core in Electric Cyan */}
          <div className="absolute w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(0,210,255,0.85)]">
            <div className="absolute w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-cyan-400/40 animate-ping opacity-70 pointer-events-none"></div>
            <div
              className="absolute w-22 h-22 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border border-cyan-300/25 animate-ping opacity-50 pointer-events-none"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-600 fill-current" />
            </div>
          </div>

          {/* Dynamic Orbital Rings */}
          <div
            className="absolute rounded-full border border-cyan-400/25 shadow-[0_0_20px_rgba(0,210,255,0.15)] pointer-events-none transition-all duration-300"
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
          />

          <div
            className="absolute rounded-full border border-dashed border-cyan-500/15 pointer-events-none transition-all duration-300"
            style={{ width: `${radius * 2.35}px`, height: `${radius * 2.35}px` }}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy Aura Glow */}
                <div
                  className={`absolute rounded-full -inset-1 pointer-events-none ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,210,255,0.3) 0%, rgba(0,210,255,0) 70%)`,
                    width: `${item.energy * 0.45 + 36}px`,
                    height: `${item.energy * 0.45 + 36}px`,
                    left: `-${(item.energy * 0.45 + 36 - 40) / 2}px`,
                    top: `-${(item.energy * 0.45 + 36 - 40) / 2}px`,
                  }}
                />

                {/* Node Orb Circle */}
                <div
                  className={`
                  w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,210,255,0.9)]"
                      : isRelated
                      ? "bg-cyan-500/40 text-cyan-200"
                      : "bg-[#020617]/95 text-cyan-400"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-cyan-400/50"
                      : isRelated
                      ? "border-cyan-400 animate-pulse"
                      : "border-cyan-400/40 hover:border-cyan-400 hover:scale-110"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} className="lg:w-5 lg:h-5" />
                </div>

                {/* Node Title Label */}
                <div
                  className={`
                  absolute top-12 lg:top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[11px] sm:text-xs lg:text-sm font-semibold tracking-wider font-mono
                  transition-all duration-300 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                  ${isExpanded ? "text-cyan-300 scale-125 font-bold" : "text-white/80"}
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Interactive Card */}
                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-64 sm:w-72 bg-[#020617]/95 backdrop-blur-xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 overflow-visible z-50 animate-in fade-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-400/70" />
                    
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="absolute top-2 right-2 p-1 text-white/50 hover:text-white transition-colors"
                      aria-label="Close card"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <CardHeader className="pb-2 pt-3 px-4">
                      <div className="flex justify-between items-center pr-4">
                        <Badge
                          className={`px-2 py-0.5 text-[10px] font-mono tracking-wider ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETED"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "UPCOMING"}
                        </Badge>
                        <span className="text-[11px] font-mono text-cyan-400/80">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-bold text-white mt-1.5 font-display">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-xs text-white/80 px-4 pb-4">
                      <p className="leading-relaxed text-white/75">{item.content}</p>

                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <div className="flex justify-between items-center text-[11px] mb-1 font-mono">
                          <span className="flex items-center text-cyan-300">
                            <Zap size={11} className="mr-1 text-cyan-400" />
                            Phase Progress
                          </span>
                          <span className="font-bold text-white">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,210,255,0.6)]"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10">
                          <div className="flex items-center mb-1.5">
                            <Link size={10} className="text-cyan-400 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-semibold text-white/60 font-mono">
                              Connected Phases
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-[10px] rounded border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-200 hover:text-white transition-all cursor-pointer font-mono"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={9}
                                    className="ml-1 text-cyan-400"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RadialOrbitalTimeline;
