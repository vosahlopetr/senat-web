"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface PropellerHatProps {
  className?: string;
  style?: React.CSSProperties;
  flyIn?: boolean;
}

export default function PropellerHat({
  className = "",
  style,
  flyIn = false,
}: PropellerHatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFlownIn, setHasFlownIn] = useState(!flyIn);

  // Animation & interactivity physics refs
  const physicsRef = useRef({
    angle: 0,
    speed: 6.0, // rad/s
    targetBaseSpeed: 6.0,
    hoverSpeed: 14.0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    isVisible: true,
  });

  // Handle click / tap for spin boost
  const handleBoost = useCallback(() => {
    physicsRef.current.speed = Math.min(physicsRef.current.speed + 25.0, 50.0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    physicsRef.current.targetBaseSpeed = physicsRef.current.hoverSpeed;
  }, []);

  const handleMouseLeave = useCallback(() => {
    physicsRef.current.targetBaseSpeed = 6.0;
    physicsRef.current.targetTiltX = 0;
    physicsRef.current.targetTiltY = 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    physicsRef.current.targetTiltX = x * 0.08; // yaw / roll tilt
    physicsRef.current.targetTiltY = y * 0.06; // pitch tilt
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      physicsRef.current.speed = 1.0;
      physicsRef.current.targetBaseSpeed = 1.0;
      physicsRef.current.hoverSpeed = 2.0;
    }

    // Try WebGL2 first, fallback to WebGL1
    const gl =
      canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
        powerPreference: "low-power",
      }) ||
      (canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      }) as WebGLRenderingContext | null);

    if (!gl) {
      // Keep initial fallback image visible
      return;
    }

    let isDisposed = false;
    let rafId = 0;

    // Vertex shader
    const vsSource = `
      precision highp float;
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec2 a_uv;
      attribute vec4 a_color;

      uniform mat4 u_mvp;
      uniform mat3 u_normal_mat;
      uniform float u_prop_angle;
      uniform float u_is_propeller;

      varying vec3 v_normal;
      varying vec2 v_uv;
      varying vec4 v_color;

      void main() {
        vec3 pos = a_position;
        vec3 norm = a_normal;

        if (u_is_propeller > 0.5) {
          float cosA = cos(u_prop_angle);
          float sinA = sin(u_prop_angle);
          pos = vec3(pos.x * cosA + pos.z * sinA, pos.y, -pos.x * sinA + pos.z * cosA);
          norm = vec3(norm.x * cosA + norm.z * sinA, norm.y, -norm.x * sinA + norm.z * cosA);
        }

        gl_Position = u_mvp * vec4(pos, 1.0);
        v_normal = u_normal_mat * norm;
        v_uv = vec2(a_uv.x, 1.0 - a_uv.y);
        v_color = a_color;
      }
    `;

    // Fragment shader
    const fsSource = `
      precision mediump float;
      varying vec3 v_normal;
      varying vec2 v_uv;
      varying vec4 v_color;

      uniform sampler2D u_texture;
      uniform vec3 u_light_dir;

      void main() {
        vec3 n = normalize(v_normal);
        if (!gl_FrontFacing) {
          n = -n;
        }
        
        // Two-point lighting matching hero portrait: key light + fill light
        float nDotL = max(dot(n, u_light_dir), 0.0);
        vec3 fillDir = normalize(vec3(-0.4, 0.2, 0.4));
        float fillDot = max(dot(n, fillDir), 0.0) * 0.25;
        
        float ambient = 0.44;
        float diff = ambient + 0.56 * nDotL + fillDot;

        // Blinn-Phong specular highlight for dome, visor, and beads
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(u_light_dir + viewDir);
        float spec = pow(max(dot(n, halfDir), 0.0), 22.0) * 0.24;

        vec4 tex = texture2D(u_texture, v_uv);
        vec3 base = mix(v_color.rgb, tex.rgb * v_color.rgb, v_color.a);

        vec3 rgb = base * diff + vec3(spec);
        gl_FragColor = vec4(rgb, 1.0);
      }
    `;

    function compileShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const aPos = gl.getAttribLocation(program, "a_position");
    const aNorm = gl.getAttribLocation(program, "a_normal");
    const aUV = gl.getAttribLocation(program, "a_uv");
    const aCol = gl.getAttribLocation(program, "a_color");

    const uMVP = gl.getUniformLocation(program, "u_mvp");
    const uNormMat = gl.getUniformLocation(program, "u_normal_mat");
    const uPropAngle = gl.getUniformLocation(program, "u_prop_angle");
    const uIsProp = gl.getUniformLocation(program, "u_is_propeller");
    const uTex = gl.getUniformLocation(program, "u_texture");
    const uLightDir = gl.getUniformLocation(program, "u_light_dir");

    // Normalized light direction: key light from top-right-front
    const lx = 0.35,
      ly = 0.75,
      lz = 0.55;
    const lLen = Math.hypot(lx, ly, lz);
    gl.uniform3f(uLightDir, lx / lLen, ly / lLen, lz / lLen);
    gl.uniform1i(uTex, 0);

    // Buffers storage
    let bodyBuffers: {
      pos: WebGLBuffer;
      norm: WebGLBuffer;
      uv: WebGLBuffer;
      col: WebGLBuffer;
      idx: WebGLBuffer;
      count: number;
    } | null = null;

    let propBuffers: {
      pos: WebGLBuffer;
      norm: WebGLBuffer;
      uv: WebGLBuffer;
      col: WebGLBuffer;
      idx: WebGLBuffer;
      count: number;
    } | null = null;

    const texture = gl.createTexture();

    // Enable depth test, disable face culling so thin parts (propeller) and all shells render accurately
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearDepth(1.0);

    // Load mesh binary and texture in parallel
    Promise.all([
      fetch("/hat/hat.bin").then((res) => res.arrayBuffer()),
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = "/hat/hat.webp";
      }),
    ])
      .then(([bin, img]) => {
        if (isDisposed || !gl) return;

        // Upload texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img,
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Parse bin
        const header = new Uint32Array(bin, 0, 4);
        const [bodyV, bodyI, propV, propI] = header;

        let offset = 16;
        const bPos = new Float32Array(bin, offset, bodyV * 3);
        offset += bodyV * 12;
        const bNorm = new Float32Array(bin, offset, bodyV * 3);
        offset += bodyV * 12;
        const bUV = new Float32Array(bin, offset, bodyV * 2);
        offset += bodyV * 8;
        const bCol = new Float32Array(bin, offset, bodyV * 4);
        offset += bodyV * 16;
        const bIdx = new Uint16Array(bin, offset, bodyI);
        offset += bodyI * 2;

        const pPos = new Float32Array(bin, offset, propV * 3);
        offset += propV * 12;
        const pNorm = new Float32Array(bin, offset, propV * 3);
        offset += propV * 12;
        const pUV = new Float32Array(bin, offset, propV * 2);
        offset += propV * 8;
        const pCol = new Float32Array(bin, offset, propV * 4);
        offset += propV * 16;
        const pIdx = new Uint16Array(bin, offset, propI);
        offset += propI * 2;

        function createMesh(
          pos: Float32Array,
          norm: Float32Array,
          uv: Float32Array,
          col: Float32Array,
          idx: Uint16Array,
        ) {
          if (!gl) return null;
          const posB = gl.createBuffer()!;
          gl.bindBuffer(gl.ARRAY_BUFFER, posB);
          gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

          const normB = gl.createBuffer()!;
          gl.bindBuffer(gl.ARRAY_BUFFER, normB);
          gl.bufferData(gl.ARRAY_BUFFER, norm, gl.STATIC_DRAW);

          const uvB = gl.createBuffer()!;
          gl.bindBuffer(gl.ARRAY_BUFFER, uvB);
          gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);

          const colB = gl.createBuffer()!;
          gl.bindBuffer(gl.ARRAY_BUFFER, colB);
          gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);

          const idxB = gl.createBuffer()!;
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxB);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

          return {
            pos: posB,
            norm: normB,
            uv: uvB,
            col: colB,
            idx: idxB,
            count: idx.length,
          };
        }

        bodyBuffers = createMesh(bPos, bNorm, bUV, bCol, bIdx);
        propBuffers = createMesh(pPos, pNorm, pUV, pCol, pIdx);

        setIsLoaded(true);
        startRenderLoop();
      })
      .catch((err) => {
        console.error("Failed to load propeller hat 3D assets:", err);
      });

    let lastTime = performance.now();

    function renderFrame(now: number) {
      if (isDisposed || !gl || !bodyBuffers || !propBuffers) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update rotation speed & angle
      const p = physicsRef.current;
      const decayRate = flyIn ? 0.8 : 3.5;
      p.speed += (p.targetBaseSpeed - p.speed) * Math.min(dt * decayRate, 1.0);
      p.angle += p.speed * dt;

      // Smooth tilt lerp
      p.tiltX += (p.targetTiltX - p.tiltX) * Math.min(dt * 8.0, 1.0);
      p.tiltY += (p.targetTiltY - p.tiltY) * Math.min(dt * 8.0, 1.0);

      // Canvas resize with DPR clamping (up to 2 for crisp retina without overdraw)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = Math.round(canvas!.clientWidth * dpr);
      const displayH = Math.round(canvas!.clientHeight * dpr);
      if (canvas!.width !== displayW || canvas!.height !== displayH) {
        canvas!.width = displayW;
        canvas!.height = displayH;
        gl.viewport(0, 0, displayW, displayH);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Model-View-Projection Matrix
      // Pitch: 0.28 rad (~16 deg forward) + interactive tilt
      // Roll: 0.044 rad (~2.5 deg clockwise matching head tilt)
      // Yaw: 0.22 rad (~12.6 deg turned slightly to the left so it does not look flat) + interactive tilt
      const pitch = 0.28 + p.tiltY;
      const roll = 0.044;
      const yaw = 0.22 + p.tiltX;

      const cosP = Math.cos(pitch),
        sinP = Math.sin(pitch);
      const cosR = Math.cos(roll),
        sinR = Math.sin(roll);
      const cosY = Math.cos(yaw),
        sinY = Math.sin(yaw);

      const cx = -sinY,
        cy = 0,
        cz = -cosY;
      const dx = -sinP * cosY,
        dy = cosP,
        dz = sinP * sinY;
      const ex = cosP * cosY,
        ey = sinP,
        ez = -cosP * sinY;

      const ax = cosR * cx + sinR * dx;
      const ay = cosR * cy + sinR * dy;
      const az = cosR * cz + sinR * dz;

      const bx = -sinR * cx + cosR * dx;
      const by = -sinR * cy + cosR * dy;
      const bz = -sinR * cz + cosR * dz;

      const scale = 7.333333;
      // In WebGL clip space, -1 is near and +1 is far.
      // Points with larger X (front of cap) must map to smaller clip Z.
      const depthScale = -2.0;

      const offX = (ax * -0.02 + ay * -0.02) * scale;
      const offY = (bx * -0.02 + by * -0.02) * scale;
      const offZ = (ex * -0.02 + ey * -0.02) * depthScale;

      const m00 = ax * scale;
      const m01 = ay * scale;
      const m02 = az * scale;
      const m03 = offX;

      const m10 = bx * scale;
      const m11 = by * scale;
      const m12 = bz * scale;
      const m13 = offY;

      const m20 = ex * depthScale;
      const m21 = ey * depthScale;
      const m22 = ez * depthScale;
      const m23 = offZ;

      const mvp = new Float32Array([
        m00,
        m10,
        m20,
        0,
        m01,
        m11,
        m21,
        0,
        m02,
        m12,
        m22,
        0,
        m03,
        m13,
        m23,
        1,
      ]);

      const normalMat = new Float32Array([ax, bx, ex, ay, by, ey, az, bz, ez]);

      gl.uniformMatrix4fv(uMVP, false, mvp);
      gl.uniformMatrix3fv(uNormMat, false, normalMat);

      function drawMesh(
        mesh: {
          pos: WebGLBuffer;
          norm: WebGLBuffer;
          uv: WebGLBuffer;
          col: WebGLBuffer;
          idx: WebGLBuffer;
          count: number;
        },
        isPropeller: boolean,
        angle: number,
      ) {
        if (!gl) return;
        gl.uniform1f(uIsProp, isPropeller ? 1.0 : 0.0);
        gl.uniform1f(uPropAngle, angle);

        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.pos);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.norm);
        gl.enableVertexAttribArray(aNorm);
        gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uv);
        gl.enableVertexAttribArray(aUV);
        gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.col);
        gl.enableVertexAttribArray(aCol);
        gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.idx);
        gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
      }

      // 1. Draw Body
      drawMesh(bodyBuffers, false, 0.0);

      // 2. Draw Propeller
      drawMesh(propBuffers, true, p.angle);

      if (p.isVisible && !isDisposed) {
        rafId = requestAnimationFrame(renderFrame);
      }
    }

    function startRenderLoop() {
      if (rafId) cancelAnimationFrame(rafId);
      lastTime = performance.now();
      rafId = requestAnimationFrame(renderFrame);
    }

    // IntersectionObserver to pause loop when not on screen and trigger flyIn
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        physicsRef.current.isVisible = entry?.isIntersecting ?? true;
        if (entry?.isIntersecting && flyIn) {
          // Calculate exact pixel distance from top of Hero to card corner
          const hero =
            document.querySelector('section[aria-label="Hlavní banner"]') ||
            document.getElementById("main");
          if (hero && containerRef.current) {
            const heroRect = hero.getBoundingClientRect();
            const cardRect = containerRef.current.getBoundingClientRect();
            // Start right at the very top of the hero section with a gentle 60px inset
            const distY = Math.round(heroRect.top - cardRect.top + 60);
            containerRef.current.style.setProperty("--fly-y", `${distY}px`);
          } else {
            containerRef.current?.style.setProperty("--fly-y", "-1100px");
          }

          setHasFlownIn(true);
          // High-speed propeller spin during flight
          physicsRef.current.speed = 36.0;
        }
        if (physicsRef.current.isVisible) {
          startRenderLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Visibility change (background tab)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        physicsRef.current.isVisible = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        physicsRef.current.isVisible = true;
        startRenderLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isDisposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (gl) {
        if (bodyBuffers) {
          gl.deleteBuffer(bodyBuffers.pos);
          gl.deleteBuffer(bodyBuffers.norm);
          gl.deleteBuffer(bodyBuffers.uv);
          gl.deleteBuffer(bodyBuffers.col);
          gl.deleteBuffer(bodyBuffers.idx);
        }
        if (propBuffers) {
          gl.deleteBuffer(propBuffers.pos);
          gl.deleteBuffer(propBuffers.norm);
          gl.deleteBuffer(propBuffers.uv);
          gl.deleteBuffer(propBuffers.col);
          gl.deleteBuffer(propBuffers.idx);
        }
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, [flyIn]);

  return (
    <div
      ref={containerRef}
      onClick={handleBoost}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={style}
      className={`group select-none cursor-pointer ${
        flyIn
          ? hasFlownIn
            ? "animate-[hatFlyIn_4.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
            : "opacity-0 -translate-y-[1100px] pointer-events-none"
          : ""
      } ${className}`}
      title="Klikněte pro roztočení vrtulky!"
      aria-label="Vrtulová čepice Radka Sáblíka"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleBoost();
        }
      }}
    >
      <style>{`
        @keyframes hatFlyIn {
          0% {
            opacity: 0;
            transform: translate3d(var(--fly-x, -40px), var(--fly-y, -1100px), 0) rotate(-14deg) scale(0.85);
          }
          6% {
            opacity: 1;
          }
          25% {
            transform: translate3d(calc(var(--fly-x, -40px) + 60px), calc(var(--fly-y, -1100px) * 0.74), 0) rotate(10deg) scale(0.9);
          }
          50% {
            transform: translate3d(calc(var(--fly-x, -40px) - 30px), calc(var(--fly-y, -1100px) * 0.46), 0) rotate(-8deg) scale(0.95);
          }
          72% {
            transform: translate3d(calc(var(--fly-x, -40px) + 20px), calc(var(--fly-y, -1100px) * 0.18), 0) rotate(6deg) scale(0.98);
          }
          88% {
            transform: translate3d(0, -12px, 0) rotate(-3deg) scale(1);
          }
          94% {
            transform: translate3d(0, 5px, 0) rotate(1deg) scale(1.04, 0.96);
          }
          97% {
            transform: translate3d(0, -3px, 0) scale(0.99, 1.01);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1, 1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[hatFlyIn_4\\.5s_cubic-bezier\\(0\\.25\\,1\\,0\\.5\\,1\\)_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Instant fallback WebP image rendered on server / first paint before WebGL initializes */}
      <Image
        src="/hat/hat-initial.webp"
        alt=""
        aria-hidden="true"
        width={353}
        height={393}
        priority
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* High-performance WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
