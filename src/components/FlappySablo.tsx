"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type GameState = "idle" | "playing" | "gameover" | "win";

type PipeData = {
  id: number;
  x: number;
  topHeight: number;
  passed: boolean;
};

const BIRD_SIZE = 140; // Increased even further to make it really hard
const PIPE_WIDTH = 130; // Wider pipes for realism
const GAP_SIZE = 280; // Bigger gap to make the varied heights easily playable
const GRAVITY = 0.65; // Stronger gravity for faster fall
const JUMP = -10.5; // Stronger jump to match gravity
const PIPE_SPEED = 5.5; // Much faster pipes
const PIPE_SPAWN_RATE = 85; // Spawn less frequently so pipes are further apart

export default function FlappySablo() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const pipesContainerRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number | null>(null);

  // Game Physics State (Refs for performance)
  const stateRef = useRef({
    gameState: "idle" as GameState,
    birdY: 250,
    birdVelocity: 0,
    pipes: [] as PipeData[],
    score: 0,
    frameCount: 0,
  });

  // Sync React state to our physics ref
  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState === "playing") {
      s.birdVelocity = JUMP;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent keyboard jumping if the game is won, gameover, or idle (requires button click to start)
      if (e.code === "Space" && stateRef.current.gameState === "playing") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  const gameLoopRef = useRef<(() => void) | null>(null);

  const gameLoop = useCallback(() => {
    const s = stateRef.current;

    if (s.gameState === "playing") {
      const actualHeight = containerRef.current?.clientHeight || 500;
      const actualWidth = containerRef.current?.clientWidth || 800;

      // We run internal physics at a fixed internal height of 500
      const internalHeight = 500;
      const scale = actualHeight / internalHeight;
      const internalWidth = actualWidth / scale;

      // 1. Update Bird
      s.birdVelocity += GRAVITY;
      s.birdY += s.birdVelocity;

      // Floor / Ceiling Collision
      if (s.birdY > internalHeight - BIRD_SIZE || s.birdY < 0) {
        setGameState("gameover");
      }

      // 2. Update Pipes
      s.pipes.forEach((p) => {
        p.x -= PIPE_SPEED;
      });

      // Spawn new pipe
      s.frameCount += 1;
      if (s.frameCount % PIPE_SPAWN_RATE === 0) {
        const minPipeHeight = 60; // Keep enough pipe visible at edges
        const maxPipeHeight = internalHeight - GAP_SIZE - minPipeHeight;

        // Use a less constrained random logic - full spectrum between min and max
        // With higher GAP_SIZE and pipe distance, players have time to adjust
        const topHeight = Math.floor(
          Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight,
        );

        s.pipes.push({
          id: s.frameCount,
          x: internalWidth,
          topHeight,
          passed: false,
        });
      }

      // Remove off-screen pipes
      s.pipes = s.pipes.filter((p) => p.x + PIPE_WIDTH > -20);

      // 3. Collisions & Score
      s.pipes.forEach((p) => {
        // Reduced the forgiveness padding from 15 to 6 so the bird doesn't clip into pipes
        const birdLeft = 50 + 6;
        const birdRight = 50 + BIRD_SIZE - 6;
        const birdTop = s.birdY + 6;
        const birdBottom = s.birdY + BIRD_SIZE - 6;

        const pipeLeft = p.x;
        const pipeRight = p.x + PIPE_WIDTH;

        // Bounding box collision
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          if (birdTop < p.topHeight || birdBottom > p.topHeight + GAP_SIZE) {
            setGameState("gameover");
          }
        }

        // Score logic
        if (!p.passed && p.x + PIPE_WIDTH < birdLeft) {
          p.passed = true;
          s.score += 1;
          setScore(s.score);

          const targetScore = process.env.NODE_ENV === "development" ? 1 : 21;
          if (s.score >= targetScore) {
            setGameState("win");
            s.gameState = "win";
          }
        }
      });

      // 4. Render Updates Directly to DOM (scaled to real pixels)
      if (birdRef.current) {
        const rotation = Math.min(Math.max(s.birdVelocity * 4, -25), 90);
        birdRef.current.style.width = `${BIRD_SIZE * scale}px`;
        birdRef.current.style.height = `${BIRD_SIZE * scale}px`;
        birdRef.current.style.transform = `translate3d(${50 * scale}px, ${s.birdY * scale}px, 0) rotate(${rotation}deg)`;
      }

      if (pipesContainerRef.current) {
        // Simple DOM diffing for pipes
        const renderedPipeIds = new Set();
        Array.from(pipesContainerRef.current.children).forEach((child) => {
          const id = Number(child.getAttribute("data-id"));
          const pipeData = s.pipes.find((p) => p.id === id);
          if (pipeData) {
            renderedPipeIds.add(id);
            // Update position
            (child as HTMLElement).style.transform =
              `translate3d(${pipeData.x * scale}px, 0, 0)`;
          } else {
            // Pipe removed
            child.remove();
          }
        });

        // Add new pipes
        s.pipes.forEach((pipeData) => {
          if (!renderedPipeIds.has(pipeData.id)) {
            // Create pipe wrapper
            const pipeDiv = document.createElement("div");
            pipeDiv.setAttribute("data-id", String(pipeData.id));
            pipeDiv.className = "absolute top-0 bottom-0";
            pipeDiv.style.width = `${PIPE_WIDTH * scale}px`;
            pipeDiv.style.transform = `translate3d(${pipeData.x * scale}px, 0, 0)`;

            // Ultra realistic 3D pipe styling based on original Flappy Bird
            const pipeColor = "#73BF2E"; // Exact flappy bird green
            // Complex gradient to mimic the exact highlights and shadows of the original pipe
            // The original uses flat, hard-edged shading bands, not smooth gradients
            const gradientOverlay =
              "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 6%, transparent 6%, transparent 12%, rgba(255,255,255,0.8) 12%, rgba(255,255,255,0.8) 18%, transparent 18%, transparent 65%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.6) 100%)";

            // Top pipe
            const topDiv = document.createElement("div");
            topDiv.className =
              "absolute top-0 w-full border-x-[4px] border-[#543847]";
            topDiv.style.backgroundColor = pipeColor;
            topDiv.style.height = `${pipeData.topHeight * scale}px`;
            topDiv.style.backgroundImage = gradientOverlay;

            const topCap = document.createElement("div");
            topCap.className =
              "absolute bottom-[-4px] left-[-6px] right-[-6px] border-[4px] border-[#543847]";
            topCap.style.backgroundColor = pipeColor;
            topCap.style.height = `${Math.max(28, 42 * scale)}px`;
            topCap.style.backgroundImage = gradientOverlay;
            topCap.style.boxShadow = "0 6px 0 rgba(0,0,0,0.3)"; // Small hard shadow under the cap like original
            topDiv.appendChild(topCap);

            // Bottom pipe
            const bottomDiv = document.createElement("div");
            bottomDiv.className =
              "absolute bottom-0 w-full border-x-[4px] border-[#543847]";
            bottomDiv.style.backgroundColor = pipeColor;
            bottomDiv.style.top = `${(pipeData.topHeight + GAP_SIZE) * scale}px`;
            bottomDiv.style.backgroundImage = gradientOverlay;

            const bottomCap = document.createElement("div");
            bottomCap.className =
              "absolute top-[-4px] left-[-6px] right-[-6px] border-[4px] border-[#543847]";
            bottomCap.style.backgroundColor = pipeColor;
            bottomCap.style.height = `${Math.max(28, 42 * scale)}px`;
            bottomCap.style.backgroundImage = gradientOverlay;
            // No top box-shadow in original flappy bird for bottom pipes
            bottomDiv.appendChild(bottomCap);

            pipeDiv.appendChild(topDiv);
            pipeDiv.appendChild(bottomDiv);
            pipesContainerRef.current?.appendChild(pipeDiv);
          }
        });
      }
    }

    requestRef.current = requestAnimationFrame(() => {
      gameLoopRef.current?.();
    });
  }, []);

  useEffect(() => {
    gameLoopRef.current = gameLoop;
  }, [gameLoop]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(() => {
      gameLoopRef.current?.();
    });
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section className="section bg-primary relative overflow-hidden">
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center">
        <header className="mb-10 z-10 relative w-full">
          <h2 className="font-display text-[clamp(2.5rem,7vw,4.25rem)] md:text-[clamp(2.5rem,6vw,4.25rem)] text-cream uppercase mb-5 text-center leading-[0.9] drop-shadow-sm select-none">
            SKOČÍM DO SENÁTU!
          </h2>
          <p className="text-center text-text-muted text-[clamp(1.125rem,2.5vw,1.5rem)] max-w-[800px] mx-auto font-semibold select-none">
            Proskákejte mezi nástrahami a pomozte Sáblíkovi se dostat až do
            Valdštejnského paláce. Vyhrajte získáním{" "}
            <strong className="text-cream">21 bodů</strong> za náš obvod!
          </p>
        </header>

        <div
          ref={containerRef}
          className="relative w-full max-w-7xl h-[500px] md:h-[600px] bg-primary rounded-[var(--radius-lg)] md:rounded-[2rem] overflow-hidden cursor-pointer touch-none border-[6px] border-cream"
          onPointerDown={(e) => {
            // Only allow clicking the game window to jump if we are actively playing
            if (stateRef.current.gameState === "playing") {
              e.preventDefault();
              jump();
            }
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 opacity-50">
            <Image
              src="/images/senat.jpg"
              alt="Senát background"
              fill
              className="object-cover blur-sm"
              priority
            />
            {/* Overlay gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
          </div>

          {/* Score Overlay */}
          {(gameState === "playing" ||
            gameState === "gameover" ||
            gameState === "win") && (
            <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none">
              <span className="text-[6rem] md:text-[8rem] font-display font-black text-white drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]">
                {score}
              </span>
            </div>
          )}

          {/* Subtle bounce keyframes */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes subtle-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
            .animate-subtle-bounce {
              animation: subtle-bounce 2s ease-in-out infinite;
            }
          `,
            }}
          />

          {/* Start Screen */}
          {gameState === "idle" && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-primary/60 backdrop-blur-md transition-opacity pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center text-cream p-8 text-center max-w-2xl w-full">
                <div className="w-32 h-32 md:w-48 md:h-48 relative mx-auto mb-8 animate-subtle-bounce drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/images/sablicek.webp"
                    alt="Sáblíček"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-5xl md:text-7xl font-display font-black mb-10 uppercase tracking-tight drop-shadow-lg">
                  Připraven?
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const s = stateRef.current;
                    setGameState("playing");
                    setScore(0);
                    s.gameState = "playing";
                    s.birdY = 250;
                    s.birdVelocity = JUMP;
                    s.pipes = [];
                    s.score = 0;
                    s.frameCount = 0;
                    if (pipesContainerRef.current)
                      pipesContainerRef.current.innerHTML = "";
                  }}
                  className="btn bg-green hover:bg-green/90 text-primary border-2 border-primary w-full md:w-auto text-2xl md:text-3xl px-8 md:px-16 py-6 md:py-6 shadow-[0_10px_30px_rgba(110,231,183,0.4)] active:scale-95 transition-transform rounded-full"
                >
                  KLIKNI PRO START
                </button>
                <p className="mt-10 text-lg md:text-2xl font-medium opacity-90 drop-shadow-md">
                  <span className="hidden md:inline">
                    Ovládej klikáním myší nebo mezerníkem.
                  </span>
                  <span className="md:hidden">
                    Klepnutím na obrazovku vyskočíš.
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === "gameover" && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-primary/70 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center text-cream p-8 text-center max-w-2xl w-full">
                <h3 className="text-6xl md:text-8xl font-display font-black text-cream mb-6 uppercase tracking-tight drop-shadow-lg">
                  Konec!
                </h3>
                <p className="text-3xl md:text-4xl font-medium mb-12 drop-shadow-md text-cream/90">
                  Skóre:{" "}
                  <span className="font-bold text-5xl md:text-6xl text-white">
                    {score}
                  </span>{" "}
                  / 21
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const s = stateRef.current;
                    setGameState("playing");
                    setScore(0);
                    s.gameState = "playing";
                    s.birdY = 250;
                    s.birdVelocity = JUMP;
                    s.pipes = [];
                    s.score = 0;
                    s.frameCount = 0;
                    if (pipesContainerRef.current)
                      pipesContainerRef.current.innerHTML = "";
                  }}
                  className="btn bg-green hover:bg-green/90 text-primary border-2 border-primary w-full md:w-auto text-2xl md:text-3xl px-8 md:px-16 py-6 md:py-6 shadow-[0_10px_30px_rgba(110,231,183,0.4)] active:scale-95 transition-transform rounded-full"
                >
                  HRÁT ZNOVU
                </button>
              </div>
            </div>
          )}

          {/* Win Screen */}
          {gameState === "win" && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-primary/70 backdrop-blur-md animate-in zoom-in duration-300 pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center text-cream p-8 text-center max-w-4xl w-full">
                <h3 className="text-6xl md:text-[clamp(4rem,8vw,6rem)] font-display font-black mb-10 uppercase tracking-tight">
                  <span className="marker-strike [&::after]:!bottom-[0.0475em] [&::after]:!h-[0.3em] [&::after]:!left-[-0.05em] text-cream">
                    JSEM TAM!
                  </span>
                </h3>
                <p className="text-2xl md:text-4xl font-bold mb-4 opacity-100 max-w-3xl leading-tight">
                  Teď ještě ten skutečný Senát.
                </p>
                <p className="text-xl md:text-2xl font-medium mb-12 opacity-80 max-w-3xl">
                  Nechcete, aby vám volby utekly? Zadejte e-mail a my se vám
                  včas připomeneme.
                </p>
                <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                  <Link
                    href="?modal=support"
                    className="btn bg-green hover:bg-green/90 text-primary border-2 border-primary w-full md:w-auto text-xl md:text-2xl px-8 py-5 shadow-[0_10px_30px_rgba(110,231,183,0.4)] active:scale-95 transition-transform rounded-full flex items-center justify-center font-bold"
                  >
                    PŘIDAT SE K NÁM
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const s = stateRef.current;
                      setGameState("playing");
                      setScore(0);
                      s.gameState = "playing";
                      s.birdY = 250;
                      s.birdVelocity = JUMP;
                      s.pipes = [];
                      s.score = 0;
                      s.frameCount = 0;
                      if (pipesContainerRef.current)
                        pipesContainerRef.current.innerHTML = "";
                    }}
                    className="btn bg-cream hover:bg-white text-primary border-2 border-primary w-full md:w-auto text-xl md:text-2xl px-8 py-5 shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95 transition-transform rounded-full font-bold"
                  >
                    HRÁT ZNOVU
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pipes Container */}
          <div
            ref={pipesContainerRef}
            className="absolute inset-0 z-10 pointer-events-none"
          />

          {/* Bird */}
          <div
            ref={birdRef}
            className="absolute z-20 will-change-transform pointer-events-none"
            style={{
              left: 50,
              top: 0,
              width: BIRD_SIZE,
              height: BIRD_SIZE,
              // default position for idle
              transform:
                gameState === "idle"
                  ? "translate3d(0, 250px, 0)"
                  : "translate3d(0, -100px, 0)",
            }}
          >
            <Image
              src="/images/sablicek.webp"
              alt="Sáblíček"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>

          {/* Ground/Floor effect */}
          <div className="absolute bottom-0 left-0 right-0 h-4 z-30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
