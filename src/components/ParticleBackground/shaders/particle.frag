uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vColor;

void main() {
    vec2 uv = vUv;
    // Blend texture color with particle color
    gl_FragColor = vec4(vColor, 1.0);
}