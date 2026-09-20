"use client";
import "./Revealer.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useLenis } from "lenis/react";

gsap.registerPlugin(Flip);

const LOGO_SRC = "/icon.png";

let isInitialLoad = true;

const snapToOdd = (value) => (value % 2 === 0 ? value - 1 : value);

// Grid-tile page reveal (adapted from Codegrid's "Voltlites" landing reveal):
// tiles fade in while a progress marker hops 25 → 50 → 75 → logo, then every
// tile collapses to uncover the page. Plays once per full page load.
// Timing: tiles start collapsing ~4.9s after mount and the page is fully
// uncovered by ~6.3s, so entrance animations behind it should use a
// preloaderDelay of about 5.9s (the original demo's title starts 1s into the
// collapse).
export default function Revealer() {
  const [show, setShow] = useState(isInitialLoad);
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);
  const markerRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  // Keep the page still while the reveal runs.
  useEffect(() => {
    if (!lenis) return;
    if (show) lenis.stop();
    else lenis.start();
  }, [lenis, show]);

  useLayoutEffect(() => {
    if (!show) return;
    const root = rootRef.current;
    const grid = gridRef.current;
    const marker = markerRef.current;
    if (!root || !grid || !marker) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("skip-intro")
    ) {
      setShow(false);
      return;
    }

    const isDesktop = window.innerWidth >= 1000;
    const maxTileSize = isDesktop ? 85 : 50;
    const columnCount = snapToOdd(Math.floor(window.innerWidth / maxTileSize));
    const rowCount = snapToOdd(Math.floor(window.innerHeight / maxTileSize));
    const tileSize = Math.min(
      window.innerWidth / columnCount,
      window.innerHeight / rowCount,
    );
    const totalColumns = columnCount + 2;
    const totalRows = rowCount + 2;

    grid.style.width = `${totalColumns * tileSize}px`;
    grid.style.height = `${totalRows * tileSize}px`;

    const tiles = [];
    for (let i = 0; i < totalColumns * totalRows; i++) {
      const tile = document.createElement("div");
      tile.className = "revealer-tile";
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
      grid.appendChild(tile);
      tiles.push(tile);
    }

    const middleRow = Math.floor(totalRows / 2);
    const centerColumn = Math.floor(totalColumns / 2);
    const tileAtColumn = (column) => tiles[middleRow * totalColumns + column];

    const firstStop = tileAtColumn(centerColumn - (isDesktop ? 5 : 2));
    const secondStop = tileAtColumn(centerColumn + (isDesktop ? 3 : 1));
    const thirdStop = tileAtColumn(centerColumn + (isDesktop ? 5 : 2));
    const finalStop = tileAtColumn(centerColumn);

    const markerStops = [firstStop, secondStop, thirdStop, finalStop];
    markerStops.forEach((tile) => tile.classList.add("is-stop"));

    const fadeInTiles = tiles.filter((tile) => !markerStops.includes(tile));
    const collapsingTiles = tiles.filter((tile) => tile !== finalStop);

    // GSAP can't tween to var(...) colours, so resolve the tile colour.
    const tileColor = getComputedStyle(root)
      .getPropertyValue("--revealer-tile")
      .trim();

    const rootRect = root.getBoundingClientRect();
    const tileOffset = (tile) => {
      const rect = tile.getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top };
    };

    const setLabel = (html) => {
      marker.innerHTML = html;
    };

    const moveMarkerTo = (tile, html) => {
      const startState = Flip.getState(marker);
      gsap.set(marker, tileOffset(tile));
      setLabel(html);
      Flip.from(startState, { duration: 1, ease: "power1.out" });
    };

    const ctx = gsap.context(() => {
      gsap.set(fadeInTiles, { opacity: 0 });
      gsap.set(marker, { width: tileSize, height: tileSize, ...tileOffset(firstStop) });
      setLabel("<p>25</p>");

      const tl = gsap.timeline({
        delay: 1,
        onComplete: () => setShow(false),
      });

      tl.to(
        fadeInTiles,
        {
          opacity: 1,
          duration: 0.125,
          stagger: { each: 2.5 / fadeInTiles.length, from: "random" },
        },
        0,
      );

      // The three passed stops take the tile colour, as if "filled in".
      tl.to(
        [firstStop, secondStop, thirdStop],
        {
          backgroundColor: tileColor,
          outlineColor: tileColor,
          duration: 0.125,
          stagger: 0.25,
        },
        2.75,
      );

      tl.add(() => moveMarkerTo(secondStop, "<p>50</p>"), 0.25);
      tl.add(() => moveMarkerTo(thirdStop, "<p>75</p>"), 1.5);
      tl.add(
        () => moveMarkerTo(finalStop, `<img src="${LOGO_SRC}" alt="" />`),
        2.75,
      );

      tl.add(() => gsap.set(bgRef.current, { display: "none" }));

      tl.to(
        collapsingTiles,
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.75,
          stagger: { each: 0.0035, from: "random" },
          ease: "power3.out",
        },
        "+=0.5",
      );

      tl.to(
        [finalStop, marker],
        { scaleY: 0, transformOrigin: "top", duration: 0.75, ease: "power3.out" },
        "<",
      );

      // Let clicks through as soon as the page is uncovered.
      tl.set(root, { pointerEvents: "none" }, "<0.5");
    }, root);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  // Purely decorative; data-intro lets entrance animations use their
  // preloaderDelay while it's on screen (see lib/motion.js).
  return (
    <div className="revealer" ref={rootRef} aria-hidden="true" data-intro>
      <div className="revealer-bg" ref={bgRef}></div>
      <div className="revealer-grid" ref={gridRef}></div>
      <div className="revealer-marker" ref={markerRef}></div>
    </div>
  );
}
