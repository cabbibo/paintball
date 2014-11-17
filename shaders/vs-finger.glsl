uniform float audioDisplacement;


varying vec3 vMPos;
varying vec3 vNorm;
varying vec3 vCamVec;
varying vec3 vMNorm;

void main(){

//  vUv = position.xy;
  //vec4 pos = texture2D( t_pos , vec2( vUv.x , (1. - (vUv.y + .125)) ) );

  
  vec3 pos = position;
  vNorm = normal;

  vMPos = ( modelMatrix * vec4( pos.xyz , 1. ) ).xyz;
  vMNorm = ( modelMatrix * vec4( vNorm.xyz , 0. ) ).xyz;

  //pos.xyz += vNorm *  audioDisplacement;//01;
  //vPos = pos.xyz;

  vCamVec = normalize( cameraPosition - vMPos);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.xyz , 1. );


}

