// Vertices for the 3D monitor (with bezel, thicker stand, and base)
var vertices = [
    // Front face of the screen (inner area)
    -0.3, 0.3, 0.05,   // Top-left (0)
    0.5, 0.3, 0.05,    // Top-right (1)
    0.5, -0.2, 0.05,   // Bottom-right (2)
    -0.3, -0.2, 0.05,  // Bottom-left (3)

    // Front bezel (outer area)
    -0.4, 0.4, 0.05,   // Outer top-left (4)
    0.6, 0.4, 0.05,    // Outer top-right (5)
    0.6, -0.3, 0.05,   // Outer bottom-right (6)
    -0.4, -0.3, 0.05,  // Outer bottom-left (7)

    // Back face of the screen (inner area)
    -0.4, 0.2, -0.05,  // Top-left (8)
    0.4, 0.2, -0.05,   // Top-right (9)
    0.4, -0.1, -0.05,  // Bottom-right (10)
    -0.4, -0.2, -0.05, // Bottom-left (11)

    // Back bezel (outer area)
    -0.5, 0.3, -0.05,  // Outer top-left (12)
    0.5, 0.3, -0.05,   // Outer top-right (13)
    0.5, -0.2, -0.05,  // Outer bottom-right (14)
    -0.5, -0.2, -0.05, // Outer bottom-left (15)

    // Stand front face
    -0.05, -0.3, 0.05,  // Top-left of stand (16)
    0.05, -0.3, 0.05,   // Top-right of stand (17)
    0.05, -0.8, 0.05,   // Bottom-right of stand (18)
    -0.05, -0.8, 0.05,  // Bottom-left of stand (19)

    // Stand back face
    -0.05, -0.2, -0.05, // Top-left of stand (20)
    0.05, -0.2, -0.05,  // Top-right of stand (21)
    0.05, -0.8, -0.05,  // Bottom-right of stand (22)
    -0.05, -0.8, -0.05, // Bottom-left of stand (23)

    // Stand base
    -0.3, -0.8, 0.2,  // Front-left of base (24)
    0.3, -0.8, 0.2,   // Front-right of base (25)
    0.3, -0.85, 0.2,   // Back-right of base (26)
    -0.3, -0.85, 0.2,  // Back-left of base (27)

    -0.3, -0.8, -0.1, // Back-left of base (28)
    0.3, -0.8, -0.1,  // Back-right of base (29)
    0.3, -0.85, -0.1,  // Front-right of base (30)
    -0.3, -0.85, -0.1  // Front-left of base (31)
];

// Indices for connecting vertices into triangles
var indices = [
    // Front screen face
    0, 1, 2,   0, 2, 3,

    // Front bezel
    0, 4, 1,   1, 5, 4,
    3, 7, 0,   0, 7, 4,
    1, 5, 6,   1, 6, 2,
    2, 6, 7,   2, 7, 3,

    // Back screen face
    8, 9, 10,  8, 10, 11,

    // Back bezel
    8, 12, 9,  9, 13, 12,
    11, 15, 8, 8, 15, 12,
    9, 13, 14, 9, 14, 10,
    10, 14, 15, 10, 15, 11,

    4, 5, 13, 4, 13, 12, // Top bezel
    5, 6, 14, 5, 14, 13, // Right bezel
    6, 7, 15, 6, 15, 14, // Bottom bezel
    7, 4, 12, 7, 12, 15, // Left bezel

    // Stand front
    16, 17, 18, 16, 18, 19,

    // Stand back
    20, 21, 22, 20, 22, 23,

    16, 17, 21, 16, 21, 20, // Top stand
    17, 18, 22, 17, 22, 21, // Right stand
    18, 19, 23, 18, 23, 22, // Bottom stand
    19, 16, 20, 19, 20, 23, // Left stand

    // Stand base
    24, 25, 26, 24, 26, 27,
    28, 29, 30, 28, 30, 31,

    24, 25, 29, 24, 29, 28, // Top base
    25, 26, 30, 25, 30, 29, // Right base
    26, 27, 31, 26, 31, 30, // Bottom base
    27, 24, 28, 27, 28, 31  // Left base
];

// Colors for the vertices
var colors = [
    // Front screen (dark gray)
    0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,

    // Front bezel (black)
    0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,

    // Back screen (dark gray)
    0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,

    // Back bezel (black)
    0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,

    // Stand front (silver)
    0.7, 0.7, 0.7,  0.7, 0.7, 0.7,  0.7, 0.7, 0.7,  0.7, 0.7, 0.7,

    // Stand back (dark silver)
    0.4, 0.4, 0.4,  0.4, 0.4, 0.4,  0.4, 0.4, 0.4,  0.4, 0.4, 0.4,

    // Stand base (black)
    0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 0.0, 0.0
];
