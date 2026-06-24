import React, { useRef, useEffect } from 'react';

const FireworksBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let fireworks: Firework[] = [];
    let animationFrameId: number;
    let hue = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.015 + 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      vx: number;
      vy: number;
      color: string;
      distanceToTarget: number;
      distanceTraveled: number;
      coordinates: [number, number][];
      coordinateCount: number;

      constructor(sx: number, sy: number, tx: number, ty: number) {
        this.x = sx;
        this.y = sy;
        this.targetX = tx;
        this.targetY = ty;
        this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        const angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 4;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
      }

      update(index: number) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= 1.02; // acceleration
        this.vx = Math.cos(Math.atan2(this.targetY - this.y, this.targetX - this.x)) * this.speed;
        this.vy = Math.sin(Math.atan2(this.targetY - this.y, this.targetX - this.x)) * this.speed;
        this.distanceTraveled = Math.hypot(this.x - this.coordinates[this.coordinateCount - 1][0], this.y - this.coordinates[this.coordinateCount - 1][1]);
        
        const currentDistance = Math.hypot(this.x - this.coordinates[this.coordinates.length-1][0], this.y - this.coordinates[this.coordinates.length-1][1]);
        
        this.x += this.vx;
        this.y += this.vy;

        // Roughly check if reached target
        if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < this.speed) {
          fireworks.splice(index, 1);
          createParticles(this.targetX, this.targetY, this.color);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const createParticles = (x: number, y: number, color: string) => {
      let particleCount = 80;
      while (particleCount--) {
        particles.push(new Particle(x, y, color));
      }
    };

    const loop = () => {
      requestAnimationFrame(loop);
      // Create trailing effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // Randomly launch fireworks
      if (Math.random() < 0.05) {
        const startX = Math.random() * canvas.width;
        const startY = canvas.height;
        const targetX = startX + (Math.random() * 200 - 100);
        const targetY = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(startX, startY, targetX, targetY));
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw(ctx);
        fireworks[i].update(i);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw(ctx);
        particles[i].update();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-80"
    />
  );
};

export default FireworksBackground;
