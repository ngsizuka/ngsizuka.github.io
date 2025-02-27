const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function createFirework() {
    const firework = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        ySpeed: Math.random() * -10 - 5,
        particles: [],
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        exploded: false,
    };
    fireworks.push(firework);
}

function createParticles(firework) {
    const particleCount = Math.random() * 50 + 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = {
            x: firework.x,
            y: firework.y,
            xSpeed: Math.random() * 6 - 3,
            ySpeed: Math.random() * 6 - 3,
            alpha: 1,
        };
        firework.particles.push(particle);
    }
}

function updateFireworks() {
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];

        if (!firework.exploded) {
            firework.y += firework.ySpeed;
            firework.ySpeed += 0.1;

            if (firework.ySpeed >= 0) {
                firework.exploded = true;
                createParticles(firework);
            }
        } else {
            for (let j = firework.particles.length - 1; j >= 0; j--) {
                const particle = firework.particles[j];
                particle.x += particle.xSpeed;
                particle.y += particle.ySpeed;
                particle.alpha -= 0.01;

                if (particle.alpha <= 0) {
                    firework.particles.splice(j, 1);
                }
            }

            if (firework.particles.length === 0) {
                fireworks.splice(i, 1);
            }
        }
    }
}

function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const firework of fireworks) {
        if (!firework.exploded) {
            ctx.fillStyle = firework.color;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, 5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            for (const particle of firework.particles) {
                ctx.fillStyle = firework.color;
                ctx.globalAlpha = particle.alpha;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    updateFireworks();
    drawFireworks();
}

setInterval(createFirework, 500);
animate();
