function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Clear screen and depth buffer
    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // White background
    gl.enable(gl.DEPTH_TEST);           // Enable depth test

    // Load vertex data from data.js
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Load color data from data.js
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Load index data from data.js
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Shader setup
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Program setup
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPos = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    // Color attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);

    // Matrix setup
    var Pmatrix = gl.getUniformLocation(program, "uProj");
    var Vmatrix = gl.getUniformLocation(program, "uView");
    var Mmatrix = gl.getUniformLocation(program, "uModel");

    var projMatrix = glMatrix.mat4.create();
    var modMatrix = glMatrix.mat4.create();
    var viewMatrix = glMatrix.mat4.create();

    // Adjust perspective projection settings
    glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 100.0);

    // **Camera View Adjustment**
    // Set the camera farther and higher, and adjust its angle
    glMatrix.mat4.lookAt(viewMatrix,
        [1.5, 1.5, 1.5],  // Camera position
        [0.0, 0.0, 0.0],  // Look at the origin
        [0.0, 1.0, 0.0]   // Up vector
    );

    // Render loop
    function render(time) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Apply matrix transformations
        gl.uniformMatrix4fv(Pmatrix, false, projMatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewMatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modMatrix);

        // Draw the model using the index buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(render);
    }

    render(1);
}
