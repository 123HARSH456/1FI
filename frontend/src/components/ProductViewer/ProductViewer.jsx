import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Rotate3d } from 'lucide-react';
import './ProductViewer.css';

// In-memory cache to prevent redundant frame fetches across component re-mounts
const frameImageCache = new Set();

/**
 * Reusable 360° Product Viewer
 * 
 * Props:
 * - staticImage: string (fallback static image URL)
 * - alt: string (accessible image description)
 * - viewer: object {
 *     enabled: boolean,
 *     framesPath: string,
 *     frameCount: number,
 *     fileNameTemplate: string (optional, e.g. "frame-{index}.png" or "ezgif-frame-{index}_birefnet.png"),
 *     digits: number (optional, default 2 or 3 depending on frameCount)
 *   }
 * - frameCount: number (optional prop override)
 * - framesPath: string (optional prop override)
 * - sensitivity: number (pixels per frame, default 22)
 * - className: string (optional container class names)
 * - hintText: string (optional hint text, default "Swipe to rotate 360°")
 */
export default function ProductViewer({
  staticImage = '',
  alt = 'Product',
  viewer = null,
  frameCount: propFrameCount,
  framesPath: propFramesPath,
  sensitivity = 22,
  zoom = 1.14,
  className = '',
  hintText = 'Swipe to rotate 360°'
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Configuration resolution
  const resolvedViewer = viewer || {};
  const resolvedZoom = resolvedViewer.zoom || zoom || 1.14;
  const isEnabled = Boolean(
    resolvedViewer.enabled &&
    (resolvedViewer.framesPath || propFramesPath) &&
    (resolvedViewer.frameCount || propFrameCount)
  );

  const totalFrames = resolvedViewer.frameCount || propFrameCount || 0;
  const rawPath = resolvedViewer.framesPath || propFramesPath || '';
  const template = resolvedViewer.fileNameTemplate || null;
  const digits = resolvedViewer.digits || (totalFrames >= 100 ? 3 : 2);

  // State
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [is3dReady, setIs3dReady] = useState(() => {
    if (!isEnabled || totalFrames <= 0) return true;
    const firstUrl = rawPath ? (rawPath.endsWith('/') ? `${rawPath}${template ? template.replace('{index}', String(1).padStart(digits, '0')) : `frame-${String(1).padStart(digits, '0')}.png`}` : `${rawPath}/${template ? template.replace('{index}', String(1).padStart(digits, '0')) : `frame-${String(1).padStart(digits, '0')}.png`}`) : '';
    return Boolean(firstUrl && frameImageCache.has(firstUrl));
  });

  // Refs for high-performance interaction without React re-renders on every pointer move
  const currentFrameRef = useRef(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startFrameRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const gestureAxisRef = useRef(null); // 'horizontal' | 'vertical' | null

  // Generate sequence of frame URLs
  const frameUrls = useMemo(() => {
    if (!isEnabled || totalFrames <= 0 || !rawPath) return [];
    const basePath = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
    const urls = [];
    for (let i = 1; i <= totalFrames; i++) {
      const paddedIndex = String(i).padStart(digits, '0');
      let fileName = '';
      if (template) {
        fileName = template.replace('{index}', paddedIndex);
      } else {
        fileName = `frame-${paddedIndex}.png`;
      }
      urls.push(`${basePath}${fileName}`);
    }
    return urls;
  }, [isEnabled, totalFrames, rawPath, template, digits]);

  // Track 3D readiness: prioritize loading the initial frame so placeholder can smoothly transition
  useEffect(() => {
    if (!isEnabled || frameUrls.length === 0) {
      setIs3dReady(true);
      return;
    }

    const firstUrl = frameUrls[0];
    if (frameImageCache.has(firstUrl)) {
      setIs3dReady(true);
      return;
    }

    setIs3dReady(false);
    let isMounted = true;
    const img = new Image();
    img.src = firstUrl;
    img.onload = () => {
      frameImageCache.add(firstUrl);
      if (isMounted) {
        setIs3dReady(true);
      }
    };
    img.onerror = () => {
      if (isMounted) {
        setIs3dReady(false);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [isEnabled, frameUrls]);

  // Preload remaining 360 frame images into memory in the background
  useEffect(() => {
    if (!isEnabled || frameUrls.length === 0) return;

    let isMounted = true;
    frameUrls.forEach((url) => {
      if (!frameImageCache.has(url)) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (isMounted) {
            frameImageCache.add(url);
          }
        };
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isEnabled, frameUrls]);

  // Sync initial frame or static fallback
  useEffect(() => {
    currentFrameRef.current = 0;
    if (imgRef.current) {
      if (isEnabled && frameUrls.length > 0) {
        imgRef.current.src = frameUrls[0];
      } else if (staticImage) {
        imgRef.current.src = staticImage;
      }
    }
  }, [isEnabled, frameUrls, staticImage]);

  // Fast direct DOM frame update
  const displayFrame = (index) => {
    currentFrameRef.current = index;
    if (imgRef.current && frameUrls[index]) {
      imgRef.current.src = frameUrls[index];
    }
  };

  // Pointer event handlers supporting both desktop mouse drag and mobile touch swiping
  const handlePointerDown = (e) => {
    if (!isEnabled || !is3dReady || frameUrls.length <= 1 || !e.isPrimary) return;

    // Prevent default browser image dragging
    e.preventDefault();

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startFrameRef.current = currentFrameRef.current;
    isPointerDownRef.current = true;
    gestureAxisRef.current = null;
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || !isEnabled || !is3dReady || frameUrls.length <= 1) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // Determine gesture direction on initial movement threshold (6px)
    if (gestureAxisRef.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        if (Math.abs(dx) >= Math.abs(dy)) {
          // Primarily horizontal gesture: capture pointer to rotate
          gestureAxisRef.current = 'horizontal';
          setIsDragging(true);
          if (!hasInteracted) setHasInteracted(true);
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch (err) {
            // Safe fallback if pointer capture isn't available
          }
        } else {
          // Primarily vertical gesture: preserve native vertical page scroll
          gestureAxisRef.current = 'vertical';
          isPointerDownRef.current = false;
          return;
        }
      } else {
        return;
      }
    }

    if (gestureAxisRef.current === 'horizontal') {
      const pixelsPerFrame = Math.max(8, sensitivity);
      const frameDelta = Math.floor(dx / pixelsPerFrame);

      // Horizontal movement rotates through the frame sequence with smooth wrapping
      let nextFrame = (startFrameRef.current - frameDelta) % frameUrls.length;
      if (nextFrame < 0) nextFrame += frameUrls.length;

      if (nextFrame !== currentFrameRef.current) {
        displayFrame(nextFrame);
      }
    }
  };

  const handlePointerUpOrCancel = (e) => {
    if (isPointerDownRef.current) {
      isPointerDownRef.current = false;
      setIsDragging(false);
      gestureAxisRef.current = null;

      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (err) {
        // Safe fallback
      }
    }
  };

  // Image fallback handler
  const handleImageError = () => {
    setIs3dReady(false);
    if (staticImage && imgRef.current && imgRef.current.src !== staticImage) {
      imgRef.current.src = staticImage;
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      onDragStart={(e) => e.preventDefault()}
      className={`product-viewer-container ${isDragging ? 'is-dragging' : ''} ${!isEnabled ? 'is-static' : ''} ${isEnabled && !is3dReady ? 'is-loading' : ''} ${className}`}
      role={isEnabled ? 'slider' : 'img'}
      aria-label={isEnabled ? `${alt} 360-degree interactive view` : alt}
      aria-valuemin={isEnabled ? 1 : undefined}
      aria-valuemax={isEnabled ? frameUrls.length : undefined}
      aria-valuenow={isEnabled ? currentFrameRef.current + 1 : undefined}
    >
      {/* 1. Non-scrollable static image from product section (displayed immediately while 3D images are loading) */}
      {staticImage && (
        <img
          src={staticImage}
          alt={alt}
          draggable={false}
          style={{ transform: `scale(${resolvedZoom})` }}
          className={`product-viewer-image is-static drop-shadow-md product-viewer-placeholder ${
            is3dReady && isEnabled ? 'is-faded' : 'is-active'
          }`}
        />
      )}

      {/* 2. Interactive 3D sequence frame */}
      {isEnabled && frameUrls.length > 0 && (
        <img
          ref={imgRef}
          src={frameUrls[0]}
          alt={alt}
          onLoad={() => {
            frameImageCache.add(frameUrls[0]);
            setIs3dReady(true);
          }}
          onError={handleImageError}
          draggable={false}
          style={{ transform: `scale(${resolvedZoom})` }}
          className={`product-viewer-image is-360 drop-shadow-md product-viewer-3d ${
            is3dReady ? 'is-active' : 'is-faded'
          }`}
        />
      )}

      {/* Subtle interaction hint indicator for 360 viewer */}
      {isEnabled && frameUrls.length > 1 && (
        <div 
          className={`product-viewer-hint ${hasInteracted ? 'is-hidden' : ''}`}
          aria-hidden={hasInteracted}
        >
          <Rotate3d className={`w-3.5 h-3.5 text-[#722EDC] stroke-[2.5] ${!is3dReady ? 'animate-spin' : ''}`} />
          <span>{is3dReady ? hintText : 'Loading 3D view...'}</span>
        </div>
      )}
    </div>
  );
}
