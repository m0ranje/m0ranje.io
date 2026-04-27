(() => {
  const DEFAULT_ASSET_PATH = new URL("./assets/", document.currentScript ? document.currentScript.src : window.location.href).toString();

  class NikitaHeroAvatar extends HTMLElement {
    constructor() {
      super();
      this._root = this.attachShadow({ mode: "open" });
      this._raf = 0;
      this._target = { x: 0, y: 0 };
      this._current = { x: 0, y: 0 };
      this._onPointerMove = this._onPointerMove.bind(this);
      this._tick = this._tick.bind(this);
    }

    connectedCallback() {
      const assetPath = this.getAttribute("asset-path") || DEFAULT_ASSET_PATH;
      const size = this.getAttribute("size") || "430px";

      this._root.innerHTML = `
        <style>
          :host {
            display: inline-block;
            width: min(100%, var(--avatar-size, ${size}));
            contain: layout style paint;
          }

          .avatar3d {
            --eye-x: 0px;
            --eye-y: 0px;
            --tilt-x: 0deg;
            --tilt-y: 0deg;

            position: relative;
            width: 100%;
            aspect-ratio: 1513 / 2048;
            transform-style: preserve-3d;
            transform:
              perspective(900px)
              rotateX(var(--tilt-x))
              rotateY(var(--tilt-y));
            transition: transform 90ms linear;
            filter:
              drop-shadow(0 26px 60px rgba(0, 0, 0, .48))
              drop-shadow(0 0 45px rgba(70, 150, 255, .10));
            will-change: transform;
            user-select: none;
            pointer-events: none;
          }

          .avatar3d::before {
            content: "";
            position: absolute;
            inset: 7% 10% 11% 10%;
            z-index: 0;
            background:
              radial-gradient(circle at 50% 43%, rgba(78, 157, 255, .20), transparent 42%),
              radial-gradient(circle at 50% 54%, rgba(255, 255, 255, .06), transparent 52%);
            filter: blur(26px);
            transform: translateZ(-20px);
            pointer-events: none;
          }

          .avatar3d__head {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            z-index: 1;
            transform: translateZ(0);
            pointer-events: none;
          }

          .avatar3d__eye {
            position: absolute;
            width: 12.56%;
            aspect-ratio: 1 / 1;
            object-fit: contain;
            z-index: 2;
            opacity: .98;
            transform:
              translate3d(var(--eye-x), var(--eye-y), 24px)
              scale(1.01);
            transition: transform 55ms linear;
            pointer-events: none;
            will-change: transform;
          }

          .avatar3d__eye--left {
            left: 27.76%;
            top: 43.70%;
          }

          .avatar3d__eye--right {
            left: 57.83%;
            top: 42.82%;
          }

          @media (prefers-reduced-motion: reduce) {
            .avatar3d,
            .avatar3d__eye {
              transition: none;
              transform: none;
            }
          }
        </style>

        <div class="avatar3d" part="avatar">
          <img class="avatar3d__head" src="${assetPath}avatar_head.png" alt="" draggable="false">
          <img class="avatar3d__eye avatar3d__eye--left" src="${assetPath}eye_left.png" alt="" draggable="false">
          <img class="avatar3d__eye avatar3d__eye--right" src="${assetPath}eye_right.png" alt="" draggable="false">
        </div>
      `;

      this._avatar = this._root.querySelector(".avatar3d");
      window.addEventListener("pointermove", this._onPointerMove, { passive: true });
      this._tick();
    }

    disconnectedCallback() {
      window.removeEventListener("pointermove", this._onPointerMove);
      cancelAnimationFrame(this._raf);
    }

    _onPointerMove(event) {
      const rect = this._avatar.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.46;

      const dx = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height / 2)));

      this._target.x = dx;
      this._target.y = dy;
    }

    _tick() {
      this._current.x += (this._target.x - this._current.x) * 0.14;
      this._current.y += (this._target.y - this._current.y) * 0.14;

      const width = this._avatar.getBoundingClientRect().width || 430;
      const eyeMoveX = this._current.x * width * 0.018;
      const eyeMoveY = this._current.y * width * 0.008;
      const tiltX = -this._current.y * 4.5;
      const tiltY = this._current.x * 6.5;

      this._avatar.style.setProperty("--eye-x", `${eyeMoveX.toFixed(2)}px`);
      this._avatar.style.setProperty("--eye-y", `${eyeMoveY.toFixed(2)}px`);
      this._avatar.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      this._avatar.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);

      this._raf = requestAnimationFrame(this._tick);
    }
  }

  if (!customElements.get("nikita-hero-avatar")) {
    customElements.define("nikita-hero-avatar", NikitaHeroAvatar);
  }
})();