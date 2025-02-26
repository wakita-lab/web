varying vec2 vUv;

void main() {
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - strength;
    // strength = pow(strength, 2.0);

    // Change color to bright blue
    vec3 color = vec3(0.36, 0.58, 1.0);
    gl_FragColor = vec4(color, 1.0);
}