"use client";

import { useState } from "react";
import Image from "next/image";
import {
  type DistrictId,
  type DistrictPin,
  DISTRICT_BOUNDARIES,
  DISTRICT_PINS,
  METRO_A_PATH,
  METRO_B_PATH,
  METRO_STATIONS,
  CATEGORY_META,
  MAP_VIEWBOX,
} from "@/content/district-map";
import DistrictPinModal from "./DistrictPinModal";

export default function DistrictMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<"all" | DistrictId>(
    "all",
  );
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [modalPin, setModalPin] = useState<DistrictPin | null>(null);

  // Filter pins based on district selection
  const filteredPins = DISTRICT_PINS.filter((pin) => {
    return selectedDistrict === "all" || pin.districtId === selectedDistrict;
  });

  const hoveredPin = hoveredPinId
    ? DISTRICT_PINS.find((p) => p.id === hoveredPinId)
    : null;

  return (
    <div className="w-full">
      {/* SVG Interactive Map Container */}
      <div className="relative bg-[#f8f5eb] border-[3px] border-accent rounded-[2.5rem] shadow-[-6px_6px_0px_var(--color-accent)] overflow-hidden p-2 md:p-6">
        {/* Map Legend */}
        <div className="absolute top-4 left-4 z-10 hidden sm:flex flex-col gap-1.5 bg-cream/90 backdrop-blur-xs p-3 rounded-xl border-[2px] border-accent/20 text-xs font-semibold text-accent shadow-sm">
          <div className="text-[10px] uppercase tracking-wider text-accent/60 font-bold mb-0.5">
            Legenda mapy
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red border border-accent/30" />
            <span>Palčivé téma</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow border border-accent/30" />
            <span>Významné místo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green border border-accent/30" />
            <span>Vzdělávání & Inovace</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-accent/15">
            <span className="w-4 h-1 bg-[#00a562] rounded" />
            <span>Metro linka A</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-yellow rounded" />
            <span>Metro linka B</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-accent/15 text-[11px] text-accent/80 font-medium">
            <span className="w-4 h-3 rounded bg-accent/15 border border-accent/30 flex items-center justify-center text-[9px]">
              ✈
            </span>
            <span>Letecké snímky 2026</span>
          </div>
        </div>

        {/* Map Stage with Satellite Imagery Layer */}
        <div className="relative w-full aspect-[1000/632] select-none rounded-[1.8rem] overflow-hidden">
          {/* Background Aerial / Satellite imagery rendered with next/image, clipped inside district boundaries */}
          <div
            className="absolute inset-0 pointer-events-none select-none overflow-hidden"
            style={{
              clipPath: "url(#district-boundary-clip)",
              WebkitClipPath: "url(#district-boundary-clip)",
            }}
          >
            <Image
              src="/images/map/obvod-ortofoto-2026.webp"
              alt="Letecká ortofotomapa 2026 senátního obvodu Praha 5 a Praha 13"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1100px"
              className="object-cover"
            />
            {/* Subtle overlay tone for harmonious visual contrast */}
            <div className="absolute inset-0 bg-accent/5 mix-blend-multiply pointer-events-none" />
          </div>

          {/* The SVG Canvas */}
          <svg
            viewBox={MAP_VIEWBOX}
            className="absolute inset-0 w-full h-full select-none"
            role="img"
            aria-label="Interaktivní vektorová mapa volebního obvodu č. 21"
          >
            <defs>
              {/* CSS clip-path for HTML next/image (normalized 0..1 bounding box) */}
              <clipPath
                id="district-boundary-clip"
                clipPathUnits="objectBoundingBox"
              >
                <path
                  transform="scale(0.001, 0.0015822784810126582)"
                  d={`${DISTRICT_BOUNDARIES[0].path} ${DISTRICT_BOUNDARIES[1].path}`}
                />
              </clipPath>

              {/* Native SVG clip-path in user coordinates for SVG-layer rendering */}
              <clipPath id="district-clip-user" clipPathUnits="userSpaceOnUse">
                <path
                  d={`${DISTRICT_BOUNDARIES[0].path} ${DISTRICT_BOUNDARIES[1].path}`}
                />
              </clipPath>

              {/* Pattern for background grid subtle texture */}
              <pattern
                id="map-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="oklch(17.8% 0.01 88.8 / 0.04)"
                  strokeWidth="1"
                />
              </pattern>

              {/* Pulsing ring animation for selected/hovered pin */}
              <filter
                id="pin-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="-1"
                  dy="2"
                  stdDeviation="2"
                  floodColor="#1a1a1a"
                  floodOpacity="0.4"
                />
              </filter>
            </defs>

            {/* Background grid */}
            <rect width="100%" height="100%" fill="url(#map-grid)" />

            {/* SVG Native fallback/dual-layer for satellite imagery clipped inside the district outline */}
            <g
              id="aerial-satellite-backdrop"
              clipPath="url(#district-clip-user)"
              className="pointer-events-none"
            >
              <image
                href="/images/map/obvod-ortofoto-2026.webp"
                x="0"
                y="0"
                width="1000"
                height="632"
                preserveAspectRatio="none"
                className="pointer-events-none"
              />
            </g>

            {/* District boundary polygons */}
            <g id="district-boundaries">
              {DISTRICT_BOUNDARIES.map((boundary) => {
                const isSelected =
                  selectedDistrict === "all" ||
                  selectedDistrict === boundary.id;
                const isDimmed =
                  selectedDistrict !== "all" &&
                  selectedDistrict !== boundary.id;

                return (
                  <path
                    key={boundary.id}
                    d={boundary.path}
                    className="transition-all duration-300 cursor-pointer"
                    fill={
                      isDimmed
                        ? "oklch(96% 0.01 88.8 / 0.82)"
                        : isSelected
                          ? "oklch(30.1% 0.162 269.9 / 0.12)"
                          : "oklch(30.1% 0.162 269.9 / 0.05)"
                    }
                    stroke={
                      isSelected
                        ? "oklch(17.8% 0.01 88.8 / 0.95)"
                        : "oklch(17.8% 0.01 88.8 / 0.45)"
                    }
                    strokeWidth={
                      selectedDistrict === boundary.id
                        ? "3.5"
                        : isSelected
                          ? "2.5"
                          : "1.8"
                    }
                    strokeDasharray={isDimmed ? "4 4" : undefined}
                    onClick={() => {
                      setSelectedDistrict(
                        selectedDistrict === boundary.id ? "all" : boundary.id,
                      );
                    }}
                  >
                    <title>{`${boundary.name} – ${boundary.residentsCount}`}</title>
                  </path>
                );
              })}
            </g>

            {/* District big names centered inside each district outline */}
            <g id="district-labels" className="pointer-events-none select-none">
              {DISTRICT_BOUNDARIES.map((boundary) => (
                <text
                  key={boundary.id}
                  x={boundary.center.x}
                  y={boundary.center.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="oklch(17.8% 0.01 88.8 / 0.9)"
                  stroke="#ffffff"
                  strokeWidth="6"
                  paintOrder="stroke"
                  strokeLinejoin="round"
                  fontSize={boundary.id === "praha-5" ? "42" : "40"}
                  fontFamily="var(--font-display)"
                  fontWeight="900"
                  letterSpacing="5"
                  className="uppercase"
                >
                  {boundary.name}
                </text>
              ))}
            </g>

            {/* Metro Lines & Stations */}
            <g id="metro-network">
              {/* Metro A line glow */}
              <path
                d={METRO_A_PATH}
                fill="none"
                stroke="#006837"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              {/* Metro A main green line */}
              <path
                d={METRO_A_PATH}
                fill="none"
                stroke="#00a562"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Metro A direction to Petřiny */}
              <text
                x="538"
                y="16"
                fill="#008248"
                fontSize="9"
                fontWeight="bold"
                fontFamily="var(--font-body)"
                stroke="#ffffff"
                strokeWidth="3"
                paintOrder="stroke"
                strokeLinejoin="round"
                className="select-none pointer-events-none"
              >
                směr Petřiny →
              </text>

              {/* Metro B line glow */}
              <path
                d={METRO_B_PATH}
                fill="none"
                stroke="#b57d05"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              {/* Metro B main yellow line */}
              <path
                d={METRO_B_PATH}
                fill="none"
                stroke="#f5a623"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Metro stations */}
              {METRO_STATIONS.map((station) => {
                const strokeColor =
                  station.line === "A" ? "#008248" : "#b57d05";
                return (
                  <g key={station.name} className="pointer-events-none">
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r="5"
                      fill="#ffffff"
                      stroke={strokeColor}
                      strokeWidth="2.5"
                    />
                    <text
                      x={station.x + (station.labelOffsetX ?? 0)}
                      y={station.y + (station.labelOffsetY ?? -8)}
                      textAnchor={station.textAnchor ?? "middle"}
                      fill="oklch(17.8% 0.01 88.8 / 0.95)"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      paintOrder="stroke"
                      strokeLinejoin="round"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="var(--font-body)"
                    >
                      {station.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Interactive Pins */}
            <g id="district-pins">
              {filteredPins.map((pin) => {
                const meta = CATEGORY_META[pin.category];
                const isHovered = hoveredPinId === pin.id;

                return (
                  <g
                    key={pin.id}
                    transform={`translate(${pin.coordinates.x}, ${pin.coordinates.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => setHoveredPinId(pin.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                    onClick={() => setModalPin(pin)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${pin.name} – ${meta.label} (${pin.quarter}, ${pin.district}). Klikněte pro otevření detailu.`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setModalPin(pin);
                      }
                    }}
                  >
                    <title>{`${pin.name} – ${meta.label} (${pin.quarter})`}</title>

                    {/* Outer pulse indicator when hovered */}
                    {isHovered && (
                      <circle
                        cx="0"
                        cy="0"
                        r="32"
                        fill={meta.fillHex}
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Pin drop shadow & body */}
                    <g filter="url(#pin-shadow)">
                      {/* Outer marker pill / circle */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isHovered ? "20" : "16"}
                        fill={meta.fillHex}
                        stroke="var(--color-accent)"
                        strokeWidth="2.5"
                        className="transition-all duration-150"
                      />

                      {/* Inner icon / glyph */}
                      {pin.category === "issue" && (
                        <path
                          d="M 0 -7 L 0 2 M 0 6 L 0 7"
                          stroke="#ffffff"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      )}
                      {pin.category === "landmark" && (
                        <polygon
                          points="0,-8 2.4,-2.5 8,-2.5 3.5,1 5.2,6.5 0,3.2 -5.2,6.5 -3.5,1 -8,-2.5 -2.4,-2.5"
                          fill="#ffffff"
                        />
                      )}
                      {pin.category === "education" && (
                        <path
                          d="M -6 -2 L 0 -6 L 6 -2 L 0 2 Z M 0 2 L 0 7 M -4 0 L -4 4"
                          fill="#ffffff"
                          stroke="#ffffff"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                      )}
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Map hint & source credit */}
        <div className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-accent/60 min-h-[1.5rem] flex items-center justify-center">
          {hoveredPin ? (
            <span className="text-accent font-bold">
              📍 {hoveredPin.name} ({hoveredPin.quarter}) – Kliknutím otevřete
              detail
            </span>
          ) : (
            <span>
              💡 Kliknutím na libovolnou ikonu na mapě otevřete její detail a
              priority Radka Sáblíka · Podklad: Letecká ortofotomapa 2026 (IPR
              Praha)
            </span>
          )}
        </div>
      </div>

      {/* Pin Detail Modal */}
      <DistrictPinModal pin={modalPin} onClose={() => setModalPin(null)} />
    </div>
  );
}
