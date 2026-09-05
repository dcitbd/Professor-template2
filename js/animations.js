/**
 * THE ACADEMIC ATLAS - GRAPH & CANVAS VISUALIZER
 * Restrained academic node graphics and interactive topological maps.
 */
const CanvasGraph = {
    init(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        const nodes = [
            { x: width * 0.5, y: height * 0.25, label: "RESEARCH", r: 5 },
            { x: width * 0.25, y: height * 0.5, label: "BOOKS", r: 4 },
            { x: width * 0.75, y: height * 0.5, label: "COURSES", r: 4 },
            { x: width * 0.35, y: height * 0.75, label: "IDEAS", r: 4 },
            { x: width * 0.65, y: height * 0.75, label: "OBSERVATORY", r: 4 }
        ];

        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 3], [0, 4]
        ];

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // Connections
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--line').trim() || '#dddddd';
            ctx.lineWidth = 1;
            connections.forEach(([i, j]) => {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            });

            // Nodes
            nodes.forEach(node => {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#174A5B';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#73787B';
                ctx.font = '10px Space Grotesk, sans-serif';
                ctx.letterSpacing = '1px';
                ctx.fillText(node.label, node.x - 20, node.y - 12);
            });
        }

        draw();
        window.addEventListener('resize', () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            draw();
        });
    }
};

window.CanvasGraph = CanvasGraph;