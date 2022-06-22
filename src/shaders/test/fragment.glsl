precision mediump float;
uniform vec3 uColor;
uniform vec3 uColor1;

varying float vdisplacement;

    void main() {

      float mixStrength = (vdisplacement + 0.25) * 1.0;
      vec3 color = mix(uColor, uColor1, mixStrength);

    gl_FragColor = vec4(color, 1.0);
      // gl_FragColor = vec4(vposition, 1.0);
      //gl_FragColor = textureColor;
    }