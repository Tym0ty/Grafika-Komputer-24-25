function main() {
    const canvas = document.getElementById("myCanvas");
    const gl = canvas.getContext("webgl");

    // Clear screen and depth buffer
    gl.clearColor(1.0, 1.0, 1.0, 1.0); // White background
    gl.enable(gl.DEPTH_TEST); // Enable depth test

    // Load vertex data from data.js
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Load color data from data.js
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Load index data from data.js
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Shader setup
    const vertexShaderCode = document.getElementById("vertexShaderCode").text;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Program setup
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    // Color attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);

    // Matrix setup
    const Pmatrix = gl.getUniformLocation(program, "uProj");
    const Vmatrix = gl.getUniformLocation(program, "uView");
    const Mmatrix = gl.getUniformLocation(program, "uModel");

    const projMatrix = glMatrix.mat4.create();
    const viewMatrix = glMatrix.mat4.create();
    const modelMatrix = glMatrix.mat4.create();

    // Adjust perspective projection settings
    glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 100.0);

    // Set up camera view
    glMatrix.mat4.lookAt(viewMatrix, [1.5, 1.5, 1.5], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

    // Mouse-based rotation variables
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let rotationX = 0, rotationY = 0;

    // Mouse events for rotation
    canvas.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
    });

    canvas.addEventListener("mousemove", (event) => {
        if (isDragging) {
            const deltaX = event.clientX - lastX;
            const deltaY = event.clientY - lastY;
            rotationY += deltaX * 0.01; // Rotation sensitivity
            rotationX += deltaY * 0.01;
            lastX = event.clientX;
            lastY = event.clientY;
        }
    });

    canvas.addEventListener("mouseup", () => { isDragging = false; });
    canvas.addEventListener("mouseleave", () => { isDragging = false; });

    // Render loop
    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Apply rotation
        glMatrix.mat4.identity(modelMatrix);
        glMatrix.mat4.rotateY(modelMatrix, modelMatrix, rotationY);
        glMatrix.mat4.rotateX(modelMatrix, modelMatrix, rotationX);

        // Set the matrix uniforms
        gl.uniformMatrix4fv(Pmatrix, false, projMatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewMatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modelMatrix);

        // Draw the model using the index buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(render);
    }

    render();
}
