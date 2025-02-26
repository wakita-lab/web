varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position.x, position.y, 0.0, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 4.0;
}