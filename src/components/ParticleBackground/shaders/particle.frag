uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(uTexture, uv);
    gl_FragColor = texColor;
}